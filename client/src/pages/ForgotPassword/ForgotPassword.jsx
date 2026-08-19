import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center px-6 py-10">
      <div className="max-w-sm w-full mx-auto">
        <h1 className="text-2xl font-extrabold text-primary text-center">NearTar</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-8">
          Enter your email to receive a password reset link
        </p>

        <div className="bg-white rounded-2xl shadow-card p-5">
          {sent ? (
            <p className="text-sm text-primary text-center py-2">
              If an account exists for <span className="font-semibold">{email}</span>, a reset
              link has been sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 bg-bg rounded-xl px-3.5 py-3">
                <FiMail size={16} className="text-primary/50" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold text-sm shadow-card bg-gradient-to-r from-primary to-[#2b578c]"
              >
                Send Reset Link
              </button>
            </form>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-5">
          <Link to="/login" className="text-secondary font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}
