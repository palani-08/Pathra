import { useState } from 'react'
import type { Product } from '../../data/products'
import { siteConfig } from '../../data/config'
import BowlArt from '../art/BowlArt'
import NutritionBadge from './NutritionBadge'
import DietBadge from './DietBadge'
import { useCart } from '../../lib/CartContext'
import Icon from './Icon'

/**
 * Reusable product card for bowls, wraps and soups.
 * All pricing/art data comes from the product object — change the
 * data layer, and every card updates automatically.
 */
export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const comingSoon = product.available === false

  const addToOrder = () => {
    if (comingSoon) return
    add({ key: product.id, kind: 'product', name: product.name, unitPrice: product.price })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  const currency = siteConfig.currency
  const badge = product.badge

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-card ${
        comingSoon ? 'bg-[#F4EAD8]/85 ring-1 ring-brand-terra/25' : 'bg-white/85 ring-1 ring-brand-green/10'
      } shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300 ${
        compact ? 'gap-3' : 'gap-4'
      }`}
    >
      <div className={`relative ${compact ? 'h-32' : product.image ? 'aspect-[3/2]' : 'aspect-square'} bg-brand-cream/60`}>
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.name} — ${product.blurb}`}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <BowlArt art={product.art ?? { base: 'rice' }} className="h-full w-full" />
        )}
        {comingSoon ? (
          <NutritionBadge value="Coming Soon" kind="flag" className="absolute left-3 top-3" />
        ) : (
          badge ? (
            <NutritionBadge
              value={badge.text}
              kind={badge.tone === 'green' ? 'veg' : 'flag'}
              className="absolute left-3 top-3"
            />
          ) : null
        )}
      </div>

      <div className={`px-4 pt-1 ${compact ? 'gap-1.5' : 'gap-2'} flex flex-col`}>
        <div className="flex items-center justify-between gap-2">
        <h3 className="text-base md:text-lg font-bold text-brand-charcoal leading-snug">{product.name}</h3>
        <DietBadge diet={product.diet} className="shrink-0" />
      </div>
        {!compact ? <p className="text-xs md:text-sm text-brand-charcoal/65 leading-relaxed">{product.blurb}</p> : null}
        <p className="text-[11px] md:text-xs text-brand-charcoal/55 line-clamp-2 leading-relaxed">
          {product.ingredients.join(' + ')}
        </p>

        <div className="flex items-center gap-2 mt-auto flex-wrap">
          {product.nutrition ? (
            <NutritionBadge label={product.nutrition.label} value={product.nutrition.value} kind={product.nutrition.kind} />
          ) : null}
          <span className="text-xs font-semibold text-brand-terra/90">{product.type === 'soup' ? 'Warm & light' : ''}</span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          {comingSoon ? (
            <p className="text-sm font-bold text-brand-terra">In planning</p>
          ) : (
            <p className="text-xl font-extrabold text-brand-green">
              {currency}
              {product.price}
              <span className="text-[11px] text-brand-charcoal/50 font-medium"> / bowl</span>
            </p>
          )}
          {comingSoon ? (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold bg-brand-terra/10 text-[#8F4E2A] ring-1 ring-brand-terra/25">
              <Icon name="spice" className="w-3.5 h-3.5" strokeWidth={2.2} />
              Coming soon
            </span>
          ) : (
            <button
              type="button"
              onClick={addToOrder}
              disabled={justAdded}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all ${
                justAdded ? 'bg-brand-leaf/15 text-brand-leaf' : 'bg-brand-green text-cream hover:bg-[#1F4634]'
              }`}
            >
              <Icon name={justAdded ? 'leaf' : 'bag'} className="w-3.5 h-3.5" strokeWidth={2.2} />
              {justAdded ? 'Added' : 'Add to order'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}