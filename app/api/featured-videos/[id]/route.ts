import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import FeaturedVideo from '@/lib/models/FeaturedVideo'

// DELETE a featured video
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    await FeaturedVideo.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting featured video:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

// PATCH - update video (active status, order, category)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await request.json()
    
    const video = await FeaturedVideo.findByIdAndUpdate(
      params.id,
      { 
        ...(body.active !== undefined && { active: body.active }),
        ...(body.order !== undefined && { order: body.order }),
        ...(body.category && { category: body.category })
      },
      { new: true }
    )
    
    return NextResponse.json({ success: true, video })
  } catch (error) {
    console.error('Error updating featured video:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
