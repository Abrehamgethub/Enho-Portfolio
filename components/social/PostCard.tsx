'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRealtimeLike } from '@/hooks/useRealtimeLike'
import { useRealtimeFollow } from '@/hooks/useRealtimeFollow'
import type { SocialPost } from '@/hooks/useRealtimePosts'
import { likePost, unlikePost, followUser, unfollowUser } from '@/lib/social/firestoreWrites'

export function PostCard(props: { post: SocialPost; viewerUid: string }) {
  const { post, viewerUid } = props
  const { liked } = useRealtimeLike({ uid: viewerUid, postId: post.id })
  const { isFollowing } = useRealtimeFollow({ uid: viewerUid, targetUid: post.authorId })

  const [busy, setBusy] = useState(false)

  const onToggleLike = useCallback(async () => {
    if (busy) return
    setBusy(true)
    try {
      if (liked) {
        await unlikePost({ postId: post.id, uid: viewerUid })
      } else {
        await likePost({ postId: post.id, uid: viewerUid })
      }
    } finally {
      setBusy(false)
    }
  }, [busy, liked, post.id, viewerUid])

  const onToggleFollow = useCallback(async () => {
    if (busy) return
    if (!post.authorId || post.authorId === viewerUid) return
    setBusy(true)
    try {
      if (isFollowing) {
        await unfollowUser({ uid: viewerUid, targetUid: post.authorId })
      } else {
        await followUser({ uid: viewerUid, targetUid: post.authorId })
      }
    } finally {
      setBusy(false)
    }
  }, [busy, isFollowing, post.authorId, viewerUid])

  const createdLabel = (() => {
    const ts = post.createdAt
    if (!ts) return ''
    // Firestore Timestamp provides toDate()
    const d = ts.toDate?.() ?? null
    if (!d) return ''
    return d.toLocaleString()
  })()

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {post.authorPhotoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.authorPhotoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold">
              {post.authorDisplayName?.slice(0, 1) ?? 'U'}
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900">
              {post.authorDisplayName ?? post.authorId}
              {post.authorId === viewerUid ? <span className="ml-2 text-xs text-primary-700">(you)</span> : null}
            </div>
            {createdLabel ? <div className="text-xs text-gray-500">{createdLabel}</div> : null}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {post.authorId !== viewerUid ? (
            <button
              onClick={onToggleFollow}
              disabled={busy}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                isFollowing ? 'bg-white text-gray-700 border-gray-200' : 'bg-primary-600 text-white border-primary-600'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          ) : null}

          <button
            onClick={onToggleLike}
            disabled={busy}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
              liked ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            {liked ? 'Liked' : 'Like'}
          </button>
        </div>
      </div>

      <div className="text-gray-900 whitespace-pre-wrap">{post.content}</div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Visibility: <span className="font-medium">{post.visibility}</span>
        </div>
        <Link href={`/social/posts/${post.id}`} className="text-sm text-primary-700 hover:underline font-medium">
          Open
        </Link>
      </div>
    </div>
  )
}

