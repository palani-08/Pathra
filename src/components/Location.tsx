import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import { siteConfig } from '../data/config'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { useCart } from '../lib/CartContext'

export default function Location() {
  const { cart } = useCart()
  const waLink = buildWhatsAppLink(
    cart.items.length
      ? `Hi Pro-Pathra! I'd like to order:\n${cart.items.map((i) => `• ${i.qty} × ${i.name}`).join('\n')}`
      : 'Hi Pro-Pathra! I would like to place an order.',
  )

  return (
    <section id="order" className="py-20 md:py-28 bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Location & delivery"
          title="Serving Mettupalayam & Karamadai"
          sub="Order through the channel that suits you. Fresh bowls, delivered near you."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-leaf">We deliver to</p>
            <ul className="mt-4 flex flex-col gap-3 text-base">
              {siteConfig.areas.map((area) => (
                <li key={area} className="flex items-center gap-3">
                  <span className="grid place-items-center rounded-full w-9 h-9 bg-brand-terra/10 text-brand-terra">
                    <Icon name="pin" className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="font-semibold text-brand-charcoal">{area}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-brand-charcoal/55">Delivery availability may vary by location.</p>
          </div>

          <div className="rounded-card bg-brand-green text-cream p-8 shadow-soft relative overflow-hidden bg-grain-deep">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-leaf/20 pointer-events-none" />
            <p className="text-sm font-bold uppercase tracking-wide text-cream/70">Order now</p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-cream px-6 py-3.5 text-base font-bold text-brand-green hover:bg-[#F4E8C8] hover:-translate-y-0.5 transition-all"
              >
                <Icon name="whatsapp" className="w-5 h-5" strokeWidth={2} />
                Order on WhatsApp
              </a>

              {siteConfig.orderChannels
                .filter((c) => c.id !== 'whatsapp')
                .map((c) =>
                  c.url ? (
                    <a
                      key={c.id}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-full ring-1 ring-cream/40 px-6 py-3 text-sm font-bold text-cream hover:bg-cream/15 transition-all"
                    >
                      {c.label}
                    </a>
                  ) : (
                    <span
                      key={c.id}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full ring-1 ring-cream/30 px-6 py-3 text-sm font-bold text-cream/60 cursor-not-allowed"
                      title="Coming soon"
                    >
                      {c.label} — coming soon
                    </span>
                  ),
                )}
            </div>
            <p className="mt-4 text-xs text-cream/60">{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}