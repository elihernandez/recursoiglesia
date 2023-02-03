import { prisma } from 'api/config/db'
import { transporter } from 'api/config/mailer'
import { Multitrack } from 'api/models/Multitrack'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log(req.body)
        try {
            const multitrackRequest = await prisma.multitrackRequest.create({
                data: {
                    email: req.body.email,
                    multitrackId: req.body.multitrackId,
                    isSent: req.body.isSent
                },
                include: {
                    multitrack: {
                        include: {
                            artist: true
                        }
                    }
                }
            })

            sendNewMultitrackRequest(req.body.email, multitrackRequest.multitrack)

            res.status(200)
            res.json(`Te notificaremos cuando el recurso "${multitrackRequest.multitrack.name}" esté disponible en la plataforma.`)
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

export async function sendNewMultitrackRequest(email: string, multitrack: Multitrack) {
    try {
        return await transporter.sendMail({
            from: 'Recurso Iglesia',
            to: process.env.EMAIL_AUTH_USER,
            subject: 'Nueva solicitud de recurso',
            html: `
                    <div>
                        <p>Hola, tienes una nueva solicitud de recurso.</p>
                    </div>
                   <div>
                       <p>El correo ${email} ha solicitado el recurso: ${multitrack.name} - ${multitrack.artist.name}.</p>
                   </div>
                `
        })
    } catch (e) {
        console.log(e)
    }
}