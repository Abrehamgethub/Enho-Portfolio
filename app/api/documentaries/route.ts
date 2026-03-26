import { NextRequest, NextResponse } from 'next/server'
import Documentary from '@/lib/models/Documentary'
import { connectToDatabase } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

// GET all documentaries
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
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
    
    const documentaries = await Documentary.find(query).sort({ releaseDate: -1 })
    return NextResponse.json(documentaries)
  } catch (error) {
    console.error('Failed to fetch documentaries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documentaries' },
      { status: 500 }
    )
  }
}

// POST new documentary (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
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
    await connectToDatabase()
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Documentary ID is required' },
        { status: 400 }
      )
    }
    
    const documentary = await Documentary.findByIdAndUpdate(
      id,
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
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Documentary ID is required' },
        { status: 400 }
      )
    }
    
    const documentary = await Documentary.findByIdAndDelete(id)
    
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
