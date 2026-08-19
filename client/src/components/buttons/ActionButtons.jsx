import { Link } from 'react-router-dom'
import { FiHome, FiFileText } from 'react-icons/fi'

export default function ActionButtons() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 -mt-3 relative z-10">
      <Link
        to="/business/add"
        className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-semibold text-sm shadow-card bg-gradient-to-r from-secondary to-[#ff7a8f] active:scale-[0.98] transition"
      >
        <FiHome size={17} />
        Add Your Business
      </Link>
      <Link
        to="/requirements"
        className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-semibold text-sm shadow-card bg-gradient-to-r from-primary to-[#2b578c] active:scale-[0.98] transition"
      >
        <FiFileText size={17} />
        Requirements
      </Link>
    </div>
  )
}
