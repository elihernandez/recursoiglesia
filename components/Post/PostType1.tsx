import Div from 'components/Div'
import Image from 'next/legacy/image'

export const PostType1 = ({ posterSrc, posterAlt, title, subtitle, buttonAction }) => {
    return (
        <li>
            <Div className="row align-items-center">
                <Div className="col-3 col-md-2">
                    <Image
                        src={posterSrc}
                        alt={posterAlt}
                        width={100} height={100}
                        layout='responsive'
                        objectFit='cover'
                        style={{ position: 'relative', width: '100%', objectFit: 'cover' }}
                    />
                </Div>
                <Div className="cs-recent_post_info col-5 col-md-8">
                    <Div className="row">
                        <h3 className="cs-recent_post_title">
                            {title}
                        </h3>
                        <Div className="cs-recent_post_date cs-primary_40_color">
                            {subtitle}
                        </Div>
                    </Div>
                </Div>
                <Div className="col-4 col-md-2">
                    {buttonAction}
                </Div>
            </Div>
        </li>
    )
}

export default PostType1