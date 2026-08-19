import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  if (user.role?.name !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
