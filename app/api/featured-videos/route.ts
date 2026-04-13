import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET featured videos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const activeOnly = searchParams.get('active') !== 'false'
    
    let constraints: any[] = []
    if (category) constraints.push(where('category', '==', category))
    if (activeOnly) constraints.push(where('active', '==', true))
    
    const q = query(collection(db, 'featured-videos'), ...constraints)
    const snapshot = await getDocs(q)
    
    const videos = snapshot.docs.map(doc => ({
      _id: doc.id,
      id: doc.data().videoId, // ensure frontend mappings still work
      ...doc.data()
    })).sort((a: any, b: any) => {
      if (a.order !== b.order && a.order !== undefined && b.order !== undefined) {
         return a.order - b.order
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    })
    
    return NextResponse.json({ videos, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Featured videos GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, videos: [] },
      { status: 503 }
    )
  }
}

// POST - add a featured video (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    
    // Check if video already exists in Firestore memory
    const existingQ = query(collection(db, 'featured-videos'), where('videoId', '==', body.videoId))
    const existingSnap = await getDocs(existingQ)
    
    if (!existingSnap.empty) {
      return NextResponse.json({ error: 'Video already added' }, { status: 400 })
    }
    
    const docRef = await addDoc(collection(db, 'featured-videos'), {
      videoId: body.videoId,
      title: body.title,
      thumbnail: body.thumbnail,
      category: body.category || 'general',
      order: body.order || 0,
      active: true,
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({ success: true, video: { _id: docRef.id, id: body.videoId, ...body } })
  } catch (error: any) {
    console.error('❌ Featured video POST failed:', error.message)
    return NextResponse.json({ error: 'Failed to add video: ' + error.message }, { status: 503 })
  }
}
