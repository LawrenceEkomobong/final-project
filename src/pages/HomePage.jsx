import HeroSection from '../components/sections/HeroSection.jsx'
import FeaturedMenu from '../components/sections/FeaturedMenu.jsx'
import WhyChooseUs from '../components/sections/WhyChooseUs.jsx'
import CallToActionBanner from '../components/sections/CallToActionBanner.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function HomePage() {
  const { featuredProducts, loading } = useProducts()

  return (
    <main>
      <HeroSection />
      <FeaturedMenu products={featuredProducts} loading={loading} />
      <WhyChooseUs />
      <CallToActionBanner />
      <AboutSection />
    </main>
  )
}
