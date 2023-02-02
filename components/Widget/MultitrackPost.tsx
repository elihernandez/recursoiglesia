import { Multitrack } from 'api/models/Multitrack'
import { capitalizeFirstLetter } from 'helpers/strings'
import Link from 'next/link'
import Div from '../Div'
import { strToParam } from 'api/helpers/strings'
interface Props {
    title: string
    data: Array<Multitrack>
}

export default function MultitrackPost({ title, data }: Props) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
            <ul className="cs-recent_posts">
                {data?.map((item, index) => (
                    <li key={index}>
                        <Div className="row align-items-center">
                            <Div
                                className="cs-recent_post_thumb col-2 col-lg-2"
                                style={{ paddingRight: 0, paddingLeft: 0, marginTop: 0 }}
                            >
                                <Div className="cs-recent_post_thumb_in cs-bg" style={{ backgroundImage: `url(${item.album.imgUrl})` }} />
                            </Div>
                            <Div className="cs-recent_post_info col-7 col-lg-5">
                                <h3 className="cs-recent_post_title">
                                    {item.url != ''
                                        ? <Link href={item.url} scroll={false}>{item.name}</Link>
                                        : item.name
                                    }
                                </h3>
                                <Div className="cs-recent_post_date cs-primary_40_color">
                                    <Link href={`/secuencias/${strToParam(item.artist.name)}`} scroll={false}>{item.artist.name}</Link>
                                    &nbsp;-&nbsp;
                                    <Link href={`/secuencias/${strToParam(item.artist.name)}/${strToParam(item.album.name)}`} scroll={false}>{item.album.name}</Link>
                                </Div>
                            </Div>
                            <Div className="col-2 col-lg-4">
                                {item.url != ''
                                    ?
                                    <h6 className='pre'>Disponible</h6>
                                    :
                                    <button className='btn-primary'><span>Solicitar</span></button>
                                }
                            </Div>
                        </Div>
                    </li>
                ))}
            </ul>
        </>
    )
}

// export default function MultitrackPost({ title, data }: Props) {
//     return (
//         <>
//             <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
//             <ul className="cs-recent_posts">
//                 {data?.map((item, index) => (
//                     <li key={index}>
//                         <Div className="cs-recent_post">
//                             <Div className="cs-recent_post_thumb">
//                                 <Div className="cs-recent_post_thumb_in cs-bg" style={{ backgroundImage: `url(${item.album.imgUrl})` }} />
//                             </Div>
//                             <Div className="cs-recent_post_info">
//                                 <h3 className="cs-recent_post_title">
//                                     <Link href={item.url} scroll={false}>{item.name}</Link>
//                                 </h3>
//                                 <Div className="cs-recent_post_date cs-primary_40_color">
//                                     <Link href={`/secuencias/${strToParam(item.artist.name)}`} scroll={false}>{item.artist.name}</Link>
//                                     &nbsp;-&nbsp;
//                                     <Link href={`/secuencias/${strToParam(item.artist.name)}/${strToParam(item.album.name)}`} scroll={false}>{item.album.name}</Link>
//                                 </Div>
//                             </Div>
//                         </Div>
//                     </li>
//                 ))}
//             </ul>
//         </>
//     )
// }