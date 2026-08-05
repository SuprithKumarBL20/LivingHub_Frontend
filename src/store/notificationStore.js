import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [
    {
      id: 'n-default-1',
      title: 'Welcome to LivingHub!',
      description: 'Explore your new smart community resident dashboard. Log complaints, check bills, or invite visitors.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: 'INFO'
    }
  ],
  unreadCount: 1,
  
  addNotification: (notif) => set((state) => {
    const newNotif = {
      id: notif.id || `n-${Math.random().toString(36).substr(2, 9)}`,
      title: notif.title || 'System Notification',
      description: notif.description || notif.message || '',
      timestamp: notif.timestamp || new Date().toISOString(),
      read: false,
      type: notif.type || 'INFO'
    };
    return {
      notifications: [newNotif, ...state.notifications],
      unreadCount: state.unreadCount + 1
    };
  }),

  markAsRead: (id) => set((state) => {
    const nextList = state.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    const unread = nextList.filter(n => !n.read).length;
    return {
      notifications: nextList,
      unreadCount: unread
    };
  }),

  markAllAsRead: () => set((state) => {
    return {
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    };
  }),

  deleteNotification: (id) => set((state) => {
    const nextList = state.notifications.filter(n => n.id !== id);
    const unread = nextList.filter(n => !n.read).length;
    return {
      notifications: nextList,
      unreadCount: unread
    };
  }),

  clearAll: () => set({ notifications: [], unreadCount: 0 })
}));
