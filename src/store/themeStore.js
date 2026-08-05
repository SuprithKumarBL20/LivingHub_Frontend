import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('livinghub-theme') || 'dark', // Dark Mode First
  setTheme: (theme) => {
    localStorage.setItem('livinghub-theme', theme);
    set({ theme });
  },
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('livinghub-theme', nextTheme);
    return { theme: nextTheme };
  })
}));
