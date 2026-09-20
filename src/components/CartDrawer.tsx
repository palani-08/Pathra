import { useEffect, useRef } from 'react'
import { useCart } from '../lib/CartContext'
import { siteConfig } from '../data/config'
import { buildWhatsAppOrderMessage, buildWhatsAppLink } from '../lib/whatsapp'
import QtyStepper from './ui/QtyStepper'
import CTA from './ui/CTA'
import Icon from './ui/Icon'

export default function CartDrawer() {
  const { cart, isOpen, closeCart, setQty, remove, clear } = useCart()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  const currency = siteConfig.currency
  const total = cart.items.reduce((s, i) => s + i.unitPrice * i.qty, 0)
  const waLink = buildWhatsAppLink(buildWhatsAppOrderMessage(cart))

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close order summary"
        onClick={closeCart}
        className="absolute inset-0 bg-brand-charcoal/45 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order summary"
        className="fixed right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-brand-cream shadow-lift"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#FCF3DC] border-b border-brand-green/15">
          <h2 className="text-lg font-extrabold text-brand-green">Your Order</h2>
          <div className="flex items-center gap-2">
            {cart.items.length ? (
              <button
                type="button"
                onClick={clear}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-brand-terra/80 hover:bg-brand-terra/10"
              >
                Clear all
              </button>
            ) : null}
            <button
              ref={closeRef}
              type="button"
              onClick={closeCart}
              aria-label="Close order summary"
              className="grid w-9 h-9 place-items-center rounded-full bg-brand-green/10 text-brand-green hover:bg-brand-green/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                <path d="M6 6 L18 6 M6 18 L18 18 M18 6 L6 18 M6 6 L18 18" />
              </svg>
            </button>
          </div>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <span className="grid place-items-center rounded-full w-20 h-20 bg-brand-leaf/12 text-brand-green">
              <Icon name="bag" className="w-10 h-10" strokeWidth={1.7} />
            </span>
            <p className="text-lg font-bold text-brand-charcoal">Your pātra bag is empty</p>
            <p className="text-sm text-brand-charcoal/60">Add a bowl, wrap or soup to get started.</p>
            <CTA onClick={closeCart}>Browse the menu</CTA>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 px-5 py-6">
            {cart.items.map((item) => (
              <li key={item.key} className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-brand-charcoal leading-snug">{item.name}</p>
                    {item.detail ? <p className="mt-0.5 text-xs text-brand-charcoal/55 line-clamp-2">{item.detail}</p> : null}
                    <p className="mt-1 text-xs text-brand-charcoal/60">
                      {currency}
                      {item.unitPrice}
                      {' '}each
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.key)}
                    aria-label={`Remove ${item.name} from order`}
                    className="text-xs font-semibold text-brand-terra/80 hover:text-brand-terra"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <QtyStepper qty={item.qty} onChange={(q) => setQty(item.key, q)} ariaLabel={item.name} />
                  <p className="text-base font-extrabold text-brand-green">
                    {currency}
                    {item.unitPrice * item.qty}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.items.length > 0 ? (
          <div className="rounded-card bg-white/90 ring-1 ring-brand-green/10 shadow-soft mx-5 p-5">
            <div className="flex items-center justify-between text-sm font-bold text-brand-charcoal">
              <span>Subtotal</span>
              <span className="text-brand-green">
                {currency}
                {total}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-brand-charcoal/55">
              Delivery & packaging charged at checkout. Payment handled on WhatsApp / delivery partner.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <CTA href={waLink} external size="lg" fullWidth ariaLabel="Place your order on WhatsApp">
                <Icon name="whatsapp" className="w-4.5 h-4.5" strokeWidth={2} />
                Place Order on WhatsApp
              </CTA>
              <CTA onClick={closeCart} variant="secondary" fullWidth>
                Continue browsing
              </CTA>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  )
}