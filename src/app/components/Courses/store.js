import { create } from 'zustand';

// Manages the state for hovered, selected, and sound status
export const useCertificateStore = create((set) => ({
  hovered: null,
  selected: null,
  setHovered: (id) => set({ hovered: id }),
  setSelected: (id) => set({ selected: id }),
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
}));