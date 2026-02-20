import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Guest from '@/lib/models/Guest'

// DELETE a guest
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    await Guest.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guest:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

// PATCH - update guest
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await request.json()

    if ('episodeUrl' in body && !String(body.episodeUrl || '').trim()) {
      return NextResponse.json(
        { error: 'Episode URL is required' },
        { status: 400 }
      )
    }

    if ('photo' in body && !String(body.photo || '').trim()) {
      body.photo = ''
    }
    
    const guest = await Guest.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    )
    
    return NextResponse.json({ success: true, guest })
  } catch (error) {
    console.error('Error updating guest:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
