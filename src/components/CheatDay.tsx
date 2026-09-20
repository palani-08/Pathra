import SectionHeading from './ui/SectionHeading'
import CTA from './ui/CTA'
import ProductCard from './ui/ProductCard'
import Icon from './ui/Icon'
import { cheatDayDishes } from '../data/products'
import { siteConfig } from '../data/config'

export default function CheatDay() {
  return (
    <section id="cheat-day" className="py-20 md:py-28 bg-brand-terra/10 relative overflow-hidden">
      <div className="absolute -right-20 -top-10 h-80 w-80 rounded-full bg-brand-turmeric/10 pointer-events-none" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-terra/10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Exclusive session"
          title="Cheat Day"
          sub="A planned exclusive menu of pure veg, fully desi dishes — rich, authentic and made for the occasional indulgence. Coming soon."
        />

        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-terra/15 px-4 py-2 text-sm font-bold text-[#8F4E2A] ring-1 ring-brand-terra/30">
            <Icon name="spice" className="w-4 h-4" strokeWidth={2.2} />
            Under planning · Pure veg · Authentic recipes
          </span>
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cheatDayDishes.map((d) => (
            <ProductCard key={d.id} product={d} />
          ))}
        </div>

        <div className="mt-12 rounded-card bg-brand-green text-cream p-8 md:p-10 shadow-lift relative overflow-hidden">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-brand-leaf/20 pointer-events-none" />
          <h3 className="text-2xl font-extrabold">Have a dish in mind?</h3>
          <p className="mt-3 text-base text-cream/80">
            We're planning the Cheat Day menu with our people. Tell us what you'd love to see and it might just make the list.
          </p>
          <div className="mt-6">
            <CTA
              href={buildWaLink()}
              external
              variant="light"
              size="lg"
              ariaLabel="Suggest a dish for the Cheat Day menu on WhatsApp"
            >
              <Icon name="whatsapp" className="w-4.5 h-4.5" strokeWidth={2} />
              Suggest a dish
            </CTA>
          </div>
        </div>
      </div>
    </section>
  )
}

function buildWaLink(): string {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, '')
  const message = 'Hi Pro-Pathra! I\'d like to suggest a dish for the Cheat Day menu: '
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}