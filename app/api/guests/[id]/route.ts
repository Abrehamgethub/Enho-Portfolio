import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE a guest (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await deleteDoc(doc(db, 'guests', (await params).id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guest:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

// PATCH - update guest (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()

    if ('episodeUrl' in body && !String(body.episodeUrl || '').trim()) {
      return NextResponse.json(
        { error: 'Episode URL is required' },
        { status: 400 }
      )
    }

    if ('photo' in body && !String(body.photo || '').trim()) {
      body.photo = ''
    }
    
    await updateDoc(doc(db, 'guests', (await params).id), body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating guest:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
