import React, { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { Filter, Star, Heart, ShoppingCart } from 'lucide-react'

export default function CategoryView() {
  const { categoryName } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const { products } = useProductStore()
  const { toggleWishlist, items: wishlistItems } = useWishlistStore()

  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })

  // Filtering Logic
  let filtered = products.filter(p => {
    // Top level category filter
    if (categoryName !== 'All' && p.category !== categoryName) return false
    // Query string filter
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
    // Price range
    if (p.price < priceRange.min || p.price > priceRange.max) return false
    return true
  })

  // Sorting Logic
  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else {
    // popular
    filtered.sort((a, b) => (b.sold || 0) - (a.sold || 0))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
      
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 shrink-0 block">
        <div className="bg-white border text-left border-gray-100 rounded-2xl shadow-sm p-6 sticky top-28">
           <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><Filter size={18}/> Filters</h3>
           
           <div className="mb-6">
             <h4 className="font-semibold text-sm mb-3 text-gray-700">Categories</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li><Link to="/category/All" className={categoryName === 'All' ? "font-bold text-primary" : "hover:text-primary"}>All Electronics</Link></li>
               <li><Link to="/category/Laptops & PCs" className={categoryName === 'Laptops & PCs' ? "font-bold text-primary" : "hover:text-primary"}>Laptops & PCs</Link></li>
               <li><Link to="/category/Smartphones" className={categoryName === 'Smartphones' ? "font-bold text-primary" : "hover:text-primary"}>Smartphones</Link></li>
               <li><Link to="/category/Audio" className={categoryName === 'Audio' ? "font-bold text-primary" : "hover:text-primary"}>Audio</Link></li>
               <li><Link to="/category/Cameras & Drones" className={categoryName === 'Cameras & Drones' ? "font-bold text-primary" : "hover:text-primary"}>Cameras & Drones</Link></li>
               <li><Link to="/category/Accessories" className={categoryName === 'Accessories' ? "font-bold text-primary" : "hover:text-primary"}>Accessories</Link></li>
               <li><Link to="/category/Components" className={categoryName === 'Components' ? "font-bold text-primary" : "hover:text-primary"}>Components & Parts</Link></li>
             </ul>
           </div>

           <div className="mb-6 border-t pt-4">
             <h4 className="font-semibold text-sm mb-3 text-gray-700">Price Range</h4>
             <div className="flex items-center gap-2">
               <div className="relative">
                 <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                 <input type="number" value={priceRange.min} onChange={e=>setPriceRange({...priceRange, min: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded p-1.5 pl-5 text-sm outline-none focus:border-primary" />
               </div>
               <span className="text-gray-400">-</span>
               <div className="relative">
                 <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                 <input type="number" value={priceRange.max} onChange={e=>setPriceRange({...priceRange, max: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded p-1.5 pl-5 text-sm outline-none focus:border-primary" />
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Main Listing */}
      <div className="flex-1">
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
           <div>
             <h1 className="text-xl font-bold text-gray-900">{categoryName === 'All' ? 'All Products' : categoryName}</h1>
             <p className="text-sm text-gray-500">{filtered.length} items found {query && `for "${query}"`}</p>
           </div>
           
           <div className="flex items-center gap-3">
             <span className="text-sm text-gray-500 font-medium">Sort by:</span>
             <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-lg py-2 px-3 outline-none focus:border-primary">
               <option value="popular">Best Match</option>
               <option value="rating">Top Rated</option>
               <option value="price_asc">Price: Low to High</option>
               <option value="price_desc">Price: High to Low</option>
             </select>
           </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
             <Filter size={48} className="text-gray-200 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-gray-800">No results found</h3>
             <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-left">
             {filtered.map(product => {
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
                            <span className="text-xs text-gray-500">{product.rating || '4.5'} ({product.sold || 0} sold)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">Free Ship</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
             })}
          </div>
        )}
      </div>
    </div>
  )
}
