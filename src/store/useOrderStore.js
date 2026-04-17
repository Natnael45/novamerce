import { create } from 'zustand'

export const useOrderStore = create((set) => ({
  orders: [], // { id, customerId, items, total, status: 'pending_payment_approval' | 'approved' | 'rejected', receiptImage: string }
  placeOrder: (order) => set((state) => ({
    orders: [...state.orders, { ...order, id: Math.random().toString(36).substr(2, 9), status: 'pending_payment_approval' }]
  })),
  approveOrder: (orderId) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status: 'approved' } : o)
  })),
  rejectOrder: (orderId) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status: 'rejected' } : o)
  })),
}))
