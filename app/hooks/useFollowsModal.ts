import { create } from "zustand"

interface FollowsModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useFollowsModal = create<FollowsModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useFollowsModal;