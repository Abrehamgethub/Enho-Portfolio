'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type Timestamp,
} from 'firebase/firestore'
import { firestore } from '@/lib/firebase'

export type Visibility = 'public' | 'followers'

export interface SocialPost {
  id: string
  authorId: string
  authorDisplayName?: string | null
  authorPhotoURL?: string | null
  content: string
  visibility: Visibility
  active?: boolean
  createdAt?: Timestamp | null
}

export function useRealtimePosts(uid: string | null, pageSize = 20) {
  const [posts, setPosts] = useState<SocialPost[]>([])

  useEffect(() => {
    if (!uid) {
      setPosts([])
      return
    }

    const publicQuery = query(
      collection(firestore, 'posts'),
      where('visibility', '==', 'public'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    const mineQuery = query(
      collection(firestore, 'posts'),
      where('authorId', '==', uid),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    const publicUnsub = onSnapshot(publicQuery, (snap) => {
      setPosts((prev) => {
        const map = new Map<string, SocialPost>(prev.map((p) => [p.id, p]))
        snap.docs.forEach((d) => {
          const data = d.data() as any
          delete data.id
          delete data._id
          map.set(d.id, { ...data, id: d.id })
        })
        return Array.from(map.values()).sort((a, b) => {
          const am = a.createdAt?.toMillis?.() ?? 0
          const bm = b.createdAt?.toMillis?.() ?? 0
          return bm - am
        })
      })
    })

    // Merge "mine" results with whatever public results are currently shown.
    // This MVP does not yet implement "following feed" fanout.
    const mineUnsub = onSnapshot(mineQuery, (snap) => {
      setPosts((prev) => {
        const map = new Map<string, SocialPost>(prev.map((p) => [p.id, p]))
        snap.docs.forEach((d) => {
          const data = d.data() as any
          delete data.id
          delete data._id
          map.set(d.id, { ...data, id: d.id })
        })
        return Array.from(map.values()).sort((a, b) => {
          const am = a.createdAt?.toMillis?.() ?? 0
          const bm = b.createdAt?.toMillis?.() ?? 0
          return bm - am
        })
      })
    })

    return () => {
      publicUnsub()
      mineUnsub()
    }
  }, [uid, pageSize])

  return { posts }
}

