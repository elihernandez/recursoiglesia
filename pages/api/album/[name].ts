import { prisma } from 'api/config/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            res.status(200)
            res.json({})
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

export async function getAlbum(artistUrl: string, albumUrl: string) {
    try {
        return await prisma.album.findFirst({
            where: {
                AND: [
                    {
                        path: albumUrl
                    },
                    {
                        artist: {
                            path: artistUrl
                        }
                    }
                ]
            },
            include: {
                artist: true,
                multitracks: {
                    select: {
                        id: true,
                        multitrackId: true,
                        path: true,
                        name: true,
                        link: true,
                        urlDate: true,
                        artist: true,
                        album: true
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}