import { create } from "zustand"

interface QuestionDeleteModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useQuestionDeleteModal = create<QuestionDeleteModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useQuestionDeleteModal;