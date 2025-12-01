import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value

  if (token) {
    deleteSession(token)
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })
  
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  return response
}
