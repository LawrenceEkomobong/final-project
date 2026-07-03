import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import ProductsGrid from '../../components/Admin/ProductsGrid'
import ProductForm from '../../components/Admin/ProductForm'
import DeleteProductModal from '../../components/Admin/DeleteProductModal'
import EditProductModal from '../../components/Admin/EditProductModal'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  const saveProduct = async (product) => {
  const payload = {
    ...product,
    price: Number(product.price),
  }

  let error

  if (editingProduct) {
    ;({ error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', editingProduct.id))
  } else {
    ;({ error } = await supabase
      .from('products')
      .insert(payload))
  }

  if (error) {
    console.error(error)
    return
  }

  const { data } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  setProducts(data || [])

  setShowForm(false)
  setEditingProduct(null)
}

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setProducts(data || [])
    }

    setLoading(false)
  }
  const handleUpdateProduct = async (updatedProduct) => {
  const { error } = await supabase
    .from('products')
    .update({
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: Number(updatedProduct.price),
      category: updatedProduct.category,
      image_url: updatedProduct.image_url,
    })
    .eq('id', editingProduct.id)

  if (error) {
  console.error('Update Error:', error)
  alert(error.message)
  return
}

  setProducts((prev) =>
    prev.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            ...updatedProduct,
            price: Number(updatedProduct.price),
          }
        : product
    )
  )

  setEditingProduct(null)
}
const handleDeleteProduct = async (product) => {
  const confirmed = window.confirm(
    `Delete "${product.name}"?`
  )

  if (!confirmed) return

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', product.id)

  if (error) {
    console.error(error)
    return
  }

  setProducts((prev) =>
    prev.filter((item) => item.id !== product.id)
  )
}

  if (loading) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-6xl px-4 py-24">
          Loading products...
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 bg-cream">

      <section className="mx-auto max-w-7xl px-4 py-20">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.25em] text-brand-red">
              Admin
            </p>

            <h1 className="mt-2 text-4xl font-semibold">
              Products
            </h1>

          </div>

          <button
  onClick={() => {
    setEditingProduct(null)
    setShowForm(true)
  }}
  className="rounded-md bg-red-500 px-5 py-3 font-semibold text-white"
>
  + Add Product
</button>
        </div>

        <ProductsGrid
  products={products}
  onEdit={setEditingProduct}
  onDelete={handleDeleteProduct}
/>
      </section>
{showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div className="w-full max-w-2xl rounded-xl bg-white p-8">

      <h2 className="mb-6 text-3xl font-semibold">
        {editingProduct ? 'Edit Product' : 'Add Product'}
      </h2>

      <ProductForm
        initialData={editingProduct || {}}
        onSubmit={saveProduct}
        onCancel={() => setShowForm(false)}
      />

    </div>

  </div>
)}

<DeleteProductModal
  product={deletingProduct}
  onCancel={() => setDeletingProduct(null)}
  onConfirm={async (product) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', product.id)

  if (error) {
    console.error(error)
    return
  }

  setProducts((prev) =>
    prev.filter((item) => item.id !== product.id)
  )

  setDeletingProduct(null)
}}
/>
{editingProduct && (
  <EditProductModal
  product={editingProduct}
  onClose={() => setEditingProduct(null)}
  onSave={handleUpdateProduct}
/>
)}

    </main>
  )
}