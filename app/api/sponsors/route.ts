import { NextRequest, NextResponse } from 'next/server'
import connectDB, { withTimeout } from '@/lib/mongodb'
import Sponsor from '@/lib/models/Sponsor'
import { requireAuth } from '@/lib/auth-middleware'
import { initialSponsors } from '@/lib/sponsors-data'

export const dynamic = 'force-dynamic'

// GET all sponsors
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const totalCount = await withTimeout(Sponsor.countDocuments({}), 5000)
    
    // Seed DB if empty
    if (totalCount === 0) {
      console.log('📦 Sponsors collection empty — seeding with initial data')
      const toInsert = initialSponsors.map(s => {
        const { id, _id, ...rest } = s as any;
        return rest;
      });
      await withTimeout(Sponsor.insertMany(toInsert), 8000);
    }

    const { searchParams } = new URL(request.url)
    const programType = searchParams.get('type')
    const featured = searchParams.get('featured')
    
    const query: any = {}
    if (programType) query.programType = programType
    if (featured === 'true') query.featured = true
    
    const sponsors = await withTimeout(
      Sponsor.find(query).sort({ order: 1, createdAt: -1 }).exec(),
      8000
    )
    
    return NextResponse.json({ sponsors, source: 'db' })
  } catch (error: any) {
    console.error('❌ Sponsors GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, sponsors: [] },
      { status: 503 }
    )
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
  } catch (error: any) {
    console.error('❌ Sponsor POST failed:', error.message)
    return NextResponse.json({ error: 'Failed to add sponsor: ' + error.message }, { status: 503 })
  }
}
