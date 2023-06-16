import { prisma } from 'api/config/db'
import { Multitrack } from 'api/models/Multitrack'
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
            const multitracks: Multitrack[] = []
            const downloads = await prisma.download.groupBy({
                by: ['resourceId'],
                _count: {
                    resourceId: true
                },
                where: {
                    type: ResourceType.MULTITRACK
                },
                orderBy: {
                    _count: {
                        resourceId: 'desc',
                    },
                },
                take: 25
            })

            for (const download of downloads) {
                const resource = await prisma.multitrack.findFirst({
                    where: {
                        multitrackId: download.resourceId
                    },
                    include: {
                        album: true,
                        artist: true
                    }
                })

                //@ts-ignore
                download.resource = resource
                //@ts-ignore
                multitracks.push(resource)
            }
            res.status(200)
            res.json(multitracks)
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