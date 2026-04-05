import { NextRequest, NextResponse } from 'next/server'
import { safeConnectDB, withTimeout } from '@/lib/mongodb'
import Sponsor from '@/lib/models/Sponsor'
import { requireAuth } from '@/lib/auth-middleware'
import { initialSponsors } from '@/lib/sponsors-data'

export const dynamic = 'force-dynamic'

// GET all sponsors
export async function GET(request: NextRequest) {
  try {
    const conn = await safeConnectDB()
    if (!conn) {
      console.warn('Sponsors API: MongoDB unavailable, returning static fallback')
      return NextResponse.json({ sponsors: initialSponsors, source: 'static' })
    }

    const count = await withTimeout(Sponsor.countDocuments().exec(), 3000, -1)
    if (count === -1) {
      return NextResponse.json({ sponsors: initialSponsors, source: 'static' })
    }
    if (count === 0) {
      try {
        const toInsert = initialSponsors.map(s => {
          const { id, _id, ...rest } = s as any;
          return rest;
        });
        const inserted = await Sponsor.insertMany(toInsert);
        return NextResponse.json({ sponsors: inserted, source: 'db-seeded' });
      } catch (e) {
        console.error('Sponsors seed error:', e);
        return NextResponse.json({ sponsors: initialSponsors, source: 'static' });
      }
    }

    const { searchParams } = new URL(request.url)
    const programType = searchParams.get('type')
    const featured = searchParams.get('featured')
    
    const query: any = {}
    if (programType) query.programType = programType
    if (featured === 'true') query.featured = true
    
    const sponsors = await withTimeout(
      Sponsor.find(query).sort({ order: 1, createdAt: -1 }).exec(),
      4000,
      null
    )
    
    if (!sponsors || sponsors.length === 0) {
      return NextResponse.json({ sponsors: initialSponsors, source: 'static' })
    }
    
    return NextResponse.json({ sponsors })
  } catch (error) {
    console.error('API Error (GET /api/sponsors):', error)
    return NextResponse.json({ sponsors: initialSponsors, source: 'static-fallback' })
  }
}

// POST - add a new sponsor (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
    }

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
