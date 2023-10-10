import { create } from "zustand"

interface MobileUserInfoStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useMobileUserInfo = create<MobileUserInfoStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useMobileUserInfo;