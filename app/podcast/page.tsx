import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import PodcastSection from '@/components/sections/PodcastSection'

export default function PodcastPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16 md:pt-20">
        <PodcastSection />
      </div>
      <Footer />
    </main>
  )
}
