import { create } from 'zustand';

export const useAiStore = create((set) => ({
  isOpen: false,
  messages: [
    {
      id: 'm-init',
      sender: 'bot',
      text: 'Hello! I am your LivingHub AI Assistant. Ask me anything about your utility bills, plumbing maintenance tickets, or visitor QR passes.',
      timestamp: new Date().toISOString()
    }
  ],
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (isOpen) => set({ isOpen }),
  addMessage: (text, sender) => set((state) => {
    const newMessage = {
      id: `m-${Math.random().toString(36).substr(2, 9)}`,
      sender,
      text,
      timestamp: new Date().toISOString()
    };
    return { messages: [...state.messages, newMessage] };
  }),
  clearHistory: () => set({
    messages: [
      {
        id: 'm-init',
        sender: 'bot',
        text: 'Hello! I am your LivingHub AI Assistant. Ask me anything about your utility bills, plumbing maintenance tickets, or visitor QR passes.',
        timestamp: new Date().toISOString()
      }
    ]
  })
}));
