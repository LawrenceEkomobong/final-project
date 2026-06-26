import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuthContext } from '../../context/AuthContext.jsx'
import logoSrc from '../../assets/Logo.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Order', to: '/order' },
]

export default function Navbar({ onAuthOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()
  const { profile, isAuthenticated, signOut } = useAuthContext()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black border-b border-[#2A2A2A]/80 text-white shadow-black/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">
          <img src={logoSrc} alt="KBI Food Empire" className="h-10 w-10 rounded-md object-cover" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition duration-200  ${isActive ? 'text-brand-red underline underline-offset-8 decoration-2 decoration-brand-red' : 'text-white/80 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {profile?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-medium transition duration-200 ${isActive ? 'text-brand-red underline underline-offset-8 decoration-2 decoration-brand-red' : 'text-white/80 hover:text-white'}`
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={isAuthenticated ? signOut : onAuthOpen}
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-white/20 hover:bg-white/10"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>

          <Link to="/order" className="group relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-1 py-2 text-sm font-semibold text-white transition duration-200 hover:border-white/20 hover:bg-white/10">
            <img src="src\assets\cart-icon.png" alt="Cart" className="h-8 w-8 transition duration-200 group-hover:scale-110" />
            <span className={`inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white relative bottom-2 transition duration-200 ${cartCount === 0 ? 'opacity-0' : 'opacity-100'}`}>
              {cartCount}
            </span>
          </Link>

          <button
            type="button"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition duration-200 hover:border-white/20 hover:bg-white/10 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-semibold transition duration-200 ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {profile?.role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-semibold transition duration-200 ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'}`
                }
              >
                Admin
              </NavLink>
            )}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  signOut()
                }}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-left text-sm font-semibold text-white transition duration-200 hover:border-white/20 hover:bg-white/10"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  onAuthOpen()
                }}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-left text-sm font-semibold text-white transition duration-200 hover:border-white/20 hover:bg-white/10"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
