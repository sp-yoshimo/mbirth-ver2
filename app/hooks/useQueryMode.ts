import { create } from "zustand";

interface queryModeStore {
    mode: "new" | "popular" | "old" | "follows",
    onNew: () => void;
    onPopular: () => void;
    onOld: () => void;
    onFollows: () => void;
}

const useQueryMode = create<queryModeStore>((set) => ({
    mode: "new",
    onNew: () => set({ mode: "new" }),
    onPopular: () => set({ mode: "popular" }),
    onOld: () => set({ mode: "old" }),
    onFollows: () => set({ mode: "follows" }),
}));


export default useQueryMode;