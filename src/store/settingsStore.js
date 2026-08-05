import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
  language: localStorage.getItem('livinghub-lang') || 'en',
  setLanguage: (language) => {
    localStorage.setItem('livinghub-lang', language);
    set({ language });
  }
}));
