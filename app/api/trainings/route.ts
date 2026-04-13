import { NextRequest, NextResponse } from 'next/server'
import Training from '@/lib/models/Training'
import connectDB, { withTimeout } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth-middleware'
import { initialTrainings } from '@/lib/trainings-data'

export const dynamic = 'force-dynamic'

// GET all trainings
export async function GET(request: NextRequest) {
  try {
    await connectDB()

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

    const totalCount = await withTimeout(Training.countDocuments({}), 5000)
    
    // Seed DB if empty — this is the ONLY valid reason to use initial data
    if (totalCount === 0) {
      console.log('📦 Trainings collection empty — seeding with initial data')
      const toInsert = initialTrainings.map(t => {
        const { _id, ...rest } = t as any;
        return rest;
      });
      await withTimeout(Training.insertMany(toInsert), 8000);
    }

    const trainings = await withTimeout(
      Training.find(query).sort({ date: -1 }).exec(),
      8000
    )

    return NextResponse.json({ trainings, source: 'db' })
  } catch (error: any) {
    console.error('❌ Trainings GET failed:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed: ' + error.message, trainings: [] },
      { status: 503 }
    )
  }
}

// POST new training (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()

    const body = await request.json()
    const training = new Training(body)
    await withTimeout(training.save(), 8000)
    
    return NextResponse.json(training, { status: 201 })
  } catch (error: any) {
    console.error('❌ Training POST failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to create training: ' + error.message },
      { status: 503 }
    )
  }
}

// PUT update training (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()

    const body = await request.json()
    const { id, _id, ...updateData } = body
    const trainingId = id || _id
    
    if (!trainingId) {
      return NextResponse.json({ error: 'Training ID is required' }, { status: 400 })
    }
    
    const training = await withTimeout(
      Training.findByIdAndUpdate(trainingId, updateData, { new: true, runValidators: true }),
      8000
    )
    
    if (!training) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 })
    }
    
    return NextResponse.json(training)
  } catch (error: any) {
    console.error('❌ Training PUT failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to update training: ' + error.message },
      { status: 503 }
    )
  }
}

// DELETE training (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const trainingId = searchParams.get('id') || searchParams.get('_id')
    
    if (!trainingId) {
      return NextResponse.json({ error: 'Training ID is required' }, { status: 400 })
    }
    
    const training = await withTimeout(Training.findByIdAndDelete(trainingId), 8000)
    
    if (!training) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Training deleted successfully' })
  } catch (error: any) {
    console.error('❌ Training DELETE failed:', error.message)
    return NextResponse.json(
      { error: 'Failed to delete training: ' + error.message },
      { status: 503 }
    )
  }
}
