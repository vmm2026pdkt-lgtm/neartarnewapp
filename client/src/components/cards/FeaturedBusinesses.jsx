import { useState } from 'react'
import { FiPhoneCall, FiMapPin, FiShare2, FiHeart } from 'react-icons/fi'
import { FaWhatsapp, FaCheckCircle, FaStar } from 'react-icons/fa'
import { featuredBusinesses } from '../../data/mockData'

export default function FeaturedBusinesses() {
  const [favorites, setFavorites] = useState({})

  const toggleFavorite = (id) => setFavorites((f) => ({ ...f, [id]: !f[id] }))

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-bold text-primary">Featured Businesses</h2>
        <button className="text-xs font-semibold text-secondary">View All</button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
        {featuredBusinesses.map((biz) => (
          <div
            key={biz.id}
            className="min-w-[260px] bg-white rounded-2xl shadow-card p-3 shrink-0"
          >
            <div className="flex items-start gap-3">
              <img
                src={biz.logo}
                alt={biz.name}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-sm text-primary truncate">{biz.name}</p>
                  {biz.verified && (
                    <FaCheckCircle className="text-blue-500 shrink-0" size={13} />
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{biz.category}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <FiMapPin size={11} />
                  <span className="truncate">{biz.location}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <FaStar className="text-amber-400" size={12} />
                  <span className="text-xs font-medium text-primary">{biz.rating}</span>
                </div>
              </div>
              <button onClick={() => toggleFavorite(biz.id)} aria-label="Favourite">
                <FiHeart
                  size={18}
                  className={favorites[biz.id] ? 'fill-secondary text-secondary' : 'text-gray-300'}
                />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mt-3">
              <ActionIcon icon={<FiPhoneCall size={14} />} label="Call" />
              <ActionIcon icon={<FaWhatsapp size={15} />} label="Chat" tone="green" />
              <ActionIcon icon={<FiMapPin size={14} />} label="Map" />
              <ActionIcon icon={<FiShare2 size={14} />} label="Share" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ActionIcon({ icon, label, tone }) {
  const toneClass =
    tone === 'green' ? 'text-green-600 bg-green-50' : 'text-primary bg-bg'
  return (
    <button
      className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-[10px] font-medium ${toneClass} hover:opacity-80`}
    >
      {icon}
      {label}
    </button>
  )
}
