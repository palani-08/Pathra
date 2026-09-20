import { useState } from 'react'
import type { DietFilter } from './ui/MenuFilter'
import SectionHeading from './ui/SectionHeading'
import MenuFilter from './ui/MenuFilter'
import ProductCard from './ui/ProductCard'
import { wraps } from '../data/products'

export default function Wraps() {
  const [filter, setFilter] = useState<DietFilter>('all')
  const counts = {
    all: wraps.length,
    veg: wraps.filter((p) => p.diet === 'veg').length,
    nonveg: wraps.filter((p) => p.diet === 'nonveg').length,
  }
  const visible = filter === 'all' ? wraps : wraps.filter((p) => p.diet === filter)

  return (
    <section id="wraps" className="py-20 md:py-28 bg-brand-cream bg-grain">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Protein Wraps"
          title="Protein. Wrapped."
          sub="Our protein wraps use a protein-focused chapati with fresh fillings and no added cooking oil."
        />

        <div className="mt-8 flex justify-center">
          <MenuFilter active={filter} counts={counts} onChange={setFilter} />
        </div>

        {visible.length ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm text-brand-charcoal/55">
            No {filter === 'veg' ? 'veg' : 'non-veg'} wraps here — check the bowls & soups.
          </p>
        )}
      </div>
    </section>
  )
}