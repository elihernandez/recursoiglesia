import { prisma } from 'api/config/db'
import { transporter } from 'api/config/mailer'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body.data
        try {
            const user = await prisma.user.create({
                data: {
                    email: email
                }
            })

            await sendNewSuscriberEmail(user.email)

            res.status(200)
            res.json('El correo se registró correctamente.')
        } catch (e) {
            console.log(e)
            if (e.code == 'P2002') {
                res.status(500)
                res.json('El correo electrónico ya se encuentra registrado.')
            } else {
                res.status(500)
                res.json('Ocurrió un problema, no pudimos registrar tu correo.')
            }
        }
    } else {
        res
            .status(405)
            .json({ message: 'We only support POST' })
    }
}

export async function sendNewSuscriberEmail(email: string) {
    try {
        console.log('email')
        return await transporter.sendMail({
            from: 'Recurso Iglesia',
            to: process.env.EMAIL_AUTH_USER,
            subject: 'Nuevo suscriptor',
            html: `
                    <div>
                        <p>Hola, tienes un nuevo suscriptor.</p>
                    </div>
                   <div>
                       <p>El correo ${email} se ha suscrito al newsletter.</p>
                   </div>
                `
        })
    } catch (e) {
        console.log(e)
    }
}