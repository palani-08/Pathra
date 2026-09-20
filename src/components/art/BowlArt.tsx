import type { BowlArt } from './types'

/**
 * BowlArt — a hand-drawn style SVG illustration of a pātra bowl,
 * wrap or soup, generated from the product's `art` recipe data.
 * All colours stay within the brand's earthy palette.
 */

type Pt = { x: number; y: number }

const rim = { cx: 200, cy: 168, rx: 154, ry: 46 }

function scatter(n: number, seed: number, inset = 0.15): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < n; i++) {
    const s = (seed + i * 73.6) % 100
    const s2 = (seed * 1.7 + i * 37.3) % 100
    const t = s / 100
    const a = (s2 / 100) * Math.PI * 2
    const rad = Math.sqrt(t) * (1 - inset)
    const x = Math.cos(a) * rad
    const y = Math.sin(a) * rad * 0.42
    pts.push({ x, y })
  }
  return pts
}

function place(baseX: number, baseY: number, spread: number, seed: number, count = 1): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < count; i++) {
    const s = (seed + i * 41.9) % 100
    const a = s / 100 * Math.PI * 2
    const r = (s % 37) / 37 * spread
    pts.push({ x: baseX + Math.cos(a) * r, y: baseY + Math.sin(a) * r * 0.5 })
  }
  return pts
}

function baseMound(base: BowlArt['base']) {
  if (base === 'jeerarice') {
    return (
      <g>
        <ellipse cx={200} cy={186} rx={120} ry={34} fill="#F1E3C8" />
        <ellipse cx={188} cy={176} rx={92} ry={26} fill="#EBD9B4" />
        <ellipse cx={214} cy={196} rx={74} ry={20} fill="#F1E3C8" />
        {scatter(26, 3).map((p) => (
          <circle key={`j${p.x}${p.y}`} cx={200 + p.x * 120} cy={188 + p.y * 46} r={1.4} fill="#7A5A2E" opacity={0.9} />
        ))}
      </g>
    )
  }
  if (base === 'millet') {
    return (
      <g>
        <ellipse cx={200} cy={186} rx={120} ry={34} fill="#E9D6A0" />
        <ellipse cx={188} cy={176} rx={92} ry={26} fill="#DFC88A" />
        <ellipse cx={214} cy={196} rx={74} ry={20} fill="#E9D6A0" />
        {scatter(18, 5).map((p) => (
          <circle key={`m${p.x}${p.y}`} cx={200 + p.x * 115} cy={188 + p.y * 44} r={1.8} fill="#C9A25E" opacity={0.8} />
        ))}
      </g>
    )
  }
  return (
    <g>
      <ellipse cx={200} cy={186} rx={120} ry={34} fill="#F6EEDC" />
      <ellipse cx={188} cy={176} rx={92} ry={26} fill="#F0E5CD" />
      <ellipse cx={214} cy={196} rx={74} ry={20} fill="#F6EEDC" />
      {scatter(20, 7).map((p) => (
        <circle key={`r${p.x}${p.y}`} cx={200 + p.x * 118} cy={188 + p.y * 45} r={1.2} fill="#E4D7B8" opacity={0.7} />
      ))}
    </g>
  )
}

function proteinShape(kind: string, index: number) {
  const pts = place(168 + (index % 3) * 30, 156 + (index % 2) * 26, 22, 11 + index * 17, 3)
  switch (kind) {
    case 'chicken':
      return pts.map((p, i) => (
        <g key={`ck${index}${i}`}>
          <rect x={p.x - 11} y={p.y - 8} width={22} height={16} rx={5} fill="#B96B45" transform={`rotate(${(i * 31 + index * 13) % 360} ${p.x} ${p.y})`} />
          <rect x={p.x - 11} y={p.y - 8} width={22} height={16} rx={5} fill="none" stroke="#8F4E30" strokeWidth={1} opacity={0.5} />
          <path d={`M ${p.x - 4} ${p.y - 3} q 6 3 10 -2`} fill="none" stroke="#9C5A32" strokeWidth={1.1} opacity={0.6} />
        </g>
      ))
    case 'eggwhite':
      return pts.map((p, i) => (
        <path key={`ew${index}${i}`} d={`M ${p.x - 9} ${p.y - 5} Q ${p.x - 4} ${p.y - 10} ${p.x + 4} ${p.y - 4} Q ${p.x + 8} ${p.y + 4} ${p.x + 5} ${p.y + 7} Q ${p.x - 2} ${p.y + 9} ${p.x - 9} ${p.y + 3} Z`} fill={i % 2 === 0 ? '#F4EBDD' : '#F0E2CE'} stroke="#E4D3B4" strokeWidth={0.8} />
      ))
    case 'egg':
      return (
        <ellipse key={`eg${index}`} cx={168 + index * 8} cy={172} rx={15} ry={10} fill="#EED49B" />
      )
    case 'chickpea':
      return pts.map((p, i) => (
        <circle key={`cp${index}${i}`} cx={p.x} cy={p.y} r={4.6} fill="#D8B57C" stroke="#C29B62" strokeWidth={0.8} />
      ))
    case 'chana':
      return pts.map((p, i) => (
        <circle key={`cn${index}${i}`} cx={p.x} cy={p.y} r={4.2} fill="#8A6B4F" stroke="#6F5338" strokeWidth={0.8} />
      ))
    case 'rajma':
      return pts.map((p, i) => (
        <ellipse key={`rj${index}${i}`} cx={p.x} cy={p.y} rx={5.4} ry={3.4} fill="#7A3B2E" stroke="#5E2B20" strokeWidth={0.8} transform={`rotate(${i * 42 + index * 20} ${p.x} ${p.y})`} />
      ))
    case 'paneer':
      return pts.map((p, i) => (
        <rect key={`pn${index}${i}`} x={p.x - 5.5} y={p.y - 5.5} width={11} height={11} rx={2.5} fill="#FBF3E4" stroke="#E7D6B6" strokeWidth={0.8} transform={`rotate(${(i * 29 + index * 7) % 360} ${p.x} ${p.y})`} />
      ))
    default:
      return null
  }
}

function vegShapes(kind: string, seed: number) {
  const pts = scatter(4, seed, 0.28)
  switch (kind) {
    case 'carrot':
      return pts.map((p, i) => (
        <rect key={`cr${i}`} x={200 + p.x * 120 - 5} y={205 + p.y * 44 - 2.6} width={10} height={5.2} rx={2.4} fill="#E8853D" transform={`rotate(${i * 47 + 20} ${200 + p.x * 120} ${205 + p.y * 44})`} />
      ))
    case 'tomato':
      return pts.map((p, i) => (
        <circle key={`tm${i}`} cx={200 + p.x * 115} cy={202 + p.y * 42} r={4} fill="#D95B43" stroke="#B84A36" strokeWidth={0.8} />
      ))
    case 'onion':
      return pts.map((p, i) => (
        <path key={`on${i}`} d={`M ${200 + p.x * 112 - 4} ${202 + p.y * 42} Q ${200 + p.x * 112} ${202 + p.y * 42 - 5} ${200 + p.x * 112 + 4} ${202 + p.y * 42} Q ${200 + p.x * 112} ${202 + p.y * 42 + 4} ${200 + p.x * 112 - 4} ${202 + p.y * 42} Z`} fill="#A35C7A" />
      ))
    case 'corn':
      return pts.map((p, i) => (
        <circle key={`cn${i}`} cx={200 + p.x * 118} cy={202 + p.y * 42} r={2.3} fill="#E7B94C" stroke="#C9993A" strokeWidth={0.6} />
      ))
    default:
      return null
  }
}

function dressingShape(kind: string) {
  if (kind === 'curd') {
    return (
      <g>
        <path d="M 185 152 C 192 144 205 148 214 158 C 208 166 196 162 185 152 Z" fill="#FFFDF2" opacity={0.96} />
        <path d="M 192 156 C 196 150 202 152 206 158 Z" fill="#F6EEDC" opacity={0.7} />
        <circle cx={199} cy={162} r={2} fill="#E7B94C" opacity={0.5} />
      </g>
    )
  }
  if (kind === 'lemon') {
    return (
      <g>
        <path d="M 208 150 A 13 11 0 0 1 208 150 Z" fill="#E7B94C" />
        <path d="M 208 150 A 13 11 0 0 1 208 150 Z" fill="#F4D675" transform="translate(-3 0) scale(0.7)" />
        <path d="M 205 150 L 211 150" stroke="#D9A93E" strokeWidth={1.4} />
      </g>
    )
  }
  return null
}

function garnishShapes(kind: string, seed: number) {
  const pts = scatter(2, seed, 0.4)
  switch (kind) {
    case 'lemon':
      return pts.map((p, i) => (
        <path key={`lg${i}`} d={`M ${200 + p.x * 100 - 6} ${172 + p.y * 30} A 6.5 5.5 0 0 1 ${200 + p.x * 100 - 6} ${172 + p.y * 30} Z`} fill="#E7B94C" stroke="#C9993A" strokeWidth={0.8} />
      ))
    case 'chilli':
      return pts.map((p, i) => (
        <path key={`ch${i}`} d={`M ${200 + p.x * 105} ${168 + p.y * 30} Q ${200 + p.x * 105 + 5} ${168 + p.y * 30 - 7} ${200 + p.x * 105 + 9} ${168 + p.y * 30 - 2} Z`} fill="#4C7A3D" stroke="#3A5F2E" strokeWidth={0.7} />
      ))
    case 'pepper':
      return scatter(8, seed * 2 + 3, 0.4).map((p, i) => (
        <circle key={`pp${i}`} cx={200 + p.x * 105} cy={170 + p.y * 30} r={1.1} fill="#3B342B" />
      ))
    case 'coriander':
      return pts.map((p, i) => (
        <path key={`cd${i}`} d={`M ${200 + p.x * 100} ${170 + p.y * 30} q 4 -6 8 -3 q -1 4 -4 2 Z`} fill="#5E8B46" opacity={0.95} />
      ))
    default:
      return null
  }
}

function bowlBody() {
  return (
    <g>
      <path
        d={`M ${rim.cx - rim.rx} ${rim.cy} C ${rim.cx - rim.rx + 18} ${rim.cy + 62} ${rim.cx - rim.rx * 0.45} ${rim.cy + 118} ${rim.cx} ${rim.cy + 128} C ${rim.cx + rim.rx * 0.45} ${rim.cy + 118} ${rim.cx + rim.rx - 18} ${rim.cy + 62} ${rim.cx + rim.rx} ${rim.cy} Z`}
        fill="url(#bowlBody)"
      />
      <path d={`M ${rim.cx - rim.rx} ${rim.cy} C ${rim.cx - rim.rx + 26} ${rim.cy + 48} ${rim.cx} ${rim.cy + 96} C ${rim.cx + rim.rx - 26} ${rim.cy + 48} ${rim.cx + rim.rx} ${rim.cy} Z`} fill="none" stroke="#8A5F38" strokeWidth={2.4} opacity={0.55} />
      <path d={`M ${rim.cx - rim.rx * 0.55} ${rim.cy + 44} C ${rim.cx - rim.rx * 0.4} ${rim.cy + 86} ${rim.cx + rim.rx * 0.4} ${rim.cy + 86} ${rim.cx + rim.rx * 0.55} ${rim.cy + 44} Z`} fill="none" stroke="#7C522F" strokeWidth={1.6} opacity={0.5} />
      <path d={`M ${rim.cx - rim.rx * 0.25} ${rim.cy + 72} Q ${rim.cx} ${rim.cy + 116} ${rim.cx + rim.rx * 0.25} ${rim.cy + 72} Z`} fill="none" stroke="#7C522F" strokeWidth={1.4} opacity={0.45} />
      <ellipse cx={rim.cx} cy={rim.cy} rx={rim.rx} ry={rim.ry} fill="none" stroke="#9C6B3E" strokeWidth={5} />
      <ellipse cx={rim.cx} cy={rim.cy + 2} rx={rim.rx - 10} ry={rim.ry - 5} fill="none" stroke="#7C522F" strokeWidth={1.4} opacity={0.5} />
    </g>
  )
}

function wrapRoll() {
  return (
    <g transform="rotate(-14 200 210)">
      <ellipse cx={200} cy={214} rx={128} ry={30} fill="#D9B57F" />
      <path d="M 92 190 C 120 160 170 140 200 138 C 240 142 300 168 330 194 Z" fill="url(#wrapTop)" />
      <ellipse cx={200} cy={150} rx={118} ry={26} fill="none" stroke="#C29B62" strokeWidth={1.6} />
      <ellipse cx={200} cy={150} rx={118} ry={26} fill="none" stroke="#A97F4E" strokeWidth={0.8} opacity={0.7} />
      <g transform="translate(200 150)">
        <ellipse cx={0} cy={-14} rx={70} ry={11} fill="#F0E5CD" />
        <ellipse cx={0} cy={-6} rx={92} ry={13} fill="#F0E5CD" />
        <path d="M -20 2 a 30 24 0 0 1 -20 2 Z" fill="#B96B45" />
        <circle cx={26} cy={2} r={6} fill="#D8B57C" />
        <circle cx={-6} cy={8} r={5} fill="#D8B57C" />
        <circle cx={40} cy={6} r={4} fill="#E7B94C" />
        <circle cx={-34} cy={10} r={3.4} fill="#D95B43" />
        <rect x={-26} y={2} width={8} height={4} rx={2} fill="#E8853D" />
        <path d="M 8 16 a 22 16 0 0 1 8 16 Z" fill="#FFFDF2" />
      </g>
    </g>
  )
}

function soupBowl() {
  return (
    <g>
      <path
        d={`M ${rim.cx - rim.rx} ${rim.cy} C ${rim.cx - rim.rx + 14} ${rim.cy + 40} ${rim.cx - rim.rx * 0.5} ${rim.cy + 74} ${rim.cx} ${rim.cy + 80} C ${rim.cx + rim.rx * 0.5} ${rim.cy + 74} ${rim.cx + rim.rx - 14} ${rim.cy + 40} ${rim.cx + rim.rx} ${rim.cy} Z`}
        fill="url(#bowlBody)"
      />
      <ellipse cx={rim.cx} cy={rim.cy} rx={rim.rx} ry={rim.ry} fill="none" stroke="#9C6B3E" strokeWidth={5} />
      <ellipse cx={rim.cx} cy={rim.cy + 1} rx={rim.rx - 10} ry={rim.ry - 5} fill="none" stroke="#7C522F" strokeWidth={1.3} opacity={0.5} />
      <g clipPath="url(#foodClip)">
        <ellipse cx={rim.cx} cy={rim.cy + 2} rx={rim.rx - 6} ry={rim.ry - 3} fill="#E4A65C" />
        <ellipse cx={rim.cx - 10} cy={rim.cy - 2} rx={rim.rx - 26} ry={rim.ry - 9} fill="#D9923F" opacity={0.75} />
      </g>
    </g>
  )
}

function leaf() {
  return (
    <g>
      <ellipse cx={200} cy={248} rx={190} ry={104} fill="#3F5A34" opacity={0.28} />
      <g transform="rotate(-6 200 236)">
        <path d="M 200 130 C 236 178 288 218 332 256 C 372 292 402 320 410 330 L 420 330 L 200 130 Z" fill="url(#leafBody)" />
        <path d="M 200 130 C 164 178 112 218 68 256 C 28 292 -2 320 -10 330 L -20 330 L 200 130 Z" fill="url(#leafBody)" />
        <path d="M 200 156 C 200 220 200 296 200 330 Z" fill="none" stroke="#2F4526" strokeWidth={3} opacity={0.6} />
        {[-46, -92, -138].map((a) => (
          <path key={`vl${a}`} d={`M 200 178 L ${200 + a * 0.55} ${178 + a * 0.75} Z`} fill="none" stroke="#2F4526" strokeWidth={2} opacity={0.35} />
        ))}
        {[46, 92, 138].map((a) => (
          <path key={`vr${a}`} d={`M 200 178 L ${200 + a * 0.55} ${178 + a * 0.75} Z`} fill="none" stroke="#2F4526" strokeWidth={2} opacity={0.35} />
        ))}
      </g>
    </g>
  )
}

function scatteredBits() {
  return (
    <g>
      <path d="M 96 236 a 17 12 0 0 1 96 236 Z" fill="#E7B94C" stroke="#C9993A" strokeWidth={1} />
      <path d="M 96 236 a 17 12 0 0 1 96 236 Z" fill="#F4D675" transform="translate(-5 0) scale(0.55)" />
      <path d="M 306 258 q 6 -9 12 -4 q 0 5 -4 6 Z" fill="#5E8B46" />
      <path d="M 314 250 q 5 -7 10 -3 q -1 4 -4 3 Z" fill="#5E8B46" opacity={0.85} />
      <circle cx={92} cy={302} r={4.2} fill="#D8B57C" />
      <circle cx={318} cy={288} r={3.6} fill="#8A6B4F" />
      <path d="M 288 318 q 5 -8 9 -3 Z" fill="#C8754D" />
      <circle cx={108} cy={296} r={2.1} fill="#E7B94C" />
    </g>
  )
}

function steam() {
  return (
    <g fill="none" stroke="#CBBBA2" strokeWidth={2.4} strokeLinecap="round" opacity={0.7}>
      <path d="M 150 108 q 14 -18 6 -34 q -4 -14 -10 -18 Z" />
      <path d="M 196 96 q 12 -16 4 -30 q -6 -12 -12 -16 Z" opacity={0.6} />
      <path d="M 248 110 q 10 -16 2 -30 Z" opacity={0.5} />
    </g>
  )
}

export default function BowlArt({ art, className }: { art: BowlArt; className?: string }) {
  const { base, proteins = [], veg = [], dressing, garnish = [] } = art
  const isWrap = base === 'wrap'
  const isSoup = base === 'soup'

  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={isWrap ? 'Illustration of a protein wrap' : isSoup ? 'Illustration of a protein soup' : 'Illustration of a protein bowl in an areca-leaf pātra'} className={className}>
      <defs>
        <linearGradient id="leafBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2F4526" />
          <stop offset="55%" stopColor="#3E5A32" />
          <stop offset="100%" stopColor="#285943" />
        </linearGradient>
        <linearGradient id="bowlBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B98A5F" />
          <stop offset="100%" stopColor="#8F6B44" />
        </linearGradient>
        <linearGradient id="wrapTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4C48F" />
          <stop offset="100%" stopColor="#C9A25E" />
        </linearGradient>
        <clipPath id="foodClip">
          <ellipse cx={rim.cx} cy={rim.cy + 2} rx={rim.rx - 12} ry={rim.ry - 4} />
        </clipPath>
      </defs>

      {leaf()}
      {isWrap ? wrapRoll() : isSoup ? soupBowl() : (
        <g>
          {bowlBody()}
          <g clipPath="url(#foodClip)">
            {baseMound(base)}
            {proteins.map((p, i) => proteinShape(p, i))}
            {veg.map((v, i) => vegShapes(v, 21 + i * 13))}
            {dressing ? dressingShape(dressing) : null}
            {garnish.map((g, i) => garnishShapes(g, 51 + i * 17))}
          </g>
        </g>
      )}
      {isSoup ? steam() : null}
      {scatteredBits()}
    </svg>
  )
}