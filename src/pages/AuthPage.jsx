import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, Lock, User, Store, Shield, ArrowRight } from 'lucide-react'

export default function AuthPage() {
  const { login } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  
  // Form States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [roleSelection, setRoleSelection] = useState('customer') // 'customer' or 'vendor'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isLogin) {
      // Mock Sign In Logic: Infer role from email for demonstration
      let assignedRole = 'customer'
      let assignedName = email.split('@')[0]
      let assignedId = 'cust_' + Math.random().toString().slice(2, 8)

      if (email === 'admin@novamerce.com' && password === 'password123') {
        assignedRole = 'admin'
        assignedName = 'System Admin'
        assignedId = 'admin_1'
      } else if (email === 'vendor@novamerce.com' && password === 'password123') {
        assignedRole = 'vendor'
        assignedName = 'NovaTech Vendor'
        assignedId = 'vendor1'
      } else if (email === 'customer@novamerce.com' && password === 'password123') {
        assignedRole = 'customer'
        assignedName = 'Demo Customer'
        assignedId = 'cust_demo'
      } else {
        return alert('Invalid email or password. Please use the provided demo accounts or create a new account!')
      }

      login({ id: assignedId, name: assignedName, role: assignedRole })

    } else {
      // Mock Sign Up Logic
      const newId = name.replace(/\s+/g, '').toLowerCase() || 'user_' + Math.random().toString().slice(2, 8)
      login({ id: newId, name: name || 'New User', role: roleSelection })
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Visual Presentation */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 text-white relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-gray-900 z-0"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">NovaMerce<span className="text-secondary">.</span></h1>
          <p className="text-gray-400 font-medium">The future of global electronics commerce.</p>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-5xl font-black leading-tight mb-6">Discover the ultimate gear<br/>for your setup.</h2>
          <p className="text-lg text-gray-300 font-medium leading-relaxed">Join millions of customers and vendors connecting globally over high-end consumer technology.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
            <p className="text-gray-500 font-medium">
              {isLogin ? 'Enter your details to access your account.' : 'Join NovaMerce today to start shopping or selling.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                  <button type="button" onClick={() => setRoleSelection('customer')} className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-bold transition-colors ${roleSelection === 'customer' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}>
                    <User size={16} /> Shopper
                  </button>
                  <button type="button" onClick={() => setRoleSelection('vendor')} className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-bold transition-colors ${roleSelection === 'vendor' ? 'bg-white shadow-sm text-secondary' : 'text-gray-500 hover:text-gray-900'}`}>
                    <Store size={16} /> Vendor
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{roleSelection === 'vendor' ? 'Store Name' : 'Full Name'}</label>
                  <div className="relative border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><User size={18} /></div>
                    <input required type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" className="w-full py-3.5 pl-12 pr-4 outline-none text-gray-900" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={18} /></div>
                <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="john@example.com" className="w-full py-3.5 pl-12 pr-4 outline-none text-gray-900" />
              </div>

            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                {isLogin && <button type="button" className="text-xs text-primary font-bold hover:underline">Forgot password?</button>}
              </div>
              <div className="relative border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={18} /></div>
                <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full py-3.5 pl-12 pr-4 outline-none text-gray-900" />
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex justify-center items-center gap-2 mt-4">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-gray-600 border-t border-gray-100 pt-8">
            {isLogin ? (
              <p>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-primary font-bold hover:underline">Sign up now</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setIsLogin(true)} className="text-primary font-bold hover:underline">Sign in instead</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
