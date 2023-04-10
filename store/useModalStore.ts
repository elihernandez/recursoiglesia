import { create } from 'zustand'

interface ModalState {
    isShowModal: boolean
    modalBody: JSX.Element | null
    setModalBody: (element: JSX.Element) => void
    handleShowModal: () => void
    handleCloseModal: () => void
}

const useModalStore = create<ModalState>()(
    (set) => ({
        isShowModal: false,
        modalBody: null,
        setModalBody: (element) => set((state) => ({ ...state, modalBody: element })),
        handleShowModal: () => set((state) => ({ ...state, isShowModal: true })),
        handleCloseModal: () => set((state) => ({ ...state, isShowModal: false })),
    })
)

export default useModalStore