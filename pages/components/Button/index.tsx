import { Icon } from '@iconify/react'
import Link from 'next/link'

interface Props {
    btnLink: string
    btnText: string
    variant?: string
}

export default function Button({ btnLink, btnText, variant = '' }: Props) {
    return (
        <Link href={btnLink} className={variant ? `cs-text_btn ${variant}` : 'cs-text_btn'}>
            <>
                <span>{btnText}</span>
                <Icon icon="bi:arrow-right" />
            </>
        </Link>
    )
}
