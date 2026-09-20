import { useState } from 'react'
import type { DietFilter } from './ui/MenuFilter'
import SectionHeading from './ui/SectionHeading'
import MenuFilter from './ui/MenuFilter'
import ProductCard from './ui/ProductCard'
import { soups } from '../data/products'

export default function Soups() {
  const [filter, setFilter] = useState<DietFilter>('all')
  const counts = {
    all: soups.length,
    veg: soups.filter((p) => p.diet === 'veg').length,
    nonveg: soups.filter((p) => p.diet === 'nonveg').length,
  }
  const visible = filter === 'all' ? soups : soups.filter((p) => p.diet === filter)

  return (
    <section id="soups" className="py-20 md:py-28 bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Soups"
          title="Warm. Simple. Nourishing."
          sub="Made fresh every day — the way a home kitchen would."
        />

        <div className="mt-8 flex justify-center">
          <MenuFilter active={filter} counts={counts} onChange={setFilter} />
        </div>

        {visible.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm text-brand-charcoal/55">
            No {filter === 'veg' ? 'veg' : 'non-veg'} soups here — check the bowls & wraps.
          </p>
        )}
      </div>
    </section>
  )
}