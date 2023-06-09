import { ResourceType } from 'api/models/ResourceType'
import { Template } from 'api/models/Template'
import downloadService from 'api/services/download'
import Spacing from 'components/Spacing'
import { capitalizeFirstLetter } from 'helpers/strings'
import Image from 'next/legacy/image'
import Link from 'next/link'
import Div from '../Div'

interface Props {
    title: string
    data: Array<Template>
}

export default function TemplatePost({ title, data }: Props) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
            <Div className='row'>
                {data?.map((template: Template, index: number) => (
                    <Div key={template.id} className='col-lg-3 col-sm-6'>
                        <Link target="_blank" href={template.link} onClick={() => downloadService(template.id, ResourceType.TEMPLATE)}>
                            <Div className="cs-team cs-style1">
                                <Div className="cs-member_thumb">
                                    <Image src={template.imgUrl} alt={template.name} layout='responsive' objectFit='cover' width={100} height={120} />
                                    <Div className="cs-member_overlay" />
                                </Div>
                                <Div className="cs-member_info">
                                    <Div className="cs-member_designation">{template.name}</Div>
                                </Div>
                            </Div>
                        </Link>
                        <Spacing lg='30' md='30' />
                    </Div>
                ))}
            </Div>
        </>
    )
}