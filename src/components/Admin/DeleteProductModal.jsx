export default function DeleteProductModal({
  product,
  onConfirm,
  onCancel,
}) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-semibold">
          Delete Product
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete
          <strong> {product.name}</strong>?
        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onCancel}
            className="flex-1 rounded-md border py-3"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(product)}
            className="flex-1 rounded-md bg-red-600 py-3 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}