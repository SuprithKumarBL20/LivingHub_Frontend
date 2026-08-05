import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isOpen: true,
  isMobileOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSidebar: (isOpen) => set({ isOpen }),
  toggleMobileSidebar: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setMobileSidebar: (isMobileOpen) => set({ isMobileOpen })
}));
