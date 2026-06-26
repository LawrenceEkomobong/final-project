import { Link } from 'react-router-dom'
import heroImage from '../../assets/Product8.png'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_0.8fr] lg:items-center lg:px-8">
        <div className="relative z-10 space-y-8">
          <p className="text-sm uppercase tracking-[0.32em] text-white/60">Chef K — Premium Food & Safety</p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Where Every Dish Tells a Story
          </h1>
          <p className="max-w-xl text-base leading-8 text-white/70">
            A premium culinary destination by Chef K, where modern food safety expertise meets elevated cakes and savory dishes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/menu" className="inline-flex items-center justify-center rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover">
              Explore Menu
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#151515] p-2 shadow-2xl shadow-black/20">
          <img src={heroImage} alt="Premium culinary dish" className="h-full w-full rounded-[18px] object-cover shadow-lg" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121212] to-transparent" />
    </section>
  )
}
