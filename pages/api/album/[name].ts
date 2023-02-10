import { prisma } from 'api/config/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getMultitracksShortener } from '../acortador'

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

export async function getAlbum(albumName: string, artistName: string) {
    const album = await prisma.album.findFirst({
        where: {
            AND: [
                {
                    name: {
                        contains: albumName
                    }
                },
                {
                    artist: {
                        name: {
                            contains: artistName
                        }
                    }
                }
            ]
        },
        include: {
            multitracks: {
                select: {
                    id: true,
                    name: true,
                    songId: true,
                    artist: true,
                    album: true,
                    shortener: {
                        select: {
                            link: true
                        }
                    }
                }
            }
        }
    })

    await getMultitracksShortener(album.multitracks)

    return album
}