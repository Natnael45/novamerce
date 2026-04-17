import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { Trash2, ArrowRight } from 'lucide-react'

export default function Cart() {
  const { items, removeFromCart, updateQuantity } = useCartStore()
  const navigate = useNavigate()

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold inline-block hover:shadow-lg transition-all">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full text-left">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{item.product.name}</h3>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="text-sm text-gray-500 capitalize mb-2">{item.product.category}</div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="font-bold text-primary text-lg">${item.product.price.toFixed(2)}</div>
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 transition-colors bg-white font-medium">-</button>
                    <div className="px-3 py-1 text-sm font-semibold bg-gray-50 border-x border-gray-200 min-w-[2.5rem] text-center">{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 transition-colors bg-white font-medium">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[380px]">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
