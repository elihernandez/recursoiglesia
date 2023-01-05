import React from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export default function Button({btnLink, btnText, variant}) {
  return (
    <Link to={btnLink} className={variant?`cs-text_btn ${variant}` : "cs-text_btn"}>
      <>
        <span>{btnText}</span>
        <Icon icon="bi:arrow-right" /> 
      </>
    </Link>
  )
}
