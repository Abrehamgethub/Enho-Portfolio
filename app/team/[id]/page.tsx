import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDoctorById, getAllDoctorIds } from '@/lib/doctors-data'
import DoctorProfile from './DoctorProfile'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

// Required for static export with dynamic routes
export async function generateStaticParams() {
  // During build, we use the static IDs
  return getAllDoctorIds().map((id) => ({
    id: id,
  }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DoctorPage({ params }: PageProps) {
  const { id } = await params
  
  // 1. Get static data from file (the "baseline" data)
  const doctors = getAllDoctorIds()
  const matchingStaticId = doctors.find(docId => docId.toLowerCase() === id.toLowerCase())
  const staticDoctor = matchingStaticId ? getDoctorById(matchingStaticId) : null
  
  // 2. Get dynamic data from Firebase (overrides / new members)
  let member = null
  try {
    const q = query(collection(db, 'team'), where('id', '==', id))
    const snap = await getDocs(q)
    if (!snap.empty) {
      member = snap.docs[0].data()
    }
  } catch (error) {
    console.error('Error fetching team member in detail page:', error)
  }

  // 3. Logic: If no static record AND no DB record, then 404
  if (!staticDoctor && !member) {
    notFound()
  }

  // 4. Merge data (Priority: Database > Static File)
  // Ensure we have a valid object to pass to DoctorProfile
  const baseData = staticDoctor || {
    id: id,
    name: '',
    credentials: '',
    role: '',
    tagline: '',
    bio: '',
    image: null,
    specialties: [],
    education: [],
    experience: [],
    certifications: [],
    trainings: [],
    skills: [],
    languages: [],
    socialLinks: {},
    volunteerWork: []
  }

  const dbData = member || {}
  
  const mergedDoctor = {
    ...baseData,
    ...dbData,
    // Ensure ID is consistent (favor the one that worked)
    id: dbData.id || baseData.id || id
  }

  return <DoctorProfile doctor={mergedDoctor} />
}
