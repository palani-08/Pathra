import { useState } from 'react'
import type { DietFilter } from './ui/MenuFilter'
import SectionHeading from './ui/SectionHeading'
import MenuFilter from './ui/MenuFilter'
import ProductCard from './ui/ProductCard'
import { bowls, nutritionDisclaimer } from '../data/products'

export default function Bowls() {
  const [filter, setFilter] = useState<DietFilter>('all')
  const counts = {
    all: bowls.length,
    veg: bowls.filter((p) => p.diet === 'veg').length,
    nonveg: bowls.filter((p) => p.diet === 'nonveg').length,
  }
  const visible = filter === 'all' ? bowls : bowls.filter((p) => p.diet === filter)

  return (
    <section id="bowls" className="py-20 md:py-28 bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Protein Bowls"
          title="Meet Your Pātra"
          sub="Balanced bowls made for everyday eating. Served in a natural areca-leaf pātra."
        />

        <div className="mt-8 flex justify-center">
          <MenuFilter active={filter} counts={counts} onChange={setFilter} />
        </div>

        {visible.length ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm text-brand-charcoal/55">
            No {filter === 'veg' ? 'veg' : 'non-veg'} bowls here — check the wraps & soups.
          </p>
        )}

        <p className="mt-8 text-center text-xs text-brand-charcoal/55">{nutritionDisclaimer}</p>
      </div>
    </section>
  )
}