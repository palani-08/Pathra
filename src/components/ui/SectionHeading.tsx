import type { ReactNode } from 'react'

/**
 * Consistent section heading with eyebrow + title + optional sub.
 */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  tone = 'dark',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  align?: 'center' | 'left'
  tone?: 'dark' | 'light'
  className?: string
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleCls = tone === 'light' ? 'text-cream' : 'text-brand-charcoal'
  const subCls = tone === 'light' ? 'text-cream/80' : 'text-brand-charcoal/70'
  const eyebrowCls = tone === 'light' ? 'text-brand-turmeric' : 'text-brand-leaf'

  return (
    <div className={`max-w-3xl ${alignCls} ${className}`}>
      {eyebrow ? (
        <p className={`mt-2 text-sm font-semibold tracking-wide uppercase ${eyebrowCls}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`mt-3 text-3xl md:text-4xl font-bold leading-tight ${titleCls}`}>{title}</h2>
      {sub ? <p className={`mt-4 text-base md:text-lg ${subCls}`}>{sub}</p> : null}
    </div>
  )
}