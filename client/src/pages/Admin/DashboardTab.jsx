import { useEffect, useState } from 'react'
import {
  FiUsers,
  FiBriefcase,
  FiBox,
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiTag,
} from 'react-icons/fi'
import { fetchDashboardStats } from '../../services/adminService'

const CARD_DEFS = [
  { key: 'total_users', label: 'Total Users', icon: FiUsers, color: '#E7F0FF' },
  { key: 'total_businesses', label: 'Total Businesses', icon: FiBriefcase, color: '#FDEBEE' },
  { key: 'total_products', label: 'Total Products', icon: FiBox, color: '#E9F9EF' },
  { key: 'total_categories', label: 'Total Categories', icon: FiGrid, color: '#F1E9FF' },
  { key: 'published_businesses', label: 'Published Businesses', icon: FiCheckCircle, color: '#E6FBF0' },
  { key: 'pending_businesses', label: 'Pending Approval', icon: FiClock, color: '#FFF8E0' },
  { key: 'verified_businesses', label: 'Verified Businesses', icon: FiShield, color: '#E9FBF3' },
  { key: 'published_products', label: 'Published Products', icon: FiTag, color: '#FFF0EA' },
]

export default function DashboardTab() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch((err) => setError(err.response?.data?.detail || 'Failed to load dashboard stats'))
  }, [])

  if (error) {
    return <p className="text-sm text-secondary px-1">{error}</p>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {CARD_DEFS.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="bg-white rounded-2xl shadow-card p-4">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-primary text-lg mb-3"
            style={{ background: color }}
          >
            <Icon />
          </span>
          <p className="text-2xl font-extrabold text-primary">
            {stats ? stats[key] : <span className="inline-block w-8 h-6 bg-bg rounded animate-pulse" />}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  )
}
