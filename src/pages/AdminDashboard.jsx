import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { formatCurrency } from '../utils/helpers.js'
import DashboardStats from '../components/Admin/DashboardStats'
import OrderFilters from '../components/Admin/OrderFilters'
import OrdersList from '../components/Admin/OrdersList'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, deliveredOrders: 0, totalRevenue: 0 })
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      if (error) {
        console.error('Admin order fetch failed:', error)
        setLoading(false)
        return
      }
      const records = data || []
      setOrders(records)
      setStats({
  totalOrders: records.length,

  pendingOrders: records.filter(
    order => order.status === 'pending'
  ).length,

  deliveredOrders: records.filter(
    order => order.status === 'delivered'
  ).length,

  totalRevenue: records.reduce(
    (sum, order) => sum + (order.total_amount || 0),
    0
  ),
})
      setLoading(false)
    }

    fetchOrders()
  }, [])
  const filteredOrders = orders.filter((order) => {
  const matchesStatus =
    statusFilter === 'all' || order.status === statusFilter

  const keyword = search.toLowerCase()

  const matchesSearch =
  order.customer_name?.toLowerCase().includes(keyword) ||
  order.customer_phone?.toLowerCase().includes(keyword) ||
  order.customer_email?.toLowerCase().includes(keyword) ||
  order.payment_ref?.toLowerCase().includes(keyword)

  return matchesStatus && matchesSearch
})
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

        <DashboardStats stats={stats} />

              <OrderFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    <h2 className="text-2xl font-semibold">Recent orders</h2>
    <div className="mt-6 flex flex-wrap gap-3">
  {[
    'all',
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'out for delivery',
    'delivered',
    'cancelled',
  ].map((status) => (
    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`rounded-md px-4 py-2 text-sm font-medium transition ${
        statusFilter === status
          ? 'bg-brand-red text-white'
          : 'border border-gray-300 bg-white'
      }`}
    >
      {status === 'all'
        ? 'All Orders'
        : status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
    
  ))}
  <div className="mt-6">
  <input
    type="text"
    placeholder="Search by customer, phone, email or reference..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-brand-red"
  />
</div>
</div>
    <div className="mt-6">
  <OrdersList
    filteredOrders={filteredOrders}
    setOrders={setOrders}
  />
</div>
      </section>
      </main> 
  )
}
