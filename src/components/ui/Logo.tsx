import { siteConfig } from '../../data/config'
import Icon from './Icon'

/**
 * Brand logo. If `siteConfig.logo.src` is set, renders the real logo
 * image; otherwise falls back to the inline wordmark + leaf mark.
 */
export default function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const textCls = tone === 'light' ? 'text-cream' : 'text-brand-green'
  const markCls = tone === 'light' ? 'bg-brand-leaf/30 text-cream' : 'bg-brand-green text-cream'

  if (siteConfig.logo?.src) {
    return (
      <span className={`flex items-center gap-2 ${className}`}>
        <img src={siteConfig.logo.src} alt={siteConfig.logo.alt ?? siteConfig.brandName} className="h-10 w-auto" />
      </span>
    )
  }

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span className={`grid w-9 h-9 place-items-center rounded-full ${markCls}`}>
        <Icon name="leaf" className="w-5 h-5" strokeWidth={2} />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${textCls}`}>{siteConfig.brandName}</span>
    </span>
  )
}