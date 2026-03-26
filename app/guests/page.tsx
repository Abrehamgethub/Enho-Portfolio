import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import PreviousGuestsSection from '@/components/sections/PreviousGuestsSection'

export default function GuestsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16 md:pt-20">
        <PreviousGuestsSection />
      </div>
      <Footer />
    </main>
  )
}
