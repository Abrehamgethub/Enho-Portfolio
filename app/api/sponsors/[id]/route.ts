import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Sponsor from '@/lib/models/Sponsor'

// DELETE a sponsor
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    await Sponsor.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting sponsor:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

// PATCH - update sponsor
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await request.json()
    
    const sponsor = await Sponsor.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    )
    
    return NextResponse.json({ success: true, sponsor })
  } catch (error) {
    console.error('Error updating sponsor:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
