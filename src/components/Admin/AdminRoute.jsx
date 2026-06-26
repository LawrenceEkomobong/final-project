import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext.jsx'

export default function AdminRoute({ children }) {
  const { loading, isAuthenticated, isAdmin } = useAuthContext()

  if (loading) {
    return (
      <div className="pt-24 text-center text-base text-[#4F4F4F]">
        Loading admin access…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!isAdmin) {
    return (
      <main className="pt-24">
        <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Access denied</p>
          <h1 className="mt-4 text-4xl font-semibold">Admin access required</h1>
          <p className="mt-4 text-base text-[#4F4F4F]">You are signed in, but this area is restricted to admin users only.</p>
        </section>
      </main>
    )
  }

  return children
}
