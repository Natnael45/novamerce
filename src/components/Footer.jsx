import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><span className="hover:text-white cursor-pointer transition-colors">Help Center</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Transaction Services</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Take our feedback survey</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Payment Methods</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Delivery Options</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Shopping with Us</h3>
            <ul className="space-y-3">
              <li><span className="hover:text-white cursor-pointer transition-colors">Making payments</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Buyer Protection</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Affiliate Program</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Collaborate with Us</h3>
            <ul className="space-y-3">
              <li><span className="hover:text-white cursor-pointer transition-colors">Partnerships</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Sell on NovaMerce</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">B2B Opportunities</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Experience NovaMerce App</h3>
            <p className="mb-4">Get it directly on your mobile device.</p>
            <div className="flex gap-2">
              <div className="bg-gray-800 border border-gray-700 px-4 py-2 rounded flex-1 text-center cursor-pointer hover:border-gray-500">App Store</div>
              <div className="bg-gray-800 border border-gray-700 px-4 py-2 rounded flex-1 text-center cursor-pointer hover:border-gray-500">Google Play</div>
            </div>
            <h3 className="text-lg font-bold text-white mt-8 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-center leading-8 cursor-pointer hover:bg-primary transition-colors">FB</div>
              <div className="w-8 h-8 rounded-full bg-gray-800 text-center leading-8 cursor-pointer hover:bg-primary transition-colors">IG</div>
              <div className="w-8 h-8 rounded-full bg-gray-800 text-center leading-8 cursor-pointer hover:bg-primary transition-colors">TW</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 NovaMerce. All rights reserved.</p>
          <div className="flex gap-2 opacity-50">
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] text-black font-bold">VISA</div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] text-black font-bold">MC</div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] text-black font-bold">PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
