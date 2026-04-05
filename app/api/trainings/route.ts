import { NextRequest, NextResponse } from 'next/server'
import Training from '@/lib/models/Training'
import { safeConnectDB, withTimeout } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth-middleware'
import { initialTrainings } from '@/lib/trainings-data'

export const dynamic = 'force-dynamic'

// GET all trainings
export async function GET(request: NextRequest) {
  try {
    const conn = await safeConnectDB()
    if (!conn) {
      console.warn('Trainings API: MongoDB unavailable, returning static fallback')
      return NextResponse.json({ trainings: initialTrainings, source: 'static' })
    }

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
    
    const count = await Training.countDocuments(query)
    const trainings = await withTimeout(
      Training.find(query).sort({ date: -1 }).exec(),
      4000,
      null
    )

    const totalCount = await withTimeout(Training.countDocuments({}), 3000, 0)
    
    if (totalCount === 0) {
      try {
        const toInsert = initialTrainings.map(t => {
          const { id, _id, ...rest } = t as any;
          return rest;
        });
        const inserted = await withTimeout(Training.insertMany(toInsert), 5000, []);
        return NextResponse.json({ trainings: inserted, source: 'db-seeded' });
      } catch (e) {
        console.error('Trainings seed error:', e);
        return NextResponse.json({ trainings: initialTrainings, source: 'static' });
      }
    }

    return NextResponse.json({ 
      trainings: trainings || [], 
      source: trainings ? 'db' : 'static-fallback' 
    })
  } catch (error) {
    console.error('Failed to fetch trainings:', error)
    return NextResponse.json({ trainings: initialTrainings, source: 'error-fallback' })
  }
}

// POST new training (admin only)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database connection timeout. Please check MongoDB Atlas IP whitelisting.' }, { status: 503 })
    }

    const body = await request.json()
    const training = new Training(body)
    await withTimeout(training.save(), 5000)
    
    return NextResponse.json(training, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create training:', error)
    const isTimeout = error.message?.includes('timed out')
    return NextResponse.json(
      { error: isTimeout ? 'Database write timed out' : 'Failed to create training' },
      { status: isTimeout ? 504 : 500 }
    )
  }
}

// PUT update training (admin only)
export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database connection timeout' }, { status: 503 })
    }

    const body = await request.json()
    const { id, _id, ...updateData } = body
    const trainingId = id || _id
    
    if (!trainingId) {
      return NextResponse.json({ error: 'Training ID is required' }, { status: 400 })
    }
    
    const training = await withTimeout(
      Training.findByIdAndUpdate(trainingId, updateData, { new: true, runValidators: true }),
      5000
    )
    
    if (!training) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 })
    }
    
    return NextResponse.json(training)
  } catch (error: any) {
    console.error('Failed to update training:', error)
    const isTimeout = error.message?.includes('timed out')
    return NextResponse.json(
      { error: isTimeout ? 'Database update timed out' : 'Failed to update training' },
      { status: isTimeout ? 504 : 500 }
    )
  }
}

// DELETE training (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const conn = await safeConnectDB()
    if (!conn) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const trainingId = searchParams.get('id') || searchParams.get('_id')
    
    if (!trainingId) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      )
    }
    
    const training = await withTimeout(Training.findByIdAndDelete(trainingId), 5000, null)
    
    if (!training) {
      return NextResponse.json(
        { error: 'Training not found or deletion timed out' },
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
