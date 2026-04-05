import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eneho-Egna | Health Media & Community Wellness',
  description: 'A collective of dedicated physicians bringing evidence-based health education, community outreach, and medical expertise to Ethiopia and beyond.',
  keywords: ['doctors', 'Ethiopia', 'health education', 'medical podcast', 'community health', 'Eneho-Egna'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="deployment-marker-VERIFIED_04052026" style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  )
}
