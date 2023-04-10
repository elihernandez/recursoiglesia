import { prisma } from 'api/config/db'
import { MultitrackRequest } from 'api/models/MultitrackRequest'
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
            const multitrackRequest = await GET(id)

            res.status(200)
            res.json(multitrackRequest)
        } else if (req.method === 'POST') {
            const data = req.body
            const multitrackRequest = await POST(data)

            const multitrack = await prisma.multitrack.findFirst({
                where: {
                    multitrackId: multitrackRequest.multitrackId
                },
                select: {
                    name: true,
                    album: {
                        select: {
                            name: true
                        }
                    },
                    artist: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Nueva solicitud de recurso',
                message: `Se solicitó el recurso: ${multitrack.name}-${multitrack.album.name}-${multitrack.artist.name}`
            })

            res.status(200)
            res.json(`Te notificaremos cuando el recurso "${multitrack.name}" esté disponible en la plataforma.`)
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
        res.json('Ocurrió un problema, no pudimos registrar tu solicitud, vuelve a intentarlo más tarde.')
    }
}

export async function GET(id: string) {
    return await prisma.multitrackRequest.findFirst({
        where: {
            multitrackId: id
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
            multitrackId: data.id
        },
        data: data
    })
}

async function DELETE(data: MultitrackRequest) {
    return await prisma.multitrackRequest.delete({
        where: {
            multitrackId: data.id
        }
    })
}