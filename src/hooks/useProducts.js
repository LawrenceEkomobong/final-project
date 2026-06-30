import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export function useProducts(categoryFilter = 'All', searchQuery = '') {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isActive = true

    const fetchProducts = async () => {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('id, name, description, price, category, image_url, is_featured, created_at')
        .order('created_at', { ascending: false })

      if (!isActive) return

      if (fetchError) {
        console.error('Product fetch failed:', fetchError)
        setError(fetchError)
        setProducts([])
        setLoading(false)
        return
      }

      setProducts(data || [])
      setLoading(false)
    }

    fetchProducts()
    return () => {
      isActive = false
    }
  }, [])


  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (categoryFilter && categoryFilter !== 'All') {
          return product.category.toLowerCase() === categoryFilter.toLowerCase()
        }
        return true
      })
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      )
  }, [products, categoryFilter, searchQuery])

  const featuredProducts = useMemo(
    () => products.filter((product) => product.is_featured),
    [products],
  )

  return {
    products,
    filteredProducts,
    featuredProducts,
    loading,
    error,
  }
}
