import { NextRequest, NextResponse } from 'next/server'
import connectDB, { withTimeout } from '@/lib/mongodb'
import Guest from '@/lib/models/Guest'
import { requireAuth } from '@/lib/auth-middleware'
import { initialGuests } from '@/lib/guests-data'

export const dynamic = 'force-dynamic'

// GET all guests
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const totalCount = await withTimeout(Guest.countDocuments({}), 5000)
    
    // Seed DB if empty
    if (totalCount === 0) {
      console.log('📦 Guests collection empty — seeding with initial data')
      const toInsert = initialGuests.map(g => {
        const { id, _id, ...rest } = g as any;
        return rest;
      });
      await withTimeout(Guest.insertMany(toInsert), 8000);
    }

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    
    const query: any = {}
    if (featured === 'true') query.featured = true
    
    const guests = await withTimeout(
      Guest.find(query).sort({ order: 1, createdAt: -1 }).exec(),
      8000
    )
    
    return NextResponse.json({ guests, source: 'db' })
  } catch (error: any) {
    console.error('❌ Guests GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, guests: [] },
      { status: 503 }
    )
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
  } catch (error: any) {
    console.error('❌ Guest POST failed:', error.message)
    return NextResponse.json({ error: 'Failed to add guest: ' + error.message }, { status: 503 })
  }
}
