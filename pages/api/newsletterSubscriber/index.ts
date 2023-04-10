import { prisma } from 'api/config/db'
import { NewsletterSubscriber } from 'api/models/NewsletterSubscriber'
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
            const newsletterSubscriber: NewsletterSubscriber = await GET(id)

            res.status(200)
            res.json(newsletterSubscriber)
        } else if (req.method === 'POST') {
            const data = req.body
            const newsletterSubscriber: NewsletterSubscriber = await POST(data)

            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Nueva suscripción al boletín de noticias',
                message: `Se suscribió al boletín de noticias: ${newsletterSubscriber.email}`
            })

            res.status(200)
            res.json({ newsletterSubscriber, message: 'El correo electrónico se registró a nuestro boletín de noticias.' })
        } else if (req.method === 'PUT') {
            const data = req.body
            const newsletterSubscriber: NewsletterSubscriber = await PUT(data)

            res.status(200)
            res.json(newsletterSubscriber)
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
            res.json({ message: 'Ya estás suscrito a nuestro boletín de noticias.' })
        } else {
            res.status(500)
            res.json({ message: 'Ya estás suscrito a nuestro boletín de noticias.' })
        }
    }
}

export async function GET(id: string) {
    return await prisma.newsletterSubscriber.findFirst({
        where: {
            id: id
        }
    })
}

async function POST(data: NewsletterSubscriber) {
    return await prisma.newsletterSubscriber.create({
        data: data
    })
}

async function PUT(data: NewsletterSubscriber) {
    return await prisma.newsletterSubscriber.update({
        where: {
            id: data.id
        },
        data: data
    })
}

async function DELETE(data: NewsletterSubscriber) {
    return await prisma.newsletterSubscriber.delete({
        where: {
            id: data.id
        }
    })
}