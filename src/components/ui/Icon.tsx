/**
 * Lightweight inline SVG line icons — no icon library dependency.
 * Stroke-based, inherit currentColor for flexible theming.
 */

const paths: Record<string, string> = {
  // No added cooking oil — a droplet struck through
  noOil:
    'M12 4.5 a2.4 2.6 0 0 1 12 4.5 a2.4 2.6 0 0 1 12 9.5 Z M13.6 10.2 a1.9 2 0 0 1 13.6 10.2 Z M4 4 L20 20',
  // Protein first — a bold "P" with a leaf
  protein:
    'M8 4 L8 13 L8 20 M8 4 Q6 7 5 6 Q4.2 5.5 5 5.6 M10 10 L17 12 Q19 15 17.5 16.5 L11 18 Z',
  // Real ingredients — a fresh vegetable/leaf
  ingredients:
    'M12 5 L12 20 M12 8 Q8.5 6.5 6 8 Q5 9 6.5 9.5 M12 8 Q15.5 6.5 18 8 Q19 9 17.5 9.5 M12 12 Q8 11 6.5 13 Q5.5 15 7 15.5 M12 12 Q16 11 17.5 13 Q18.5 15 17 15.5',
  // South Indian soul — a small temple lamp / kuthu vilakku
  lamp:
    'M8 4 Q6 7 4 9 Q5.5 10 9 10.5 Q12.5 10 16 9 Q18 7 16 4 Z M10 10 L10 16 M10 16 Q12 18.5 14 19 Q16 18 18 16 Z M9.5 19 L14 21 M10 16 L10 16 M10 14 L10 14 M6.5 19 L7.5 21',
  // Choose
  choose:
    'M5 6 L10 6 M10 6 L10 11 M10 11 L15 11 M5 14 L10 14 M10 14 L10 19 M10 19 L15 19 M4.4 10.8 L4.4 10.8 M15.6 10.8 L15.6 10.8',
  // We prepare — a pot / bowl with steam
  prepare:
    'M6 14 L6 6 M6 14 L18 14 M18 14 L18 6 M7 8 L17 8 M8 12 L16 12 M7 16 L17 16 M10 2 q1.6 -2.4 2.6 -1 Z M15 2 q1.6 -2.4 2.6 -1 Z M18 3.4 q1.4 -2 2.2 -0.6 Z',
  // Deliver — a scooter / motorbike silhouette
  deliver:
    'M7 17 L7 7 M7 17 L19 17 M7 8 L19 8 M19 8 L19 17 M10 12.5 L14 12.5 M16 10 a2 2 0 0 1 16 10 Z M11 13 a2.4 2.4 0 0 1 11 13 Z',
  // Location pin
  pin: 'M12 4 L12 12 M12 12 L12 13 M9.4 13 Q8 15 8.6 16.6 Q9.6 18 10 19 Q11 19.4 12 19.6 L13.6 19.4 Q14.8 19 15.4 18.6 M9.4 13 Q10.8 14.4 10.8 15.4 Q12.2 15.8 14 16 Q14.6 16.2 15.4 16 Q15.4 16.2 14.6 16.6 Q14 16.8 13.6 17.2 L14.4 17.6 Q14.6 17.2 14.4 16.8 Z',
  // Cart / bag
  bag: 'M5 6 L19 6 L19 10 L5 10 Z M5 10 L5 18 L19 18 L19 10 Z M7 4 L9.6 4 Q10.6 5 11 6 Q11.4 6.6 10.6 6.8 M14 4 L16.6 4 Q17.6 5 18 6 Q18.4 6.6 17.6 6.8 M7 13 L8.2 13 M16 13 L17.2 13',
  // WhatsApp bubble
  whatsapp:
    'M9 4 Q7 6 6 7.4 Q5.2 8.8 6 9.8 Q6.8 10.4 8.4 10.8 Q9.8 10.8 11.2 10.4 Q12.6 10 13.4 9.2 Q13.8 8.4 13.2 7.8 Q12.8 7.2 12.6 6.4 Q12.4 5.6 12 5 Q11 4.6 10 4.2 Z M6.6 8.4 a3.4 3.4 0 0 1 6.6 8.4 Z',
  // Leaf (brand / veg)
  leaf: 'M12 4 L12 20 M12 6.5 Q8 5 5 6.5 Q4 8.5 5.6 9.5 M12 6.5 Q16 5 19 6.5 Q20 8.5 18.4 9.5 M12 13 Q8 12 5.8 14.4 Q5 17 7 17.6 M12 13 Q16 12 18.2 14.4 Q19 17 17 17.6',
  // Flame / spice
  spice:
    'M12 15 L12 6 M12 8 Q9.4 5.6 7 6.2 Q6.2 8 7 9.4 M12 8 Q14.6 5.6 17 6.2 Q17.8 8 17 9.4 M12 15 L12 18 M11 18 L9.6 19.4 M13 18 L14.4 19.4',
  // Arrow
  arrow: 'M4 12 L17 12 M17 12 L19 14 M17 12 L19 10',
}

export default function Icon({
  name,
  className = 'w-6 h-6',
  strokeWidth = 1.8,
  ariaLabel,
}: {
  name: string
  className?: string
  strokeWidth?: number
  ariaLabel?: string
}) {
  const d = paths[name] ?? paths.leaf
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
    >
      {ariaLabel ? <title>{ariaLabel}</title> : null}
      <path d={d} />
    </svg>
  )
}