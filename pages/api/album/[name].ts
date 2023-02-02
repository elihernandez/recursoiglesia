import { prisma } from 'api/config/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const albumName: string = req.query?.name as string

        try {
            const album = await prisma.album.findFirst({
                where: {
                    name: albumName
                },
                include: {
                    multitracks: {
                        select: {
                            id: true,
                            name: true,
                            url: true,
                            artist: true,
                            album: true
                        }
                    }
                }
            })

            const data = {
                album
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