import { prisma } from 'api/config/db'
import { Subscriber } from 'api/models/Subscriber'
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
            const subscriber: Subscriber = await GET(id)

            res.status(200)
            res.json(subscriber)
        } else if (req.method === 'POST') {
            const data = req.body
            const subscriber: Subscriber = await POST(data)

            res.status(200)
            res.json({ subscriber, message: 'El correo se registró correctamente.' })
        } else if (req.method === 'PUT') {
            const data = req.body
            const subscriber: Subscriber = await PUT(data)

            res.status(200)
            res.json(subscriber)
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
    } catch (e) {
        if (e.code == 'P2002') {
            res.status(500)
            res.json({ message: 'El correo electrónico ya se encuentra registrado.' })
        } else {
            res.status(500)
            res.json({ message: 'El correo electrónico ya se encuentra registrado.' })
        }
    }
}

export async function GET(id: string) {
    return await prisma.subscriber.findFirst({
        where: {
            id: id
        }
    })
}

async function POST(data: Subscriber) {
    return await prisma.subscriber.create({
        data: data
    })
}

async function PUT(data: Subscriber) {
    return await prisma.subscriber.update({
        where: {
            id: data.id
        },
        data: data
    })
}

async function DELETE(data: Subscriber) {
    return await prisma.subscriber.delete({
        where: {
            id: data.id
        }
    })
}