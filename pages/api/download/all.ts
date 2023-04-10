import { prisma } from 'api/config/db'
import { Download } from 'api/models/Download'
import { ResourceType } from 'api/models/ResourceType'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    if (req.method === 'GET') {
        try {
            const downloads: Download[] = await prisma.download.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            })

            for (const download of downloads) {
                if (download.type === ResourceType.MULTITRACK) {
                    const resource = await prisma.multitrack.findFirst({
                        where: {
                            multitrackId: download.resourceId
                        }
                    })

                    download.resource = resource
                } else if (download.type === ResourceType.TEMPLATE) {
                    const resource = await prisma.template.findFirst({
                        where: {
                            id: download.resourceId
                        }
                    })

                    download.resource = resource
                } else if (download.type === ResourceType.SOFTWARE) {
                    const resource = await prisma.software.findFirst({
                        where: {
                            id: download.resourceId
                        }
                    })

                    download.resource = resource
                } else if (download.type === ResourceType.PRODUCT) {
                    console.log(1)
                    const resource = await prisma.product.findFirst({
                        where: {
                            id: parseInt(download.resourceId)
                        }
                    })
                    console.log(2)

                    download.resource = resource
                }
            }
            res.status(200)
            res.json(downloads)
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