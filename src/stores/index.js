import { create } from "zustand";

export const useStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}));
export const useOpen = create((set) => ({
    form: 0,
    onOpen: () => set(() => ({ form: true })),
    removeAllBears: () => set({ bears: 0 }),
}));
