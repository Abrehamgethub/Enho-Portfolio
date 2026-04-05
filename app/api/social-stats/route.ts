import { NextRequest, NextResponse } from 'next/server'
import SocialStats from '@/lib/models/SocialStats'
import { safeConnectDB, withTimeout } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth-middleware'

// Default social stats when DB is unavailable
const defaultSocialStats = [
  { platform: 'YouTube', handle: '@Eneho_Hakim', followers: '21K+ Subscribers', url: 'https://www.youtube.com/@Eneho_Hakim', color: '#FF0000', icon: 'youtube', order: 0 },
  { platform: 'TikTok', handle: '@eneho_egna', followers: '25K+ Followers', url: 'https://www.tiktok.com/@eneho_egna', color: '#000000', icon: 'tiktok', order: 1 },
  { platform: 'Telegram', handle: '@Eneho_Tena', followers: '8K+ Members', url: 'https://t.me/Eneho_Tena', color: '#0088CC', icon: 'telegram', order: 2 },
  { platform: 'Facebook', handle: 'Eneho Egna', followers: '3K+ Followers', url: 'https://www.facebook.com/enehoegna', color: '#1877F2', icon: 'facebook', order: 3 },
]

// GET all social stats
export async function GET() {
  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json(defaultSocialStats)
    }

    const stats = await withTimeout(
      SocialStats.find().sort({ order: 1 }).exec(),
      4000,
      null
    )

    if (!stats || stats.length === 0) {
      return NextResponse.json(defaultSocialStats)
    }
    
    // Automate YouTube subscriber count if API key is present
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCU2XkPTOjJDaPeFl0qj7wJQ'
    
    if (YOUTUBE_API_KEY) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
          { signal: AbortSignal.timeout(3000) }
        )
        if (response.ok) {
          const data = await response.json()
          const subCount = data.items?.[0]?.statistics?.subscriberCount
          if (subCount) {
            const youtubeIndex = stats.findIndex((s: any) => s.platform.toLowerCase() === 'youtube')
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
    return NextResponse.json(defaultSocialStats)
  }
}

// POST/UPDATE social stats (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
    }

    const body = await request.json()
    
    const { platform, handle, followers, url, color, icon, order } = body
    
    if (!platform || !handle || !followers || !url) {
      return NextResponse.json(
        { error: 'Platform, handle, followers, and url are required' },
        { status: 400 }
      )
    }
    
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
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
    }

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
