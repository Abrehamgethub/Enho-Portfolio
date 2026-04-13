import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET all messages (admin only)
export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const q = query(collection(db, 'messages'), orderBy('date', 'desc'))
    const snapshot = await getDocs(q)
    
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({ messages, source: 'firebase' }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error: any) {
    console.error('❌ Messages GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, messages: [] },
      { status: 503, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    )
  }
}

// POST new message (from contact form / if ever used here instead of /api/contact)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const docRef = await addDoc(collection(db, 'messages'), {
      name,
      email,
      subject: subject || 'No Subject',
      message,
      read: false,
      date: new Date().toISOString()
    })

    return NextResponse.json({ success: true, message: { id: docRef.id, name, email, subject, message } })
  } catch (error: any) {
    console.error('❌ Message POST failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to save message: ' + error.message },
      { status: 503 }
    )
  }
}
