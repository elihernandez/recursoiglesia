import { prisma } from 'api/config/db'
import { limitPageSoftware } from 'api/helpers/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const queryPage: string = req.query?.page as string
        const page: number = parseInt(queryPage)

        try {
            const take = limitPageSoftware * page

            const softwares = await prisma.software.findMany({
                skip: page === 1 ? 0 : take - limitPageSoftware,
                take: limitPageSoftware
            })

            const count = await prisma.software.count()

            const data = {
                softwares,
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