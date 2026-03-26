import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Guest from '@/lib/models/Guest'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all guests
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    
    const query: any = {}
    if (featured === 'true') query.featured = true
    
    const guests = await Guest.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json({ guests })
  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json({ guests: [] })
  }
}

// POST - add a new guest (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()
    const body = await request.json()

    if (!body.episodeUrl || !String(body.episodeUrl).trim()) {
      return NextResponse.json(
        { error: 'Episode URL is required' },
        { status: 400 }
      )
    }
    
    const guest = await Guest.create({
      name: body.name,
      nameAmharic: body.nameAmharic,
      title: body.title,
      profession: body.profession,
      photo: body.photo || '',
      photos: body.photos || [],
      description: body.description,
      episodeUrl: body.episodeUrl,
      episodeDate: body.episodeDate,
      programName: body.programName,
      featured: body.featured || false,
      order: body.order || 0
    })
    
    return NextResponse.json({ success: true, guest })
  } catch (error) {
    console.error('Error adding guest:', error)
    return NextResponse.json({ error: 'Failed to add guest' }, { status: 500 })
  }
}
