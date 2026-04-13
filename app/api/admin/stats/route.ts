import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // 1. Get messages (all, unread, recent)
    const messagesRef = collection(db, 'messages')
    const allMessagesSnap = await getDocs(messagesRef)
    
    let unreadCount = 0
    let allMessages: any[] = []
    
    allMessagesSnap.forEach(doc => {
      const data = doc.data()
      allMessages.push({ id: doc.id, ...data })
      if (data.read === false) {
        unreadCount++
      }
    })
    
    // Sort recent messages
    const recentMessages = allMessages
      .sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
      .slice(0, 5)

    const stats = {
      totalMessages: allMessagesSnap.size,
      unreadMessages: unreadCount,
      totalTeam: 3, // Assuming team is static or could be dynamic later
      recentMessages
    }

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
      { status: 503, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    )
  }
}
