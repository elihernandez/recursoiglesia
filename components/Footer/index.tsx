import { isMaintenance } from 'api/helpers/constants'
import Div from '../Div'
import MenuWidget from '../Widget/MenuWidget'
import Newsletter from '../Widget/Newsletter'
import SocialWidget from '../Widget/SocialWidget'
import TextWidget from '../Widget/TextWidget'

export default function Footer() {
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

    const mainMenu = [
        {
            title: 'Preguntas frecuentes',
            href: '/faq'
        }
    ]

    const productsMenu = [
        {
            title: 'Iluminación y Sonido',
            href: '/productos/iluminacion-y-sonido'
        },
        {
            title: 'Amplificadores y Efectos',
            href: '/productos/amplificadores-y-efectos'
        },
        {
            title: 'Baterías y Percusión',
            href: '/productos/baterias-y-percusion'
        },
        {
            title: 'Grabación y Producción',
            href: '/productos/grabacion-y-produccion'
        },
        {
            title: 'Interfaz Digital Musical',
            href: '/productos/interfa-digital-musical'
        },
    ]

    return (
        <footer className="cs-fooer">
            <Div className="cs-fooer_main">
                <Div className="container">
                    <Div className={`row ${isMaintenance && 'justify-space-between'}`}>
                        <Div className={`col-lg-${isMaintenance ? '4' : '3'} col-sm-6`}>
                            <Div className="cs-footer_item">
                                <TextWidget
                                    logoSrc='/logo_white.png'
                                    logoAlt='Logo'
                                    text='Aquí encontrarás recursos para tu ministerio, navega y encuentra el contenido que necesitas.'
                                />
                                <SocialWidget />
                            </Div>
                        </Div>
                        {!isMaintenance &&
                            <>
                                <Div className="col-lg-3 col-sm-6">
                                    <Div className="cs-footer_item">
                                        <MenuWidget menuItems={mainMenu} menuHeading='Conoce más' />
                                    </Div>
                                </Div>
                                <Div className="col-lg-3 col-sm-6">
                                    <Div className="cs-footer_item">
                                        <MenuWidget menuItems={serviceMenu} menuHeading='Recursos' />
                                    </Div>
                                </Div>
                                {/* <Div className="col-lg-2 col-sm-6">
                                    <Div className="cs-footer_item">
                                        <MenuWidget menuItems={productsMenu} menuHeading='Productos' />
                                    </Div>
                                </Div> */}
                            </>
                        }
                        <Div className={`col-lg-${isMaintenance ? '4' : '3'} col-sm-6`}>
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
        </footer>
    )
}
