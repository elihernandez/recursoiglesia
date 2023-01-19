import Link from 'next/link'
import Div from '../Div'
import { capitalizeFirstLetter } from 'helpers/strings'
import { Template } from 'api/models/Template'
import Team from 'components/Team'
import Spacing from 'components/Spacing'

interface Props {
    title: string
    data: Array<Template>
}

export default function TemplatePost({ title, data }: Props) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
            <Div className='row'>
                {data?.map((item, index) => (
                    <Div key={index} className='col-lg-3 col-sm-6'>
                        <Link target="_blank" href={item.url}>
                            <Team
                                memberImage={item.imgUrl}
                                memberName=""
                                memberDesignation={item.name}
                                memberSocial=""
                            />
                        </Link>
                        <Spacing lg='80' md='30' />
                    </Div>
                ))}
            </Div>
            {/* <ul className="cs-recent_posts">
                {data?.map((item, index) => (
                    <li key={index}>
                        <Div className="cs-recent_post">
                            <Div className="cs-recent_post_thumb">
                                <Div className="cs-recent_post_thumb_in cs-bg" style={{ backgroundImage: `url(${item.imgUrl})` }} />
                            </Div>
                            <Div className="cs-recent_post_info">
                                <h3 className="cs-recent_post_title">
                                    <Link href={item.url} scroll={false} target="_blank">{item.name}</Link>
                                </h3>
                                <Div className="cs-recent_post_date cs-primary_40_color">{item.name}</Div>
                            </Div>
                        </Div>
                    </li>
                ))}
            </ul> */}
        </>
    )
}