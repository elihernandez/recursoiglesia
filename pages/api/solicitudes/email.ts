import { prisma } from 'api/config/db'
import { transporter } from 'api/config/mailer'
import { Multitrack } from 'api/models/Multitrack'
import { MultitrackRequest } from 'api/models/MultitrackRequest'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })

    if (req.method === 'POST') {
        try {
            const { data } = req.body

            console.log(data)
            await prisma.multitrackRequest.update({
                where: {
                    id: data.id
                },
                data: {
                    isSent: true
                }
            })

            sendEmail(data)

            res.status(200)
            res.json('')
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

export async function sendEmail(multitrackRequest: MultitrackRequest) {
    try {
        return await transporter.sendMail({
            from: 'Recurso Iglesia',
            to: multitrackRequest.email,
            subject: 'Recurso ya disponible',
            html: `
                    <div>
                        <p>Hola, el recurso que solicitaste ya está disponible en la plataforma.</p>
                    </div>
                   <div>
                       <p>Canción: ${multitrackRequest.multitrack.name}.</p>
                       <p>Álbum: ${multitrackRequest.multitrack.album.name}.</p>
                       <p>Artista: ${multitrackRequest.multitrack.album.artist.name}.</p>
                   </div>
                   <div>
                       <p>Te invitamos a descargar el recurso en: <a href="https://www.recursoiglesia.com/secuencias">www.recursoiglesia.com/secuencias</a>.</p>
                   </div>
                `
        })
    } catch (e) {
        console.log(e)
    }
}