import { Multitrack } from 'api/models/Multitrack'
import { multitracRequestService } from 'api/services/request'
import { useState } from 'react'
import useModalStore from 'store/useModalStore'
import useToastStore from 'store/useToastStore'
import Div from '../Div'

const LoginForm = ({ multitrack }: { multitrack: Multitrack }) => {
    const handleCloseModal = useModalStore((state) => state.handleCloseModal)
    const handleShowToast = useToastStore(state => state.handleShowToast)
    const setToastMessage = useToastStore(state => state.setToastMessage)
    const [email, setEmail] = useState<string>('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await multitracRequestService(email, multitrack.multitrackId)
            setToastMessage(response.data)
            handleCloseModal()
            handleShowToast()
        } catch (e) {
            setToastMessage(e.response.data)
        }
    }

    return (
        <Div>
            <Div className="cs-newsletter_text" style={{ color: 'white', marginBottom: '16px' }}>Escribe tu correo electrónico, y te notificaremos cuando el recurso esté disponible en la plataforma.</Div>
            <Div className="cs-newsletter cs-style1">
                <form action="" className="cs-newsletter_form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@gmail.com"
                        className="cs-newsletter_input"
                        required
                    />
                    <button type="submit" className="cs-newsletter_btn"><span>Envíar</span></button>
                </form>
            </Div>
        </Div>
    )
}

export default LoginForm