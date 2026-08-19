import { useState } from 'react'
import { FiHeart, FiMapPin } from 'react-icons/fi'
import { latestProducts } from '../../data/mockData'
import { formatINR } from '../../utils/format'

export default function LatestProducts() {
  const [favorites, setFavorites] = useState({})
  const toggleFavorite = (id) => setFavorites((f) => ({ ...f, [id]: !f[id] }))

  return (
    <section className="px-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-primary">Latest Products</h2>
        <button className="text-xs font-semibold text-secondary">View All</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {latestProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="relative">
              <img src={p.image} alt={p.title} className="w-full h-28 object-cover bg-bg" />
              <button
                onClick={() => toggleFavorite(p.id)}
                aria-label="Favourite"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center"
              >
                <FiHeart
                  size={14}
                  className={favorites[p.id] ? 'fill-secondary text-secondary' : 'text-gray-400'}
                />
              </button>
            </div>
            <div className="p-2.5">
              <p className="text-xs font-semibold text-primary line-clamp-2 leading-tight h-8">
                {p.title}
              </p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-sm font-bold text-secondary">
                  {formatINR(p.offerPrice)}
                </span>
                <span className="text-[10px] text-gray-400 line-through">
                  {formatINR(p.price)}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                <FiMapPin size={10} />
                <span className="truncate">{p.location}</span>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 truncate">{p.seller}</p>
                  <p className="text-[10px] text-gray-400">{p.postedAt}</p>
                </div>
                <button className="text-[11px] font-semibold text-white bg-primary px-3 py-1.5 rounded-lg shrink-0">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
