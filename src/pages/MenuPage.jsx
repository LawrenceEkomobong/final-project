import { useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts.js'
import MenuSection from '../components/sections/MenuSection.jsx'

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { filteredProducts, loading } = useProducts(activeTab, searchQuery)

  return (
    <main className="pt-24">
      <MenuSection
        products={filteredProducts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        loading={loading}
      />
    </main>
  )
}
