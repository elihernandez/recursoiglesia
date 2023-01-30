import React from 'react'
import { useState } from 'react'
import Div from '../Div'

export default function Accordion() {
    const [selected, setSelected] = useState(0)
    const handelToggle = (index) => {
        if (selected === index) {
            return setSelected(null)
        }
        setSelected(index)
    }
    const accordionData = [
        {
            question: '¿Los recursos tienen algún costo?',
            answer: 'No, todos los recursos son gratuitos, utilizamos acortadadores para seguir financiando los costos de la plataforma.'
        },
        {
            question: '¿Cómo puedo descargar un recurso?',
            answer: 'Sólo tienes que dar click al enlace del recurso, serás redireccionado a un acortador en el que tienes que dar click al botón que aparece en pantalla y esperar 10 segundos, después serás redireccionado la enlace del recurso para que lo descargues.'
        },
        {
            question: '¿Es seguro para mi dispositivo descargar un recurso?',
            answer: 'Si, completamente seguro, el enlace acortador está libre de virus, sólo muestra publicidad ajena a la plataforma.'
        },
        {
            question: '¿Qué puedo hacer si no encuentro un recurso en la plataforma?',
            answer: 'Puedes envíarnos un correo a recursoiglesia1@gmail.com solicitando el recurso, y te notificaremos cuando se encuentre disponible en nuestra plataforma.'
        },
    ]
    return (
        <Div className="cs-accordians cs-style1">
            {accordionData.map((item, index) => (
                <Div className={`cs-accordian ${selected === index ? 'active' : ''}`} key={index}>
                    <Div className="cs-accordian_head" onClick={() => handelToggle(index)}>
                        <h2 className="cs-accordian_title">{item.question}</h2>
                        <span className="cs-accordian_toggle cs-accent_color">
                            <svg width={15} height={8} viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0L7.5 7.5L15 0H0Z" fill="currentColor" />
                            </svg>
                        </span>
                    </Div>
                    <Div className='cs-accordian_body'>
                        <Div className="cs-accordian_body_in">{item.answer}</Div>
                    </Div>
                </Div>
            ))}
        </Div>
    )
}
