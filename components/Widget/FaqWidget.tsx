import Div from 'components/Div'
import Accordion from 'components/Accordion'
import Spacing from 'components/Spacing'

export default function FagWidget() {
    return (
        <Div>
            <Spacing lg='80' md='40' />
            <h2 className="cs-faq_nav_title cs-m0" style={{ textAlign: 'center' }}>Preguntas frecuentes</h2>
            <Spacing lg='40' md='20' />
            <Div className="row justify-content-center">
                <Div className="col-lg-8">
                    <Accordion />
                </Div>
            </Div>
            <Spacing lg='40' md='20' />
        </Div>
    )
}