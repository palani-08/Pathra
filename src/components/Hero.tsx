import CTA from './ui/CTA'
import Icon from './ui/Icon'

const heroImage = '/hero-bowl.png'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-cream bg-grain">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-24 -top-16 h-96 w-96 rounded-full bg-brand-leaf/10" />
        <div className="absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-brand-turmeric/8" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 pt-14 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-leaf/15 px-3 py-1 text-xs font-semibold text-brand-green">
              <Icon name="pin" className="w-3.5 h-3.5" strokeWidth={2.2} />
              Serving Mettupalayam &amp; Karamadai
            </p>

            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight text-brand-charcoal">
              Your bowl.
              <br />
              Your protein.
              <br />
              <span className="text-brand-green">Your way.</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-brand-charcoal/70 leading-relaxed">
              Fresh Indian protein bowls made with familiar ingredients, bold flavours and
              <strong className="text-brand-green font-semibold">no added cooking oil</strong>.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
              <CTA href="#order" size="lg">Order Now</CTA>
              <CTA href="#build" variant="secondary" size="lg">Build Your Pātra</CTA>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-brand-charcoal/75">
              {['No added cooking oil', '25–55g protein', 'Fresh, everyday bowls', '₹79 soups'].map((t) => (
                <li key={t} className="rounded-full bg-white/80 px-2.5 py-1 text-brand-green ring-1 ring-brand-green/15">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:justify-self-end">
            <div className="overflow-hidden rounded-[2.5rem] bg-white/70 shadow-lift ring-1 ring-brand-green/10">
              <img
                src={heroImage}
                alt="Namma Chicken Pātra — fresh Indian protein bowl with chicken tikka, egg whites and chickpeas"
                className="h-auto w-full"
                loading="eager"
              />
            </div>

            <div className="absolute -left-5 top-10 hidden sm:block rounded-2xl bg-white/90 px-3 py-2 shadow-soft text-[11px] font-bold text-brand-green ring-1 ring-brand-green/15">
              <span className="text-base">40–45g</span> protein
            </div>
            <div className="absolute -right-4 bottom-16 hidden sm:block rounded-2xl bg-brand-turmeric/15 px-3 py-2 shadow-soft text-[11px] font-bold text-[#8A6B1E] ring-1 ring-brand-turmeric/25">
              No added cooking oil
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}