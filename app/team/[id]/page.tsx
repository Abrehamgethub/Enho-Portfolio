import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDoctorById, getAllDoctorIds } from '@/lib/doctors-data'
import { connectToDatabase } from '@/lib/db'
import TeamMember from '@/lib/models/TeamMember'
import DoctorProfile from './DoctorProfile'

export const dynamic = 'force-dynamic'

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
  
  // 2. Get dynamic data from MongoDB (overrides / new members)
  let member = null
  try {
    try {
      await connectToDatabase()
    } catch (dbConnError) {
      console.error('Database connection failed in team detail page, using static fallback:', dbConnError)
    }

    // Try finding by custom 'id' (slug) first, then by MongoDB ObjectId
    // Use regex for case-insensitive search if available, or just case-insensitive find
    member = await TeamMember.findOne({ 
      $or: [
        { id: { $regex: new RegExp('^' + id + '$', 'i') } },
        { id: id }
      ]
    }).lean()
    
    if (!member && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
      member = await TeamMember.findById(id).lean()
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

  // Convert Mongoose document to plain object if needed and merge
  const dbData = member ? JSON.parse(JSON.stringify(member)) : {}
  
  const mergedDoctor = {
    ...baseData,
    ...dbData,
    // Ensure ID is consistent (favor the one that worked)
    id: dbData.id || baseData.id || (dbData._id ? String(dbData._id) : id)
  }

  return <DoctorProfile doctor={mergedDoctor} />
}
