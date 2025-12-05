import { NextRequest, NextResponse } from 'next/server'
import { getTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/db'

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const member = getTeamMember(params.id)
  if (!member) {
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
  }
  return NextResponse.json({ member })
}

// PATCH update team member
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const member = updateTeamMember(params.id, body)
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, member })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

// DELETE team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = deleteTeamMember(params.id)
  if (!deleted) {
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
