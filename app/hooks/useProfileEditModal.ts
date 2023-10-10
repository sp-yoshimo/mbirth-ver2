import { create } from "zustand"

interface ProfileEditStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useProfileEdit = create<ProfileEditStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useProfileEdit;