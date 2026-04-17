import { create } from 'zustand'

const INITIAL_PRODUCTS = [
  // Audio
  { id: '1', name: 'Wireless AirPods Pro 2 ANC Headphones', price: 199.99, description: 'Industry-leading noise canceling. Perfect for daily commute.', image: 'https://images.unsplash.com/photo-1606220588913-b3a58e171ceb?q=80&w=800&auto=format&fit=crop', vendorId: 'vendor1', vendorName: 'Audio Hub', category: 'Audio', stock: 50, rating: 4.8, sold: 1200 },
  { id: '2', name: 'Studio Monitoring Over-Ear Headphones', price: 149.00, description: 'Flat response curve for audio mixing and production.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Audio', stock: 120, rating: 4.7, sold: 410 },
  { id: '3', name: 'Waterproof Bluetooth Portable Speaker', price: 59.99, description: 'IPX7 waterproof, 12 hours battery life, punchy bass.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop', vendorId: 'vendor2', vendorName: 'Gadget Galaxy', category: 'Audio', stock: 85, rating: 4.5, sold: 890 },

  // Laptops & PCs
  { id: '4', name: 'MacBook Air M2 2022 256GB Midnight', price: 1099.00, description: 'Supercharged by M2 chip. 18 hours of battery life.', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Laptops & PCs', stock: 12, rating: 4.9, sold: 800 },
  { id: '5', name: 'Gaming Laptop RTX 4070 165Hz Monitor', price: 1499.99, description: 'Desktop-level performance. 32GB RAM, 1TB NVMe SSD.', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Laptops & PCs', stock: 8, rating: 4.8, sold: 120 },
  
  // Smartphones
  { id: '6', name: 'iPhone 15 Pro 256GB Titanium', price: 1099.00, description: 'Aerospace-grade titanium, A17 Pro chip, Action button.', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Smartphones', stock: 45, rating: 4.9, sold: 2500 },
  { id: '7', name: 'Galaxy S24 Ultra 5G Stylus Included', price: 1199.99, description: 'Epic cameras, AI powered features, brilliant display.', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Smartphones', stock: 20, rating: 4.8, sold: 1100 },

  // Cameras & Drones
  { id: '8', name: 'Pro DSLR Camera Z-Mount Mirrorless', price: 1499.99, description: 'Mirrorless camera with 24.2MP full-frame sensor.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Cameras & Drones', stock: 5, rating: 4.7, sold: 56 },
  { id: '9', name: 'Professional RC Drone with 4K Camera', price: 299.00, description: 'Foldable quadcopter with GPS and obstacle avoidance.', image: 'https://images.unsplash.com/photo-1506606401543-2e73709cebfc?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorToys', vendorName: 'Drone World', category: 'Cameras & Drones', stock: 15, rating: 4.7, sold: 80 },

  // Accessories & Components
  { id: '10', name: 'Smartphone Gimbal Stabilizer Pro 3-Axis', price: 89.50, description: 'Smooth cinematic footage for your smartphone vlogging.', image: 'https://images.unsplash.com/photo-1586953983027-d7508a64f4bb?q=80&w=800&auto=format&fit=crop', vendorId: 'vendor1', vendorName: 'Audio Hub', category: 'Accessories', stock: 200, rating: 4.5, sold: 340 },
  { id: '11', name: 'Mechanical Gaming Keyboard RGB Hot-Swappable', price: 75.99, description: 'Customizable keys, tactile feedback, competitive gaming.', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop', vendorId: 'vendor2', vendorName: 'Gadget Galaxy', category: 'Accessories', stock: 150, rating: 4.6, sold: 2900 },
  { id: '12', name: 'Ergonomic Wireless Mouse Multi-Device', price: 45.00, description: 'Sculpted design, connects up to 3 devices simultaneously.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop', vendorId: 'vendor2', vendorName: 'Gadget Galaxy', category: 'Accessories', stock: 400, rating: 4.8, sold: 5000 },
  { id: '13', name: '1TB NVMe M.2 Gen4 Internal SSD', price: 105.00, description: 'Blazing fast loading speeds of up to 7300MB/s.', image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Components', stock: 65, rating: 4.9, sold: 900 },
  { id: '14', name: '850W 80+ Gold Modular Power Supply', price: 120.00, description: 'Reliable and quiet power delivery for high-end PCs.', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop', vendorId: 'vendorTech', vendorName: 'NovaTech Store', category: 'Components', stock: 30, rating: 4.7, sold: 320 }
]

export const useProductStore = create((set) => ({
  products: INITIAL_PRODUCTS,
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),
}))
