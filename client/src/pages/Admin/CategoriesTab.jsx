import { useEffect, useState } from 'react'
import { fetchCategories, createCategory } from '../../services/adminService'

const emptyForm = { name: '', slug: '', icon: '' }

export default function CategoriesTab() {
  const [categories, setCategories] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => setError(err.response?.data?.detail || 'Failed to load categories'))
  }

  useEffect(load, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const created = await createCategory(form)
      setCategories((prev) => [...(prev || []), created])
      setForm(emptyForm)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create category')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
        <input
          name="name"
          required
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="bg-bg rounded-xl px-3 py-2 text-sm outline-none"
        />
        <input
          name="slug"
          required
          placeholder="slug"
          value={form.slug}
          onChange={handleChange}
          className="bg-bg rounded-xl px-3 py-2 text-sm outline-none"
        />
        <input
          name="icon"
          placeholder="Icon name (optional)"
          value={form.icon}
          onChange={handleChange}
          className="bg-bg rounded-xl px-3 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="text-sm font-semibold text-white bg-primary rounded-xl py-2 disabled:opacity-60"
        >
          {submitting ? 'Adding...' : 'Add Category'}
        </button>
      </form>

      {error && <p className="text-sm text-secondary px-1">{error}</p>}

      {!categories ? (
        <p className="text-sm text-gray-400 px-1">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow-card p-3">
              <p className="text-sm font-semibold text-primary">{c.name}</p>
              <p className="text-xs text-gray-400">/{c.slug}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
