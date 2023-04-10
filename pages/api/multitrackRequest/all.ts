import { prisma } from 'api/config/db'
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
            const multitrackRequests = await prisma.multitrackRequest.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    multitrack: {
                        include: {
                            album: {
                                include: {
                                    artist: true
                                }
                            }
                        }
                    }
                }
            })
            res.status(200)
            res.json(multitrackRequests)
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