import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/helpers.js'

export default function OrderPage({ onRequestAuth }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  const handleProceed = () => {
    if (!isAuthenticated) {
      onRequestAuth()
      return
    }
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <main className="pt-24">
        <section className="bg-cream text-[#1C1C1C]">
          <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Your Cart</p>
            <h1 className="mt-4 text-4xl font-semibold">Your cart is empty</h1>
            <p className="mt-4 text-base text-[#4F4F4F]">Add your favorite dishes and cakes from the menu to continue.</p>
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
          <div className="mb-8 flex flex-col gap-4 rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Order Summary</p>
              <h1 className="mt-3 text-3xl font-semibold">Review your cart</h1>
            </div>
            <div className="rounded-md bg-[#121212] px-4 py-3 text-base font-semibold text-white">Total: {formatCurrency(getCartTotal())}</div>
          </div>

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div key={item.id} className="grid gap-4 rounded-md border border-[#E2DEC9] bg-white p-5 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <img src={item.image_url} alt={item.name} loading="lazy" className="h-28 w-full rounded-md object-cover sm:h-24" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-[#121212]">{item.name}</h2>
                    <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm font-semibold text-brand-red transition hover:text-brand-redHover">
                      Remove
                    </button>
                  </div>
                  <p className="text-sm text-[#4F4F4F]">{formatCurrency(item.price)} each</p>
                  <div className="inline-flex items-center gap-2 rounded-md border border-[#E2DEC9] bg-[#F9F8F6] px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-9 w-9 rounded-md bg-white text-sm font-semibold text-[#121212] transition duration-200 hover:bg-[#F5F5F5]"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-9 w-9 rounded-md bg-white text-sm font-semibold text-[#121212] transition duration-200 hover:bg-[#F5F5F5]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="self-start rounded-md bg-[#F9F8F6] p-4 text-right text-sm font-semibold text-[#121212] sm:self-center">
                  {formatCurrency(item.quantity * item.price)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-md bg-white p-5 text-sm leading-7 text-[#4F4F4F] shadow-sm">
              Proceed to checkout to complete your order with secure payment and order tracking.
            </div>
            <button
              type="button"
              onClick={handleProceed}
              className="w-full rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
