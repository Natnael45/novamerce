import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useOrderStore } from '../store/useOrderStore'
import { User, MapPin, CreditCard, Package, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function UserProfile() {
  const { user } = useAuthStore()
  const { orders } = useOrderStore()

  if (!user || user.role !== 'customer') {
    return <Navigate to="/" replace />
  }

  const myOrders = orders.filter(o => o.customerId === user.id)

  const getStatusDisplay = (status) => {
    if (status === 'pending_payment_approval') return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1"><Clock size={12}/> Pending Approval</span>
    if (status === 'approved') return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1"><CheckCircle size={12}/> Payment Approved  &bull; Processing</span>
    if (status === 'rejected') return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1"><XCircle size={12}/> Payment Rejected</span>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <User size={40} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-6">Standard Member</p>
          
          <div className="w-full flex justify-around text-center border-t border-gray-100 pt-6">
             <div>
                <div className="text-xl font-bold text-gray-900">{myOrders.length}</div>
                <div className="text-xs text-gray-500">Orders</div>
             </div>
             <div>
                <div className="text-xl font-bold text-gray-900">0</div>
                <div className="text-xs text-gray-500">Coupons</div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-4">
           <ul className="space-y-1">
             <li className="bg-primary/5 text-primary font-bold px-4 py-3 rounded-xl cursor-pointer flex items-center gap-3"><Package size={18}/> My Orders</li>
             <li className="text-gray-600 hover:bg-gray-50 font-medium px-4 py-3 rounded-xl cursor-pointer flex items-center gap-3"><MapPin size={18}/> Shipping Addresses</li>
             <li className="text-gray-600 hover:bg-gray-50 font-medium px-4 py-3 rounded-xl cursor-pointer flex items-center gap-3"><CreditCard size={18}/> Payment Cards</li>
           </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders ({myOrders.length})</h1>
        
        {myOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
               <Package size={32}/>
             </div>
             <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
             <p className="text-gray-500 mb-6">Looks like you haven't made your first purchase.</p>
             <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold">Start Shopping</button>
          </div>
        ) : (
          <div className="space-y-6">
            {myOrders.slice().reverse().map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left">
                <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                  <div className="flex gap-8">
                     <div>
                       <div className="text-xs text-gray-500 uppercase font-bold mb-1">Order Placed</div>
                       <div className="text-sm font-medium text-gray-900">Today</div>
                     </div>
                     <div>
                       <div className="text-xs text-gray-500 uppercase font-bold mb-1">Total</div>
                       <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                     </div>
                     <div>
                       <div className="text-xs text-gray-500 uppercase font-bold mb-1">Order #</div>
                       <div className="text-sm font-medium text-gray-900">{order.id}</div>
                     </div>
                  </div>
                  <div>
                    {getStatusDisplay(order.status)}
                  </div>
                </div>
                
                <div className="p-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 mb-4 pb-4 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.product.name}</h4>
                        <div className="text-sm text-gray-500 mb-2">Qty: {item.quantity}</div>
                        <div className="flex gap-4 text-sm font-medium text-primary">
                          <button className="hover:underline">Track Package</button>
                          <button className="hover:underline">View Receipt</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
