import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDoctorById, getAllDoctorIds } from '@/lib/doctors-data'
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

  if (!doctor) {
    notFound()
  }

  return <DoctorProfile doctor={doctor} />
}
