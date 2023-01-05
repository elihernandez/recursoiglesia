import React from 'react'
import Div from '../Div'
import './funfactitem.scss'

export default function FunFactItem({title, factNumber}) {
  return (
    <Div className="cs-funfact cs-style1">
      <Div className="cs-funfact_number cs-primary_font cs-semi_bold cs-primary_color"><span/>{factNumber}</Div>
      <Div className="cs-funfact_text">
        <span className="cs-accent_color">+</span>
        <p>{title}</p>
      </Div>
    </Div>
  )
}
