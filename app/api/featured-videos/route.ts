import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET featured videos
export async function GET(request: NextRequest) {
  if (!isAdminEnabled) {
    return NextResponse.json({ videos: [], source: 'none' })
  }
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const activeOnly = searchParams.get('active') !== 'false'
    
    let videosRef: FirebaseFirestore.Query = firebaseAdminDb.collection('featured-videos')
    
    if (category) {
      videosRef = videosRef.where('category', '==', category)
    }
    if (activeOnly) {
      videosRef = videosRef.where('active', '==', true)
    }
    
    const snapshot = await videosRef.get()
    
    const videos = snapshot.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id } // The frontend might have relied on `data.videoId || doc.id` previously but standardizing to `id: doc.id` here
    }).sort((a: any, b: any) => {
      if (a.order !== b.order && a.order !== undefined && b.order !== undefined) {
         return a.order - b.order
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    })
    
    return NextResponse.json({ videos, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Featured videos GET failed:', error.message)
    return NextResponse.json(
      { error: 'Service unavailable: ' + error.message },
      { status: 503 }
    )
  }
}

// POST - add a featured video (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    
    if (!body.videoId || typeof body.videoId !== 'string') {
      return NextResponse.json({ error: 'Validation error: Valid videoId is required' }, { status: 400 })
    }
    
    // Check if video already exists in Firestore memory
    const existingSnap = await firebaseAdminDb.collection('featured-videos').where('videoId', '==', body.videoId).get()
    
    if (!existingSnap.empty) {
      return NextResponse.json({ error: 'Validation error: Video already added' }, { status: 400 })
    }
    
    const docRef = await firebaseAdminDb.collection('featured-videos').add({
      videoId: body.videoId,
      title: body.title,
      thumbnail: body.thumbnail,
      category: body.category || 'general',
      order: body.order || 0,
      active: true,
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({ success: true, video: { id: docRef.id, ...body } })
  } catch (error: any) {
    console.error('❌ Featured video POST failed:', error.message)
    return NextResponse.json({ error: 'Server error: Failed to add video: ' + error.message }, { status: 500 })
  }
}
