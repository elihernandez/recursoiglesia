import { prisma } from 'api/config/db'
import { MultitrackRequest } from 'api/models/MultitrackRequest'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        // Options
        methods: ['GET, POST, PUT, DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })

    try {
        if (req.method === 'GET') {
            const id: string = req.query.id as string
            const multitrackRequest = await GET(id)

            res.status(200)
            res.json(multitrackRequest)
        } else if (req.method === 'POST') {
            const data = req.body
            const multitrackRequest = await POST(data)

            res.status(200)
            res.json(multitrackRequest)
        } else if (req.method === 'PUT') {
            const data = req.body
            const multitrackRequest = await PUT(data)

            res.status(200)
            res.json(multitrackRequest)
        } else if (req.method === 'DELETE') {
            const data = req.body
            await DELETE(data)

            res.status(200)
            res.json('')
        }
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

export async function GET(id: string) {
    return await prisma.multitrackRequest.findFirst({
        where: {
            songId: id
        }
    })
}

async function POST(data: MultitrackRequest) {
    return await prisma.multitrackRequest.create({
        data: data
    })
}

async function PUT(data: MultitrackRequest) {
    return await prisma.multitrackRequest.update({
        where: {
            songId: data.id
        },
        data: data
    })
}

async function DELETE(data: MultitrackRequest) {
    return await prisma.multitrackRequest.delete({
        where: {
            songId: data.id
        }
    })
}