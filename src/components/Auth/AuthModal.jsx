import { useMemo, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext.jsx'
import { cn } from '../../utils/helpers.js'

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [formError, setFormError] = useState('')
  const { signIn, signUp, error: authError, loading, user } = useAuthContext()

  const tabs = useMemo(
    () => [
      { label: 'Login', key: 'login' },
      { label: 'Sign Up', key: 'signup' },
    ],
    [],
  )

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')

    if (mode === 'signup') {
      if (!values.fullName || !values.email || !values.password || !values.confirmPassword) {
        setFormError('Please complete all fields.')
        return
      }
      if (values.password !== values.confirmPassword) {
        setFormError('Passwords do not match.')
        return
      }
      const { error } = await signUp({ fullName: values.fullName, email: values.email, password: values.password })
      if (error) {
        setFormError(error.message || 'Sign up failed.')
        return
      }
    } else {
      if (!values.email || !values.password) {
        setFormError('Enter both email and password.')
        return
      }
      const { error } = await signIn({ email: values.email, password: values.password })
      if (error) {
        setFormError(error.message || 'Login failed.')
        return
      }
    }

    if (onAuthSuccess) {
      onAuthSuccess()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8">
      <div className="w-full max-w-md rounded-md border border-white/10 bg-[#F9F8F6] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-red">Member access</p>
            <h2 className="mt-2 text-2xl font-semibold">{mode === 'login' ? 'Log in to continue' : 'Create your account'}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-sm font-semibold text-[#4F4F4F] hover:text-[#121212]">
            Close
          </button>
        </div>

        <div className="mb-6 flex gap-2 rounded-md border border-[#E2DEC9] bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setMode(tab.key)
                setFormError('')
              }}
              className={cn(
                'flex-1 rounded-md px-4 py-3 text-sm font-semibold transition duration-200',
                mode === tab.key ? 'bg-black text-white' : 'bg-transparent text-[#4F4F4F] hover:bg-white/80',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label className="block text-sm font-medium text-[#121212]">
              Full Name
              <input
                value={values.fullName}
                onChange={(event) => handleChange('fullName', event.target.value)}
                className="mt-2 w-full rounded-md border border-[#D9D9D9] bg-white px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
                type="text"
                placeholder="Your full name"
              />
            </label>
          )}

          <label className="block text-sm font-medium text-[#121212]">
            Email
            <input
              value={values.email}
              onChange={(event) => handleChange('email', event.target.value)}
              className="mt-2 w-full rounded-md border border-[#D9D9D9] bg-white px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
              type="email"
              placeholder="name@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-[#121212]">
            Password
            <input
              value={values.password}
              onChange={(event) => handleChange('password', event.target.value)}
              className="mt-2 w-full rounded-md border border-[#D9D9D9] bg-white px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
              type="password"
              placeholder="Enter your password"
            />
          </label>

          {mode === 'signup' && (
            <label className="block text-sm font-medium text-[#121212]">
              Confirm Password
              <input
                value={values.confirmPassword}
                onChange={(event) => handleChange('confirmPassword', event.target.value)}
                className="mt-2 w-full rounded-md border border-[#D9D9D9] bg-white px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
                type="password"
                placeholder="Re-enter your password"
              />
            </label>
          )}

          {(formError || authError) && (
            <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{formError || authError}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand-red px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Continue to Checkout' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
