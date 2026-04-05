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
  } catch (error) {
    console.error('Admin stats API error:', error)
    return NextResponse.json(
      { totalMessages: 0, unreadMessages: 0, totalTeam: 3, recentMessages: [] },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  }
}
