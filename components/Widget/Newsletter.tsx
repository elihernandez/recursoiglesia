import Div from '../Div'
import axios from 'axios'
import { useState } from 'react'

export default function Newsletter({ title, subtitle, placeholder }) {
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post('/api/email', {
                data: {
                    email: email
                }
            })

            setMessage(response.data)
        } catch (e) {
            console.log(e)
            setMessage(e.response.data)
        }
    }

    return (
        <>
            {title && <h2 className="cs-widget_title">{title}</h2>}
            <Div className="cs-newsletter cs-style1">
                <form action="" className="cs-newsletter_form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={placeholder}
                        className="cs-newsletter_input"
                        required
                    />
                    <button className="cs-newsletter_btn"><span>Envíar</span></button>
                </form>
                <Div className="cs-newsletter_text">{message != '' ? message : subtitle}</Div>
            </Div>
        </>
    )
}
