import { prisma } from 'api/config/db'
import { limitPageTemplates } from 'api/helpers/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { getShortenedUrl } from 'pages/api/acortador'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const queryPage: string = req.query?.page as string
        const page: number = parseInt(queryPage)

        try {
            const take = limitPageTemplates * page

            const templates = await prisma.template.findMany({
                skip: page === 1 ? 0 : take - limitPageTemplates,
                take: limitPageTemplates,
                select: {
                    id: true,
                    name: true,
                    imgUrl: true,
                    url: true,
                    link: true
                }
            })

            for (const template of templates) {
                try {
                    const alias = template.link.split('/')[4].replace(/./g, '')
                    const response = await getShortenedUrl(template.link, alias)
                    const { shortenedUrl } = response.data
                    template.link = shortenedUrl
                } catch (e) {

                }
            }

            const count = await prisma.template.count()

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