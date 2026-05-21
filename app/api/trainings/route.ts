import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all trainings
export async function GET(request: NextRequest) {
  if (!isAdminEnabled) {
    return NextResponse.json({ trainings: [], source: 'none' })
  }
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    
    let trainingsRef: FirebaseFirestore.Query = firebaseAdminDb.collection('trainings')
    
    if (featured === 'true') {
      trainingsRef = trainingsRef.where('featured', '==', true)
    }
    if (category) {
      trainingsRef = trainingsRef.where('category', '==', category)
    }

    const snapshot = await trainingsRef.get()
    
    // Sort in memory to avoid Firestore index requirements
    const trainings = snapshot.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id }
    }).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({ trainings, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Trainings GET failed:', error.message)
    return NextResponse.json(
      { error: 'Service unavailable: ' + error.message },
      { status: 503 }
    )
  }
}

// POST new training (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const docRef = await firebaseAdminDb.collection('trainings').add(body)
    
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Training POST failed:', error.message)
    return NextResponse.json(
      { error: 'Server error: Failed to create training: ' + error.message },
      { status: 500 }
    )
  }
}

// PUT update training (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { id, _id, ...updateData } = body
    const trainingId = id || _id
    
    if (!trainingId) {
      return NextResponse.json({ error: 'Validation error: Training ID is required' }, { status: 400 })
    }
    
    await firebaseAdminDb.collection('trainings').doc(trainingId).update(updateData)
    return NextResponse.json({ id: trainingId, ...updateData })
  } catch (error: any) {
    console.error('❌ Training PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Server error: Failed to update training: ' + error.message },
      { status: 500 }
    )
  }
}

// DELETE training (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const trainingId = searchParams.get('id') || searchParams.get('_id')
    
    if (!trainingId) {
      return NextResponse.json({ error: 'Validation error: Training ID is required' }, { status: 400 })
    }
    
    await firebaseAdminDb.collection('trainings').doc(trainingId).delete()
    return NextResponse.json({ message: 'Training deleted successfully' })
  } catch (error: any) {
    console.error('❌ Training DELETE failed:', error.message)
    return NextResponse.json(
      { error: 'Server error: Failed to delete training: ' + error.message },
      { status: 500 }
    )
  }
}
