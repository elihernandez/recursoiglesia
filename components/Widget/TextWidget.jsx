import Div from '../Div'
import Image from 'next/image'

export default function TextWidget({ logoSrc, logoAlt, text }) {
    return (
        <Div className="cs-text_widget">
            <Image priority alt="Logo recursoiglesia" src={logoSrc} width={200} height={93} />
            <p>{text}</p>
        </Div>
    )
}
