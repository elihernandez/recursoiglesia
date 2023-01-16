import Link from 'next/link'
import { Icon } from '@iconify/react'
import Div from '../Div'

export default function SocialWidget() {
    return (
        <Div className="cs-social_btns cs-style1">
            <Link href='https://www.facebook.com/recursoiglesia' target="_blank" className="cs-center">
                <Icon icon="fa6-brands:facebook" />
            </Link>
            <Link href='https://www.instagram.com/recursoiglesia' target="_blank" className="cs-center">
                <Icon icon="fa6-brands:instagram" />
            </Link>
            {/* <Link href='/' className="cs-center">
                <Icon icon="fa6-brands:youtube" />
            </Link> */}
        </Div>
    )
}
