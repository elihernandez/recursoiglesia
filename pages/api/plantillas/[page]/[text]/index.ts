import { prisma } from 'api/config/db'
import { limitPageTemplates } from 'api/helpers/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const text: string = req.query?.text as string
        const queryPage: string = req.query?.page as string
        const page: number = parseInt(queryPage)

        try {
            const take = limitPageTemplates * page

            const templates = await prisma.template.findMany({
                skip: page === 1 ? 0 : take - limitPageTemplates,
                take: limitPageTemplates,
                where: {
                    OR: [
                        {
                            name: {
                                contains: text
                            }
                        }
                    ]
                }
            })

            const count = await prisma.template.count({
                where: {
                    OR: [
                        {
                            name: {
                                contains: text
                            }
                        }
                    ]
                }
            })

            const data = {
                templates,
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