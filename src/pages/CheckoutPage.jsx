import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { initializePaystackCheckout } from '../lib/paystack.js'
import { supabase } from '../lib/supabaseClient.js'
import { formatCurrency } from '../utils/helpers.js'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user, profile } = useAuthContext()
  const { cartItems, clearCart, getCartTotal } = useCart()
  const [formValues, setFormValues] = useState({
    fullName: profile?.full_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    address: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderReference, setOrderReference] = useState(null)

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  const handlePayment = async () => {
    if (!formValues.fullName || !formValues.email || !formValues.phone || !formValues.address) {
      setError('Please complete all fields before payment.')
      return
    }

    setSubmitting(true)
    const amount = getCartTotal()
    initializePaystackCheckout({
      email: formValues.email,
      amount,
      onSuccess: async ({ reference }) => {
        const items = cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))

        const { error: saveError } = await supabase.from('orders').insert([
          {
            user_id: user?.id,
            items,
            total_amount: amount,
            status: 'pending',
            delivery_address: formValues.address,
            payment_ref: reference,
          },
        ])

        if (saveError) {
  console.error(saveError)
  setError(saveError.message)
  setSubmitting(false)
  return
}

        clearCart()
        setOrderReference(reference)
        setSubmitting(false)
        navigate('/confirmation', { state: { reference } })
      },
      onClose: () => {
        setSubmitting(false)
      },
    })
  }

  if (!cartItems.length) {
    return (
      <main className="pt-24">
        <section className="bg-cream text-[#1C1C1C]">
          <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Checkout</p>
            <h1 className="mt-4 text-4xl font-semibold">No items to checkout</h1>
            <p className="mt-4 text-base text-[#4F4F4F]">Return to the menu to choose your premium cakes and dishes.</p>
            <button
              type="button"
              onClick={() => navigate('/menu')}
              className="mt-8 rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover"
            >
              Browse Menu
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="pt-24">
      <section className="bg-cream text-[#1C1C1C]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Checkout</p>
            <h1 className="mt-3 text-3xl font-semibold">Complete your order securely</h1>
            <p className="mt-2 text-sm leading-7 text-[#4F4F4F]">All payments are processed securely using Paystack. Review your order and delivery details carefully.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
              <div className="grid gap-5">
                <label className="space-y-2 text-sm font-medium text-[#121212]">
                  Full Name
                  <input
                    value={formValues.fullName}
                    onChange={(event) => handleChange('fullName', event.target.value)}
                    className="w-full rounded-md border border-[#D9D9D9] bg-[#F9F8F6] px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-[#121212]">
                  Email
                  <input
                    value={formValues.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    className="w-full rounded-md border border-[#D9D9D9] bg-[#F9F8F6] px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
                    type="email"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-[#121212]">
                  Phone Number
                  <input
                    value={formValues.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    className="w-full rounded-md border border-[#D9D9D9] bg-[#F9F8F6] px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-[#121212]">
                  Delivery Address
                  <textarea
                    value={formValues.address}
                    onChange={(event) => handleChange('address', event.target.value)}
                    className="w-full rounded-md border border-[#D9D9D9] bg-[#F9F8F6] px-4 py-3 text-sm text-[#121212] outline-none transition duration-200 focus:border-brand-red"
                    rows="4"
                  />
                </label>
              </div>
              {error && <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            </div>

            <aside className="space-y-6 rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Order Summary</p>
                <h2 className="mt-3 text-2xl font-semibold">{cartItems.length} items</h2>
              </div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-md bg-[#F9F8F6] p-4">
                    <p className="text-sm font-semibold text-[#121212]">{item.name}</p>
                    <p className="mt-1 text-sm text-[#4F4F4F]">{item.quantity} × ₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-md bg-[#F9F8F6] p-5 text-sm text-[#121212]">
                <div className="flex items-center justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>{formatCurrency(getCartTotal())}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePayment}
                disabled={submitting}
                className="w-full rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Processing...' : `Pay ${formatCurrency(getCartTotal())}`}
              </button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
