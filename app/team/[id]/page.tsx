import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDoctorById, getAllDoctorIds } from '@/lib/doctors-data'
import { getTeamMember } from '@/lib/db'
import DoctorProfile from './DoctorProfile'

// Required for static export with dynamic routes
export function generateStaticParams() {
  return getAllDoctorIds().map((id) => ({
    id: id,
  }))
}

interface PageProps {
  params: { id: string }
}

export default function DoctorPage({ params }: PageProps) {
  const doctor = getDoctorById(params.id)
  const member = getTeamMember(params.id)

  if (!doctor) {
    notFound()
  }

  const mergedDoctor = {
    ...doctor,
    image: (member?.image || '').trim() ? (member!.image as string) : doctor.image,
    socialLinks: member?.socialLinks || doctor.socialLinks
  }

  return <DoctorProfile doctor={mergedDoctor} />
}
