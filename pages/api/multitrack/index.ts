import { prisma } from 'api/config/db'
import { Multitrack } from 'api/models/Multitrack'
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
            const multitrack = await GET(id)

            res.status(200)
            res.json(multitrack)
        } else if (req.method === 'POST') {
            const data = req.body
            const multitrack = await POST(data)

            res.status(200)
            res.json(multitrack)
        } else if (req.method === 'PUT') {
            const data = req.body
            const multitrack = await PUT(data)

            res.status(200)
            res.json(multitrack)
        } else if (req.method === 'DELETE') {
            const data = req.body
            await DELETE(data)

            res.status(200)
            res.json('')
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
}

export async function GET(id: string) {
    return await prisma.multitrack.findFirst({
        where: {
            multitrackId: id
        }
    })
}

async function POST(data: Multitrack) {
    return await prisma.multitrack.create({
        data: data
    })
}

async function PUT(data: Multitrack) {
    return await prisma.multitrack.update({
        where: {
            multitrackId: data.id
        },
        data: data
    })
}

async function DELETE(data: Multitrack) {
    return await prisma.multitrack.delete({
        where: {
            multitrackId: data.id
        }
    })
}