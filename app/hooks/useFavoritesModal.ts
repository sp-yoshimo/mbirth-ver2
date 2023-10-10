import { create } from "zustand"

interface FavoritesModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useFavoritesModal = create<FavoritesModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useFavoritesModal;