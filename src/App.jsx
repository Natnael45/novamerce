import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useAuthStore } from './store/useAuthStore'

// Pages
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import VendorDashboard from './pages/VendorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AuthPage from './pages/AuthPage'
import UserProfile from './pages/UserProfile'
import Wishlist from './pages/Wishlist'
import CategoryView from './pages/CategoryView'

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Role-based redirector
function RouteManager() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Initial routing decision if user logs in from portal
  useEffect(() => {
    if (pathname === '/') {
      if (user?.role === 'admin') navigate('/admin')
      else if (user?.role === 'vendor') navigate('/vendor')
    }
  }, [user, navigate, pathname])

  if (!user) {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-gray-900 font-sans selection:bg-primary/20 selection:text-primary">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category/:categoryName" element={<CategoryView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <RouteManager />
    </BrowserRouter>
  )
}

export default App
