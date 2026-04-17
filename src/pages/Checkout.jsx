import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useOrderStore } from '../store/useOrderStore'
import { useAuthStore } from '../store/useAuthStore'
import { UploadCloud, CheckCircle } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const { placeOrder } = useOrderStore()
  const { user, login } = useAuthStore()

  const [receiptImage, setReceiptImage] = useState(null)
  const [success, setSuccess] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  // Redirect to home if empty cart
  if (items.length === 0 && !success) {
    navigate('/')
    return null
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Mock upload using local object url (ephemeral)
      const url = URL.createObjectURL(file)
      setReceiptImage(url)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!receiptImage) return alert('Please upload your payment receipt.')
    
    // Automatically login as customer if not logged in
    let currentCustomer = user
    if (!user || user.role !== 'customer') {
       currentCustomer = { id: 'cust_123', name: 'Demo Customer', role: 'customer' }
       login(currentCustomer)
    }

    placeOrder({
      customerId: currentCustomer.id,
      items: [...items],
      total: subtotal,
      receiptImage
    })

    clearCart()
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-sm text-center">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">Your payment receipt has been uploaded and is sent for Admin Approval. You will receive an update shortly.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-primary text-white w-full py-4 rounded-xl font-bold hover:shadow-lg transition-all"
        >
          Return to Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.quantity}x {item.product.name}</span>
                <span className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center text-lg font-bold">
            <span>Total to Pay:</span>
            <span className="text-primary">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 text-left">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Details</h2>
            <p className="text-gray-500 text-sm mb-6">Transfer the total amount to the designated platform account and upload the receipt here.</p>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6 border border-blue-100">
              <span className="font-bold">Bank Name:</span> MockBank API<br/>
              <span className="font-bold">Account Number:</span> 1234-5678-9012<br/>
              <span className="font-bold">Receiver:</span> NovaMerce Escrow
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-primary transition-colors bg-gray-50 relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                required
              />
              <div className="flex flex-col items-center justify-center text-center pointer-events-none">
                {receiptImage ? (
                  <div className="w-full max-w-[200px] mb-4">
                    <img src={receiptImage} alt="Receipt preview" className="rounded-lg shadow-sm w-full object-contain" />
                  </div>
                ) : (
                  <UploadCloud size={48} className="text-gray-400 mb-4" />
                )}
                <span className="text-primary font-semibold mb-1">{receiptImage ? 'Choose a different image' : 'Click to upload receipt'}</span>
                <span className="text-gray-400 text-xs text-center">PNG, JPG, JPEG up to 5MB</span>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex justify-center items-center gap-2"
          >
            Submit Order <CheckCircle size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
