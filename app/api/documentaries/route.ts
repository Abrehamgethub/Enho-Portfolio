import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all documentaries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const language = searchParams.get('language')
    
    let constraints: any[] = []
    if (featured === 'true') constraints.push(where('featured', '==', true))
    if (language) constraints.push(where('language', '==', language))

    const q = query(collection(db, 'documentaries'), ...constraints)
    const snapshot = await getDocs(q)
    
    const documentaries = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    })).sort((a: any, b: any) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())

    return NextResponse.json({ documentaries, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Documentaries GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, documentaries: [] },
      { status: 503 }
    )
  }
}

// POST new documentary (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const docRef = await addDoc(collection(db, 'documentaries'), body)
    
    return NextResponse.json({ _id: docRef.id, ...body }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Documentary POST failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to create documentary: ' + error.message },
      { status: 503 }
    )
  }
}

// PUT update documentary (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { id, _id, ...updateData } = body
    const docId = id || _id
    
    if (!docId) {
      return NextResponse.json({ error: 'Documentary ID is required' }, { status: 400 })
    }
    
    await updateDoc(doc(db, 'documentaries', docId), updateData)
    return NextResponse.json({ _id: docId, ...updateData })
  } catch (error: any) {
    console.error('❌ Documentary PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to update documentary: ' + error.message },
      { status: 503 }
    )
  }
}

// DELETE documentary (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const docId = searchParams.get('id') || searchParams.get('_id')
    
    if (!docId) {
      return NextResponse.json({ error: 'Documentary ID is required' }, { status: 400 })
    }
    
    await deleteDoc(doc(db, 'documentaries', docId))
    return NextResponse.json({ message: 'Documentary deleted successfully' })
  } catch (error: any) {
    console.error('❌ Documentary DELETE failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to delete documentary: ' + error.message },
      { status: 503 }
    )
  }
}
