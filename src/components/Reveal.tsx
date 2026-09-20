import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Gentle fade-up reveal when the element scrolls into view.
 * Respects prefers-reduced-motion.
 */
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}