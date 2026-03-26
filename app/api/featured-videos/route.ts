import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import FeaturedVideo from '@/lib/models/FeaturedVideo'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET featured videos
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const activeOnly = searchParams.get('active') !== 'false'
    
    const query: any = {}
    if (category) query.category = category
    if (activeOnly) query.active = true
    
    const videos = await FeaturedVideo.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json({ 
      videos: videos.map(v => ({
        id: v.videoId,
        title: v.title,
        thumbnail: v.thumbnail,
        category: v.category,
        order: v.order,
        active: v.active,
        _id: v._id
      }))
    })
  } catch (error) {
    console.error('Error fetching featured videos:', error)
    return NextResponse.json({ videos: [] })
  }
}

// POST - add a featured video (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()
    const body = await request.json()
    
    // Check if video already exists
    const existing = await FeaturedVideo.findOne({ videoId: body.videoId })
    if (existing) {
      return NextResponse.json({ error: 'Video already added' }, { status: 400 })
    }
    
    const video = await FeaturedVideo.create({
      videoId: body.videoId,
      title: body.title,
      thumbnail: body.thumbnail,
      category: body.category || 'general',
      order: body.order || 0,
      active: true
    })
    
    return NextResponse.json({ success: true, video })
  } catch (error) {
    console.error('Error adding featured video:', error)
    return NextResponse.json({ error: 'Failed to add video' }, { status: 500 })
  }
}
