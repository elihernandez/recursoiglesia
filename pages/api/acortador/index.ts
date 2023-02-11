import { prisma } from 'api/config/db'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const songId: string = req.query?.songId as string

        try {
            const shortener = await getShortener(songId)

            res.status(200)
            res.json(shortener)
        } catch (e) {
            console.log(e)
            res.status(500)
            res.json(e)
        }
    } else {
        res
            .status(405)
            .json({ message: 'We only support GET' })
    }
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
                const shortenedUrl = await getShortener(multitrack.songId)
                multitrack.shortener.link = shortenedUrl ? shortenedUrl.shortenedUrl : ''
            }

            if (i === multitracks.length) {
                resolve('')
            }
        }
    })
}

export async function getShortener(songId: string) {
    const shortener = await prisma.shortener.findFirst({
        where: {
            id: songId
        }
    })

    if (shortener) {
        const response = await getShortenedUrl(shortener.link, shortener.id)
        return response.data
    }

    return shortener
}

export async function getShortenedUrl(url: string, alias: string) {
    return await axios.get(`https://acortaz.net/api?api=${process.env.ACORTAZ_ID_TOKEN}&url=${url}&alias=${alias}`)
}