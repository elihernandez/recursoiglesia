import { prisma } from 'api/config/db'
import { limitPageMultitracks } from 'api/helpers/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { getMultitracksShortener, getShortener } from 'pages/api/acortador'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const text: string = req.query?.text as string
        const queryPage: string = req.query?.page as string
        const page: number = parseInt(queryPage)

        try {
            const take = limitPageMultitracks * page

            const multitracks = await prisma.multitrack.findMany({
                skip: page === 1 ? 0 : take - limitPageMultitracks,
                take: limitPageMultitracks,
                where: {
                    OR: [
                        {
                            name: {
                                contains: text
                            }
                        },
                        {
                            artist: {
                                name: {
                                    contains: text
                                }
                            }
                        },
                        {
                            album: {
                                name: {
                                    contains: text
                                }
                            }
                        }
                    ]
                },
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
            })

            await getMultitracksShortener(multitracks)

            const count = await prisma.multitrack.count({
                where: {
                    OR: [
                        {
                            name: {
                                contains: text
                            }
                        },
                        {
                            artist: {
                                name: {
                                    contains: text
                                }
                            }
                        },
                        {
                            album: {
                                name: {
                                    contains: text
                                }
                            }
                        }
                    ]
                },
            })

            const data = {
                multitracks,
                count
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