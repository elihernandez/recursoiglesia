import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/scss/index.scss'
import Layout from './layout'
import ModalApp from 'components/Modal'
import ToastApp from 'components/Toast'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
    return <>
        <Script
            strategy="afterInteractive"
            data-website-id="24e28ce5-ee59-4637-91a8-8a910c18309"
            src="https://analytics.recursoiglesia.com/umami.js" />
        <Layout>
            <Component {...pageProps} />
            <ModalApp />
            <ToastApp />
        </Layout>
    </>
}