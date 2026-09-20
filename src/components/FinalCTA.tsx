import CTA from './ui/CTA'

export default function FinalCTA() {
  return (
    <section id="ready" className="py-24 md:py-32 bg-brand-green text-cream relative overflow-hidden bg-grain-deep">
      <div className="absolute left-6 top-6 h-64 w-64 rounded-full bg-brand-leaf/10 pointer-events-none" />
      <div className="absolute right-8 bottom-6 h-56 w-56 rounded-full bg-brand-turmeric/8 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-turmeric">Namma food. More protein.</p>
        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-cream">Ready to build your Pātra?</h2>
        <p className="mt-4 text-lg text-cream/80">Fresh food. Good protein. Your way.</p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTA href="#order" variant="light" size="lg">Order Now</CTA>
          <CTA href="#build" size="lg">Build Your Pātra</CTA>
        </div>
      </div>
    </section>
  )
}