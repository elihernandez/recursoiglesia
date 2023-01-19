import { Icon } from '@iconify/react'
// import './team.scss'
import Link from 'next/link'
import Div from '../Div'

export default function Team({ memberImage, memberName, memberDesignation, memberSocial }) {
    return (
        <Div className="cs-team cs-style1">
            <Div className="cs-member_thumb">
                <img src={memberImage} alt={memberName} />
                <Div className="cs-member_overlay" />
            </Div>
            <Div className="cs-member_info">
                <Div className="cs-member_designation">{memberDesignation}</Div>
            </Div>
        </Div>
    )
}
