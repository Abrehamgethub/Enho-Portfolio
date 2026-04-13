import { NextRequest, NextResponse } from 'next/server'
import Documentary from '@/lib/models/Documentary'
import connectDB, { withTimeout } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth-middleware'
import { initialDocumentaries } from '@/lib/documentaries-data'

export const dynamic = 'force-dynamic'

// GET all documentaries
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const language = searchParams.get('language')
    
    let query: any = {}
    if (featured === 'true') {
      query.featured = true
    }
    if (language) {
      query.language = language
    }

    const totalCount = await withTimeout(Documentary.countDocuments({}), 5000)
    
    // Seed DB if empty
    if (totalCount === 0) {
      console.log('📦 Documentaries collection empty — seeding with initial data')
      const toInsert = initialDocumentaries.map(d => {
        const { _id, ...rest } = d as any;
        return rest;
      });
      await withTimeout(Documentary.insertMany(toInsert), 8000);
    }

    const documentaries = await withTimeout(
      Documentary.find(query).sort({ releaseDate: -1 }).exec(),
      8000
    )

    return NextResponse.json({ documentaries, source: 'db' })
  } catch (error: any) {
    console.error('❌ Documentaries GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, documentaries: [] },
      { status: 503 }
    )
  }
}

// POST new documentary (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()

    const body = await request.json()
    const documentary = new Documentary(body)
    await withTimeout(documentary.save(), 8000)
    
    return NextResponse.json(documentary, { status: 201 })
  } catch (error: any) {
    console.error('❌ Documentary POST failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to create documentary: ' + error.message },
      { status: 503 }
    )
  }
}

// PUT update documentary (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()

    const body = await request.json()
    const { id, _id, ...updateData } = body
    const docId = id || _id
    
    if (!docId) {
      return NextResponse.json({ error: 'Documentary ID is required' }, { status: 400 })
    }
    
    const documentary = await withTimeout(
      Documentary.findByIdAndUpdate(docId, updateData, { new: true, runValidators: true }),
      8000
    )
    
    if (!documentary) {
      return NextResponse.json({ error: 'Documentary not found' }, { status: 404 })
    }
    
    return NextResponse.json(documentary)
  } catch (error: any) {
    console.error('❌ Documentary PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to update documentary: ' + error.message },
      { status: 503 }
    )
  }
}

// DELETE documentary (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const docId = searchParams.get('id') || searchParams.get('_id')
    
    if (!docId) {
      return NextResponse.json({ error: 'Documentary ID is required' }, { status: 400 })
    }
    
    const documentary = await withTimeout(Documentary.findByIdAndDelete(docId), 8000)
    
    if (!documentary) {
      return NextResponse.json({ error: 'Documentary not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Documentary deleted successfully' })
  } catch (error: any) {
    console.error('❌ Documentary DELETE failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to delete documentary: ' + error.message },
      { status: 503 }
    )
  }
}
