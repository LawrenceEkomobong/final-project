export default function OrderFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  const statuses = [
    'all',
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'out for delivery',
    'delivered',
    'cancelled',
  ]

  return (
    <div className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">

      <input
        type="text"
        placeholder="Search by customer, phone, email or payment reference..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-brand-red"
      />

      <div className="mt-6 flex flex-wrap gap-3">

        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              statusFilter === status
                ? 'bg-brand-red text-white'
                : 'border border-gray-300 bg-white'
            }`}
          >
            {status === 'all'
              ? 'All Orders'
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}

      </div>

    </div>
  )
}