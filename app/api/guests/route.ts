import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all guests
export async function GET(request: NextRequest) {
  if (!isAdminEnabled) {
    return NextResponse.json({ guests: [], source: 'none' })
  }
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    
    let guestsRef: FirebaseFirestore.Query = firebaseAdminDb.collection('guests')
    
    if (featured === 'true') {
      guestsRef = guestsRef.where('featured', '==', true)
    }
    
    const snapshot = await guestsRef.get()
    
    const guests = snapshot.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id }
    }).sort((a: any, b: any) => {
      if (a.order !== b.order && a.order !== undefined && b.order !== undefined) {
         return a.order - b.order
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    })
    
    return NextResponse.json({ guests, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Guests GET failed:', error.message)
    return NextResponse.json(
      { error: 'Service unavailable: ' + error.message },
      { status: 503 }
    )
  }
}

// POST - add a new guest (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()

    if (!body.episodeUrl || !String(body.episodeUrl).trim()) {
      return NextResponse.json(
        { error: 'Validation error: Episode URL is required' },
        { status: 400 }
      )
    }
    
    const docRef = await firebaseAdminDb.collection('guests').add({
      name: body.name,
      nameAmharic: body.nameAmharic,
      title: body.title,
      profession: body.profession,
      photo: body.photo || '',
      photos: body.photos || [],
      description: body.description,
      episodeUrl: body.episodeUrl,
      episodeDate: body.episodeDate,
      programName: body.programName,
      featured: body.featured || false,
      order: body.order || 0,
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({ success: true, guest: { id: docRef.id, ...body } })
  } catch (error: any) {
    console.error('❌ Guest POST failed:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to add guest: ' + error.message }, { status: 500 })
  }
}
