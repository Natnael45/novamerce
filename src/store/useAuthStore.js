import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null, // { id, name, role: 'customer' | 'vendor' | 'admin' }
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}))
