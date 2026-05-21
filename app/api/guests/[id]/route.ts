import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE a guest (admin only)
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
    await firebaseAdminDb.collection('guests').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting guest:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to delete: ' + error.message }, { status: 500 })
  }
}

// PATCH - update guest (admin only)
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
    
    if ('episodeUrl' in body && !String(body.episodeUrl || '').trim()) {
      return NextResponse.json(
        { error: 'Validation error: Episode URL is required' },
        { status: 400 }
      )
    }

    if ('photo' in body && !String(body.photo || '').trim()) {
      body.photo = ''
    }
    
    await firebaseAdminDb.collection('guests').doc(id).update(body)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating guest:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to update: ' + error.message }, { status: 500 })
  }
}
