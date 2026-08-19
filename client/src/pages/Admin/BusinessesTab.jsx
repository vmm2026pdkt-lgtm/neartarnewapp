import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { fetchAllBusinesses, approveBusiness, rejectBusiness } from '../../services/adminService'

const STATUS_STYLES = {
  published: 'bg-green-50 text-green-700',
  draft: 'bg-amber-50 text-amber-700',
}

export default function BusinessesTab() {
  const [businesses, setBusinesses] = useState(null)
  const [error, setError] = useState(null)

  const load = () => {
    fetchAllBusinesses()
      .then(setBusinesses)
      .catch((err) => setError(err.response?.data?.detail || 'Failed to load businesses'))
  }

  useEffect(load, [])

  const handleApprove = async (id) => {
    try {
      const updated = await approveBusiness(id)
      setBusinesses((prev) => prev.map((b) => (b.id === id ? updated : b)))
    } catch {
      setError('Failed to approve business')
    }
  }

  const handleReject = async (id) => {
    try {
      const updated = await rejectBusiness(id)
      setBusinesses((prev) => prev.map((b) => (b.id === id ? updated : b)))
    } catch {
      setError('Failed to reject business')
    }
  }

  if (error) return <p className="text-sm text-secondary px-1">{error}</p>
  if (!businesses) return <p className="text-sm text-gray-400 px-1">Loading businesses...</p>
  if (businesses.length === 0) return <p className="text-sm text-gray-400 px-1">No businesses yet.</p>

  return (
    <div className="space-y-3">
      {businesses.map((b) => (
        <div key={b.id} className="bg-white rounded-2xl shadow-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-primary truncate">{b.name}</p>
                {b.is_verified && <FaCheckCircle className="text-blue-500 shrink-0" size={13} />}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {b.city}, {b.state} &middot; {b.phone}
              </p>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${STATUS_STYLES[b.status] || 'bg-bg text-primary'}`}
            >
              {b.status}
            </span>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleApprove(b.id)}
              disabled={b.status === 'published' && b.is_verified}
              className="flex-1 text-xs font-semibold text-white bg-primary py-2 rounded-lg disabled:opacity-40"
            >
              Approve & Verify
            </button>
            <button
              onClick={() => handleReject(b.id)}
              disabled={b.status === 'draft' && !b.is_verified}
              className="flex-1 text-xs font-semibold text-secondary bg-bg py-2 rounded-lg disabled:opacity-40"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
