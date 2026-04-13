import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all guests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    
    let constraints: any[] = []
    if (featured === 'true') constraints.push(where('featured', '==', true))
    
    const q = query(collection(db, 'guests'), ...constraints)
    const snapshot = await getDocs(q)
    
    const guests = snapshot.docs.map(doc => ({
      _id: doc.id,
      id: doc.id,
      ...doc.data()
    })).sort((a: any, b: any) => {
      if (a.order !== b.order && a.order !== undefined && b.order !== undefined) {
         return a.order - b.order
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    })
    
    return NextResponse.json({ guests, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Guests GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, guests: [] },
      { status: 503 }
    )
  }
}

// POST - add a new guest (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()

    if (!body.episodeUrl || !String(body.episodeUrl).trim()) {
      return NextResponse.json(
        { error: 'Episode URL is required' },
        { status: 400 }
      )
    }
    
    const docRef = await addDoc(collection(db, 'guests'), {
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
    
    return NextResponse.json({ success: true, guest: { _id: docRef.id, id: docRef.id, ...body } })
  } catch (error: any) {
    console.error('❌ Guest POST failed:', error.message)
    return NextResponse.json({ error: 'Failed to add guest: ' + error.message }, { status: 503 })
  }
}
