import React from 'react'
import Link from 'next/link'
import Div from '../Div'
import { capitalizeFirstLetter } from 'pages/helpers/strings'
import { Multitrack } from 'api/models/Multitrack'

interface Props {
    title: string
    data: Array<Multitrack>
}

export default function RecentPost({ title, data }:Props) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
            <ul className="cs-recent_posts">
                {data?.map((item, index) => (
                    <li key={index}>
                        <Div className="cs-recent_post">
                            <Div className="cs-recent_post_thumb">
                                <Div className="cs-recent_post_thumb_in cs-bg" style={{ backgroundImage: `url(${item.album.imgUrl})` }} />
                            </Div>
                            <Div className="cs-recent_post_info">
                                <h3 className="cs-recent_post_title">
                                    <Link href={item.url} scroll={false} target="_blank">{item.name}</Link>
                                </h3>
                                <Div className="cs-recent_post_date cs-primary_40_color">{item.artist.name}</Div>
                            </Div>
                        </Div>
                    </li>
                ))}
            </ul>
        </>
    )
}