import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Navigation />
      <div className="flex-1 container-custom py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
          <p>
            Welcome to <strong>እነሆ እኛ (Eneho Egna)</strong>. By using our website, you agree to these 
            terms. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Medical Disclaimer</h2>
          <p>
            All content on our website is for <strong>educational purposes only</strong>. It is 
            not a substitute for professional medical advice, diagnosis, or treatment. 
            <strong> Always seek the advice of your physician</strong> or other qualified health 
            providers with any questions you have regarding a medical condition.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Use of Website Content</h2>
          <p>
            You may use our content for personal, non-commercial purposes. However, you may not 
            reproduce, distribute, or modify our content for commercial use without our 
            explicit written permission.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">User Interaction</h2>
          <p>
            When you contact us, you agree to provide accurate and truthful information. 
            We reserve the right to ignore messages that are abusive, spammy, or off-topic.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms of Service at any time. Changes will 
            be effective immediately upon being posted on this page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Eneho Egna and its founding doctors 
            from any claims arising from your use of this website.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
