'use client'

import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'

export function useRealtimeLike(params: { uid: string | null; postId: string | null }) {
  const { uid, postId } = params
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (!uid || !postId) {
      setLiked(false)
      return
    }

    const likeRef = doc(firestore, 'posts', postId, 'likes', uid)
    const unsub = onSnapshot(likeRef, (snap) => setLiked(snap.exists()))
    return () => unsub()
  }, [uid, postId])

  return { liked }
}

