import { Shortener } from '@prisma/client'
import { prisma } from 'api/config/db'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET, POST, PUT, DELETE'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    try {
        if (req.method === 'GET') {
            const id: string = req.query.id as string
            const shortener = await GET(id)

            res.status(200)
            res.json(shortener)
        } else if (req.method === 'POST') {
            const data = req.body
            const shortener = await POST(data)

            res.status(200)
            res.json(shortener)
        } else if (req.method === 'PUT') {
            const data = req.body
            const shortener = await PUT(data)

            res.status(200)
            res.json(shortener)
        } else if (req.method === 'DELETE') {
            const data = req.body
            await DELETE(data)

            res.status(200)
            res.json('')
        } else {
            res
                .status(405)
                .json({ message: 'We only support GET' })
        }
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

export async function GET(id: string) {
    return await prisma.shortener.findFirst({
        where: {
            id: id
        }
    })
}

async function POST(data: Shortener) {
    return await prisma.shortener.create({
        data: data
    })
}

async function PUT(data: Shortener) {
    return await prisma.shortener.update({
        where: {
            id: data.id
        },
        data: data
    })
}

async function DELETE(data: Shortener) {
    return await prisma.shortener.delete({
        where: {
            id: data.id
        }
    })
}

export async function getMultitracksShortener(multitracks) {
    return new Promise(async (resolve, reject) => {
        if (multitracks.length === 0) {
            resolve('')
        }

        let i = 0
        for (const multitrack of multitracks) {
            i++
            if (multitrack.shortener) {
                const shortener = await GET(multitrack.songId)
                if (shortener) {
                    const response = await getShortenedUrl(shortener.link, shortener.id)
                    const { data: shortenedUrl } = response
                    multitrack.shortener.link = shortenedUrl ? shortenedUrl.shortenedUrl : ''
                }
            }

            if (i === multitracks.length) {
                resolve('')
            }
        }
    })
}

export async function getShortenedUrl(url: string, alias: string) {
    return await axios.get(`https://acortaz.net/api?api=${process.env.ACORTAZ_ID_TOKEN}&url=${url}&alias=${alias}`)
}