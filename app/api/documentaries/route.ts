import { NextRequest, NextResponse } from 'next/server'
import Documentary from '@/lib/models/Documentary'
import { safeConnectDB, withTimeout } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth-middleware'
import { initialDocumentaries } from '@/lib/documentaries-data'

export const dynamic = 'force-dynamic'

// GET all documentaries
export async function GET(request: NextRequest) {
  try {
    const conn = await safeConnectDB()
    if (!conn) {
      console.warn('Documentaries API: MongoDB unavailable, returning static fallback')
      return NextResponse.json({ documentaries: initialDocumentaries, source: 'static' })
    }

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
    
    const documentaries = await withTimeout(
      Documentary.find(query).sort({ releaseDate: -1 }).exec(),
      4000,
      null
    )

    if (!documentaries) {
      return NextResponse.json({ documentaries: initialDocumentaries, source: 'static' })
    }

    return NextResponse.json({ documentaries: documentaries.length > 0 ? documentaries : initialDocumentaries })
  } catch (error) {
    console.error('Failed to fetch documentaries:', error)
    return NextResponse.json({ documentaries: initialDocumentaries, source: 'static-fallback' })
  }
}

// POST new documentary (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
    }

    const body = await request.json()
    
    const documentary = new Documentary(body)
    await documentary.save()
    
    return NextResponse.json(documentary, { status: 201 })
  } catch (error) {
    console.error('Failed to create documentary:', error)
    return NextResponse.json(
      { error: 'Failed to create documentary' },
      { status: 500 }
    )
  }
}

// PUT update documentary (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
    }

    const body = await request.json()
    const { id, _id, ...updateData } = body
    const docId = id || _id
    
    if (!docId) {
      return NextResponse.json(
        { error: 'Documentary ID is required' },
        { status: 400 }
      )
    }
    
    const documentary = await Documentary.findByIdAndUpdate(
      docId,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!documentary) {
      return NextResponse.json(
        { error: 'Documentary not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(documentary)
  } catch (error) {
    console.error('Failed to update documentary:', error)
    return NextResponse.json(
      { error: 'Failed to update documentary' },
      { status: 500 }
    )
  }
}

// DELETE documentary (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const docId = searchParams.get('id') || searchParams.get('_id')
    
    if (!docId) {
      return NextResponse.json(
        { error: 'Documentary ID is required' },
        { status: 400 }
      )
    }
    
    const documentary = await Documentary.findByIdAndDelete(docId)
    
    if (!documentary) {
      return NextResponse.json(
        { error: 'Documentary not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Documentary deleted successfully' })
  } catch (error) {
    console.error('Failed to delete documentary:', error)
    return NextResponse.json(
      { error: 'Failed to delete documentary' },
      { status: 500 }
    )
  }
}
