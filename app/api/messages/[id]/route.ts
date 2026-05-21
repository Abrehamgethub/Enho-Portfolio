import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET single message (admin only)
export async function GET(
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
    
    const docSnap = await firebaseAdminDb.collection('messages').doc(id).get()

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json({ message: { id: docSnap.id, ...docSnap.data() } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Service unavailable: Failed to fetch message: ' + error.message }, { status: 503 })
  }
}

// PATCH update message (admin only)
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
    const docRef = firebaseAdminDb.collection('messages').doc(id)
    
    let updateData: any = {}

    if (body.markAsRead) {
      updateData.read = true
    } else {
      updateData = body
    }

    await docRef.update(updateData)
    const updatedDoc = await docRef.get()
    
    return NextResponse.json({ success: true, message: { id: updatedDoc.id, ...updatedDoc.data() } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: Failed to update message: ' + error.message }, { status: 500 })
  }
}

// DELETE message (admin only)
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
    
    await firebaseAdminDb.collection('messages').doc(id).delete()
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: Failed to delete message: ' + error.message }, { status: 500 })
  }
}
