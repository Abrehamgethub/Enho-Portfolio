import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import LatestUpdates from '@/components/sections/LatestUpdates'

export default function NewsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <div className="flex-1 pt-24 md:pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Latest News & Updates
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay <span className="gradient-text">Updated</span> With Eneho
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get the latest news, health tips, and announcements from our team directly to your screen.
            </p>
          </div>
          <LatestUpdates />
        </div>
      </div>
      <Footer />
    </main>
  )
}
