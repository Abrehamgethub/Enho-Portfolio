import { NextRequest, NextResponse } from 'next/server'
import { getMessages, addMessage } from '@/lib/db'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET all messages
export async function GET() {
  const messages = await getMessages()
  return NextResponse.json({ messages }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    )
  }
}
