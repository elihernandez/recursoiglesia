import { NextApiRequest, NextApiResponse } from 'next'
const Pushover = require('node-pushover')

const push = new Pushover({
    token: process.env.PUSHOVER_RI_APP_KEY
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const data = req.body
            push.send(process.env.PUSHOVER_USER_KEY, data.title, data.message)

            res.status(200)
            res.json('')
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
}