import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import '../styles/scss/index.scss'
import Layout from './layout'

export default function App({ Component, pageProps }) {
    return <Layout>
        <Component {...pageProps} />
    </Layout>
}