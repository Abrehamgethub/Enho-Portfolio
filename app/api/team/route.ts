import { NextRequest, NextResponse } from 'next/server'
import { getTeamMembers, addTeamMember } from '@/lib/db'

// GET all team members
export async function GET() {
  const team = getTeamMembers()
  return NextResponse.json({ team })
}

// POST new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, credentials, role, tagline, specialties, image, color } = body

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
      image: image || null,
      color: color || 'from-primary-500 to-primary-600'
    })

    return NextResponse.json({ success: true, member })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add team member' },
      { status: 500 }
    )
  }
}
