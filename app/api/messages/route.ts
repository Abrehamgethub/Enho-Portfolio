import { NextRequest, NextResponse } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'
import { rateLimit } from '@/lib/rate-limit'

const sanitize = (str: string) => str?.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET all messages (admin only)
export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ messages: [], source: 'none' })
  }

  try {
    const snapshot = await firebaseAdminDb.collection('messages').orderBy('date', 'desc').limit(100).get()
    
    const messages = snapshot.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id }
    })
    
    return NextResponse.json({ messages, source: 'firebase' }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error: any) {
    console.error('❌ Messages GET failed:', error.message)
    const safeError = process.env.NODE_ENV === 'production' ? 'Service unavailable' : error.message
    return NextResponse.json(
      { error: safeError },
      { status: 503, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    )
  }
}

// POST new message (from contact form)
export async function POST(request: NextRequest) {
  if (!rateLimit(request, { maxRequests: 3, windowMs: 60 * 60 * 1000 })) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
  }

  if (!isAdminEnabled) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const rawName = body.name || ''
    const rawEmail = body.email || ''
    const rawSubject = body.subject || ''
    const rawMessage = body.message || ''

    if (!rawName || !rawEmail || !rawMessage) {
      return NextResponse.json(
        { error: 'Validation error: Name, email, and message are required' },
        { status: 400 }
      )
    }

    if (rawMessage.length > 5000 || rawSubject.length > 200 || rawName.length > 100) {
      return NextResponse.json(
        { error: 'Validation error: Input too long' },
        { status: 400 }
      )
    }

    const name = sanitize(rawName)
    const email = sanitize(rawEmail)
    const subject = sanitize(rawSubject) || 'No Subject'
    const message = sanitize(rawMessage)

    const docRef = await firebaseAdminDb.collection('messages').add({
      name,
      email,
      subject,
      message,
      read: false,
      date: new Date().toISOString()
    })

    return NextResponse.json({ success: true, message: { id: docRef.id, name, email, subject, message } })
  } catch (error: any) {
    console.error('❌ Message POST failed:', error.message)
    const safeError = process.env.NODE_ENV === 'production' ? 'Failed to save message' : error.message
    return NextResponse.json(
      { error: 'Server error: ' + safeError },
      { status: 500 }
    )
  }
}
