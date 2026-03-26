import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import PartnersSection from '@/components/sections/PartnersSection'

export default function PartnersPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16 md:pt-20">
        <PartnersSection />
      </div>
      <Footer />
    </main>
  )
}
