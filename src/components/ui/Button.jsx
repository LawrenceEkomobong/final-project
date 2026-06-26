import { cn } from '../../utils/helpers.js'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-brand-red text-white hover:bg-brand-redHover shadow-sm',
    secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
    ghost: 'border border-white/10 bg-transparent text-white hover:bg-white/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/40',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
