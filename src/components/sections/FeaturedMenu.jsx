import ProductCard from '../ui/ProductCard.jsx'

export default function FeaturedMenu({ products, loading }) {
  return (
    <section className="bg-cream text-[#1C1C1C]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-red">From Our Kitchen</p>
          <h2 className="mt-4 text-4xl font-semibold">Featured Dishes & Cakes</h2>
          <p className="mt-4 text-base leading-8 text-[#4F4F4F]">
            Curated selections that showcase chef-crafted taste, elegant plating, and premium ingredients.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full rounded-md bg-white p-12 text-center text-sm text-[#4F4F4F] shadow-sm">Loading featured products…</div>
          ) : !products || products.length === 0 ? (
            <div className="col-span-full rounded-md bg-white p-12 text-center text-sm text-[#4F4F4F] shadow-sm">No featured products available.</div>
          ) : (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </div>
    </section>
  )
}
