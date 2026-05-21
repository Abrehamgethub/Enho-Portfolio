import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { id } = await params
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ error: 'Validation error: Valid ID is required' }, { status: 400 })
    }
    
    const docSnap = await firebaseAdminDb.collection('team').doc(id).get()

    if (!docSnap.exists) {
      // Temporary Fallback
      const { getDoctorById } = await import('@/lib/doctors-data')
      const doctor = getDoctorById(id)
      if (doctor) {
        return NextResponse.json({ member: doctor })
      }
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    const data = docSnap.data()
    if (data) {
        delete data.id;
        delete data._id;
    }

    return NextResponse.json({ member: { id: docSnap.id, ...data } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Service unavailable: ' + error.message }, { status: 503 })
  }
}

// PATCH update team member (admin only)
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
    if (!id) return NextResponse.json({ error: 'Validation error: ID is required' }, { status: 400 })

    const body = await request.json()
    await firebaseAdminDb.collection('team').doc(id).update(body)
    
    return NextResponse.json({ success: true, member: body })
  } catch (error: any) {
    console.error('❌ Team PATCH failed:', error.message)
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 })
  }
}

// DELETE team member (admin only)
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
    if (!id) return NextResponse.json({ error: 'Validation error: ID is required' }, { status: 400 })

    await firebaseAdminDb.collection('team').doc(id).delete()
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ Team DELETE failed:', error.message)
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 })
  }
}
