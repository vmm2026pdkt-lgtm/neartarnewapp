import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowLeft,
  FiGrid,
  FiUsers,
  FiBriefcase,
  FiTag,
  FiBox,
  FiFileText,
  FiImage,
  FiStar,
  FiFlag,
  FiCreditCard,
  FiRepeat,
  FiBell,
  FiLayout,
  FiSettings,
  FiShield,
  FiBarChart2,
  FiList,
  FiLogOut,
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import DashboardTab from './DashboardTab'
import UsersTab from './UsersTab'
import BusinessesTab from './BusinessesTab'
import CategoriesTab from './CategoriesTab'
import ProductsTab from './ProductsTab'
import ComingSoonTab from './ComingSoonTab'

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: FiGrid, Component: DashboardTab },
  { key: 'users', label: 'Users', icon: FiUsers, Component: UsersTab },
  { key: 'businesses', label: 'Businesses', icon: FiBriefcase, Component: BusinessesTab },
  { key: 'categories', label: 'Categories', icon: FiTag, Component: CategoriesTab },
  { key: 'products', label: 'Products', icon: FiBox, Component: ProductsTab },
  { key: 'requirements', label: 'Requirements', icon: FiFileText },
  { key: 'advertisements', label: 'Advertisements', icon: FiImage },
  { key: 'reviews', label: 'Reviews', icon: FiStar },
  { key: 'reports', label: 'Reports', icon: FiFlag },
  { key: 'payments', label: 'Payments', icon: FiCreditCard },
  { key: 'subscriptions', label: 'Subscriptions', icon: FiRepeat },
  { key: 'notifications', label: 'Notifications', icon: FiBell },
  { key: 'cms', label: 'CMS Pages', icon: FiLayout },
  { key: 'roles', label: 'Role Management', icon: FiShield },
  { key: 'analytics', label: 'Analytics', icon: FiBarChart2 },
  { key: 'logs', label: 'Logs', icon: FiList },
  { key: 'settings', label: 'Settings', icon: FiSettings },
]

export default function Admin() {
  const [active, setActive] = useState('dashboard')
  const { user, logout } = useAuth()

  const activeTab = TABS.find((t) => t.key === active)
  const ActiveComponent = activeTab?.Component

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="bg-primary text-white px-4 py-4 flex items-center gap-3 shadow-card">
        <Link to="/" aria-label="Back to home" className="p-1.5 rounded-full hover:bg-white/10">
          <FiArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold leading-tight">Admin Panel</h1>
          {user && <p className="text-xs text-white/70 truncate">{user.full_name}</p>}
        </div>
        <button
          onClick={logout}
          aria-label="Logout"
          className="p-2 rounded-full hover:bg-white/10 flex items-center gap-1 text-xs font-medium"
        >
          <FiLogOut size={16} />
        </button>
      </header>

      <nav className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar sticky top-0 z-20">
        <div className="flex gap-1 px-3 py-2 min-w-max">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                active === key ? 'bg-primary text-white' : 'text-primary/70 hover:bg-bg'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 p-4">
        {ActiveComponent ? <ActiveComponent /> : <ComingSoonTab label={activeTab?.label} />}
      </main>
    </div>
  )
}
