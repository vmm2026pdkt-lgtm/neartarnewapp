import { FiRefreshCw, FiSearch, FiShare2, FiBell } from 'react-icons/fi'

export default function Header() {
  return (
    <header className="bg-primary text-white px-4 pt-4 pb-6 rounded-b-[24px] shadow-card">
      <div className="flex items-center justify-between">
        <button
          aria-label="Refresh"
          className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition"
        >
          <FiRefreshCw size={20} />
        </button>

        <h1 className="text-xl font-extrabold tracking-tight">NearTar</h1>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition"
          >
            <FiSearch size={19} />
          </button>
          <button
            aria-label="Notifications"
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition relative"
          >
            <FiBell size={19} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary" />
          </button>
          <button
            aria-label="Share"
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition"
          >
            <FiShare2 size={19} />
          </button>
        </div>
      </div>
    </header>
  )
}
