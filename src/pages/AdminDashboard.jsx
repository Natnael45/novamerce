import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useOrderStore } from '../store/useOrderStore'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuthStore()
  const { orders, approveOrder, rejectOrder } = useOrderStore()
  const [selectedImage, setSelectedImage] = useState(null)

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending_payment_approval':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={12}/> Pending</span>
      case 'approved':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={12}/> Approved</span>
      case 'rejected':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={12}/> Rejected</span>
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Platform</h1>
        <p className="text-gray-500 mt-1">Review orders and verify payment receipts in real-time.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Payment Approvals Queue</h2>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400 font-bold border-2 border-gray-200 border-dashed">0</div>
            <p className="text-lg">No orders available for review.</p>
            <p className="text-sm mt-2">Place an order as a customer to see it here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Receipt</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice().reverse().map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-gray-600">#{order.id}</td>
                    <td className="p-4 text-gray-900 font-medium">{order.customerId}</td>
                    <td className="p-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      {order.receiptImage ? (
                        <button onClick={() => setSelectedImage(order.receiptImage)} className="text-primary hover:text-primary-hover font-medium underline text-sm transition-colors">
                          View Image
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">No receipt</span>
                      )}
                    </td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4 text-right">
                      {order.status === 'pending_payment_approval' && (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => approveOrder(order.id)} title="Approve" className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => rejectOrder(order.id)} title="Reject" className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                            <XCircle size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="bg-white p-2 rounded-xl shadow-2xl relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-4 -right-4 bg-white text-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100">
              <XCircle size={24} />
            </button>
            <img src={selectedImage} alt="Payment Receipt" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
}
