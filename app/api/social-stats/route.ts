import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

const defaultStats = {
  youtubeSubscribers: '5K+',
  facebookFollowers: '10K+',
  telegramMembers: '2K+',
  tiktokFollowers: '15K+'
}

// GET social stats
export async function GET() {
  try {
    const docRef = doc(db, 'settings', 'social-stats')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return NextResponse.json({ stats: docSnap.data(), source: 'firebase' })
    } else {
      return NextResponse.json({ stats: defaultStats, source: 'default' })
    }
  } catch (error: any) {
    console.error('❌ Social stats GET failed:', error.message)
    return NextResponse.json(
      { stats: defaultStats, error: error.message },
      { status: 503 }
    )
  }
}

// POST/PUT update social stats (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const validKeys = ['youtubeSubscribers', 'facebookFollowers', 'telegramMembers', 'tiktokFollowers']
    
    // Filter to only valid keys
    const updateData: any = {}
    validKeys.forEach(key => {
      if (body[key] !== undefined) {
        updateData[key] = String(body[key]).trim()
      }
    })
    
    const docRef = doc(db, 'settings', 'social-stats')
    await setDoc(docRef, updateData, { merge: true })
    
    return NextResponse.json({ success: true, stats: updateData })
  } catch (error: any) {
    console.error('❌ Social stats PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to update stats: ' + error.message },
      { status: 503 }
    )
  }
}
