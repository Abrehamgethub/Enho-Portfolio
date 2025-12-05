import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Sponsor from '@/lib/models/Sponsor'

export const dynamic = 'force-dynamic'

// GET all sponsors
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const programType = searchParams.get('type')
    const featured = searchParams.get('featured')
    
    const query: any = {}
    if (programType) query.programType = programType
    if (featured === 'true') query.featured = true
    
    const sponsors = await Sponsor.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json({ sponsors })
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return NextResponse.json({ sponsors: [] })
  }
}

// POST - add a new sponsor
export async function POST(request: NextRequest) {
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
