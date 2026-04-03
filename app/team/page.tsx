import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import TeamSection from '@/components/sections/TeamSection'
import ImpactSection from '@/components/sections/ImpactSection'
import CertificatesSection from '@/components/sections/CertificatesSection'

export default function TeamPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16 md:pt-20">
        <TeamSection />
        <ImpactSection />
        <CertificatesSection />
      </div>
      <Footer />
    </main>
  )
}
