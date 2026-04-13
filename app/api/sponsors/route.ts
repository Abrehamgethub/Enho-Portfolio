import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all sponsors
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const programType = searchParams.get('type')
    const featured = searchParams.get('featured')
    
    let constraints: any[] = []
    if (programType) constraints.push(where('programType', '==', programType))
    if (featured === 'true') constraints.push(where('featured', '==', true))
    
    const q = query(collection(db, 'sponsors'), ...constraints)
    const snapshot = await getDocs(q)
    
    const sponsors = snapshot.docs.map(doc => ({
      _id: doc.id,
      id: doc.id,
      ...doc.data()
    })).sort((a: any, b: any) => {
      if (a.order !== b.order && a.order !== undefined && b.order !== undefined) {
         return a.order - b.order
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    })
    
    return NextResponse.json({ sponsors, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Sponsors GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, sponsors: [] },
      { status: 503 }
    )
  }
}

// POST - add a new sponsor (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    
    const docRef = await addDoc(collection(db, 'sponsors'), {
      name: body.name,
      nameAmharic: body.nameAmharic,
      logo: body.logo,
      description: body.description,
      website: body.website,
      programType: body.programType || 'regular',
      programName: body.programName,
      programDate: body.programDate,
      episodeUrl: body.episodeUrl,
      photos: body.photos || [],
      featured: body.featured || false,
      order: body.order || 0,
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({ success: true, sponsor: { _id: docRef.id, id: docRef.id, ...body } })
  } catch (error: any) {
    console.error('❌ Sponsor POST failed:', error.message)
    return NextResponse.json({ error: 'Failed to add sponsor: ' + error.message }, { status: 503 })
  }
}
