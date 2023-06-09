import Div from 'components/Div'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { useMediaQueries } from 'hooks/useMediaQueries'

type PostTypeProps = {
    posterLink: string
    posterSrc: string
    posterAlt: string
    title: JSX.Element
    subtitle: JSX.Element
}

// TODO: Agregar link a imagen de post

export const PostType2 = ({ posterLink, posterSrc, posterAlt, title, subtitle }: PostTypeProps) => {
    const { isMobile } = useMediaQueries()

    return (
        <Div>
            <Div style={{ padding: !isMobile ? 0 : '16px' }}>
                {/* <Link href={posterLink} scroll={false} target='_blank'> */}
                <Image
                    src={posterSrc}
                    alt={posterAlt}
                    width={100} height={100}
                    layout='responsive'
                    objectFit='cover'
                />
                {/* </Link> */}
                <h3 className='cs-recent_post_title' style={{ fontSize: '16px', marginTop: '8px' }}>
                    {title}
                </h3>
                <Div className="cs-recent_post_date cs-primary_40_color">
                    {subtitle}
                </Div>
            </Div>
        </Div>
    )
}
