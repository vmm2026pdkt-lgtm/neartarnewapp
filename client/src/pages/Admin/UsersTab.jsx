import { useEffect, useState } from 'react'
import { fetchUsers, toggleUserActive } from '../../services/adminService'

export default function UsersTab() {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)

  const load = () => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err.response?.data?.detail || 'Failed to load users'))
  }

  useEffect(load, [])

  const handleToggle = async (id) => {
    try {
      const updated = await toggleUserActive(id)
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
    } catch {
      setError('Failed to update user')
    }
  }

  if (error) return <p className="text-sm text-secondary px-1">{error}</p>
  if (!users) return <p className="text-sm text-gray-400 px-1">Loading users...</p>
  if (users.length === 0) return <p className="text-sm text-gray-400 px-1">No users yet.</p>

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-50 last:border-0">
              <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">{u.full_name}</td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{u.email}</td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{u.phone}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-bg text-xs font-medium text-primary">
                  {u.role?.name}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}
                >
                  {u.is_active ? 'Active' : 'Disabled'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleToggle(u.id)}
                  className="text-xs font-semibold text-secondary hover:underline"
                >
                  {u.is_active ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
