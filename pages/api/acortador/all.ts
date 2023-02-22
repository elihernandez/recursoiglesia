import { prisma } from 'api/config/db'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { NextResponse, type NextRequest } from 'next/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })

    if (req.method === 'GET') {
        try {
            const shorteners = await prisma.shortener.findMany({})
            res.status(200)
            res.json(shorteners)
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