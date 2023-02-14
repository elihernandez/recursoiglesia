import { strToParam } from 'api/helpers/strings'
import { Multitrack } from 'api/models/Multitrack'
import { MultitrackRequest } from 'api/models/MultitrackRequest'
import multitrackRequest from 'api/services/email/multitrackRequest'
import resourceDownload from 'api/services/email/resourceDownload'
import { capitalizeFirstLetter } from 'helpers/strings'
import Link from 'next/link'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Div from '../Div'
import { ResourceDownload } from 'api/models/ResourceDownload'
interface Props {
    title: string
    data: Array<Multitrack>
}

export default function MultitrackPost({ title, data }: Props) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [multitrack, setMultitrack] = useState<Multitrack>(null)

    const handleCloseMessage = () => setShowMessage(false)
    const handleShowMessage = () => setShowMessage(true)

    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = (item: Multitrack) => {
        setShowModal(true)
        setMultitrack(item)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data: MultitrackRequest = {
            email: email,
            songId: multitrack.songId,
            name: multitrack.name,
            isSent: false
        }

        try {
            const response = await multitrackRequest(data)
            setMessage(response.data)
            handleCloseModal()
            handleShowMessage()
        } catch (e) {
            setMessage(e.response.data)
        }
    }

    const handleClick = async (multitrack: Multitrack) => {
        const data: ResourceDownload = {
            resourceId: multitrack.songId,
            name: `${multitrack.name}-${multitrack.album.name}-${multitrack.artist.name}`
        }

        try {
            await resourceDownload(data)
        } catch (e) {

        }
    }

    return (
        <>
            <Div>
                <h4 className="cs-sidebar_widget_title">{capitalizeFirstLetter(title)}</h4>
                <ul className="cs-recent_posts">
                    {data?.map((item: Multitrack, index: number) => (
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
                                        {item?.shortener?.link
                                            ? <Link href={item.shortener.link} scroll={false} target='_blank' onClick={() => handleClick(item)}>{item.name}</Link>
                                            : `${item.name}`
                                        }
                                    </h3>
                                    <Div className="cs-recent_post_date cs-primary_40_color">
                                        <Link href={`/secuencias/${item.artist.url}`} scroll={false}>{item.artist.name}</Link>
                                        &nbsp;-&nbsp;
                                        <Link href={`/secuencias/${item.artist.url}/${item.album.url}`} scroll={false}>{item.album.name}</Link>
                                    </Div>
                                </Div>
                                <Div className="col-2 col-lg-4">
                                    {item?.shortener?.link
                                        ?
                                        <h6 className='pre'>Disponible</h6>
                                        :
                                        <button
                                            type="button"
                                            className='btn-primary'
                                            onClick={() => handleShowModal(item)}
                                        >
                                            <span>Solicitar</span>
                                        </button>
                                    }
                                </Div>
                            </Div>
                        </li>
                    ))}
                </ul>
                <Modal show={showModal} onHide={handleCloseModal} centered contentClassName="background-black">
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: 'white' }}>Solicitud de recurso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Div className="cs-newsletter_text" style={{ color: 'white', marginBottom: '16px' }}>Escribe tu correo electrónico, y te notificaremos cuando el recurso esté disponible en la plataforma.</Div>
                        <Div className="cs-newsletter cs-style1">
                            <form action="" className="cs-newsletter_form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ejemplo@gmail.com"
                                    className="cs-newsletter_input"
                                    required
                                />
                                <button type="submit" className="cs-newsletter_btn"><span>Envíar</span></button>
                            </form>
                        </Div>
                    </Modal.Body>
                </Modal>
            </Div>
            <ToastContainer className="p-3 position-fixed" position='top-end'>
                <Toast
                    onClose={handleCloseMessage}
                    show={showMessage}
                    delay={5000}
                    autohide
                    className="d-inline-block m-1"
                    bg='dark'
                >
                    <Toast.Header>
                        <img
                            src="/logo_small.jpg"
                            className="rounded me-2"
                            style={{ width: '7%' }}
                            alt="Logo small ri"
                        />
                        <strong className="me-auto">Recurso Iglesia</strong>
                        <small>ahora</small>
                    </Toast.Header>
                    <Toast.Body className='Dark text-white'>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
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