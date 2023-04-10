import Div from 'components/Div'
import Footer from 'components/Footer'
import Hero from 'components/Hero'

export const Maintenance = () => {
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
            <Hero
                title='Web en mantenimiento'
                subtitle='Estamos mejorando tu experiencia, volveremos en breve, síguenos en nuestras redes sociales para obtener más información.'
                btnText=''
                btnLink='/recursos'
                scrollDownId='#service'
                socialLinksHeading='Síguenos en'
                heroSocialLinks={heroSocialLinks}
            />
            <Footer />
        </>
    )

}