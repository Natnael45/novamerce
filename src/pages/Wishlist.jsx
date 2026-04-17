import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useWishlistStore } from '../store/useWishlistStore'
import { useCartStore } from '../store/useCartStore'
import { useAuthStore } from '../store/useAuthStore'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'

export default function Wishlist() {
  const { user } = useAuthStore()
  const { items, toggleWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()

  if (!user || user.role !== 'customer') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-h-[60vh]">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-primary fill-primary" size={32} />
        <h1 className="text-3xl font-black text-gray-900">My Wishlist</h1>
        <span className="text-gray-500 font-medium ml-2">({items.length} items)</span>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Heart size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save items you love to find them easily later.</p>
          <Link to="/" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold transition-all inline-block shadow-md">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(product => (
            <div key={`wish-${product.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1 relative group flex flex-col">
              <button 
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 z-10 w-8 h-8 bg-white text-gray-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-sm"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
              
              <Link to={`/product/${product.id}`} className="aspect-square bg-gray-100 overflow-hidden block">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name}/>
              </Link>
              
              <div className="p-4 flex flex-col flex-1 text-left">
                <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-primary transition-colors mb-2">
                  {product.name}
                </Link>
                <div className="text-lg font-bold text-primary mb-4 mt-auto">
                  ${product.price.toFixed(2)}
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={16}/> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
