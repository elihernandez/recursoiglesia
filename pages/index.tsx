import Head from 'next/head'
import Hero from 'components/Hero'

export default function Home(props) {
    const heroSocialLinks = [
        {
            name: 'Facebook',
            links: 'https://www.facebook.com/recursoiglesia'
        },
        {
            name: 'Instagram',
            links: 'https://www.instagram.com/recursoiglesia'
        }
    ]

    return (
        <>
            <Head>
                <title>Recursos para tu iglesia</title>
                <meta name="description" content="Aquí encontrarás recursos para tu ministerio, como secuencias, software, plantillas de diseño, fuentes, libros y más, navega y encuentra el contenido que necesitas." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <main>
                <Hero
                    title='Recursos para tu iglesia'
                    subtitle='Aquí encontrarás recursos como secuencias, software, plantillas de diseño y más, navega y encuentra el contenido que necesitas.'
                    btnText='Ver recursos'
                    btnLink='/recursos'
                    scrollDownId='#service'
                    socialLinksHeading='Síguenos en'
                    heroSocialLinks={heroSocialLinks}
                />
            </main>
        </>
    )
}
