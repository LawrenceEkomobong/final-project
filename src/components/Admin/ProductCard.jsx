import { formatCurrency } from '../../utils/helpers'

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <img
        src={product.image_url}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <span className="rounded bg-gray-100 px-3 py-1 text-sm">
            {product.category}
          </span>

          <span className="text-lg font-bold">
            {formatCurrency(product.price)}
          </span>

        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={() => onEdit(product)}
            className="flex-1 rounded bg-black py-2 text-white transition hover:opacity-90"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(product)}
            className="flex-1 rounded bg-red-600 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}