import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'
import { useCartStore } from '../store/useCartStore'
import { ShoppingCart, ShieldCheck, Truck } from 'lucide-react'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProductStore()
  const { addToCart } = useCartStore()

  const product = products.find(p => p.id === id)

  if (!product) {
    return <div className="text-center py-20 text-xl font-medium text-gray-500">Product not found.</div>
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleBuyNow = () => {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">
          <span className="text-primary font-semibold tracking-wider text-sm mb-2 uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4 text-sm">
             <span className="font-medium text-gray-500">Sold by:</span>
             <span className="font-bold text-primary underline cursor-pointer hover:text-secondary">{product.vendorName || product.vendorId}</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-primary/10">
            <div className="text-sm text-gray-500 mb-1">Price</div>
            <div className="text-4xl font-black text-primary">${product.price.toFixed(2)}</div>
          </div>
          
          <div className="flex flex-col gap-3 py-6 border-y border-gray-100 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="text-green-500" size={20} />
              <span>75-Day Buyer Protection</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="text-blue-500" size={20} />
              <span>Free Shipping via Standard Delivery</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-auto flex gap-4">
            <button onClick={handleAddToCart} className="flex-1 border-2 border-primary text-primary hover:bg-primary/5 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-colors">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-full font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
