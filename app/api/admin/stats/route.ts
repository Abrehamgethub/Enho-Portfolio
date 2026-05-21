import { NextResponse, NextRequest } from 'next/server'
import { firebaseAdminDb, isAdminEnabled } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (!isAdminEnabled) {
    return NextResponse.json({ 
      totalMessages: 0, 
      unreadMessages: 0, 
      totalTeam: 0, 
      recentMessages: [] 
    })
  }

  try {
    const messagesRef = firebaseAdminDb.collection('messages')
    
    // 1. Get total message count
    const totalMessagesSnap = await messagesRef.count().get()
    const totalMessages = totalMessagesSnap.data().count

    // 2. Get unread message count
    const unreadMessagesSnap = await messagesRef.where('read', '==', false).count().get()
    const unreadMessages = unreadMessagesSnap.data().count
    
    // 3. Get 5 most recent messages
    const recentMessagesSnap = await messagesRef.orderBy('date', 'desc').limit(5).get()
    const recentMessages = recentMessagesSnap.docs.map((doc: any) => {
      const data = doc.data()
      delete data.id
      delete data._id
      return { ...data, id: doc.id }
    })

    const stats = {
      totalMessages,
      unreadMessages,
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
      { error: 'Service unavailable: ' + error.message },
      { status: 503, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    )
  }
}
