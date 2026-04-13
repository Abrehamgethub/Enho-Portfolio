import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET single message (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const docRef = doc(db, 'messages', (await params).id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json({ message: { id: docSnap.id, ...docSnap.data() } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch message: ' + error.message }, { status: 500 })
  }
}

// PATCH update message (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const docRef = doc(db, 'messages', (await params).id)
    
    let updateData: any = {}

    if (body.markAsRead) {
      updateData.read = true
    } else {
      updateData = body
    }

    await updateDoc(docRef, updateData)
    const updatedDoc = await getDoc(docRef)
    
    return NextResponse.json({ success: true, message: { id: updatedDoc.id, ...updatedDoc.data() } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update message: ' + error.message }, { status: 500 })
  }
}

// DELETE message (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const docRef = doc(db, 'messages', (await params).id)
    await deleteDoc(docRef)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete message: ' + error.message }, { status: 500 })
  }
}
