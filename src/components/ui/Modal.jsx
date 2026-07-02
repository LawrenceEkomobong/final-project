export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-md border border-white/10 bg-white text-[#1C1C1C] shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#F9F8F6] px-6 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" onClick={onClose} className="text-sm font-semibold text-gray-600 transition hover:text-gray-900">
            close
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
