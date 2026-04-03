import { NextRequest, NextResponse } from 'next/server'
import { getMessage, updateMessage, deleteMessage, markMessageAsRead } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

// GET single message (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  const message = await getMessage((await params).id)
  if (!message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  }
  return NextResponse.json({ message })
}

// PATCH update message (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    
    if (body.markAsRead) {
      const message = await markMessageAsRead((await params).id)
      if (!message) {
        return NextResponse.json({ error: 'Message not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, message })
    }

    const message = await updateMessage((await params).id, body)
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

// DELETE message (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  const deleted = await deleteMessage((await params).id)
  if (!deleted) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
