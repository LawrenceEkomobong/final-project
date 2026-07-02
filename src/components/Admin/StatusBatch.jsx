export default function StatusBadge({ status }) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',

    confirmed: 'bg-blue-100 text-blue-800',

    preparing: 'bg-orange-100 text-orange-800',

    ready: 'bg-purple-100 text-purple-800',

    'out for delivery':
      'bg-indigo-100 text-indigo-800',

    delivered: 'bg-green-100 text-green-800',

    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  )
}