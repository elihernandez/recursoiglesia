import { Multitrack } from 'api/models/Multitrack'
import downloadService from 'api/services/download'
import MultitrackRequestForm from 'components/Form/ResourceRequestForm'
import PostType1 from 'components/Post/PostType1'
import Link from 'next/link'
import useModalStore from 'store/useModalStore'
import Div from '../Div'
import { ResourceType } from 'api/models/ResourceType'
interface Props {
    title: string
    data: Array<Multitrack>
}

export default function MultitracksList({ title, data }: Props) {
    const handleShowModal = useModalStore((state) => state.handleShowModal)
    const setModalBody = useModalStore((state) => state.setModalBody)

    return (
        <Div>
            <h4 className="cs-sidebar_widget_title">{title}</h4>
            <ul className="cs-recent_posts">
                {data?.map((item: Multitrack) => (
                    <PostType1
                        key={item.id}
                        posterSrc={item.album.imgUrl}
                        posterAlt={item.album.name}
                        title={item?.link
                            ? <Link
                                target='_blank'
                                scroll={false}
                                href={item.link}
                                onClick={() => downloadService(item.multitrackId, ResourceType.MULTITRACK)}>
                                {item.name}
                            </Link>
                            : `${item.name}`
                        }
                        subtitle={<Div>
                            <Link href={`/secuencias/${item.artist.path}`} scroll={false}>{item.artist.name}</Link>
                            &nbsp;-&nbsp;
                            <Link href={`/secuencias/${item.artist.path}/${item.album.path}`} scroll={false}>{item.album.name}</Link>
                        </Div>}
                        buttonAction={
                            <Div style={{ display: 'flex', justifyContent: 'end' }}>
                                {item?.link
                                    ? <h6 className='pre'>Disponible</h6>
                                    : <button
                                        type="button"
                                        className='btn-primary'
                                        onClick={() => {
                                            setModalBody(<MultitrackRequestForm multitrack={item} />)
                                            handleShowModal()
                                        }}
                                    >
                                        <span>Solicitar</span>
                                    </button>
                                }
                            </Div>
                        }
                    />
                ))}
            </ul>
        </Div>
    )
}