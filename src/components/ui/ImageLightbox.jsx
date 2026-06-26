export default function ImageLightbox({ isOpen, onClose, product }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-md bg-[#121212] text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
        >
          Close
        </button>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="aspect-[4/3] bg-[#111111]">
            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-5 p-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-red">Featured Dish</p>
              <h2 className="text-3xl font-semibold">{product.name}</h2>
              <p className="text-sm leading-7 text-white/75">{product.description}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.24em] text-white/70">Price</p>
              <p className="text-2xl font-semibold text-brand-red">₦{product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
