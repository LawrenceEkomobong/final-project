import { Link } from 'react-router-dom'
import heroImage from '../../assets/Product8.png'
import heroBackground from '../../assets/Background-image2.jpg'

export default function HeroSection() {
  return (
    <section className=
  "relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat text-white"
  style={{ backgroundImage: `url(${heroBackground})` }}
>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-16 pt-18">

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Where Every Dish Tells a Story
          </h1>
          <p className="max-w-xl text-base leading-8 text-white/70 text-6xl sm:text-lg">
            A premium culinary destination by Chef K, where modern food safety expertise meets elevated cakes and savory dishes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/menu" className="inline-flex items-center justify-center rounded-md bg-red-500 px-6 py-3 text-sm font-semibold text-white transition duration-200">
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  )
}
