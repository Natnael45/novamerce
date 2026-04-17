import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useProductStore } from '../store/useProductStore'
import { Plus, Trash2, Package } from 'lucide-react'

export default function VendorDashboard() {
  const { user } = useAuthStore()
  const { products, addProduct, removeProduct } = useProductStore()
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', description: '', category: '', stock: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  if (!user || user.role !== 'vendor') {
    return <Navigate to="/" replace />
  }

  const vendorProducts = products.filter(p => p.vendorId === user.id || p.vendorId === 'vendor1') // Fallback to see mock data too

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalImage = imageUrl || imageFile
    if (!finalImage) return alert('Upload a product image or provide a URL')

    const product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      image: finalImage,
      vendorId: user.id,
      vendorName: user.name
    }
    
    addProduct(product)
    setShowAddForm(false)
    setNewProduct({ name: '', price: '', description: '', category: '', stock: '' })
    setImageFile(null)
    setImageUrl('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your storefront and products.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          {showAddForm ? 'Cancel' : <><Plus size={18} /> Add Product</>}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
                  <option value="">Select category...</option>
                  <option value="Laptops & PCs">Laptops & PCs</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Audio">Audio</option>
                  <option value="Cameras & Drones">Cameras & Drones</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Components">Components</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input required type="number" min="0" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input required type="number" min="1" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea required rows="4" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="space-y-3">
                <input type="text" placeholder="Image URL (e.g., https://unsplash.com/...)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-primary focus:ring-1 focus:ring-primary outline-none" disabled={!!imageFile} />
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm font-bold">OR</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} disabled={!!imageUrl} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all">Submit Product</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Package size={20}/> My Products</h2>
        </div>
        
        {vendorProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">You have no products listed.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vendorProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover border border-gray-200" />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">{product.category}</td>
                    <td className="p-4 font-semibold text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-gray-600">{product.stock}</td>
                    <td className="p-4 text-right flex justify-end">
                      <button onClick={() => removeProduct(product.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
