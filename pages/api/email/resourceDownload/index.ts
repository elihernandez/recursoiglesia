import { prisma } from 'api/config/db'
import { transporter } from 'api/config/mailer'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await prisma.resourceDownload.create({
                data: {
                    resourceId: req.body.resourceId,
                    name: req.body.name
                }
            })

            sendNewResourceDownload(req.body.name)

            res.status(200)
            res.json({})
        } catch (e) {
            console.log(e)
            res.status(500)
            res.json('Ocurrió un problema, no pudimos registrar tu solicitud, vuelve a intentarlo más tarde.')
        }
    } else {
        res
            .status(405)
            .json({ message: 'We only support POST' })
    }
}

export async function sendNewResourceDownload(name: string) {
    try {
        return await transporter.sendMail({
            from: 'Recurso Iglesia',
            to: process.env.EMAIL_AUTH_USER,
            subject: 'Nueva descarga de recurso',
            html: `
                    <div>
                        <p>Hola, tienes una nueva descarga de recurso.</p>
                    </div>
                   <div>
                       <p>Se ha descargado el recurso: ${name}.</p>
                   </div>
                `
        })
    } catch (e) {
        console.log(e)
    }
}