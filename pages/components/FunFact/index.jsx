import React from 'react'
import Div from '../Div'
// import './funfact.scss'

export default function FunFact({children, variant, title, subtitle}) {
  return (
    <section>
        <Div className="container">
          <Div className={variant ? `cs-funfact_wrap ${variant}`: 'cs-funfact_wrap'}>
            <Div className="cs-funfact_shape"  style={{backgroundImage: 'url(./images/funfact_shape_bg.svg)'}} />
            <Div className="cs-funfact_left">
              <Div className="cs-funfact_heading">
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </Div>
            </Div>
            <Div className="cs-funfact_right">
              <Div className="cs-funfacts">
                {children}
              </Div>
            </Div>
          </Div>
        </Div>
      </section>
  )
}
