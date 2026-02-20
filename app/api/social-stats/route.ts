import { NextRequest, NextResponse } from 'next/server'
import SocialStats from '@/lib/models/SocialStats'
import { connectToDatabase } from '@/lib/db'

// GET all social stats
export async function GET() {
  try {
    await connectToDatabase()
    const stats = await SocialStats.find().sort({ order: 1 })
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch social stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social stats' },
      { status: 500 }
    )
  }
}

// POST/UPDATE social stats
export async function POST(request: NextRequest) {
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

// PUT to update multiple stats at once
export async function PUT(request: NextRequest) {
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
