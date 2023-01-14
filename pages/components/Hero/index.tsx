//import './hero.scss'
import Button from '../Button'
import Div from '../Div'

export default function Hero({ title, subtitle, btnText, btnLink, scrollDownId, socialLinksHeading, heroSocialLinks }) {
    return (
        <Div className="cs-hero cs-style1 cs-bg cs-fixed_bg cs-shape_wrap_1" style={{ backgroundImage: 'url(./images/hero_bg.jpeg)' }}>
            <Div className="cs-shape_1" />
            <Div className="cs-shape_1" />
            <Div className="cs-shape_1" />
            <Div className="container">
                <Div className="cs-hero_text">
                    <h1 className="cs-hero_title">{title}</h1>
                    <Div className="cs-hero_info">
                        <Div>
                            <Button btnLink={btnLink} btnText={btnText} variant={''} />
                        </Div>
                        <Div>
                            <Div className="cs-hero_subtitle">{subtitle}</Div>
                        </Div>
                    </Div>
                </Div>
            </Div>
            <Div className="cs-hero_social_wrap cs-primary_font cs-primary_color">
                {socialLinksHeading && (<Div className="cs-hero_social_title">{socialLinksHeading}</Div>)}
                {heroSocialLinks && (
                    <ul className="cs-hero_social_links">
                        {heroSocialLinks.map((item, index) => (<li key={index}><a href={item.links} target="_blank" rel="noreferrer">{item.name}</a></li>))}
                    </ul>
                )}
            </Div>
            {/* <a href={scrollDownId} className="cs-down_btn">.</a> */}
        </Div>
    )
}
