import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'

const steps = [
  { icon: 'choose', title: 'Choose', body: 'Pick a bowl, wrap or soup — or build your own pātra.' },
  { icon: 'prepare', title: 'We Prepare', body: 'Freshly assembled with your selected ingredients, no added cooking oil.' },
  { icon: 'deliver', title: 'We Deliver', body: 'Straight to your home, office or gym in Mettupalayam & Karamadai.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. One fresh pātra."
          sub="From your phone to your table — as simple as it should be."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-card bg-white/85 ring-1 ring-brand-green/10 shadow-soft p-7 text-center">
              <span className="absolute left-5 top-5 text-sm font-extrabold text-brand-leaf/70">0{i + 1}</span>
              <span className="mx-auto mt-10 grid place-items-center rounded-full w-20 h-20 bg-brand-leaf/12 text-brand-green">
                <Icon name={s.icon} className="w-10 h-10" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-brand-charcoal">{s.title}</h3>
              <p className="mt-2 text-sm text-brand-charcoal/65 leading-relaxed">{s.body}</p>
              {i < 2 ? (
                <span aria-hidden className="absolute -right-4 top-1/2 hidden md:flex text-brand-terra">
                  <Icon name="arrow" className="w-6 h-6" strokeWidth={2} />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}