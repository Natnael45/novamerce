import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, User, Store, Shield, LogOut, Menu, Search } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'

export default function Navbar() {
  const { user, login, logout } = useAuthStore()
  const { items } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    // It will auto redirect because App component RouteManager reacts to auth changes
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/category/All?q=${e.target.value}`)
    }
  }

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const wishCount = wishlistItems.length

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-black text-primary tracking-tight hidden sm:block">NovaMerce<span className="text-secondary">.</span></span>
              <span className="text-3xl font-black text-primary tracking-tight sm:hidden">NM<span className="text-secondary">.</span></span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl mx-4 sm:mx-8">
              <div className="relative border-2 border-primary rounded-full flex items-center overflow-hidden">
                <input 
                  type="text" 
                  placeholder="Macbook, Jeans, Drone..." 
                  onKeyDown={handleSearch}
                  className="w-full bg-white py-2.5 px-6 outline-none text-gray-700"
                />
                <button className="bg-primary text-white p-3 hover:bg-primary-hover transition-colors px-6 font-bold flex gap-2 items-center">
                  <Search size={18} className="hidden sm:block"/>
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 sm:gap-6">
              {user && user.role === 'customer' && (
                <>
                  <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors cursor-pointer group">
                    <User size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-[10px] font-semibold mt-1 hidden lg:block">Profile</span>
                  </Link>

                  <Link to="/wishlist" className="relative flex flex-col items-center text-gray-600 hover:text-primary transition-colors cursor-pointer group">
                    <div className="relative">
                      <Heart size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                      {wishCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-secondary text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                          {wishCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold mt-1 hidden lg:block">Wishlist</span>
                  </Link>
                </>
              )}

              {user && user.role === 'admin' && (
                <Link to="/admin" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors group">
                  <Shield size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1 hidden lg:block">Admin</span>
                </Link>
              )}

              {user && user.role === 'vendor' && (
                <Link to="/vendor" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors group">
                  <Store size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1 hidden lg:block">Dashboard</span>
                </Link>
              )}

              <Link to="/cart" className="relative flex flex-col items-center text-gray-600 hover:text-primary transition-colors group">
                <div className="relative">
                  <ShoppingCart size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold mt-1 hidden lg:block">Cart</span>
              </Link>
              
              <button onClick={handleLogout} className="flex flex-col items-center text-gray-400 hover:text-red-500 transition-colors group ml-2 border-l border-gray-200 pl-4 sm:pl-6">
                <LogOut size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-[10px] font-semibold mt-1 hidden lg:block">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sub Navigation / Categories Bar */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-6 whitespace-nowrap py-2 text-sm font-medium text-gray-600">
            <li className="flex items-center gap-1 text-gray-900 font-bold hover:text-primary cursor-pointer">
              <Menu size={16} /> Categories
            </li>
            <li><Link to="/category/All" className="hover:text-primary transition-colors">Everything</Link></li>
            <li><span className="text-secondary font-bold">Flash Deals 🔥</span></li>
            <li><Link to="/category/Laptops & PCs" className="hover:text-primary transition-colors">Laptops & PCs</Link></li>
            <li><Link to="/category/Smartphones" className="hover:text-primary transition-colors">Smartphones</Link></li>
            <li><Link to="/category/Audio" className="hover:text-primary transition-colors">Audio</Link></li>
            <li><Link to="/category/Cameras & Drones" className="hover:text-primary transition-colors">Cameras</Link></li>
            <li><Link to="/category/Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            <li><span className="text-primary font-bold">New Arrivals</span></li>
          </ul>
        </div>
      </div>
    </>
  )
}
