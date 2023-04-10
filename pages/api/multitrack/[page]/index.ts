import { prisma } from 'api/config/db'
import { limitPageMultitracks } from 'api/helpers/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const queryPage: string = req.query?.page as string
        const page: number = parseInt(queryPage)

        try {
            const take = limitPageMultitracks * page

            const multitracks = await prisma.multitrack.findMany({
                skip: page === 1 ? 0 : take - limitPageMultitracks,
                take: limitPageMultitracks,
                select: {
                    id: true,
                    multitrackId: true,
                    path: true,
                    name: true,
                    artist: true,
                    album: true,
                    link: true,
                    urlDate: true
                }
            })

            const count = await prisma.multitrack.count()

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