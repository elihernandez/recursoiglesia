import { prisma } from 'api/config/db'
import { Category } from 'api/models/Category'
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
            const id: number = req.query.id as number
            const category = await GET(id)

            res.status(200)
            res.json(category)
        } else if (req.method === 'POST') {
            const data = req.body
            const category = await POST(data)

            res.status(200)
            res.json(category)
        } else if (req.method === 'PUT') {
            const data = req.body
            const category = await PUT(data)

            res.status(200)
            res.json(category)
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
        console.log(error)
        res.status(400)
        res.json(error)
    }
}

export async function GET(id: number) {
    return await prisma.category.findFirst({
        where: {
            id: id
        }
    })
}

async function POST(data: Category) {
    return await prisma.category.create({
        data: data
    })
}

async function PUT(data: Category) {
    return await prisma.category.update({
        where: {
            id: data.id
        },
        data: data
    })
}

async function DELETE(data: Category) {
    return await prisma.category.delete({
        where: {
            id: data.id
        }
    })
}