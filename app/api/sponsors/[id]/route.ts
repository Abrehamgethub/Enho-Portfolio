import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE a sponsor (admin only)
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
    await firebaseAdminDb.collection('sponsors').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting sponsor:', error)
    return NextResponse.json({ error: 'Server error: Failed to delete' }, { status: 500 })
  }
}

// PATCH - update sponsor (admin only)
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
    await firebaseAdminDb.collection('sponsors').doc(id).update(body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating sponsor:', error)
    return NextResponse.json({ error: 'Server error: Failed to update' }, { status: 500 })
  }
}
