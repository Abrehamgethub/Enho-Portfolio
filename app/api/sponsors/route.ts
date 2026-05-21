import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all sponsors (admin or public)
export async function GET(request: NextRequest) {
  if (!isAdminEnabled) {
    return NextResponse.json({ sponsors: [], source: 'none' })
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    
    // Create base query
    let sponsorsRef: FirebaseFirestore.Query = firebaseAdminDb.collection('sponsors')
    
    // Add type filter if provided
    if (type) {
      sponsorsRef = sponsorsRef.where('type', '==', type)
    }
    
    const snap = await sponsorsRef.get()
    
    const sponsors = snap.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id }
    })
    
    // Sort logic (can be moved to Firestore order-by if indexed)
    const orderMap: Record<string, number> = {
      'Gold': 1,
      'Silver': 2,
      'Bronze': 3,
      'Partner': 4
    }
    
    sponsors.sort((a, b) => {
      const typeA = orderMap[a.type as string] || 99
      const typeB = orderMap[b.type as string] || 99
      return typeA - typeB
    })
    
    return NextResponse.json({ sponsors, source: 'firebase' }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error: any) {
    console.error('❌ Sponsors GET failed:', error.message)
    return NextResponse.json({ error: 'Service unavailable: ' + error.message }, { status: 503 })
  }
}

// POST new sponsor (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { id, ...sponsorData } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Validation error: ID is required' }, { status: 400 })
    }

    await firebaseAdminDb.collection('sponsors').doc(id).set({
      ...sponsorData,
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({ success: true, sponsor: { id, ...sponsorData } })
  } catch (error: any) {
    console.error('❌ Sponsors POST failed:', error.message)
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 })
  }
}
