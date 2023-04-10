import { ResourceType } from 'api/models/ResourceType'
import { Software } from 'api/models/Software'
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

export default function SoftwarePost({ title, data }: Props) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
            <Div className='row'>
                {data?.map((software: Software) => (
                    <Div key={software.id} className='col-lg-3 col-sm-6'>
                        <Link target="_blank" href={software.url} onClick={() => downloadService(software.id, ResourceType.SOFTWARE)}>
                            <Div className="cs-team cs-style1">
                                <Div className="cs-member_thumb">
                                    <Image src={software.imgUrl} alt={software.name} layout='responsive' objectFit='cover' width={100} height={60} />
                                    <Div className="cs-member_overlay" />
                                </Div>
                                <Div className="cs-member_info">
                                    <Div className="cs-member_designation">{software.name}</Div>
                                </Div>
                            </Div>
                        </Link>
                        <Spacing lg='80' md='30' />
                    </Div>
                ))}
            </Div>
        </>
    )
}