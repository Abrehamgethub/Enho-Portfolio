import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Sponsor from '@/lib/models/Sponsor'
import { requireAuth } from '@/lib/auth-middleware'

// DELETE a sponsor (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()
    await Sponsor.findByIdAndDelete((await params).id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting sponsor:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

// PATCH - update sponsor (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    await connectDB()
    const body = await request.json()
    
    const sponsor = await Sponsor.findByIdAndUpdate(
      (await params).id,
      body,
      { new: true }
    )
    
    return NextResponse.json({ success: true, sponsor })
  } catch (error) {
    console.error('Error updating sponsor:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
