import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all team members (admin or public)
export async function GET() {
  if (!isAdminEnabled) {
    return NextResponse.json({ team: [], source: 'none' })
  }

  try {
    const snap = await firebaseAdminDb.collection('team').get()
    const team = snap.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id }
    })
    // Temporary Fallback: If Firestore is empty, use static data
    if (team.length === 0) {
      const { doctors } = await import('@/lib/doctors-data')
      return NextResponse.json({ team: doctors, source: 'fallback' })
    }
    
    return NextResponse.json({ team, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Team GET failed:', error.message)
    return NextResponse.json({ error: 'Service unavailable: ' + error.message }, { status: 503 })
  }
}

// POST new team member (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { id, ...memberData } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Validation error: ID is required' }, { status: 400 })
    }

    // Use the provided ID as the document ID
    await firebaseAdminDb.collection('team').doc(id).set({
      ...memberData,
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({ success: true, member: { id, ...memberData } })
  } catch (error: any) {
    console.error('❌ Team POST failed:', error.message)
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 })
  }
}
