import Navigation from '@/components/sections/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      
      {/* About Section - Central Focus of Homepage */}
      <AboutSection />
      
      <Footer />
    </main>
  )
}
