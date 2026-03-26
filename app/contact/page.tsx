import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import ContactSection from '@/components/sections/ContactSection'

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16 md:pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
