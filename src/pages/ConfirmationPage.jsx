import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

export default function ConfirmationPage() {
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

      if (!error) {
        setOrder(data)
      }

      setLoading(false)
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-4 py-24">
          Loading...
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="text-3xl font-semibold">Order not found</h1>

          <button
            onClick={() => navigate('/orders')}
            className="mt-8 rounded-md bg-black px-6 py-3 text-white"
          >
            View My Orders
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24">
      <section className="bg-cream text-[#1C1C1C]">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">

          <div className="rounded-md border border-[#E2DEC9] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl">
              ✅
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.28em] text-brand-red">
              Order Confirmed
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              Thank you for your order!
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#4F4F4F]">
              Your payment was successful and your order has been received.
              Our kitchen will begin preparing your meal shortly.
            </p>

            <div className="mt-10 rounded-md border border-[#E2DEC9] bg-[#F9F8F6] p-6 text-left">

              <p className="text-sm uppercase tracking-[0.2em] text-brand-red">
                Order Reference
              </p>

              <p className="mt-3 break-all font-mono text-xl font-semibold">
                {order.payment_ref}
              </p>

              <div className="mt-6 border-t border-[#E2DEC9] pt-5">

                <p className="text-sm uppercase tracking-[0.2em] text-brand-red">
                  Order Date
                </p>

                <p className="mt-2 text-base">
                  {new Date(order.created_at).toLocaleString()}
                </p>

              </div>

            </div>

            <div className="mt-10 rounded-md bg-[#F9F8F6] p-6 text-left">

              <h2 className="text-xl font-semibold">
                What happens next?
              </h2>

              <ul className="mt-5 space-y-4 text-[#4F4F4F]">

                <li>👨‍🍳 Our kitchen will begin preparing your order.</li>

                <li>📞 We'll contact you using the phone number you provided.</li>

                <li>🚚 Track your order anytime from the <strong>My Orders</strong> page.</li>

                <li>🧾 Keep your order reference for future enquiries.</li>

              </ul>

            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

              <button
                type="button"
                onClick={() => navigate('/orders')}
                className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover"
              >
                View My Orders
              </button>

              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="rounded-md border border-[#121212] px-6 py-3 text-sm font-semibold text-[#121212] transition duration-200 hover:bg-[#121212] hover:text-white"
              >
                Continue Shopping
              </button>

            </div>

          </div>

        </div>
      </section>
    </main>
  )
}