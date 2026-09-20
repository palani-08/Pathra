import { useEffect, useState } from 'react'
import { useCart } from '../lib/CartContext'
import Icon from './ui/Icon'
import CTA from './ui/CTA'
import Logo from './ui/Logo'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#bowls', label: 'Bowls' },
  { href: '#wraps', label: 'Wraps' },
  { href: '#soups', label: 'Soups' },
  { href: '#cheat-day', label: 'Cheat Day' },
  { href: '#build', label: 'Build Your Bowl' },
  { href: '#about', label: 'About' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow ${
        scrolled ? 'shadow-soft bg-[#FCF3DC]/95 backdrop-blur' : 'bg-[#FCF3DC]/90 backdrop-blur'
      }`}
    >
      <nav aria-label="Main" className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <a href="#home" onClick={close} className="flex items-center gap-2" aria-label="Pro-Pathra home">
            <Logo />
          </a>

          <ul className="hidden md:flex items-center gap-6 text-sm font-semibold text-brand-charcoal/80">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-brand-green transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open order summary${count ? `, ${count} items` : ''}`}
              className="relative grid w-10 h-10 place-items-center rounded-full bg-brand-green/10 text-brand-green hover:bg-brand-green/20 transition-colors"
            >
              <Icon name="bag" className="w-5 h-5" strokeWidth={2} />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid w-5 h-5 place-items-center rounded-full bg-brand-terra text-cream text-[10px] font-bold">
                  {count > 99 ? '99' : count}
                </span>
              ) : null}
            </button>

            <CTA onClick={openCart} className="hidden sm:inline-flex" ariaLabel="Order now from the menu">
              Order Now
            </CTA>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid md:hidden w-10 h-10 place-items-center rounded-lg text-brand-green"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                {open ? (
                  <path d="M6 6 L18 6 M6 18 L18 18 M12 12 L12 12" />
                ) : (
                  <path d="M6 7 L18 7 M6 12 L18 12 M6 17 L18 17" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <div className="md:hidden border-t border-brand-green/15">
            <ul className="flex flex-col gap-1 px-2 py-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-charcoal/85 hover:bg-brand-leaf/10 hover:text-brand-green"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <CTA
                  onClick={() => {
                    close()
                    openCart()
                  }}
                  fullWidth
                  size="lg"
                >
                  Order Now
                </CTA>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  )
}