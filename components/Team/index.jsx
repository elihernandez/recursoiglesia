import Div from '../Div'
import Image from 'next/legacy/image'

export default function Team({ memberImage, memberName, memberDesignation, memberSocial }) {
    return (
        <Div className="cs-team cs-style1">
            <Div className="cs-member_thumb">
                <Image src={memberImage} alt={memberName} layout='responsive' width={100} height={60} />
                <Div className="cs-member_overlay" />
            </Div>
            <Div className="cs-member_info">
                <Div className="cs-member_designation">{memberDesignation}</Div>
            </Div>
        </Div>
    )
}
