import { useRef, useState } from 'react'
import type { BowlArt as BowlArtConfig } from './art/types'
import BowlArt from './art/BowlArt'
import SectionHeading from './ui/SectionHeading'
import CTA from './ui/CTA'
import Icon from './ui/Icon'
import { useCart } from '../lib/CartContext'
import { siteConfig } from '../data/config'
import {
  BASE_OPTIONS,
  PROTEIN_OPTIONS,
  FRESH_OPTIONS,
  DRESSING_OPTIONS,
  SEASONING_OPTIONS,
  BUILDER_PRICE,
  defaultChoice,
  macrosForChoice,
  roundMacro,
} from '../data/builder'
import type { BuilderChoice } from '../data/builder'

/* ---- mapping selection -> bowl illustration -------------------- */

const baseArtMap: Record<string, BowlArtConfig['base']> = {
  'plain-rice': 'rice',
  'jeera-rice': 'jeerarice',
  millet: 'millet',
}

const proteinArtMap: Record<string, NonNullable<BowlArtConfig['proteins']>> = {
  'egg-whites': ['eggwhite'],
  rajma: ['rajma'],
  chickpeas: ['chickpea'],
  'black-chana': ['chana'],
  'chicken-tikka': ['chicken'],
  paneer: ['paneer'],
}

const vegArtMap: Record<string, NonNullable<BowlArtConfig['veg']>> = {
  carrot: ['carrot'],
  tomato: ['tomato'],
  onion: ['onion'],
  'sweet-corn': ['corn'],
}

const garnishArtMap: Record<string, string> = {
  'green-chilli': 'chilli',
  pepper: 'pepper',
}

function toArt(choice: BuilderChoice): BowlArtConfig {
  const proteins: NonNullable<BowlArtConfig['proteins']> = []
  for (const id of choice.protein) if (proteinArtMap[id]) proteins.push(...proteinArtMap[id])
  const veg: NonNullable<BowlArtConfig['veg']> = []
  for (const id of choice.fresh) if (vegArtMap[id]) veg.push(...vegArtMap[id])
  const garnish: BowlArtConfig['garnish'] = []
  for (const id of choice.seasonings)
    if (garnishArtMap[id]) garnish.push(garnishArtMap[id] as NonNullable<BowlArtConfig['garnish']>[number])
  const hasCurd = choice.dressing.includes('garlic-curd') || choice.dressing.includes('garlic-lemon-curd')
  return {
    base: baseArtMap[choice.base[0] ?? 'plain-rice'] ?? 'rice',
    proteins,
    veg,
    dressing: hasCurd ? 'curd' : choice.dressing.includes('lemon') ? 'lemon' : 'curd',
    garnish,
  }
}

/* ---- accessible multi-select group ------------------------------ */

function PickGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string
  options: { id: string; label: string }[]
  selected: string[]
  onToggle: (id: string, checked: boolean) => void
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-brand-green">
        {legend}
        <span className="ml-1 text-[10px] font-medium text-brand-charcoal/50">(pick any)</span>
      </legend>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((o) => {
          const active = selected.includes(o.id)
          return (
            <label
              key={o.id}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm cursor-pointer transition-all ${
                active
                  ? 'bg-brand-green text-cream ring-2 ring-brand-green shadow-soft'
                  : 'bg-white/80 text-brand-charcoal/70 ring-1 ring-brand-green/20 hover:bg-brand-leaf/10'
              }`}
            >
              <input
                type="checkbox"
                name={legend}
                checked={active}
                onChange={(e) => onToggle(o.id, e.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`grid w-4 h-4 place-items-center rounded-md ${
                  active ? 'bg-brand-turmeric/40' : 'bg-white/70 ring-1 ring-brand-green/30'
                }`}
              >
                {active ? (
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-brand-green"><path d="M2 2 L10 2 M2 2 L2 10 M10 2 L10 10 M10 2 L2 10" /></svg>
                ) : null}
              </span>
              {o.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/* ---- flying nutrient capsule ------------------------------------ */

type CapsuleLine = { text: string; cls: string }
type Capsule = { id: number; lines: CapsuleLine[]; dy: number }

const sign = (v: number) => (v >= 0 ? '+' : '')
const fmt = (v: number) => {
  const r = Math.round(v * 10) / 10
  return Number.isInteger(r) ? String(Math.round(r)) : String(r)
}

/* ---- main section ----------------------------------------------- */

const steps = [
  { n: '01', title: 'Choose your base', desc: 'Rice, jeera rice or millet' },
  { n: '02', title: 'Choose your protein', desc: 'Pick the star of your pātra' },
  { n: '03', title: 'Add your fresh', desc: 'Crunch & colour' },
  { n: '04', title: 'Choose your dressing', desc: 'Curd, lemon or both' },
  { n: '05', title: 'Season it', desc: 'Make it yours' },
]

export default function BuildYourPatra() {
  const { add } = useCart()
  const [choice, setChoice] = useState<BuilderChoice>(defaultChoice)
  const [justAdded, setJustAdded] = useState(false)
  const [flyouts, setFlyouts] = useState<Capsule[]>([])

  const idRef = useRef(0)
  const prevMacros = useRef(macrosForChoice(defaultChoice))

  const macros = macrosForChoice(choice)
  const currency = siteConfig.currency

  const spawnCapsule = (next: BuilderChoice) => {
    const nextMacros = macrosForChoice(next)
    const prev = prevMacros.current
    prevMacros.current = nextMacros
    const dProtein = nextMacros.protein - prev.protein
    const dCarbs = nextMacros.carbs - prev.carbs
    const dFat = nextMacros.fat - prev.fat
    const dKcal = nextMacros.calories - prev.calories

    const lines: CapsuleLine[] = []
    if (Math.abs(dProtein) >= 0.5) lines.push({ text: `${sign(dProtein)}${fmt(dProtein)}g protein`, cls: 'text-brand-terra' })
    if (Math.abs(dCarbs) >= 0.5) lines.push({ text: `${sign(dCarbs)}${fmt(dCarbs)}g carbs`, cls: 'text-brand-leaf' })
    if (Math.abs(dFat) >= 0.5) lines.push({ text: `${sign(dFat)}${fmt(dFat)}g fat`, cls: 'text-[#8A6B1E]' })
    if (Math.abs(dKcal) >= 5) lines.push({ text: `${sign(dKcal)}${fmt(dKcal)} kcal`, cls: 'text-brand-charcoal' })
    if (lines.length === 0) return

    idRef.current += 1
    const id = idRef.current
    setFlyouts((f) => [...f.slice(-3), { id, lines: lines.slice(0, 2), dy: (id % 4) * 38 }])
  }

  const applyChoice = (next: BuilderChoice) => {
    setChoice(next)
    spawnCapsule(next)
  }

  const toggleIn = (key: 'base' | 'protein' | 'fresh' | 'dressing' | 'seasonings') => (id: string, checked: boolean) => {
    applyChoice({
      ...choice,
      [key]: checked ? [...choice[key], id] : choice[key].filter((x) => x !== id),
    })
  }

  const addCustom = () => {
    add({
      key: `custom-${Date.now()}`,
      kind: 'custom',
      name: 'My Pātra (build your own)',
      unitPrice: BUILDER_PRICE,
      detail: choiceSummary(),
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const allLabels = [...BASE_OPTIONS, ...PROTEIN_OPTIONS, ...FRESH_OPTIONS, ...DRESSING_OPTIONS, ...SEASONING_OPTIONS]
  const optionLabel = (id: string) => allLabels.find((o) => o.id === id)?.label ?? id

  const choiceSummary = () => {
    const parts: string[] = []
    if (choice.base.length) parts.push(...choice.base.map(optionLabel))
    if (choice.protein.length) parts.push(...choice.protein.map(optionLabel))
    if (choice.fresh.length) parts.push(...choice.fresh.map(optionLabel))
    if (choice.dressing.length) parts.push(...choice.dressing.map(optionLabel))
    if (choice.seasonings.length) parts.push(...choice.seasonings.map(optionLabel))
    return parts.join(', ')
  }

  return (
    <section id="build" className="py-20 md:py-28 bg-brand-cream bg-grain relative overflow-hidden">
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-brand-leaf/8 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Build Your Pātra"
          title="Build Your Pātra"
          sub="You choose. We build it fresh. Watch your bowl come together as you pick."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-start">
          {/* Steps */}
          <div className="flex flex-col gap-7">
            <div className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-6">
              <div className="flex items-center gap-3">
                <span className="grid w-9 h-9 place-items-center rounded-full bg-brand-turmeric/20 text-sm font-extrabold text-[#8A6B1E]">01</span>
                <h3 className="text-lg font-bold text-brand-charcoal">Choose your base</h3>
              </div>
              <p className="mt-1 text-sm text-brand-charcoal/60">{steps[0].desc}</p>
              <PickGroup legend="Base" options={BASE_OPTIONS} selected={choice.base} onToggle={toggleIn('base')} />
            </div>

            <div className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-6">
              <div className="flex items-center gap-3">
                <span className="grid w-9 h-9 place-items-center rounded-full bg-brand-turmeric/20 text-sm font-extrabold text-[#8A6B1E]">02</span>
                <h3 className="text-lg font-bold text-brand-charcoal">Choose your protein</h3>
              </div>
              <p className="mt-1 text-sm text-brand-charcoal/60">{steps[1].desc}</p>
              <PickGroup legend="Protein" options={PROTEIN_OPTIONS} selected={choice.protein} onToggle={toggleIn('protein')} />
            </div>

            <div className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-6">
              <div className="flex items-center gap-3">
                <span className="grid w-9 h-9 place-items-center rounded-full bg-brand-turmeric/20 text-sm font-extrabold text-[#8A6B1E]">03</span>
                <h3 className="text-lg font-bold text-brand-charcoal">Add your fresh</h3>
              </div>
              <p className="mt-1 text-sm text-brand-charcoal/60">{steps[2].desc}</p>
              <PickGroup legend="Fresh" options={FRESH_OPTIONS} selected={choice.fresh} onToggle={toggleIn('fresh')} />
            </div>

            <div className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-6">
              <div className="flex items-center gap-3">
                <span className="grid w-9 h-9 place-items-center rounded-full bg-brand-turmeric/20 text-sm font-extrabold text-[#8A6B1E]">04</span>
                <h3 className="text-lg font-bold text-brand-charcoal">Choose your dressing</h3>
              </div>
              <p className="mt-1 text-sm text-brand-charcoal/60">{steps[3].desc}</p>
              <PickGroup legend="Dressing" options={DRESSING_OPTIONS} selected={choice.dressing} onToggle={toggleIn('dressing')} />
            </div>

            <div className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-6">
              <div className="flex items-center gap-3">
                <span className="grid w-9 h-9 place-items-center rounded-full bg-brand-turmeric/20 text-sm font-extrabold text-[#8A6B1E]">05</span>
                <h3 className="text-lg font-bold text-brand-charcoal">Season it</h3>
              </div>
              <p className="mt-1 text-sm text-brand-charcoal/60">{steps[4].desc}</p>
              <PickGroup legend="Seasoning" options={SEASONING_OPTIONS} selected={choice.seasonings} onToggle={toggleIn('seasonings')} />
            </div>
          </div>

          {/* Live preview */}
          <div className="lg:sticky lg:top-24 relative flex flex-col gap-6">
            <div className="relative">
              {/* Flying nutrient capsules — land at the top of the chosen card */}
              <div className="absolute right-3 top-2 z-20" aria-hidden>
                {flyouts.map((f) => (
                  <div
                    key={f.id}
                    onAnimationEnd={(e) => {
                      if (e.animationName === 'capsule-fly') setFlyouts((list) => list.filter((x) => x.id !== f.id))
                    }}
                    className="capsule-fly rounded-2xl bg-white/95 ring-1 ring-brand-green/20 shadow-soft px-3 py-1.5"
                    style={{ marginTop: `${f.dy}px` }}
                  >
                    <p className="text-sm font-extrabold leading-tight whitespace-nowrap">
                      <span className="text-[11px] text-brand-green mr-1">✓</span>
                      {f.lines.map((l, i) => (
                        <span key={i}>
                          {i > 0 ? ' · ' : ''}
                          <span className={l.cls}>{l.text}</span>
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[2.5rem] bg-white/75 ring-1 ring-brand-green/10 shadow-lift overflow-hidden">
              <BowlArt art={toArt(choice)} className="w-full h-auto" />
              <div className="px-6 py-5 bg-white/90">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-leaf">Your Pātra</p>
                <p className="mt-2 text-sm text-brand-charcoal/80 leading-relaxed">{choiceSummary()}</p>
                <dl className="mt-4 grid grid-cols-4 gap-3 text-center">
                  {[
                    { k: 'Protein', v: `${roundMacro(macros.protein)}g`, c: 'text-brand-terra' },
                    { k: 'Carbs', v: `${roundMacro(macros.carbs)}g`, c: 'text-brand-charcoal/70' },
                    { k: 'Fat', v: `${roundMacro(macros.fat)}g`, c: 'text-brand-charcoal/70' },
                    { k: 'Calories', v: `${roundMacro(macros.calories)}`, c: 'text-brand-green' },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl bg-brand-cream/60 py-2">
                      <dd className={`text-lg font-extrabold ${s.c}`}>{s.v}</dd>
                      <dt className="text-[10px] font-medium text-brand-charcoal/55">{s.k}</dt>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-[10px] text-brand-charcoal/50">Estimates based on standard ingredient portions.</p>
              </div>
            </div>
            </div>

            <div className="rounded-card bg-brand-green text-cream p-5 flex items-center justify-between gap-3 shadow-soft">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-cream/70">Your pātra</p>
                <p className="text-2xl font-extrabold">
                  {currency}
                  {BUILDER_PRICE}
                </p>
              </div>
              <CTA
                onClick={addCustom}
                variant="light"
                size="lg"
                ariaLabel="Add your custom pātra to order"
              >
                <Icon name={justAdded ? 'leaf' : 'bag'} className="w-4 h-4" strokeWidth={2.2} />
                {justAdded ? 'Added to order' : 'Add my pātra to order'}
              </CTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}