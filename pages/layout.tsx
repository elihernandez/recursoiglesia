import Header from 'components/Header'
import Footer from 'components/Footer'
import { Maintenance } from 'components/Maintenance'
import { isMaintenance } from 'api/helpers/constants'

export default function Layout({ children }) {
    return (
        <>
            {!isMaintenance && <Header />}
            <main>
                {isMaintenance
                    ? <Maintenance />
                    : children
                }
            </main>
            {!isMaintenance && <Footer />}
        </>
    )
}