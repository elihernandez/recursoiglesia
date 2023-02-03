import { strToParam } from 'api/helpers/strings'
import { Album } from 'api/models/Album'
import { capitalizeFirstLetter } from 'helpers/strings'
import Link from 'next/link'
import Div from '../Div'
import { Artist } from 'api/models/Artist'

interface Props {
    title: string,
    artist: Artist,
    data: Array<Album>
}

export default function AlbumPost({ title, artist, data }: Props) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
            <ul className="cs-recent_posts">
                {data?.map((item, index) => (
                    <li key={index}>
                        <Div className="cs-recent_post">
                            <Div className="cs-recent_post_thumb">
                                <Div className="cs-recent_post_thumb_in cs-bg" style={{ backgroundImage: `url(${item.imgUrl})` }} />
                            </Div>
                            <Div className="cs-recent_post_info">
                                <h3 className="cs-recent_post_title">
                                    <Link href={`/secuencias/${strToParam(artist.name)}/${strToParam(item.name)}`} scroll={false}>{item.name}</Link>
                                </h3>
                                <Div className="cs-recent_post_date cs-primary_40_color">
                                    <Link href={`/secuencias/${strToParam(artist.name)}`} scroll={false}>{artist.name}</Link>
                                </Div>
                            </Div>
                        </Div>
                    </li>
                ))}
            </ul>
        </>
    )
}