import { formatCurrency } from '../../utils/helpers'

export default function DashboardStats({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-red">
          Total Orders
        </p>

        <p className="mt-4 text-5xl font-semibold">
          {stats.totalOrders}
        </p>
      </div>

      <div className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-red">
          Pending
        </p>

        <p className="mt-4 text-5xl font-semibold">
          {stats.pendingOrders}
        </p>
      </div>

      <div className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-red">
          Delivered
        </p>

        <p className="mt-4 text-5xl font-semibold">
          {stats.deliveredOrders}
        </p>
      </div>

      <div className="rounded-md border border-[#E2DEC9] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-red">
          Revenue
        </p>

        <p className="mt-4 text-5xl font-semibold">
          {formatCurrency(stats.totalRevenue)}
        </p>
      </div>

    </div>
  )
}