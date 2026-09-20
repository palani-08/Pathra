/**
 * ------------------------------------------------------------------
 * Pro-Pathra — Site configuration
 * ------------------------------------------------------------------
 * Central place for order channels & contact details.
 * Replace the placeholder values below before launch.
 * Keep any real phone numbers / links out of version control.
 */

export type OrderChannel = {
  id: 'whatsapp' | 'swiggy' | 'zomato'
  label: string
  hint: string
  /** Leave empty to keep a channel "coming soon" style / hidden behind config. */
  url: string
}

export type SiteConfig = {
  brandName: string
  tagline: string
  location: string
  areas: string[]
  currency: string
  /** WhatsApp number in international format, digits only (e.g. 919840000000). */
  whatsappNumber: string
  orderChannels: OrderChannel[]
  /** Logo swap point — drop in your real logo file/URL here later. */
  logo?: { src: string; alt: string }
}

export const siteConfig: SiteConfig = {
  brandName: 'Pro-Pathra',
  tagline: 'Namma Food. More Protein.',
  location: 'Mettupalayam • Karamadai • Tamil Nadu',
  areas: ['Mettupalayam', 'Karamadai'],
  currency: '₹',
  whatsappNumber: '919000000000', // TODO: replace with the real business number
  logo: { src: '', alt: 'Pro-Pathra logo' }, // TODO: add the real logo path/URL when ready
  orderChannels: [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      hint: 'Chat & order directly',
      url: '', // auto-built from whatsappNumber + cart message
    },
    {
      id: 'swiggy',
      label: 'Swiggy',
      hint: 'Order on Swiggy',
      url: '', // TODO: add Swiggy store URL
    },
    {
      id: 'zomato',
      label: 'Zomato',
      hint: 'Order on Zomato',
      url: '', // TODO: add Zomato store URL
    },
  ],
}