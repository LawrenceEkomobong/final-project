import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ImageUploader({ value, onUpload }) {
  const [uploading, setUploading] = useState(false)

  const uploadImage = async (event) => {
    const file = event.target.files[0]
    if (!file) return

if (file.size > 5 * 1024 * 1024) {
  alert('Image must be less than 5MB.')
  return
}

    if (!file) return

    setUploading(true)

    const fileExt = file.name.split('.').pop()

const fileName = `${crypto.randomUUID()}.${fileExt}`

    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, file)

    if (error) {
      console.error(error)
      setUploading(false)
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)

    onUpload(publicUrl)

    setUploading(false)
    event.target.value = ''
  }

  return (
    <div className="space-y-3">

      {value && (
        <img
          src={value}
          alt="Preview"
          className="h-48 w-full rounded-md object-cover"
        />
      )}

      <input
  type="file"
  accept=".jpg,.jpeg,.png,.webp"
  onChange={uploadImage}
  className="block w-full rounded-md border border-gray-300 p-3"
/>
      {uploading && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}

    </div>
  )
}