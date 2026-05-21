'use client'

import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'

export function useRealtimeFollow(params: { uid: string | null; targetUid: string | null }) {
  const { uid, targetUid } = params
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (!uid || !targetUid) {
      setIsFollowing(false)
      return
    }

    const ref = doc(firestore, 'users', uid, 'following', targetUid)
    const unsub = onSnapshot(ref, (snap) => {
      setIsFollowing(snap.exists())
    })
    return () => unsub()
  }, [uid, targetUid])

  return { isFollowing }
}

