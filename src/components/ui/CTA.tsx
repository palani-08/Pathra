import type { ReactNode } from 'react'

export type CTAVariant = 'primary' | 'secondary' | 'light'

const variants: Record<CTAVariant, string> = {
  primary:
    'bg-brand-green text-cream hover:bg-[#1F4634] hover:-translate-y-0.5 focus-visible:outline-brand-leaf',
  secondary:
    'bg-transparent border-2 border-brand-green/35 text-brand-green hover:bg-brand-green/10 hover:-translate-y-0.5 focus-visible:outline-brand-leaf',
  light:
    'bg-cream text-brand-green hover:bg-[#F4E8C8] hover:-translate-y-0.5 focus-visible:outline-brand-turmeric',
}

type CTACopy = {
  children: ReactNode
  variant?: CTAVariant
  href?: string
  onClick?: () => void
  external?: boolean
  size?: 'md' | 'lg'
  fullWidth?: boolean
  ariaLabel?: string
  className?: string
}

/**
 * Reusable call-to-action button/link used across the whole site.
 */
export default function CTA({
  children,
  variant = 'primary',
  href,
  onClick,
  external = false,
  size = 'md',
  fullWidth = false,
  ariaLabel,
  className = '',
}: CTACopy) {
  const base = [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 cursor-pointer select-none',
    variants[variant],
    size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm',
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ')

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={base}>
        {children}
      </button>
    )
  }

  return (
    <a
      href={href ?? '#'}
      aria-label={ariaLabel}
      className={base}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}