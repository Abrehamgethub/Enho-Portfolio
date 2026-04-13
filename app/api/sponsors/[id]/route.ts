import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE a sponsor (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await deleteDoc(doc(db, 'sponsors', (await params).id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting sponsor:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

// PATCH - update sponsor (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    await updateDoc(doc(db, 'sponsors', (await params).id), body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating sponsor:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
