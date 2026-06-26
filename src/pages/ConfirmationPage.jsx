import { useLocation, useNavigate } from 'react-router-dom'

export default function ConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const reference = location.state?.reference || 'N/A'

  return (
    <main className="pt-24">
      <section className="bg-cream text-[#1C1C1C]">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Order Confirmed</p>
          <h1 className="mt-4 text-4xl font-semibold">Thank you for your order</h1>
          <p className="mt-4 text-base leading-8 text-[#4F4F4F]">
            Your order has been received and will be processed shortly. We will update you with delivery details soon.
          </p>
          <div className="mt-8 rounded-md bg-white p-8 text-left shadow-sm">
            <p className="text-sm text-[#4F4F4F]">Order Reference</p>
            <p className="mt-2 text-xl font-semibold text-[#121212]">{reference}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-10 rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover"
          >
            Return Home
          </button>
        </div>
      </section>
    </main>
  )
}
