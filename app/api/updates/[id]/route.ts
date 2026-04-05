import { NextRequest, NextResponse } from 'next/server'
import { deleteUpdate, updateUpdate } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE an update (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const success = await deleteUpdate(id)
    
    if (!success) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting update:', error)
    return NextResponse.json({ error: 'Failed to delete update' }, { status: 500 })
  }
}

// PATCH - toggle active status (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    
    const update = await updateUpdate(id, { active: body.active })
    
    if (!update) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, update })
  } catch (error) {
    console.error('Error updating update:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
