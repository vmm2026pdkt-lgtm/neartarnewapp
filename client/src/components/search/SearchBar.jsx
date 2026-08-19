import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiX, FiClock, FiTrendingUp } from 'react-icons/fi'
import { searchPlaceholders, popularSearches } from '../../data/mockData'

const RECENT_SEARCHES = ['Bike service center', 'Interior designer', 'Grocery near me']

export default function SearchBar() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (query) return
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % searchPlaceholders.length)
    }, 2200)
    return () => clearInterval(id)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const suggestions = query
    ? popularSearches.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div ref={containerRef} className="sticky top-0 z-30 bg-bg px-4 pt-3 pb-2">
      <div className="relative">
        <div className="flex items-center gap-2 bg-white rounded-2xl shadow-card px-4 py-3">
          <FiSearch className="text-primary/60 shrink-0" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={searchPlaceholders[placeholderIndex]}
            className="flex-1 bg-transparent outline-none text-sm text-primary placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search">
              <FiX className="text-gray-400" size={16} />
            </button>
          )}
        </div>

        {focused && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-card-hover p-3 max-h-80 overflow-y-auto">
            {suggestions.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-400 px-1 mb-1">Suggestions</p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg hover:bg-bg text-sm text-primary"
                  >
                    <FiSearch size={14} className="text-gray-400" />
                    {s}
                  </button>
                ))}
              </div>
            )}

            {!query && (
              <>
                <div className="mb-2">
                  <p className="text-xs font-semibold text-gray-400 px-1 mb-1 flex items-center gap-1">
                    <FiClock size={12} /> Recent Searches
                  </p>
                  {RECENT_SEARCHES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg hover:bg-bg text-sm text-primary"
                    >
                      <FiClock size={14} className="text-gray-400" />
                      {s}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 px-1 mb-1 flex items-center gap-1">
                    <FiTrendingUp size={12} /> Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2 px-1">
                    {popularSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 rounded-full bg-bg text-xs text-primary font-medium hover:bg-primary/10"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
