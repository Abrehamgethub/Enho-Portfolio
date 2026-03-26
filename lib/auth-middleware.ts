// Auth middleware for protecting admin API routes
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from './auth'

export function requireAuth(request: NextRequest): NextResponse | null {
  const token = request.cookies.get('admin_token')?.value

  if (!token || !validateSession(token)) {
    return NextResponse.json(
      { error: 'Unauthorized. Please log in.' },
      { status: 401 }
    )
  }

  return null // null means auth passed
}
