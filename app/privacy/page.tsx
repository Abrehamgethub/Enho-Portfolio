import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Navigation />
      <div className="flex-1 container-custom py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
          <p>
            At <strong>እነሆ እኛ (Eneho Egna)</strong>, we take your privacy and personal data seriously. 
            This policy outlines how we handle the information you provide to us through our website.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">Information We Collect</h2>
          <p>
            When you use our <strong>Contact Form</strong>, we collect your name, email address, 
            and the content of your message. This data is used solely to respond to your inquiries 
            and provide the information or services you've requested.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">How We Use Your Data</h2>
          <p>
            We do not sell, rent, or trade your personal information. Your data is used for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responding to your health-related inquiries or collaboration requests.</li>
            <li>Improving our website content and community outreach programs.</li>
            <li>Communicating updates about our episodes or community camps.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information. 
            However, please note that no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at 
            <strong> enehoegna@gmail.com</strong>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
