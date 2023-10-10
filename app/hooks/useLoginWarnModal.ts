import { create } from "zustand"

interface LoginWarnStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginWarnModal = create<LoginWarnStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useLoginWarnModal;