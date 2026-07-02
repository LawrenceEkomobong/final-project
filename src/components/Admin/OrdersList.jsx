import OrderCard from './OrderCard'

export default function OrdersList({ filteredOrders, setOrders }) {
  if (filteredOrders.length === 0) {
    return (
      <p className="text-sm text-[#4F4F4F]">
        No orders found.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {filteredOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          setOrders={setOrders}
        />
      ))}
    </div>
  )
}