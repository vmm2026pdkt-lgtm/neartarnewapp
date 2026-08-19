import { NavLink } from 'react-router-dom'
import { FiGrid, FiRepeat, FiPlusSquare, FiMessageCircle, FiUser } from 'react-icons/fi'
import { HiOutlineTag } from 'react-icons/hi2'

const NAV_ITEMS = [
  { to: '/', label: 'Directories', icon: FiGrid, end: true },
  { to: '/buy-sell', label: 'Buy/Sell', icon: FiRepeat },
  { to: '/create-post', label: 'Create Post', icon: FiPlusSquare },
  { to: '/chat', label: 'Chat', icon: FiMessageCircle },
  { to: '/leads', label: 'Leads', icon: HiOutlineTag },
  { to: '/profile', label: 'Profile', icon: FiUser },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-[480px] sm:bottom-6 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(23,55,94,0.06)] sm:rounded-b-[28px]">
      <div className="grid grid-cols-6">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="flex flex-col items-center gap-0.5 py-2.5"
          >
            {({ isActive }) => (
              <>
                <Icon size={19} className={isActive ? 'text-secondary' : 'text-gray-400'} />
                <span
                  className={`text-[9px] font-medium ${
                    isActive ? 'text-secondary' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
