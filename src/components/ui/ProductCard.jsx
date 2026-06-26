import { useState } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import { formatCurrency } from '../../utils/helpers.js'
import ImageLightbox from './ImageLightbox.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="group overflow-hidden rounded-md border border-[#E2DEC9] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        className="relative block h-72 w-full overflow-hidden bg-[#F9F8F6]"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </button>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#121212]">{product.name}</h3>
          <p className="text-sm leading-6 text-[#4F4F4F]">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-brand-red">{formatCurrency(product.price)}</span>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-redHover"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <ImageLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
    </article>
  )
}
