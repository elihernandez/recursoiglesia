import { prisma } from 'api/config/db'
import { Software } from 'api/models/Software'
import { Template } from 'api/models/Template'
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
            const software: Software = await GET(id)

            res.status(200)
            res.json(software)
        } else if (req.method === 'POST') {
            const data = req.body
            const software: Software = await POST(data)

            res.status(200)
            res.json(software)
        } else if (req.method === 'PUT') {
            const data = req.body
            const software: Software = await PUT(data)

            res.status(200)
            res.json(software)
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
    return await prisma.software.findFirst({
        where: {
            id: id
        }
    })
}

async function POST(data: Software) {
    return await prisma.software.create({
        data: data
    })
}

async function PUT(data: Software) {
    return await prisma.software.update({
        where: {
            id: data.id
        },
        data: data
    })
}

async function DELETE(data: Software) {
    return await prisma.software.delete({
        where: {
            id: data.id
        }
    })
}