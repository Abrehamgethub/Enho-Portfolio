import Navigation from '@/components/sections/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ImpactSection from '@/components/sections/ImpactSection'
import CertificatesSection from '@/components/sections/CertificatesSection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      
      {/* About Section - Central Focus of Homepage */}
      <AboutSection />

      {/* Supporting Sections */}
      <ImpactSection />
      <CertificatesSection />
      
      <Footer />
    </main>
  )
}
