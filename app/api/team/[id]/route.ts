import { NextRequest, NextResponse } from 'next/server'
import { getTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const member = getTeamMember((await params).id)
  if (!member) {
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
  }
  return NextResponse.json({ member })
}

// PATCH update team member (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const member = updateTeamMember((await params).id, body)
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, member })
  } catch (error) {
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

  const deleted = deleteTeamMember((await params).id)
  if (!deleted) {
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
