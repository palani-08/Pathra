import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'

const stats = [
  { value: '25–55g', label: 'Protein per bowl', icon: 'protein' },
  { value: '100g+', label: 'Fresh vegetables', icon: 'ingredients' },
  { value: '0', label: 'Added cooking oil', icon: 'noOil' },
  { value: '100%', label: 'Real ingredients', icon: 'leaf' },
]

export default function Nutrition() {
  return (
    <section id="nutrition" className="py-20 md:py-28 bg-brand-green text-cream bg-grain-deep relative overflow-hidden">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-brand-leaf/10 pointer-events-none" />
      <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#1F4634]/60 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Nutrition philosophy"
          title="Food you understand. Nutrition you can see."
          sub="We believe healthy food shouldn't feel complicated. Real portions, real ingredients, clear numbers."
          tone="light"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-card ${
                i === 0 ? 'bg-cream text-brand-green ring-1 ring-brand-turmeric/30' : 'bg-[#1F4634]/50 text-cream ring-1 ring-brand-leaf/25'
              } p-6 shadow-soft`}
            >
              <span className={`grid place-items-center rounded-2xl w-11 h-11 ${
                i === 0 ? 'bg-brand-turmeric/20 text-[#8A6B1E]' : 'bg-cream/10 text-cream'
              }`}>
                <Icon name={s.icon} className="w-6 h-6" strokeWidth={1.9} />
              </span>
              <p className={`mt-4 text-3xl font-extrabold ${i === 0 ? 'text-brand-green' : 'text-cream'}`}>{s.value}</p>
              <p className={`mt-1 text-sm font-medium ${i === 0 ? 'text-brand-charcoal/70' : 'text-cream/75'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-cream/60">Nutrition values are estimates based on standard ingredient portions.</p>
      </div>
    </section>
  )
}