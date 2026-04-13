import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all trainings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    
    let constraints: any[] = []
    if (featured === 'true') constraints.push(where('featured', '==', true))
    if (category) constraints.push(where('category', '==', category))

    const q = query(collection(db, 'trainings'), ...constraints)
    const snapshot = await getDocs(q)
    
    // Sort in memory to avoid Firestore index requirements
    const trainings = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({ trainings, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Trainings GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, trainings: [] },
      { status: 503 }
    )
  }
}

// POST new training (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const docRef = await addDoc(collection(db, 'trainings'), body)
    
    return NextResponse.json({ _id: docRef.id, ...body }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Training POST failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to create training: ' + error.message },
      { status: 503 }
    )
  }
}

// PUT update training (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { id, _id, ...updateData } = body
    const trainingId = id || _id
    
    if (!trainingId) {
      return NextResponse.json({ error: 'Training ID is required' }, { status: 400 })
    }
    
    await updateDoc(doc(db, 'trainings', trainingId), updateData)
    return NextResponse.json({ _id: trainingId, ...updateData })
  } catch (error: any) {
    console.error('❌ Training PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to update training: ' + error.message },
      { status: 503 }
    )
  }
}

// DELETE training (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const trainingId = searchParams.get('id') || searchParams.get('_id')
    
    if (!trainingId) {
      return NextResponse.json({ error: 'Training ID is required' }, { status: 400 })
    }
    
    await deleteDoc(doc(db, 'trainings', trainingId))
    return NextResponse.json({ message: 'Training deleted successfully' })
  } catch (error: any) {
    console.error('❌ Training DELETE failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to delete training: ' + error.message },
      { status: 503 }
    )
  }
}
