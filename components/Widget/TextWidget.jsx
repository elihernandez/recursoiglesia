import React from 'react'
import Div from '../Div'

export default function TextWidget({logoSrc, logoAlt, text}) {
  return (
    <Div className="cs-text_widget">
      <img src={logoSrc} alt={logoAlt} width="60%" />
      <p>{text}</p>
    </Div>
  )
}
