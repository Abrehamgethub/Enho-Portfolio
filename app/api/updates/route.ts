import { NextRequest, NextResponse } from 'next/server'
import { getUpdates, addUpdate } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
  return `${Math.floor(days / 7)} week${Math.floor(days / 7) !== 1 ? 's' : ''} ago`
}

// GET all updates
export async function GET() {
  try {
    const updates = await getUpdates()
    
    // Format for frontend
    const formattedUpdates = updates.slice(0, 10).map(update => ({
      id: update.id,
      text: `${update.emoji} ${update.text}`,
      time: getTimeAgo(new Date(update.createdAt)),
      createdAt: update.createdAt
    }))
    
    return NextResponse.json({ updates: formattedUpdates, source: 'db' })
  } catch (error: any) {
    console.error('❌ Updates GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, updates: [] },
      { status: 503 }
    )
  }
}

// POST new update (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError
  
  try {
    const { text, emoji } = await request.json()
    const update = await addUpdate({ text, emoji: emoji || '📢', active: true })
    
    return NextResponse.json({ success: true, update }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Update POST failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to create update: ' + error.message },
      { status: 503 }
    )
  }
}
