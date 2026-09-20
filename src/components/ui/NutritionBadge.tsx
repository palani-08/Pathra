export type NutritionKind = 'protein' | 'veg' | 'flag'

const tones: Record<string, string> = {
  turmeric: 'bg-brand-turmeric/15 text-[#8A6B1E]',
  green: 'bg-brand-leaf/15 text-brand-green',
  terra: 'bg-brand-terra/12 text-[#8F4E2A]',
  cream: 'bg-cream/90 text-brand-green',
}

/**
 * Small pill that surfaces a nutrition figure or a product badge.
 */
export default function NutritionBadge({
  label,
  value,
  kind = 'protein',
  className = '',
}: {
  label?: string
  value: string
  kind?: NutritionKind
  className?: string
}) {
  const tone = kind === 'veg' ? tones.green : kind === 'flag' ? tones.turmeric : tones.green
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone} ${className}`}
    >
      {label ? (
        <span className="opacity-70">{label}</span>
      ) : null}
      <span>{value}</span>
    </span>
  )
}