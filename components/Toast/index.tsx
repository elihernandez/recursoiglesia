import Image from 'next/image'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import useToastStore from 'store/useToastStore'

export const ToastApp = () => {
    const handleCloseToast = useToastStore(state => state.handleCloseToast)
    const isShowToast = useToastStore(state => state.isShowToast)
    const toastMessage = useToastStore(state => state.toastMessage)

    return (
        <ToastContainer className="p-3 position-fixed" position='top-end'>
            <Toast
                onClose={handleCloseToast}
                show={isShowToast}
                delay={5000}
                autohide
                className="d-inline-block m-1"
                bg='dark'
            >
                <Toast.Header>
                    <Image
                        src="/logo_small.jpg"
                        className="rounded me-2"
                        style={{ width: '7%' }}
                        width={100}
                        height={100}
                        alt="Logo small ri"
                    />
                    <strong className="me-auto">Recurso Iglesia</strong>
                    <small>ahora</small>
                </Toast.Header>
                <Toast.Body className='Dark text-white'>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastApp