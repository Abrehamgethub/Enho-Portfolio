import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all documentaries
export async function GET(request: NextRequest) {
  if (!isAdminEnabled) {
    return NextResponse.json({ documentaries: [], source: 'none' })
  }
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const language = searchParams.get('language')
    
    let docsRef: FirebaseFirestore.Query = firebaseAdminDb.collection('documentaries')
    
    if (featured === 'true') {
      docsRef = docsRef.where('featured', '==', true)
    }
    if (language) {
      docsRef = docsRef.where('language', '==', language)
    }

    const snapshot = await docsRef.get()
    
    const documentaries = snapshot.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id }
    }).sort((a: any, b: any) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())

    return NextResponse.json({ documentaries, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Documentaries GET failed:', error.message)
    return NextResponse.json(
      { error: 'Service unavailable: ' + error.message },
      { status: 503 }
    )
  }
}

// POST new documentary (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const docRef = await firebaseAdminDb.collection('documentaries').add(body)
    
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Documentary POST failed:', error.message)
    return NextResponse.json(
      { error: 'Server error: Failed to create documentary: ' + error.message },
      { status: 500 }
    )
  }
}

// PUT update documentary (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { id, _id, ...updateData } = body
    const docId = id || _id
    
    if (!docId) {
      return NextResponse.json({ error: 'Validation error: Documentary ID is required' }, { status: 400 })
    }
    
    await firebaseAdminDb.collection('documentaries').doc(docId).update(updateData)
    return NextResponse.json({ id: docId, ...updateData })
  } catch (error: any) {
    console.error('❌ Documentary PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Server error: Failed to update documentary: ' + error.message },
      { status: 500 }
    )
  }
}

// DELETE documentary (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const docId = searchParams.get('id') || searchParams.get('_id')
    
    if (!docId) {
      return NextResponse.json({ error: 'Validation error: Documentary ID is required' }, { status: 400 })
    }
    
    await firebaseAdminDb.collection('documentaries').doc(docId).delete()
    return NextResponse.json({ message: 'Documentary deleted successfully' })
  } catch (error: any) {
    console.error('❌ Documentary DELETE failed:', error.message)
    return NextResponse.json(
      { error: 'Server error: Failed to delete documentary: ' + error.message },
      { status: 500 }
    )
  }
}
