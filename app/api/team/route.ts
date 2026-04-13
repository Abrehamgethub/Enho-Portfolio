import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all team members (admin or public)
export async function GET() {
  try {
    const snap = await getDocs(collection(db, 'team'))
    const team = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    
    return NextResponse.json({ team, source: 'firebase' })
  } catch (error: any) {
    console.error('❌ Team GET failed:', error.message)
    return NextResponse.json({ error: 'Failed: ' + error.message, team: [] }, { status: 503 })
  }
}
