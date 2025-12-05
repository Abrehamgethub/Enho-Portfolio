import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Update from '@/lib/models/Update'

export const dynamic = 'force-dynamic'

// GET all updates
export async function GET() {
  try {
    await connectDB()
    const updates = await Update.find({ active: true }).sort({ createdAt: -1 }).limit(10)
    
    // Format for frontend
    const formattedUpdates = updates.map(update => ({
      id: update._id.toString(),
      text: `${update.emoji} ${update.text}`,
      time: getTimeAgo(update.createdAt),
      createdAt: update.createdAt
    }))
    
    return NextResponse.json({ updates: formattedUpdates })
  } catch (error) {
    console.error('Error fetching updates:', error)
    // Return sample data if DB fails
    return NextResponse.json({ 
      updates: [
        { id: '1', text: '🎙️ New Episode: Understanding Diabetes Prevention', time: '2 hours ago' },
        { id: '2', text: '💊 Health Tip: 5 ways to boost your immune system', time: '5 hours ago' },
        { id: '3', text: '📢 Join us LIVE this Saturday for Q&A session!', time: '1 day ago' },
        { id: '4', text: '🏥 Community Health Workshop - Register Now!', time: '2 days ago' },
      ]
    })
  }
}

// POST new update
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const update = await Update.create({
      text: body.text,
      emoji: body.emoji || '📢',
      active: true
    })
    
    return NextResponse.json({ 
      success: true, 
      update: {
        id: update._id.toString(),
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
