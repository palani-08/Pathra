import SectionHeading from './ui/SectionHeading'

export default function BrandStory() {
  return (
    <section id="about" className="py-20 md:py-28 bg-brand-cream bg-grain">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-white/70 ring-1 ring-brand-green/10 shadow-lift p-8 md:p-10">
            <SectionHeading
              eyebrow="Brand story"
              title="Why Pro-Pathra?"
              align="left"
            />
            <p className="mt-5 text-base md:text-lg text-brand-charcoal/80 leading-relaxed">
              Food doesn't have to be complicated to be good for you.
            </p>
            <p className="mt-4 text-base md:text-lg text-brand-charcoal/80 leading-relaxed">
              Pro-Pathra brings together familiar Indian ingredients, fresh vegetables, protein-rich foods and bold
              flavours in a simple bowl. No unnecessary complexity. No added cooking oil. Just food made for everyday life.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-card bg-brand-green text-cream p-8 shadow-soft">
              <p className="text-2xl md:text-3xl font-extrabold leading-snug">Born in Mettupalayam. Made for our people.</p>
              <p className="mt-4 font-tamil text-2xl text-brand-turmeric">"சுவையும் சத்தும்."</p>
              <p className="mt-2 text-sm text-cream/70">Flavour and nutrition — together.</p>
            </div>
            <div className="rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-8">
              <p className="text-lg font-bold text-brand-green">What's in a pātra?</p>
              <p className="mt-3 text-sm text-brand-charcoal/70 leading-relaxed">
                Pātra is the Sanskrit word for vessel — the same way we see every bowl: a simple, honest vessel for
                fresh food. We serve ours in natural areca-leaf bowls, light on the planet and easy on the eye.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}