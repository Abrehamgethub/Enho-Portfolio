import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import TeamMember from '@/lib/models/TeamMember'
import { requireAuth } from '@/lib/auth-middleware'
import { doctors as initialDoctors } from '@/lib/doctors-data'

export const dynamic = 'force-dynamic'

// GET all team members
export async function GET() {
  try {
    try {
      await connectToDatabase()
    } catch (dbError) {
      console.error('Database connection failed in Team API, using static fallback:', dbError)
      return NextResponse.json({ team: initialDoctors, source: 'static' })
    }
    
    let team = await TeamMember.find().sort({ order: 1, createdAt: -1 })
    
    // Auto-seed or fallback if empty
    if (team.length === 0) {
      return NextResponse.json({ team: initialDoctors, source: 'static' })
    }
    
    return NextResponse.json({ team })
  } catch (error) {
    console.error('API Error (GET /api/team):', error)
    return NextResponse.json({ team: initialDoctors, error: 'Failed to fetch team, using fallback' })
  }
}

// POST new team member (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const body = await request.json()

    if (!body.name || !body.role) {
      return NextResponse.json(
        { error: 'Name and role are required' },
        { status: 400 }
      )
    }

    const member = await TeamMember.create(body)

    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Error adding team member:', error)
    return NextResponse.json(
      { error: 'Failed to add team member' },
      { status: 500 }
    )
  }
}
