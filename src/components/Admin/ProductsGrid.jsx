import ProductCard from './ProductCard'

export default function ProductsGrid({
  products,
  onEdit,
  onDelete,
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-md bg-white p-10 text-center shadow">
        No products found.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  )
}