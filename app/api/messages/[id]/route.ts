import { NextRequest, NextResponse } from 'next/server'
import { getMessage, updateMessage, deleteMessage, markMessageAsRead } from '@/lib/db'

// GET single message
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const message = await getMessage(params.id)
  if (!message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  }
  return NextResponse.json({ message })
}

// PATCH update message (mark as read, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    if (body.markAsRead) {
      const message = await markMessageAsRead(params.id)
      if (!message) {
        return NextResponse.json({ error: 'Message not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, message })
    }

    const message = await updateMessage(params.id, body)
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

// DELETE message
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = await deleteMessage(params.id)
  if (!deleted) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
