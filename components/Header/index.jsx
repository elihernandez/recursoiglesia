import Link from 'next/link'
import { useEffect, useState } from 'react'
import Newsletter from '../Widget/Newsletter'
import SocialWidget from '../Widget/SocialWidget'
import Div from '../Div'
import DropDown from './DropDown'
import imgLogo from 'public/logo_white.png'
import Image from 'next/image'

export default function Header() {
    const [isSticky, setIsSticky] = useState(false)
    const [sideHeaderToggle, setSideHeaderToggle] = useState(false)
    const [mobileToggle, setMobileToggle] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        })
    }, [])

    return (
        <>
            <header className={`cs-site_header cs-style1 text-uppercase cs-sticky_header ${isSticky ? 'cs-sticky_header_active' : ''}`}>
                <Div className="cs-main_header">
                    <Div className="container">
                        <Div className="cs-main_header_in">
                            <Div className="cs-main_header_left">
                                <Link className="cs-site_branding" href="/">
                                    <Image alt="Logo recursoiglesia" src={imgLogo} width={200} />
                                </Link>
                            </Div>
                            <Div className="cs-main_header_center">
                                <Div className="cs-nav cs-primary_font cs-medium">
                                    <ul className="cs-nav_list" style={{ display: `${mobileToggle ? 'block' : 'none'}` }}>
                                        <li><Link href='/' onClick={() => setMobileToggle(false)}>Inicio</Link></li>
                                        <li className="menu-item-has-children">
                                            <Link href='/recursos' onClick={() => setMobileToggle(false)}>Recursos</Link>
                                            <DropDown>
                                                <ul>
                                                    <li><Link href='/secuencias' onClick={() => setMobileToggle(false)}>Secuencias</Link></li>
                                                    <li><Link href='/plantillas' onClick={() => setMobileToggle(false)}>Plantillas de dise??o</Link></li>
                                                    <li><Link href='/programas' onClick={() => setMobileToggle(false)}>Programas</Link></li>
                                                    {/* <li><Link href='/service/service-details' onClick={() => setMobileToggle(false)}>Fuentes</Link></li>
                                                    <li><Link href='/service/service-details' onClick={() => setMobileToggle(false)}>Plantillas de dise??o</Link></li>
                                                    <li><Link href='/service/service-details' onClick={() => setMobileToggle(false)}>Libros</Link></li>
                                                    <li><Link href='/service/service-details' onClick={() => setMobileToggle(false)}>Pistas musicales</Link></li> */}
                                                </ul>
                                            </DropDown>
                                        </li>
                                        <li><Link href='/faq' onClick={() => setMobileToggle(false)}>FAQ</Link></li>
                                        {/* <li><Link href='/' onClick={() => setMobileToggle(false)}>Donaciones</Link></li> */}
                                    </ul>
                                    <span className={mobileToggle ? 'cs-munu_toggle cs-toggle_active' : 'cs-munu_toggle'} onClick={() => setMobileToggle(!mobileToggle)}><span></span></span>
                                </Div>
                            </Div>
                            <Div className="cs-main_header_right">
                                <Div className="cs-toolbox">
                                    <span className="cs-icon_btn" onClick={() => setSideHeaderToggle(!sideHeaderToggle)}>
                                        <span className="cs-icon_btn_in">
                                            <span />
                                            <span />
                                            <span />
                                            <span />
                                        </span>
                                    </span>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </header>

            <Div className={sideHeaderToggle ? 'cs-side_header active' : 'cs-side_header'}>
                <button className="cs-close" onClick={() => setSideHeaderToggle(!sideHeaderToggle)} />
                <Div className="cs-side_header_overlay" onClick={() => setSideHeaderToggle(!sideHeaderToggle)} />
                <Div className="cs-side_header_in">
                    <Div className="cs-side_header_shape" />
                    <Link className="cs-site_branding" href="/">
                        <img src="/logo_white.png" alt="Logo" width="80%" />
                    </Link>
                    {/* <Div className="cs-side_header_box">
            <h2 className="cs-side_header_heading">Do you have a project in your  <br /> mind? Keep connect us.</h2>
          </Div> */}
                    {/* <Div className="cs-side_header_box">
            <ContactInfoWidget title='Contact Us' withIcon />
          </Div> */}
                    <Div className="cs-side_header_box">
                        <Newsletter
                            title='Suscr??bete'
                            subtitle='Suscr??bete para que no te pierdas de ning??n contenido que se sube a la plataforma.'
                            placeholder='ejemplo@gmail.com'
                        />
                    </Div>
                    <Div className="cs-side_header_box">
                        <SocialWidget />
                    </Div>
                </Div>
            </Div>

        </>
    )
}
