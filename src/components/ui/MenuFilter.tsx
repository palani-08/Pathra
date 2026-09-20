import type { Diet } from '../../data/products'
import DietBadge from './DietBadge'

export type DietFilter = 'all' | Diet

/**
 * Veg / Non-Veg / All filter chips with counts.
 */
export default function MenuFilter({
  active,
  counts,
  onChange,
}: {
  active: DietFilter
  counts: { all: number; veg: number; nonveg: number }
  onChange: (filter: DietFilter) => void
}) {
  const options: { id: DietFilter; label: string; count: number; diet?: Diet }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'veg', label: 'Veg', count: counts.veg, diet: 'veg' },
    { id: 'nonveg', label: 'Non-Veg', count: counts.nonveg, diet: 'nonveg' },
  ]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by veg or non-veg">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={active === o.id}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            active === o.id
              ? 'bg-brand-green text-cream ring-2 ring-brand-green shadow-soft'
              : 'bg-white/80 text-brand-charcoal/70 ring-1 ring-brand-green/20 hover:bg-brand-leaf/10'
          }`}
        >
          {o.diet ? <DietBadge diet={o.diet} /> : (
            <span className="grid w-4 h-4 place-items-center rounded-full bg-brand-leaf/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            </span>
          )}
          {o.label}
          <span className={`text-[11px] font-bold ${active === o.id ? 'text-cream/80' : 'text-brand-charcoal/45'}`}>
            {o.count}
          </span>
        </button>
      ))}
    </div>
  )
}