import 'bootstrap/dist/css/bootstrap.min.css'
import ModalApp from 'components/Modal'
import ToastApp from 'components/Toast'
import '../styles/scss/index.scss'
import Layout from './layout'

export default function App({ Component, pageProps }) {
    return <>
        <Layout>
            <Component {...pageProps} />
            <ModalApp />
            <ToastApp />
        </Layout>
    </>
}