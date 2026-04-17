import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { ShoppingCart, Star, Heart, Flame, Zap } from 'lucide-react'

export default function Home() {
  const { products } = useProductStore()
  const { toggleWishlist, items: wishlistItems } = useWishlistStore()
  
  const [timeLeft, setTimeLeft] = useState(86400) // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000)
    return () => clearInterval(timer)
  }, [])

  const hrs = Math.floor(timeLeft / 3600).toString().padStart(2, '0')
  const mins = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')
  const secs = (timeLeft % 60).toString().padStart(2, '0')

  const flashDeals = products.slice(0, 4)
  const categoryBubbles = [
    { name: 'Laptops', icon: '💻', link: '/category/Laptops & PCs' },
    { name: 'Phones', icon: '📱', link: '/category/Smartphones' },
    { name: 'Audio', icon: '🎧', link: '/category/Audio' },
    { name: 'Cameras', icon: '📷', link: '/category/Cameras & Drones' },
    { name: 'Parts', icon: '⚙️', link: '/category/Components' },
    { name: 'Deals', icon: '🔥', link: '/category/All' },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white relative flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 w-full max-w-7xl mx-auto"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="bg-primary/20 text-primary font-bold px-3 py-1 rounded-full w-max text-sm mb-6 flex items-center gap-2"><Zap size={14}/> BIGGEST SALE OF THE YEAR</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">Super Deals<br/>Up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">70% Off</span></h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-md font-medium">Millions of products. Incredible prices. Shipped globally.</p>
            <div className="flex gap-4">
              <Link to="/category/All" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,77,79,0.4)] transition-all transform hover:scale-105">Shop The Sale</Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md transition-colors">Claim Coupons</button>
            </div>
          </div>
        </div>
        {/* Abstract shapes in hero background */}
        <div className="absolute right-0 top-0 w-1/2 lg:w-2/3 h-full overflow-hidden opacity-50 md:opacity-100 flex items-center justify-end z-0">
           <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover rounded-l-[100px] shadow-2xl" alt="Sale Event" />
           <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-900/50 to-gray-900"></div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30 mb-16">
        <div className="bg-white rounded-2xl shadow-xl flex flex-wrap lg:flex-nowrap justify-between p-4 px-6 gap-4">
          {categoryBubbles.map(cat => (
             <Link to={cat.link} key={cat.name} className="flex flex-col items-center gap-2 flex-col-1 w-[80px] hover:-translate-y-1 transition-transform group">
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-2xl shadow-inner group-hover:bg-primary/10 group-hover:text-primary border border-gray-100 transition-colors">
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-gray-700">{cat.name}</span>
             </Link>
          ))}
        </div>
      </div>

      {/* Super Flash Deals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2"><Flame className="text-primary fill-primary" size={32} /> Flash Deals</h2>
            <div className="flex items-center gap-1.5 font-mono text-lg font-bold">
              <span className="bg-gray-900 text-white px-2 py-1 rounded">{hrs}</span>:
              <span className="bg-gray-900 text-white px-2 py-1 rounded">{mins}</span>:
              <span className="bg-gray-900 text-white px-2 py-1 rounded">{secs}</span>
            </div>
          </div>
          <Link to="/category/All" className="text-gray-500 hover:text-primary font-semibold">View All Deals &rarr;</Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map(product => (
            <Link key={`flash-${product.id}`} to={`/product/${product.id}`} className="block relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-primary/20 overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded z-10">-50%</div>
              <div className="aspect-[4/3] bg-gray-100 relative">
                 <img src={product.image} className="w-full h-full object-cover" alt={product.name}/>
              </div>
              <div className="p-4">
                <div className="text-primary font-black text-2xl mb-1">${product.price.toFixed(2)}</div>
                <div className="text-gray-400 text-sm line-through mb-2">${(product.price * 2).toFixed(2)}</div>
                <div className="w-full bg-primary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary h-full" style={{ width: `${Math.random() * 40 + 60}%`}}></div>
                </div>
                <div className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">Almost Sold Out</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Product Grid "More To Love" */}
      <div className="bg-gray-100 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 inline-block relative">
              More To Love
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(product => {
              const inWishlist = wishlistItems.some(i => i.id === product.id)
              return (
                <div key={product.id} className="group bg-white rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-200 flex flex-col h-full relative">
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-primary transition-colors shadow-sm"
                  >
                    <Heart size={16} className={inWishlist ? "fill-primary text-primary" : ""} />
                  </button>
                  <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm text-gray-700 font-medium line-clamp-2 mb-1 leading-snug group-hover:text-primary transition-colors">{product.name}</h3>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">{product.vendorName}</div>
                        <div className="mt-auto">
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={12} className="fill-secondary text-secondary" />
                          <span className="text-xs text-gray-500">{product.rating || '4.5'} ({product.sold || '2k+'} sold)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShoppingCart size={14} className="text-gray-900" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
             <button className="bg-white border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-12 py-3 rounded-full font-bold transition-colors">Load More</button>
          </div>
        </div>
      </div>
    </div>
  )
}
