import { NextRequest, NextResponse } from 'next/server'
import { getMessages, addMessage } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET all messages (admin only)
export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const messages = await getMessages()
    return NextResponse.json({ messages, source: 'db' }, {
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

// POST new message (from contact form)
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

    const newMessage = await addMessage({
      name,
      email,
      subject: subject || 'No Subject',
      message
    })

    return NextResponse.json({ success: true, message: newMessage })
  } catch (error: any) {
    console.error('❌ Message POST failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to save message: ' + error.message },
      { status: 503 }
    )
  }
}
