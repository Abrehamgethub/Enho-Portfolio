import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
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
  if (!isAdminEnabled) {
    return NextResponse.json({ stats: defaultStats, source: 'default' })
  }
  try {
    const docRef = firebaseAdminDb.collection('settings').doc('social-stats')
    const docSnap = await docRef.get()
    
    if (docSnap.exists) {
      return NextResponse.json({ stats: docSnap.data(), source: 'firebase' })
    } else {
      return NextResponse.json({ stats: defaultStats, source: 'default' })
    }
  } catch (error: any) {
    console.error('❌ Social stats GET failed:', error.message)
    return NextResponse.json(
      { stats: defaultStats, error: 'Service unavailable: ' + error.message },
      { status: 503 }
    )
  }
}

// POST/PUT update social stats (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

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
    
    const docRef = firebaseAdminDb.collection('settings').doc('social-stats')
    await docRef.set(updateData, { merge: true })
    
    return NextResponse.json({ success: true, stats: updateData })
  } catch (error: any) {
    console.error('❌ Social stats PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Server error: Failed to update stats: ' + error.message },
      { status: 500 }
    )
  }
}
