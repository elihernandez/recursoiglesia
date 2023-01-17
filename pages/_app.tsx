import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import Layout from './layout'
import '../styles/scss/index.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url) => {
            window.gtag('config', process.env.GOOGLE_ANALYTICS, {
                page_path: url,
            })
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return <Layout>
        <Component {...pageProps} />
    </Layout>
}