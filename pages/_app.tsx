import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/scss/index.scss'
import Layout from './layout'
import ModalApp from 'components/Modal'
import ToastApp from 'components/Toast'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
    return <>
        <Layout>
            <Component {...pageProps} />
            <ModalApp />
            <ToastApp />
        </Layout>
    </>
}