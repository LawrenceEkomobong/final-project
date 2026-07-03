import { useState } from 'react'
import ImageUploader from './ImageUploader'

export default function ProductForm({
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || 'food',
    image_url: initialData.image_url || '',
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) =>
          handleChange('name', e.target.value)
        }
        className="w-full rounded-md border px-4 py-3"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          handleChange('description', e.target.value)
        }
        className="w-full rounded-md border px-4 py-3"
        rows={4}
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          handleChange('price', e.target.value)
        }
        className="w-full rounded-md border px-4 py-3"
      />

      <select
        value={form.category}
        onChange={(e) =>
          handleChange('category', e.target.value)
        }
        className="w-full rounded-md border px-4 py-3"
      >
        <option value="food">Food</option>
        <option value="cakes">Cakes</option>
        <option value="drinks">Drinks</option>
      </select>

     <ImageUploader
  value={form.image_url}
  onUpload={(url) =>
    setForm((prev) => ({
      ...prev,
      image_url: url,
    }))
  }
/>

      <div className="flex gap-3">

        <button
          type="submit"
          className="flex-1 rounded-md bg-red-500 py-3 font-semibold text-white"
        >
          Save Product
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-md border py-3"
        >
          Cancel
        </button>

      </div>

    </form>
  )
}