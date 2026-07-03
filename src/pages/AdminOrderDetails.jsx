import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { formatCurrency } from '../utils/helpers'

export default function AdminOrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
      } else {
        setOrder(data)
      }

      setLoading(false)
    }

    fetchOrder()
  }, [id])
  const updateStatus = async (newStatus) => {
  const { error } = await supabase
    .from('orders')
    .update({
      status: newStatus,
    })
    .eq('id', order.id)

  if (error) {
    console.error(error)
    return
  }

  setOrder((prev) => ({
    ...prev,
    status: newStatus,
  }))
}


  if (loading) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-5xl px-4 py-24">
          Loading...
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-5xl px-4 py-24">
          Order not found.
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 bg-cream">
      <section className="mx-auto max-w-5xl px-4 py-16">

        <button
          onClick={() => navigate('/admin')}
          className="mb-8 rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          ← Back
        </button>

        <div className="rounded-md border bg-white p-8 shadow-sm">

          <h1 className="text-3xl font-semibold">
            Order #{order.id}
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div>
              <h2 className="font-semibold mb-3">
                Customer Information
              </h2>

              <p><strong>Name:</strong> {order.customer_name}</p>
              <p><strong>Email:</strong> {order.customer_email}</p>
              <p><strong>Phone:</strong> {order.customer_phone}</p>
              <p><strong>Address:</strong> {order.delivery_address}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-3">
                Order Information
              </h2>

             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

  <div className="flex items-center gap-3">

    <strong>Status:</strong>

    <span
      className={`rounded-full px-4 py-1 text-sm font-semibold capitalize
      ${
        order.status === 'pending'
          ? 'bg-yellow-100 text-yellow-800'
          : order.status === 'confirmed'
          ? 'bg-blue-100 text-blue-800'
          : order.status === 'preparing'
          ? 'bg-orange-100 text-orange-800'
          : order.status === 'ready'
          ? 'bg-purple-100 text-purple-800'
          : order.status === 'out for delivery'
          ? 'bg-indigo-100 text-indigo-800'
          : order.status === 'delivered'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      {order.status}
    </span>

  </div>

  <select
    value={order.status}
    onChange={(e) => updateStatus(e.target.value)}
    className="rounded-md border border-gray-300 px-4 py-2"
  >
    <option value="pending">Pending</option>
    <option value="confirmed">Confirmed</option>
    <option value="preparing">Preparing</option>
    <option value="ready">Ready</option>
    <option value="out for delivery">Out for Delivery</option>
    <option value="delivered">Delivered</option>
    <option value="cancelled">Cancelled</option>
  </select>

</div>
              <p><strong>Total:</strong> {formatCurrency(order.total_amount)}</p>
              <p><strong>Reference:</strong> {order.payment_ref}</p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

          </div>

          <div className="mt-10">

            <div className="mt-10">

  <h2 className="mb-5 text-2xl font-semibold">
    Ordered Items
  </h2>

  <div className="overflow-hidden rounded-md border">

    <table className="w-full">

      <thead className="bg-gray-100">

        <tr>

          <th className="px-4 py-3 text-left">
            Item
          </th>

          <th className="px-4 py-3 text-center">
            Qty
          </th>

          <th className="px-4 py-3 text-right">
            Price
          </th>

          <th className="px-4 py-3 text-right">
            Total
          </th>

        </tr>

      </thead>

      <tbody>

        {order.items?.map((item) => (

          <tr
            key={item.id}
            className="border-t"
          >

            <td className="px-4 py-4 font-medium">
              {item.name}
            </td>

            <td className="px-4 py-4 text-center">
              {item.quantity}
            </td>

            <td className="px-4 py-4 text-right">
              {formatCurrency(item.price)}
            </td>

            <td className="px-4 py-4 text-right font-semibold">
              {formatCurrency(item.price * item.quantity)}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  <div className="mt-6 flex justify-end">

    <div className="rounded-md bg-black px-6 py-4 text-white">

      <p className="text-sm">
        Grand Total
      </p>

      <p className="text-2xl font-bold">
        {formatCurrency(order.total_amount)}
      </p>

    </div>

  </div>

</div>

          </div>

        </div>

      </section>
    </main>
  )
}