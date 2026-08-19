import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import BottomNav from '../navbar/BottomNav'

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="min-h-screen bg-bg pb-20 flex flex-col">
      <header className="bg-primary text-white px-4 py-4 flex items-center gap-3 rounded-b-[24px] shadow-card">
        <Link to="/" aria-label="Back to home" className="p-1.5 rounded-full hover:bg-white/10">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">{title}</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-card flex items-center justify-center text-2xl mb-4">
          🚧
        </div>
        <p className="text-primary font-semibold mb-1">{title} is coming soon</p>
        <p className="text-sm text-gray-500 max-w-xs">{description}</p>
      </div>

      <BottomNav />
    </div>
  )
}
