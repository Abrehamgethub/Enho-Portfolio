import { NextRequest, NextResponse } from 'next/server'
import Training from '@/lib/models/Training'
import { connectToDatabase } from '@/lib/db'

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
    return NextResponse.json(trainings)
  } catch (error) {
    console.error('Failed to fetch trainings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trainings' },
      { status: 500 }
    )
  }
}

// POST new training
export async function POST(request: NextRequest) {
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

// PUT update training
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      )
    }
    
    const training = await Training.findByIdAndUpdate(
      id,
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

// DELETE training
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      )
    }
    
    const training = await Training.findByIdAndDelete(id)
    
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
