import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { formatCurrency } from '../../utils/helpers'

export default function OrderCard({ order, setOrders }) {
  const navigate = useNavigate()
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

    setOrders((prev) =>
      prev.map((item) =>
        item.id === order.id
          ? { ...item, status: newStatus }
          : item
      )
    )
  }

  return (
    <div
  onClick={() => navigate(`/admin/orders/${order.id}`)}
  className="cursor-pointer rounded-xl border border-[#E2DEC9] bg-[#F9F8F6] p-5 transition hover:border-brand-red hover:shadow-md"
>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm text-[#4F4F4F]">
            Order ID
          </p>

          <p className="mt-1 font-semibold text-[#121212]">
            {order.id}
          </p>
        </div>

        <select
          value={order.status || 'pending'}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => updateStatus(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold"
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

      <div className="mt-4 grid gap-3 sm:grid-cols-3">

        <div>

          <p className="text-sm text-[#4F4F4F]">
            Customer
          </p>

          <p className="mt-1 font-semibold">
            {order.customer_name}
          </p>

          <p className="text-sm text-gray-500">
            {order.customer_phone}
          </p>

          <p className="text-sm text-gray-500">
            {order.customer_email}
          </p>

        </div>

        <div>

          <p className="text-sm text-[#4F4F4F]">
            Amount
          </p>

          <p className="mt-1 font-semibold">
            {formatCurrency(order.total_amount || 0)}
          </p>

        </div>

        <div>

          <p className="text-sm text-[#4F4F4F]">
            Payment Reference
          </p>

          <p className="mt-1 font-semibold break-all">
            {order.payment_ref || 'N/A'}
          </p>

        </div>

      </div>

    </div>
  )
}