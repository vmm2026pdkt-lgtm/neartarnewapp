import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

export default function Register() {
  const { register, status, error } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [phoneError, setPhoneError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
    setForm({ ...form, phone: digitsOnly })
    if (phoneError) setPhoneError(null)
  }

  const handlePasswordChange = (e) => {
    setForm({ ...form, password: e.target.value })
    if (passwordError) setPasswordError(null)
  }

  const validatePassword = (password) => {
    if (password.length !== 8) {
      return 'Password must be exactly 8 characters.'
    }
    if (!/^[A-Za-z0-9]{8}$/.test(password)) {
      return 'Password can contain only letters and numbers.'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!/^\d{10}$/.test(form.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number.')
      return
    }

    const passwordValidationError = validatePassword(form.password)
    if (passwordValidationError) {
      setPasswordError(passwordValidationError)
      return
    }

    const result = await register(form)
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center px-6 py-10">
      <div className="max-w-sm w-full mx-auto">
        <h1 className="text-2xl font-extrabold text-primary text-center">NearTar</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-8">
          Create an account to list your business or post requirements
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-5 space-y-4">
          <Field icon={<FiUser size={16} />}>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-sm text-primary"
            />
          </Field>

          <Field icon={<FiMail size={16} />}>
            <input
              type="email"
              name="email"
              required
              placeholder="name@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-sm text-primary"
            />
          </Field>

          <div>
            <Field icon={<FiPhone size={16} />}>
              <span className="shrink-0 pr-2 mr-1 border-r border-gray-300 text-sm font-medium text-primary/70">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                name="phone"
                required
                placeholder="9876543210"
                value={form.phone}
                onChange={handlePhoneChange}
                className="flex-1 bg-transparent outline-none text-sm text-primary"
              />
            </Field>
            {phoneError && <p className="text-xs text-secondary mt-1 px-1">{phoneError}</p>}
          </div>

          <div>
            <Field icon={<FiLock size={16} />}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                maxLength={8}
                placeholder="Password (8 characters)"
                value={form.password}
                onChange={handlePasswordChange}
                className="flex-1 bg-transparent outline-none text-sm text-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
                className="shrink-0 text-primary/50 hover:text-primary/70 transition"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </Field>
            {passwordError && <p className="text-xs text-secondary mt-1 px-1">{passwordError}</p>}
          </div>

          {error && <p className="text-xs text-secondary text-center">{error}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm shadow-card bg-gradient-to-r from-secondary to-[#ff7a8f] disabled:opacity-60"
          >
            {status === 'loading' ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-semibold">
            Login
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
