import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE a featured video (admin only)
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
    await firebaseAdminDb.collection('featured-videos').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting featured video:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to delete: ' + error.message }, { status: 500 })
  }
}

// PATCH - update video (admin only)
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
    
    await firebaseAdminDb.collection('featured-videos').doc(id).update({ 
      ...(body.active !== undefined && { active: body.active }),
      ...(body.order !== undefined && { order: body.order }),
      ...(body.category && { category: body.category })
    })
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating featured video:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to update: ' + error.message }, { status: 500 })
  }
}
