import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { formatCurrency } from '../utils/helpers.js'


const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'

    case 'confirmed':
      return 'bg-blue-100 text-blue-800'

    case 'preparing':
      return 'bg-orange-100 text-orange-800'

    case 'ready':
      return 'bg-purple-100 text-purple-800'

    case 'out for delivery':
      return 'bg-indigo-100 text-indigo-800'

    case 'delivered':
      return 'bg-green-100 text-green-800'

    case 'cancelled':
      return 'bg-red-100 text-red-800'

    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getStatusLabel = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return '🟡 Pending'

    case 'confirmed':
      return '🔵 Confirmed'

    case 'preparing':
      return '👨‍🍳 Preparing'

    case 'ready':
      return '📦 Ready'

    case 'out for delivery':
      return '🚚 Out for Delivery'

    case 'delivered':
      return '✅ Delivered'

    case 'cancelled':
      return '❌ Cancelled'

    default:
      return status
  }
}

export default function MyOrders() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
      } else {
        setOrders(data)
      }

      setLoading(false)
    }

    fetchOrders()
  }, [user])

  if (loading) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-6xl px-4 py-20">
          Loading your orders...
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24">
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20">

          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-red">
              My Orders
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              Your Orders
            </h1>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-md border border-[#E2DEC9] bg-white p-8 text-center">
              <h2 className="text-2xl font-semibold">
                No orders yet
              </h2>

              <p className="mt-3 text-[#4F4F4F]">
  You haven't placed any orders yet.
</p>

<button
  onClick={() => window.location.href = "/menu"}
  className="mt-6 rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-redHover"
>
  Browse Menu
</button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-[#E2DEC9] pb-5 md:flex-row md:items-center md:justify-between">

            <div>
                <h2 className="text-2xl font-semibold text-[#121212]">
  Order Reference
</h2>

<p className="mt-2 break-all font-mono text-lg text-brand-red">
  {order.payment_ref}
</p>

                <p className="mt-1 text-sm text-[#6B6B6B]">
                Placed on {new Date(order.created_at).toLocaleString()}
                </p>
            </div>

            <span
                className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(order.status)}`}
            >
                {getStatusLabel(order.status)}
            </span>

            </div>

                  <div className="mt-6 space-y-2">

                    {order.items.map(item => (
                      <div
                        key={item.id}
                        className="flex justify-between"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>

                        <span>
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}

                  </div>
                  <div className="mt-6 rounded-md bg-[#F9F8F6] p-4">

                    <p className="text-sm font-semibold">
                        Delivery Address
                    </p>

                    <p className="mt-2 text-sm text-[#4F4F4F]">
                        {order.delivery_address}
                    </p>

                    </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E2DEC9] pt-5">

  <span className="text-lg font-semibold">
    Total
  </span>

  <span className="text-2xl font-bold text-brand-red">
    {formatCurrency(order.total_amount)}
  </span>
  <button
  onClick={() => navigate(`/orders/${order.id}`)}
  className="mt-6 w-[200px] rounded-md bg-black py-2 text-sm font-semibold text-white transition hover:bg-brand-redHover"
>
  View Details
</button>

</div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  )
}