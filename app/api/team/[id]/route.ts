import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const docRef = doc(db, 'team', (await params).id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    return NextResponse.json({ member: { id: docSnap.id, ...docSnap.data() } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed: ' + error.message }, { status: 500 })
  }
}
