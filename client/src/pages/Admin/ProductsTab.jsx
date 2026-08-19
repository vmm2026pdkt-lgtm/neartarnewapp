import { useEffect, useState } from 'react'
import { fetchAllProducts } from '../../services/adminService'

export default function ProductsTab() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((err) => setError(err.response?.data?.detail || 'Failed to load products'))
  }, [])

  if (error) return <p className="text-sm text-secondary px-1">{error}</p>
  if (!products) return <p className="text-sm text-gray-400 px-1">Loading products...</p>
  if (products.length === 0) return <p className="text-sm text-gray-400 px-1">No products yet.</p>

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 last:border-0">
              <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">{p.title}</td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                ₹{Number(p.offer_price ?? p.price).toLocaleString('en-IN')}
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.city}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-bg text-xs font-medium text-primary">
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
