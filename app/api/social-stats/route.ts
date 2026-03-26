import { NextRequest, NextResponse } from 'next/server'
import SocialStats from '@/lib/models/SocialStats'
import { connectToDatabase } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

// GET all social stats
export async function GET() {
  try {
    await connectToDatabase()
    const stats = await SocialStats.find().sort({ order: 1 })
    
    // Automate YouTube subscriber count if API key is present
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCU2XkPTOjJDaPeFl0qj7wJQ'
    
    if (YOUTUBE_API_KEY) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        )
        if (response.ok) {
          const data = await response.json()
          const subCount = data.items?.[0]?.statistics?.subscriberCount
          if (subCount) {
            // Update the YouTube stat in the list
            const youtubeIndex = stats.findIndex(s => s.platform.toLowerCase() === 'youtube')
            if (youtubeIndex !== -1) {
              const count = parseInt(subCount)
              let displayCount = subCount
              if (count >= 1000000) displayCount = (count / 1000000).toFixed(1).replace(/\.0$/, '') + "M"
              else if (count >= 1000) displayCount = (count / 1000).toFixed(1).replace(/\.0$/, '') + "K"
              
              stats[youtubeIndex].followers = displayCount + " Subscribers"
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch live YouTube stats:', err)
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch social stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social stats' },
      { status: 500 }
    )
  }
}

// POST/UPDATE social stats (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const body = await request.json()
    
    const { platform, handle, followers, url, color, icon, order } = body
    
    if (!platform || !handle || !followers || !url) {
      return NextResponse.json(
        { error: 'Platform, handle, followers, and url are required' },
        { status: 400 }
      )
    }
    
    // Update existing or create new
    const stat = await SocialStats.findOneAndUpdate(
      { platform },
      { platform, handle, followers, url, color, icon, order: order || 0 },
      { upsert: true, new: true }
    )
    
    return NextResponse.json(stat)
  } catch (error) {
    console.error('Failed to save social stats:', error)
    return NextResponse.json(
      { error: 'Failed to save social stats' },
      { status: 500 }
    )
  }
}

// PUT to update multiple stats at once (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const body = await request.json()
    const { stats } = body
    
    if (!Array.isArray(stats)) {
      return NextResponse.json(
        { error: 'Stats must be an array' },
        { status: 400 }
      )
    }
    
    const updatePromises = stats.map((stat) => 
      SocialStats.findOneAndUpdate(
        { platform: stat.platform },
        stat,
        { upsert: true, new: true }
      )
    )
    
    const results = await Promise.all(updatePromises)
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('Failed to update social stats:', error)
    return NextResponse.json(
      { error: 'Failed to update social stats' },
      { status: 500 }
    )
  }
}
