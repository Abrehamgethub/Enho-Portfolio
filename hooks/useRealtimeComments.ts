'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from 'firebase/firestore'
import { firestore } from '@/lib/firebase'

export interface SocialComment {
  id: string
  authorId: string
  authorDisplayName?: string | null
  authorPhotoURL?: string | null
  text: string
  active?: boolean
  createdAt?: Timestamp | null
}

export function useRealtimePostComments(postId: string | null, pageSize = 50) {
  const [comments, setComments] = useState<SocialComment[]>([])

  useEffect(() => {
    if (!postId) {
      setComments([])
      return
    }

    if (!postId || typeof postId !== 'string' || postId.trim() === '') {
      setComments([])
      return
    }

    const commentsQuery = query(
      collection(firestore, 'posts', postId, 'comments'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    const unsub = onSnapshot(commentsQuery, (snap) => {
      const next = snap.docs.map((d) => {
        const data = d.data() as any
        delete data.id
        delete data._id
        return { ...data, id: d.id }
      })
      setComments(next)
    })

    return () => unsub()
  }, [postId, pageSize])

  return { comments }
}

