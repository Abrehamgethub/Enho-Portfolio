import { NextResponse } from 'next/server'
import { getStats } from '@/lib/db'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const stats = await getStats()
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error: any) {
    console.error('❌ Admin stats failed:', error.message)
    return NextResponse.json(
      { 
        error: 'Database connection failed: ' + error.message,
        totalMessages: 0, 
        unreadMessages: 0, 
        totalTeam: 3, 
        recentMessages: [] 
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  }
}
