import { Album } from 'api/models/Album'
import { Artist } from 'api/models/Artist'
import { capitalizeFirstLetter } from 'helpers/strings'
import Link from 'next/link'
import Image from 'next/image'
import Div from '../Div'
import { paths } from 'api/helpers/constants'

interface Props {
    title: string
    artist: Artist
    data: Array<Album>
}

export default function AlbumPost({ title, artist, data }: Props) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
            <ul className="cs-recent_posts">
                {data?.map((album: Album) => (
                    <li key={album.name}>
                        <Div className="row align-items-center">
                            <Div className="col-3 col-md-2 col-lg-1">
                                <Image src={album.imgUrl} alt={album.name} width={100} height={100} style={{ position: 'relative' }} />
                            </Div>
                            <Div className="cs-recent_post_info col">
                                <h3 className="cs-recent_post_title">
                                    <Link href={`${paths.multitracks}/${artist.path}/${album.path}`} scroll={false}>{album.name}</Link>
                                </h3>
                                <Div className="cs-recent_post_date cs-primary_40_color">
                                    <Link href={`${paths.multitracks}/${artist.path}`} scroll={false}>{artist.name}</Link>
                                </Div>
                            </Div>
                        </Div>
                    </li>
                ))}
            </ul>
        </>
    )
}