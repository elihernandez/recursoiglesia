import { prisma } from 'api/config/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const artistName: string = req.query?.name as string

        try {
            const artist = await prisma.artist.findFirst({
                where: {
                    name: artistName
                },
                include: {
                    albums: {
                        orderBy: {
                            releaseDate: 'desc'
                        }
                    }
                }
            })

            const data = {
                artist
            }

            res.status(200)
            res.json(data)
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