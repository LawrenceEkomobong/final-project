import ProductForm from './ProductForm'

export default function EditProductModal({
  product,
  onSave,
  onClose,
}) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">
            Edit Product
          </h2>

          <button
            onClick={onClose}
            className="text-4xl"
          >
            ×
          </button>

        </div>

        <ProductForm
          initialData={product}
          onSubmit={onSave}
          onCancel={onClose}
        />

      </div>

    </div>
  )
}