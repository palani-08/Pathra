import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Why from './components/Why'
import Bowls from './components/Bowls'
import Wraps from './components/Wraps'
import Soups from './components/Soups'
import CheatDay from './components/CheatDay'
import BuildYourPatra from './components/BuildYourPatra'
import Nutrition from './components/Nutrition'
import HowItWorks from './components/HowItWorks'
import BrandStory from './components/BrandStory'
import Location from './components/Location'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Reveal from './components/Reveal'
import { CartProvider } from './lib/CartContext'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-cream">
        <Navbar />
        <main>
          <Hero />
          <Why />
          <Bowls />
          <Wraps />
          <Soups />
          <CheatDay />
          <Reveal>
            <BuildYourPatra />
          </Reveal>
          <Nutrition />
          <HowItWorks />
          <BrandStory />
          <Location />
          <FinalCTA />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}