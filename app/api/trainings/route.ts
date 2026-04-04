import { NextRequest, NextResponse } from 'next/server'
import Training from '@/lib/models/Training'
import { connectToDatabase } from '@/lib/db'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// GET all trainings
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    
    let query: any = {}
    if (featured === 'true') {
      query.featured = true
    }
    if (category) {
      query.category = category
    }
    
    const trainings = await Training.find(query).sort({ date: -1 })
    return NextResponse.json({ trainings })
  } catch (error) {
    console.error('Failed to fetch trainings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trainings', trainings: [] },
      { status: 500 }
    )
  }
}

// POST new training (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const body = await request.json()
    
    const training = new Training(body)
    await training.save()
    
    return NextResponse.json(training, { status: 201 })
  } catch (error) {
    console.error('Failed to create training:', error)
    return NextResponse.json(
      { error: 'Failed to create training' },
      { status: 500 }
    )
  }
}

// PUT update training (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const body = await request.json()
    const { id, _id, ...updateData } = body
    const trainingId = id || _id
    
    if (!trainingId) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      )
    }
    
    const training = await Training.findByIdAndUpdate(
      trainingId,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!training) {
      return NextResponse.json(
        { error: 'Training not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(training)
  } catch (error) {
    console.error('Failed to update training:', error)
    return NextResponse.json(
      { error: 'Failed to update training' },
      { status: 500 }
    )
  }
}

// DELETE training (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const trainingId = searchParams.get('id') || searchParams.get('_id')
    
    if (!trainingId) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      )
    }
    
    const training = await Training.findByIdAndDelete(trainingId)
    
    if (!training) {
      return NextResponse.json(
        { error: 'Training not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Training deleted successfully' })
  } catch (error) {
    console.error('Failed to delete training:', error)
    return NextResponse.json(
      { error: 'Failed to delete training' },
      { status: 500 }
    )
  }
}
