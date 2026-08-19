import { useState } from 'react'
import { categories } from '../../data/mockData'

const INITIAL_COUNT = 9

export default function CategoryGrid() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? categories : categories.slice(0, INITIAL_COUNT)

  return (
    <section className="px-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-primary">Browse by Category</h2>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="text-xs font-semibold text-secondary"
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {visible.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              className="group flex flex-col items-center gap-2 bg-white rounded-2xl shadow-card p-3 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-card-hover active:scale-95"
            >
              <span
                className="w-12 h-12 rounded-xl flex items-center justify-center text-primary text-xl transition-transform duration-200 group-hover:scale-110"
                style={{ background: cat.color }}
              >
                <Icon />
              </span>
              <span className="text-xs font-semibold text-primary text-center leading-tight">
                {cat.name}
              </span>
              <span className="text-[10px] text-gray-400">{cat.listings} listings</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
