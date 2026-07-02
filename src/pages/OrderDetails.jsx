import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'
import { formatCurrency } from '../utils/helpers.js'
import { useAuthContext } from '../context/AuthContext.jsx'

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

export default function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  if (!user) return

  const fetchOrder = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error(error)
    } else {
      setOrder(data)
    }

    setLoading(false)
  }

  fetchOrder()
}, [id, user])

  if (loading) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-5xl px-4 py-20">
          Loading order...
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-5xl px-4 py-20">
          Order not found.
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24">
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-4 py-20">

          <button
            onClick={() => navigate(-1)}
            className="mb-8 rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            ← Back
          </button>

          <div className="rounded-md border border-[#E2DEC9] bg-white p-8 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row md:justify-between">

              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-red">
                  Order Reference
                </p>

                <h1 className="mt-3 break-all font-mono text-2xl">
                  {order.payment_ref}
                </h1>

                <p className="mt-4 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <span
                className={`h-fit rounded-full px-4 py-2 font-semibold ${getStatusStyle(order.status)}`}
              >
                {getStatusLabel(order.status)}
              </span>

            </div>

            <hr className="my-8" />

            <h2 className="text-xl font-semibold">
              Ordered Items
            </h2>

            <div className="mt-5 space-y-4">

              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between rounded-md bg-[#F9F8F6] p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                  </p>

                </div>
              ))}

            </div>

            <div className="mt-8 rounded-md bg-[#F9F8F6] p-5">

              <h3 className="font-semibold">
                Delivery Address
              </h3>

              <p className="mt-2">
                {order.delivery_address}
              </p>

            </div>

            <div className="mt-8 flex justify-between border-t pt-6">

              <span className="text-xl font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold text-brand-red">
                {formatCurrency(order.total_amount)}
              </span>

            </div>

          </div>

        </div>
      </section>
    </main>
  )
}