import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE an update (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { id } = await params
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ error: 'Validation error: Valid ID is required' }, { status: 400 })
    }
    await firebaseAdminDb.collection('updates').doc(id).delete()
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting update:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to delete update: ' + error.message }, { status: 500 })
  }
}

// PATCH - toggle active status (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { id } = await params
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ error: 'Validation error: Valid ID is required' }, { status: 400 })
    }
    const body = await request.json()
    
    await firebaseAdminDb.collection('updates').doc(id).update({ active: body.active })
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating update:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to update: ' + error.message }, { status: 500 })
  }
}
