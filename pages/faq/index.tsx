import Div from 'components/Div'
import PageHeading from 'components/PageHeading'
import FagWidget from 'components/Widget/FaqWidget'
import Head from 'next/head'

export default function FAQPage(props) {
    return (
        <>
            <Head>
                <title>Preguntas frecuentes</title>
                <meta name="description" content="Preguntas frecuentes sobre la plataforma" />
            </Head>
            <PageHeading
                title='Preguntas frecuentes'
                bgSrc='images/portfolio_hero_bg.jpeg'
                pageLinkPrev='/faq'
                pageTextPrev='Inicio'
                pageLinkText='Preguntas frecuentes'
            />
            <Div className="container" id="container">
                <FagWidget />
            </Div>
        </>
    )
}