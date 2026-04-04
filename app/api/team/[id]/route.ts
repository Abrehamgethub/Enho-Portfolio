import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import TeamMember from '@/lib/models/TeamMember'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()
    const { id } = await params
    
    // Check if it's a MongoDB ID or a legacy slug
    const member = (id.length === 24) 
      ? await TeamMember.findById(id)
      : await TeamMember.findOne({ id }) // Fallback for legacy slug-based lookups
      
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    return NextResponse.json({ member })
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 })
  }
}

// PATCH update team member (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const { id } = await params
    const body = await request.json()
    
    const member = await TeamMember.findByIdAndUpdate(id, body, { new: true })
    
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

// DELETE team member (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const { id } = await params
    
    const member = await TeamMember.findByIdAndDelete(id)
    
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}
