import { Link } from 'react-router-dom'
import logoSrc from '../../assets/Logo.png'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Order', to: '/order' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8 lg:flex-row lg:justify-between">
        <div className="max-w-sm space-y-4">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="KBI Food Empire" className="h-10 w-10 rounded-md object-cover" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">KBI Food Empire</p>
              <p className="text-xs text-white/60">Chef K & Premium Culinary Dishes</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-white/70">
            Experience refined culinary service, chef-led design, and kitchen safety expertise for private dining, events, and food businesses.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/70">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition duration-200 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">Contact</h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>hello@kbifoodempire.com</p>
              <p>+234 800 123 4567</p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">Follow</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>Instagram: @kbifoodempire</li>
              <li>LinkedIn: Chef K</li>
              <li>Facebook: KBI Food Empire</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50 sm:px-6 lg:px-8">
        © 2025 KBI Food Empire. All rights reserved.
      </div>
    </footer>
  )
}
