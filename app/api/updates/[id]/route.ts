import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
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
    await deleteDoc(doc(db, 'updates', id))
    
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
    
    await updateDoc(doc(db, 'updates', id), { active: body.active })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating update:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
