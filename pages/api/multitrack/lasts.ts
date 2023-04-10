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
            const multitracks = await prisma.multitrack.findMany({
                where: {
                    NOT: {
                        urlDate: null
                    }
                },
                take: 25,
                select: {
                    id: true,
                    multitrackId: true,
                    path: true,
                    name: true,
                    link: true,
                    urlDate: true,
                    artist: true,
                    album: true
                },
                orderBy: {
                    urlDate: 'desc'
                }
            })
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