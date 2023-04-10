import { prisma } from 'api/config/db'
import { Download } from 'api/models/Download'
import { ResourceType } from 'api/models/ResourceType'
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
            const download = await GET(id)

            res.status(200)
            res.json(download)
        } else if (req.method === 'POST') {
            const data = req.body
            const download: Download = await POST(data)

            try {
                await sendNotification(download)
            } catch {
                await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                    title: 'Nueva descarga de recurso',
                    message: `Se descargó el recurso ${download.resourceId}`
                })
            }

            res.status(200)
            res.json(download)
        } else if (req.method === 'PUT') {
            const data = req.body
            const download = await PUT(data)

            res.status(200)
            res.json(download)
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
            id: id
        }
    })
}

async function POST(data: Download) {
    return await prisma.download.create({
        data: data
    })
}

async function PUT(data: Download) {
    return await prisma.download.update({
        where: {
            id: data.id
        },
        data: data
    })
}

async function DELETE(data: Download) {
    return await prisma.download.delete({
        where: {
            id: data.id
        }
    })
}


async function sendNotification(download: Download) {
    if (download.type === ResourceType.MULTITRACK) {
        const multitrack = await prisma.multitrack.findFirst({
            where: {
                multitrackId: download.resourceId
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

        return await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
            title: 'Nueva descarga de recurso',
            message: `Se descargó el recurso: ${multitrack.name}-${multitrack.album.name}-${multitrack.artist.name}`
        })
    } else if (download.type === ResourceType.TEMPLATE) {
        const template = await prisma.template.findFirst({
            where: {
                id: download.resourceId
            }
        })

        return await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
            title: 'Nueva descarga de recurso',
            message: `Se descargó el recurso: ${template.name}`
        })
    } else if (download.type === ResourceType.SOFTWARE) {
        const software = await prisma.software.findFirst({
            where: {
                id: download.resourceId
            }
        })

        return await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
            title: 'Nueva descarga de recurso',
            message: `Se descargó el recurso: ${software.name}`
        })
    } else if (download.type === ResourceType.PRODUCT) {
        const product = await prisma.product.findFirst({
            where: {
                id: parseInt(download.resourceId)
            }
        })

        return await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
            title: 'Click a producto',
            message: `Se dió click al producto: ${product.name}`
        })
    }
}