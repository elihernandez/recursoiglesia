import { prisma } from 'api/config/db'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
const bcrypt = require('bcryptjs')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })

    if (req.method === 'GET') {
        try {
            const data = req.query
            const user = await prisma.user.findUnique({
                where: {
                    email: data.email as string
                }
            })

            const response = await checkPassword(data.password, user.password)

            res.status(200)
            res.json({ isValid: response })
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

async function checkPassword(pass, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, hash, async function (err, result) {
            resolve(result)
        })
    })
}