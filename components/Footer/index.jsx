import React from 'react'
import Div from '../Div'
import ContactInfoWidget from '../Widget/ContactInfoWidget'
import MenuWidget from '../Widget/MenuWidget'
import Newsletter from '../Widget/Newsletter'
import SocialWidget from '../Widget/SocialWidget'
import TextWidget from '../Widget/TextWidget'
// import './footer.scss'

export default function Footer({ copyrightText, logoSrc, logoAlt, text }) {
    const copyrightLinks = [
        {
            title: 'Terms of Use',
            href: '/'
        },
        {
            title: 'Privacy Policy',
            href: '/'
        }
    ]

    const serviceMenu = [
        {
            title: 'Secuencias',
            href: '/secuencias'
        },
        {
            title: 'Plantillas de diseño',
            href: '/plantillas'
        },
        {
            title: 'Programas',
            href: '/programas'
        }
    ]

    const menu = [
        {
            title: 'Preguntas frecuentes',
            href: '/faq'
        }
    ]

    return (
        <footer className="cs-fooer">
            <Div className="cs-fooer_main">
                <Div className="container">
                    <Div className="row">
                        <Div className="col-lg-3 col-sm-6">
                            <Div className="cs-footer_item">
                                <TextWidget
                                    logoSrc='/logo_white.png'
                                    logoAlt='Logo'
                                    text='Aquí encontrarás recursos para tu ministerio, navega y encuentra el contenido que necesitas.'
                                />
                                <SocialWidget />
                            </Div>
                        </Div>
                        <Div className="col-lg-3 col-sm-6">
                            <Div className="cs-footer_item">
                                <MenuWidget menuItems={menu} menuHeading='Conoce más' />
                            </Div>
                        </Div>
                        <Div className="col-lg-3 col-sm-6">
                            <Div className="cs-footer_item">
                                <MenuWidget menuItems={serviceMenu} menuHeading='Recursos' />
                            </Div>
                        </Div>
                        <Div className="col-lg-3 col-sm-6">
                            <Div className="cs-footer_item">
                                <Newsletter
                                    title='Suscríbete'
                                    subtitle='Suscríbete para que no te pierdas de ningún contenido que se sube a la plataforma.'
                                    placeholder='ejemplo@gmail.com'
                                />
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>
            {/* <Div className="container">
        <Div className="cs-bottom_footer">
          <Div className="cs-bottom_footer_left">
            <Div className="cs-copyright">Copyright © 2022 Laralink.</Div>
          </Div>
          <Div className="cs-bottom_footer_right">
            <MenuWidget menuItems={copyrightLinks} variant=' cs-style2' />
          </Div>
        </Div>
      </Div> */}
        </footer>
    )
}
