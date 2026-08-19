import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { login, status, error } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form)
    if (result.meta.requestStatus === 'fulfilled') {
      const role = result.payload?.user?.role?.name
      navigate(role === 'admin' ? '/admin' : '/')
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center px-6 py-10">
      <div className="max-w-sm w-full mx-auto">
        <h1 className="text-2xl font-extrabold text-primary text-center">NearTar</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-8">
          Login to continue exploring local businesses
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-5 space-y-4">
          <Field icon={<FiMail size={16} />}>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-sm text-primary"
            />
          </Field>

          <Field icon={<FiLock size={16} />}>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-sm text-primary"
            />
          </Field>

          {error && <p className="text-xs text-secondary text-center">{error}</p>}

          <div className="text-right">
            <Link to="/forgot-password" className="text-xs font-medium text-secondary">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm shadow-card bg-gradient-to-r from-primary to-[#2b578c] disabled:opacity-60"
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-secondary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

function Field({ icon, children }) {
  return (
    <div className="flex items-center gap-2 bg-bg rounded-xl px-3.5 py-3">
      <span className="text-primary/50">{icon}</span>
      {children}
    </div>
  )
}
