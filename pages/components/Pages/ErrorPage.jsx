import React from 'react'
import { pageTitle } from '../../helper';
import SectionHeading from '../SectionHeading';

export default function ErrorPage() {
  pageTitle('Error');
  return (
    <div className='cs-page_heading cs-style1 cs-center text-center cs-bg cs-error_page' style={{backgroundImage:'url("images/about_hero_bg.jpeg")'}}>
      <div className="container">
        <SectionHeading 
          title='This page could <br/>not be found.' 
          subtitle='404 Errro' 
          btnText='Back To Home' 
          btnLink='/' 
          variant='cs-style1 text-center'
        />
      </div>
    </div>
  )
}
