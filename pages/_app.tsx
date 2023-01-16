import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import Layout from './layout'
import '../styles/scss/index.scss'

export default function App({ Component, pageProps }) {
    return <Layout>
        <Component {...pageProps} />
    </Layout>
}