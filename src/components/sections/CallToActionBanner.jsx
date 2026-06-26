import { Link } from 'react-router-dom'

export default function CallToActionBanner() {
  return (
    <section className="bg-brand-red px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/90">Ready to order?</p>
          <h2 className="mt-3 text-3xl font-semibold">Browse the full menu.</h2>
        </div>
        <Link to="/menu" className="inline-flex rounded-md bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition duration-200 hover:bg-[#0f0f0f]">
          View Full Menu
        </Link>
      </div>
    </section>
  )
}
