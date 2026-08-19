import { FiMapPin } from 'react-icons/fi'
import { requirements } from '../../data/mockData'

export default function RequirementsSection() {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-bold text-primary">Latest Requirements</h2>
        <button className="text-xs font-semibold text-secondary">View All</button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
        {requirements.map((r) => (
          <div
            key={r.id}
            className="min-w-[240px] bg-white rounded-2xl shadow-card p-3.5 shrink-0"
          >
            <p className="text-sm font-semibold text-primary">{r.title}</p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 h-8">{r.description}</p>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="font-semibold text-secondary">{r.budget}</span>
              <span className="flex items-center gap-1 text-gray-500">
                <FiMapPin size={11} />
                {r.location}
              </span>
            </div>
            <button className="w-full mt-3 text-xs font-semibold text-white bg-primary py-2 rounded-lg">
              Contact
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
