import { useMemo } from 'react'
import ProductCard from '../ui/ProductCard.jsx'
import { formatCurrency } from '../../utils/helpers.js'

const tabs = ['All', 'Cakes', 'Culinary Dishes']

export default function MenuSection({ products, activeTab, onTabChange, searchQuery, onSearchChange, loading }) {
  const totalProducts = products.length

  return (
    <section className="bg-cream text-[#1C1C1C]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Our Menu</p>
            <h2 className="mt-3 text-4xl font-semibold">Curated cakes and savory dishes for every table.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
            <div className="rounded-md border border-[#E2DEC9] bg-white w-[120px] h-[60px]">
              <input
                type="search"
                placeholder="Search products"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                className="w-full h-full bg-transparent text-sm text-[#1C1C1C] outline-none placeholder:text-[#8C8C8C]"
              />
            </div>
            <div className="inline-flex overflow-hidden rounded-md border border-[#E2DEC9] bg-white">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onTabChange(tab)}
                  className={`px-4 py-3 text-sm font-semibold transition duration-200 activeTab === hover:bg-red-200 'bg-brand-red text-white' : 'bg-white text-[#4F4F4F]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 text-sm text-[#4F4F4F]">
          {loading ? 'Loading menu…' : `${totalProducts} products available`}
        </div>

        {loading ? (
          <div className="rounded-md bg-white p-16 text-center text-sm text-[#4F4F4F] shadow-sm">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="rounded-md bg-white p-16 text-center text-sm text-[#4F4F4F] shadow-sm">No products found.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  )
}
