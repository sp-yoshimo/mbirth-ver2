import { create } from "zustand"

interface QuestionEditModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useQuestionEditModal = create<QuestionEditModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useQuestionEditModal;