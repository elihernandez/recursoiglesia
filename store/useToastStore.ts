import { create } from 'zustand'

interface ToastState {
    isShowToast: boolean
    toastMessage: string
    setToastMessage: (txt: string) => void
    handleShowToast: () => void
    handleCloseToast: () => void
}

const useToastStore = create<ToastState>()(
    (set) => ({
        isShowToast: false,
        toastMessage: null,
        setToastMessage: (element) => set((state) => ({ ...state, toastMessage: element })),
        handleShowToast: () => set((state) => ({ ...state, isShowToast: true })),
        handleCloseToast: () => set((state) => ({ ...state, isShowToast: false })),
    })
)

export default useToastStore