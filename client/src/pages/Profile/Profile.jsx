import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiBriefcase,
  FiBox,
  FiFileText,
  FiHeart,
  FiBell,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiUser,
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import BottomNav from '../../components/navbar/BottomNav'

const MENU = [
  { icon: FiBriefcase, label: 'My Businesses' },
  { icon: FiBox, label: 'My Products' },
  { icon: FiFileText, label: 'My Requirements' },
  { icon: FiHeart, label: 'Saved / Favourites' },
  { icon: FiBell, label: 'Notifications' },
  { icon: FiCreditCard, label: 'Subscription' },
  { icon: FiSettings, label: 'Settings' },
]

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-bg pb-20">
      <header className="bg-primary text-white px-4 pt-6 pb-8 rounded-b-[24px] shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
            <FiUser size={24} />
          </div>
          <div>
            <p className="font-bold">{user?.full_name || 'Your Account'}</p>
            <p className="text-xs text-white/70">{user?.email}</p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-card divide-y divide-gray-100">
          {MENU.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-primary"
            >
              <Icon size={17} className="text-primary/60" />
              {label}
            </button>
          ))}
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-secondary font-semibold"
          >
            <FiLogOut size={17} />
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
