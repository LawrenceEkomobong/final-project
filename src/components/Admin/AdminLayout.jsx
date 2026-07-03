import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `block rounded-md px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-brand-red text-white'
        : 'text-[#4F4F4F] hover:bg-[#F9F8F6]'
    }`

  return (
    <main className="pt-24 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          <aside className="rounded-xl border border-[#E2DEC9] bg-white p-6 shadow-sm h-fit">

            <p className="text-xs uppercase tracking-[0.25em] text-brand-red">
              Admin Panel
            </p>

            <nav className="mt-6 space-y-2">

              <NavLink
                to="/admin"
                end
                className={linkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/products"
                className={linkClass}
              >
                Products
              </NavLink>

              <NavLink
                to="/admin/orders"
                className={linkClass}
              >
                Orders
              </NavLink>

              <NavLink
                to="/admin/customers"
                className={linkClass}
              >
                Customers
              </NavLink>

              <NavLink
                to="/admin/settings"
                className={linkClass}
              >
                Settings
              </NavLink>

            </nav>

          </aside>

          <section>

            <Outlet />

          </section>

        </div>

      </div>
    </main>
  )
}