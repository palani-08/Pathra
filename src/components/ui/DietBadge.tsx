import type { Diet } from '../../data/products'

/**
 * Indian-style veg / non-veg symbol: green square+dot for veg,
 * brown triangle for non-veg.
 */
export default function DietBadge({
  diet,
  withLabel = false,
  className = '',
}: {
  diet: Diet
  withLabel?: boolean
  className?: string
}) {
  const isVeg = diet === 'veg'
  const color = isVeg ? '#4C8C3F' : '#B06A3A'
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
        isVeg ? 'text-[#3F6B2E]' : 'text-[#8F4E2A]'
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
        <rect x="4.5" y="4.5" width="15" height="15" rx="1.5" fill="none" stroke={color} strokeWidth="2.4" />
        {isVeg ? (
          <circle cx="12" cy="12" r="3.4" fill={color} />
        ) : (
          <path d="M12 6.5 L17.5 17.5 L6.5 17.5 Z" fill={color} stroke={color} strokeWidth="0.5" />
        )}
      </svg>
      {withLabel ? <span>{isVeg ? 'Veg' : 'Non-Veg'}</span> : null}
    </span>
  )
}