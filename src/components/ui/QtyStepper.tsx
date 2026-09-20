/**
 * Quantity stepper for cart line items — accessible buttons.
 */
export default function QtyStepper({
  qty,
  onChange,
  min = 0,
  max = 99,
  ariaLabel,
}: {
  qty: number
  onChange: (next: number) => void
  min?: number
  max?: number
  ariaLabel: string
}) {
  const dec = () => {
    if (qty > min) onChange(qty - 1)
  }
  const inc = () => {
    if (qty < max) onChange(qty + 1)
  }
  return (
    <div className="inline-flex items-center rounded-full ring-1 ring-brand-green/25 bg-cream/70">
      <button
        type="button"
        onClick={dec}
        disabled={qty <= min}
        aria-label={`${ariaLabel}: decrease quantity`}
        className="w-7 h-7 grid place-items-center rounded-full text-brand-green hover:bg-brand-leaf/15 disabled:opacity-40 transition-colors"
      >
        <span aria-hidden className="text-sm leading-none">−</span>
      </button>
      <span className="w-8 text-center text-sm font-bold" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={qty >= max}
        aria-label={`${ariaLabel}: increase quantity`}
        className="w-7 h-7 grid place-items-center rounded-full text-brand-green hover:bg-brand-leaf/15 disabled:opacity-40 transition-colors"
      >
        <span aria-hidden className="text-sm leading-none">+</span>
      </button>
    </div>
  )
}