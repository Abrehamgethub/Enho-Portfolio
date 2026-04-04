import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Guest from '@/lib/models/Guest'
import { requireAuth } from '@/lib/auth-middleware'
import { initialGuests } from '@/lib/guests-data'

export const dynamic = 'force-dynamic'

// GET all guests
export async function GET(request: NextRequest) {
  try {
    try {
      await connectDB()
    } catch (dbError) {
      console.error('Database connection failed in Guests API, using static fallback:', dbError)
      return NextResponse.json({ guests: initialGuests, source: 'static' })
    }
    
    // Check if empty, but don't seed here if we already have static data as fallback
    // Just return static data if DB is empty to stay safe
    const count = await Guest.countDocuments()
    if (count === 0) {
      return NextResponse.json({ guests: initialGuests, source: 'static' })
    }

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    
    const query: any = {}
    if (featured === 'true') query.featured = true
    
    const guests = await Guest.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json({ guests: guests.length > 0 ? guests : initialGuests })
  } catch (error) {
    console.error('API Error (GET /api/guests):', error)
    return NextResponse.json({ guests: initialGuests, error: 'Failed to fetch guests, using fallback' })
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
