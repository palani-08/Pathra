import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'

const features = [
  {
    icon: 'noOil',
    title: 'No Added Cooking Oil',
    body: 'Freshly prepared without added cooking oil — flavour that comes from real ingredients, not fat.',
  },
  {
    icon: 'protein',
    title: 'Protein First',
    body: 'Eggs, chicken, chickpeas, rajma and black chana — familiar foods that pack real protein.',
  },
  {
    icon: 'ingredients',
    title: 'Real Ingredients',
    body: 'No complicated ingredients. Just food you know, cooked the way you expect.',
  },
  {
    icon: 'lamp',
    title: 'South Indian Soul',
    body: 'Familiar flavours with a modern protein-focused approach. Namma food, thoughtfully made.',
  },
]

export default function Why() {
  return (
    <section id="why" className="py-20 md:py-28 bg-brand-cream bg-grain">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Why Pro-Pathra"
          title="Simple food. Smart nutrition."
          sub="We didn't invent a new cuisine. We just put more of the good stuff — protein, vegetables and real flavour — into the food you already love."
        />

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={f.title}
              className={`group flex flex-col items-center text-center rounded-card p-7 sm:p-8 ${
                i % 2 === 1 ? 'bg-brand-green text-cream' : 'bg-white/85 text-brand-charcoal'
              } ring-1 ring-brand-green/10 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`grid place-items-center rounded-2xl w-16 h-16 ${i % 2 === 1 ? 'bg-cream/15 text-cream' : 'bg-brand-leaf/12 text-brand-green'}`}>
                <Icon name={f.icon} className="w-8 h-8" strokeWidth={1.9} />
              </div>
              <h3 className={`mt-5 text-lg font-bold leading-snug ${i % 2 === 1 ? 'text-cream' : 'text-brand-charcoal'}`}>
                {f.title}
              </h3>
              <p className={`mt-2.5 text-sm md:text-[15px] leading-relaxed ${i % 2 === 1 ? 'text-cream/75' : 'text-brand-charcoal/65'}`}>
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}