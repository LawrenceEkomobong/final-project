import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { formatCurrency } from '../utils/helpers.js'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('orders').select()
      if (error) {
        console.error('Admin order fetch failed:', error)
        setLoading(false)
        return
      }
      const records = data || []
      setOrders(records)
      setStats({
        totalOrders: records.length,
        totalRevenue: records.reduce((sum, order) => sum + (order.total_amount || 0), 0),
      })
      setLoading(false)
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.25em] text-brand-red">Admin Dashboard</p>
          <h1 className="mt-6 text-3xl font-semibold">Loading dashboard…</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 bg-cream text-[#1C1C1C]">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-md border border-[#E2DEC9] bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Admin Dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold">Order management</h1>
          <p className="mt-3 text-sm leading-7 text-[#4F4F4F]">Review incoming order details and revenue from the current store session.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-red">Total orders</p>
            <p className="mt-4 text-5xl font-semibold">{stats.totalOrders}</p>
          </div>
          <div className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-red">Revenue</p>
            <p className="mt-4 text-5xl font-semibold">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>

        <div className="mt-10 rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Recent orders</h2>
          <div className="mt-6 space-y-4">
            {orders.length === 0 ? (
              <p className="text-sm text-[#4F4F4F]">No orders have been placed yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-xl border border-[#E2DEC9] bg-[#F9F8F6] p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-[#4F4F4F]">Order ID</p>
                      <p className="mt-1 font-semibold text-[#121212]">{order.id}</p>
                    </div>
                    <div className="rounded-full bg-black/90 px-4 py-2 text-sm font-semibold text-white">{order.status || 'pending'}</div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-[#4F4F4F]">Customer</p>
                      <p className="mt-1 font-semibold text-[#121212]">{order.user_id || 'Guest'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#4F4F4F]">Amount</p>
                      <p className="mt-1 font-semibold text-[#121212]">{formatCurrency(order.total_amount || 0)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#4F4F4F]">Reference</p>
                      <p className="mt-1 font-semibold text-[#121212]">{order.payment_ref || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
