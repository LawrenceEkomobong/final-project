import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { formatCurrency } from '../../utils/helpers.js'

export default function OrderSection() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <section className="bg-cream text-[#1C1C1C]">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Your Cart</p>
          <h2 className="mt-4 text-3xl font-semibold">Your cart is empty</h2>
          <p className="mt-4 text-base text-[#4F4F4F]">Browse the menu to add premium cakes and curated dishes.</p>
          <Link to="/menu" className="mt-8 inline-flex rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover">
            Browse Menu
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream text-[#1C1C1C]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Your Cart</p>
            <h2 className="mt-2 text-3xl font-semibold">Review your order</h2>
          </div>
          <div className="rounded-md bg-[#121212] px-4 py-3 text-base font-semibold text-white">Total: {formatCurrency(getCartTotal())}</div>
        </div>

        <div className="space-y-5">
          {cartItems.map((item) => (
            <div key={item.id} className="grid gap-4 rounded-md border border-[#E2DEC9] bg-white p-5 sm:grid-cols-[120px_1fr_auto] sm:items-center">
              <img src={item.image_url} alt={item.name} loading="lazy" className="h-28 w-full rounded-md object-cover sm:h-24" />
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#121212]">{item.name}</h3>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm font-semibold text-brand-red transition hover:text-brand-redHover">
                    Remove
                  </button>
                </div>
                <p className="text-sm text-[#4F4F4F]">{formatCurrency(item.price)} each</p>
                <div className="inline-flex items-center gap-2 rounded-md border border-[#E2DEC9] bg-[#F9F8F6] px-2 py-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 w-9 rounded-md bg-white text-sm font-semibold text-[#121212] transition duration-200 hover:bg-[#F5F5F5]">−</button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9 rounded-md bg-white text-sm font-semibold text-[#121212] transition duration-200 hover:bg-[#F5F5F5]">+</button>
                </div>
              </div>
              <div className="self-start rounded-md bg-[#F9F8F6] p-4 text-right text-sm font-semibold text-[#121212] sm:self-center">
                {formatCurrency(item.quantity * item.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
