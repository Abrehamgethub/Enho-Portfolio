import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Update from '@/lib/models/Update'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE an update (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()
    await Update.findByIdAndDelete((await params).id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting update:', error)
    return NextResponse.json({ error: 'Failed to delete update' }, { status: 500 })
  }
}

// PATCH - toggle active status (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()
    const body = await request.json()
    
    const update = await Update.findByIdAndUpdate(
      (await params).id,
      { active: body.active },
      { new: true }
    )
    
    return NextResponse.json({ success: true, update })
  } catch (error) {
    console.error('Error updating update:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
