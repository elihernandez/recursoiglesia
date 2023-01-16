import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
    },
    tls: {
        rejectUnauthorized: process.env.NODE_ENV != 'development'
    }
})

transporter.verify().then(() => {
    //console.log('Ready for send emails')
})