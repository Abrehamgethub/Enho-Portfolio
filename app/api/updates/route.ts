import { NextRequest, NextResponse } from 'next/server'
import { getUpdates, addUpdate } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

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
    
    console.log(`Returning ${formattedUpdates.length} updates`)
    return NextResponse.json({ updates: formattedUpdates })
  } catch (error) {
    console.error('Error fetching updates:', error)
    
    // Return empty array instead of sample data when there's an error
    return NextResponse.json({ updates: [] })
  }
}

// POST new update (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    console.log('Creating new update:', body)
    
    const update = await addUpdate({
      text: body.text,
      emoji: body.emoji || '📢',
      active: true
    })
    
    console.log('Update created successfully:', update.id)
    
    return NextResponse.json({ 
      success: true, 
      update: {
        id: update.id,
        text: update.text,
        emoji: update.emoji,
        createdAt: update.createdAt
      }
    })
  } catch (error) {
    console.error('Error creating update:', error)
    return NextResponse.json({ error: 'Failed to create update' }, { status: 500 })
  }
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return `${Math.floor(seconds / 604800)} weeks ago`
}
