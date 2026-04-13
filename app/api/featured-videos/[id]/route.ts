import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE a featured video (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await deleteDoc(doc(db, 'featured-videos', (await params).id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting featured video:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

// PATCH - update video (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    
    await updateDoc(doc(db, 'featured-videos', (await params).id), { 
      ...(body.active !== undefined && { active: body.active }),
      ...(body.order !== undefined && { order: body.order }),
      ...(body.category && { category: body.category })
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating featured video:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
