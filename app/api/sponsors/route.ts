import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Sponsor from '@/lib/models/Sponsor'
import { requireAuth } from '@/lib/auth-middleware'
import { initialSponsors } from '@/lib/sponsors-data'

export const dynamic = 'force-dynamic'

// GET all sponsors
export async function GET(request: NextRequest) {
  try {
    try {
      await connectDB()
    } catch (dbError) {
      console.error('Database connection failed in Sponsors API, using static fallback:', dbError)
      return NextResponse.json({ sponsors: initialSponsors, source: 'static' })
    }
    
    // Check if empty, return static data as safety
    const count = await Sponsor.countDocuments()
    if (count === 0) {
      return NextResponse.json({ sponsors: initialSponsors, source: 'static' })
    }

    const { searchParams } = new URL(request.url)
    const programType = searchParams.get('type')
    const featured = searchParams.get('featured')
    
    const query: any = {}
    if (programType) query.programType = programType
    if (featured === 'true') query.featured = true
    
    const sponsors = await Sponsor.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json({ sponsors: sponsors.length > 0 ? sponsors : initialSponsors })
  } catch (error) {
    console.error('API Error (GET /api/sponsors):', error)
    return NextResponse.json({ sponsors: initialSponsors, error: 'Failed to fetch sponsors, using fallback' })
  }
}

// POST - add a new sponsor (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()
    const body = await request.json()
    
    const sponsor = await Sponsor.create({
      name: body.name,
      nameAmharic: body.nameAmharic,
      logo: body.logo,
      description: body.description,
      website: body.website,
      programType: body.programType || 'regular',
      programName: body.programName,
      programDate: body.programDate,
      episodeUrl: body.episodeUrl,
      photos: body.photos || [],
      featured: body.featured || false,
      order: body.order || 0
    })
    
    return NextResponse.json({ success: true, sponsor })
  } catch (error) {
    console.error('Error adding sponsor:', error)
    return NextResponse.json({ error: 'Failed to add sponsor' }, { status: 500 })
  }
}
