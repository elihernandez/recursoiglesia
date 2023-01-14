import Head from 'next/head'
import { useState } from 'react'
import Div from '../components/Div'
import PageHeading from '../components/PageHeading'
import Portfolio from '../components/Portfolio'
import SectionHeading from '../components/SectionHeading'
import Spacing from '../components/Spacing'

export default function RecursosPage(props) {

    const [active, setActive] = useState('all')
    const [itemShow, setItemShow] = useState(7)
    const portfolioData = [
        {
            title: 'Secuencias',
            subtitle: 'Ver recurso',
            href: '/secuencias',
            src: '/images/recursos_secuencias.jpg',
            category: 'secuencias'
        },
        // {
        //     title: 'Software',
        //     subtitle: 'Ver software',
        //     href: '/portfolio/portfolio-details',
        //     src: '/images/portfolio_5.jpeg',
        //     category: 'software'
        // },
        // {
        //     title: 'Fuentes',
        //     subtitle: 'Ver fuentes',
        //     href: '/portfolio/portfolio-details',
        //     src: '/images/portfolio_6.jpeg',
        //     category: 'fuentes'
        // },
        // {
        //     title: 'Plantillas de diseño',
        //     subtitle: 'Ver plantillas',
        //     href: '/portfolio/portfolio-details',
        //     src: '/images/portfolio_7.jpeg',
        //     category: 'plantillasdiseño'
        // },
        // {
        //     title: 'Libros',
        //     subtitle: 'Ver libros',
        //     href: '/portfolio/portfolio-details',
        //     src: '/images/portfolio_6.jpeg',
        //     category: 'libros'
        // },
        // {
        //     title: 'Pistas musicales',
        //     subtitle: 'Ver pistas',
        //     href: '/portfolio/portfolio-details',
        //     src: '/images/portfolio_7.jpeg',
        //     category: 'pistasmusicales'
        // }
    ]


    return (
        <>
            <Head>
                <title>Recursos</title>
                <meta name="description" content="Recursos gratuitos para tu ministerio, como secuencias, software, plantillas de diseño, fuentes, libros y más" />
            </Head>
            <PageHeading
                title='Recursos'
                bgSrc='images/portfolio_hero_bg.jpeg'
                pageLinkText='Recursos'
                pageTextPrev='Inicio'
                pageLinkPrev='/'
            />
            <Spacing lg='40' md='40' />
            <Div className="container">
                <Div className="cs-portfolio_1_heading">
                    <SectionHeading
                        title='Recursos gratuitos'
                        subtitle='Recursos'
                    />
                </Div>
                <Spacing lg='80' md='80' />
                <Div className="row">
                    {portfolioData.slice(0, itemShow).map((item, index) => (
                        <Div
                            className={`col-lg-4 ${active === 'all' ? '' : !(active === item.category) ? 'd-none' : ''}`}
                            key={index}
                        >
                            <Portfolio
                                title={item.title}
                                subtitle={item.subtitle}
                                href={item.href}
                                src={item.src}
                                variant='cs-style2'
                            />
                            <Spacing lg='25' md='25' />
                        </Div>
                    ))}
                </Div>
            </Div>
            <Spacing lg='40' md='40' />
        </>
    )
}