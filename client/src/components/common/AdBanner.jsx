import { useEffect, useState } from 'react'
import { advertisements } from '../../data/mockData'

export default function AdBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % advertisements.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="px-4 mt-6">
      <div className="relative rounded-2xl overflow-hidden shadow-card h-32">
        {advertisements.map((ad, i) => (
          <div
            key={ad.id}
            className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm text-center px-6 transition-opacity duration-700"
            style={{
              backgroundImage: `url(${ad.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === index ? 1 : 0,
            }}
          >
            <span className="bg-black/30 px-3 py-2 rounded-lg">{ad.title}</span>
          </div>
        ))}

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {advertisements.map((ad, i) => (
            <span
              key={ad.id}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
