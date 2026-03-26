import { NextRequest, NextResponse } from 'next/server'
import { getTeamMembers, addTeamMember } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

// GET all team members
export async function GET() {
  const team = getTeamMembers()
  return NextResponse.json({ team })
}

// POST new team member (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { name, credentials, role, tagline, specialties, education, experience, image, color, socialLinks } = body

    if (!name || !credentials || !role) {
      return NextResponse.json(
        { error: 'Name, credentials, and role are required' },
        { status: 400 }
      )
    }

    const member = addTeamMember({
      name,
      credentials,
      role,
      tagline: tagline || '',
      specialties: specialties || [],
      education: education || [],
      experience: experience || '',
      image: image || null,
      color: color || 'from-primary-500 to-primary-600',
      socialLinks: socialLinks || {}
    })

    return NextResponse.json({ success: true, member })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add team member' },
      { status: 500 }
    )
  }
}
