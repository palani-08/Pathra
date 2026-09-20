import Logo from './ui/Logo'
import { siteConfig } from '../data/config'
import { buildWhatsAppLink } from '../lib/whatsapp'

export default function Footer() {
  const waLink = buildWhatsAppLink('Hi Pro-Pathra! I would like to know more about your menu.')
  const links = [
    { label: 'Instagram', href: '' }, // TODO: add Instagram profile URL
    { label: 'WhatsApp', href: waLink },
    { label: 'Order Now', href: '#order' },
    { label: 'Contact', href: '#order' },
  ]

  return (
    <footer className="bg-brand-green text-cream">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <a href="#home" className="flex items-center gap-2">
            <Logo tone="light" />
          </a>
            <p className="mt-2 text-sm text-cream/70">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6 text-sm font-semibold text-cream/85">
              {links.map((l) =>
                l.href ? (
                  <li key={l.label}>
                    <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="hover:text-brand-turmeric transition-colors">
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <span className="text-cream/50 cursor-not-allowed" title="Coming soon">{l.label}</span>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        <p className="mt-8 text-sm text-cream/60">{siteConfig.location}</p>
        <p className="mt-2 text-xs text-cream/50">© 2026 Pro-Pathra. All rights reserved.</p>
      </div>
    </footer>
  )
}