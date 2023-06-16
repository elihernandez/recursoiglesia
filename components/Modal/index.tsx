import useModalStore from 'store/useModalStore'
import Modal from 'react-bootstrap/Modal'

export const ModalApp = () => {
    const isShowModal = useModalStore((state) => state.isShowModal)
    const handleCloseModal = useModalStore((state) => state.handleCloseModal)
    const modalBody = useModalStore((state) => state.modalBody)

    return (
        <Modal show={isShowModal} onHide={handleCloseModal} centered contentClassName="background-black">
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title style={{ color: 'white' }}>Solicitud de recurso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalBody}
            </Modal.Body>
        </Modal>
    )
}

export default ModalApp