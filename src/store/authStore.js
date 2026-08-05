import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('livinghub-token') || sessionStorage.getItem('livinghub-token') || null,
  user: (() => {
    try {
      const stored = localStorage.getItem('livinghub-user') || sessionStorage.getItem('livinghub-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: !!(localStorage.getItem('livinghub-token') || sessionStorage.getItem('livinghub-token')),
  
  login: (token, user, remember = false) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('livinghub-token', token);
    storage.setItem('livinghub-user', JSON.stringify(user));
    storage.setItem('livinghub-remember', remember.toString());
    
    set({ token, user, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('livinghub-token');
    localStorage.removeItem('livinghub-user');
    localStorage.removeItem('livinghub-remember');
    localStorage.removeItem('livinghub-refresh');
    sessionStorage.removeItem('livinghub-token');
    sessionStorage.removeItem('livinghub-user');
    sessionStorage.removeItem('livinghub-remember');
    sessionStorage.removeItem('livinghub-refresh');
    
    set({ token: null, user: null, isAuthenticated: false });
  },

  updateUser: (user) => set((state) => {
    const remember = localStorage.getItem('livinghub-remember') === 'true';
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('livinghub-user', JSON.stringify(user));
    return { user };
  })
}));
