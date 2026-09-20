import type { CartState } from './cart'
import { siteConfig } from '../data/config'

const currency = siteConfig.currency

/**
 * Builds a shareable order message for the WhatsApp channel.
 * No external links are hard-coded — the number comes from config.
 */
export function buildWhatsAppOrderMessage(cart: CartState): string {
  const lines: string[] = []
  lines.push('Hi Pro-Pathra! I would like to order:')
  lines.push('')
  for (const item of cart.items) {
    const line = `${item.qty} × ${item.name} — ${currency}${item.unitPrice * item.qty}`
    lines.push(line)
    if (item.detail) lines.push(`   • ${item.detail}`)
  }
  lines.push('')
  lines.push(`Total: ${currency}${cart.items.reduce((s, i) => s + i.unitPrice * i.qty, 0)}`)
  lines.push('')
  lines.push('Please confirm availability & delivery. Thank you!')
  return lines.join('\n')
}

export function buildWhatsAppLink(message: string): string {
  const clean = siteConfig.whatsappNumber.replace(/[^\d]/g, '')
  if (!clean) return '#'
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}