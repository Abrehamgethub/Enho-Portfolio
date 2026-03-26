import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import TrainingsSection from '@/components/TrainingsSection'

export default function TrainingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16 md:pt-20">
        <TrainingsSection />
      </div>
      <Footer />
    </main>
  )
}
