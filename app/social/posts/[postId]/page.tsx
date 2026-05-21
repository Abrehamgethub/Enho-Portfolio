'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { useRealtimePostComments, type SocialComment } from '@/hooks/useRealtimeComments'
import { useRealtimeLike } from '@/hooks/useRealtimeLike'
import { useRealtimeFollow } from '@/hooks/useRealtimeFollow'
import { addComment, followUser, likePost, unlikePost, unfollowUser } from '@/lib/social/firestoreWrites'
import type { SocialPost } from '@/hooks/useRealtimePosts'
import Link from 'next/link'

export default function SocialPostDetailPage() {
  const params = useParams()
  const postId = useMemo(() => {
    const raw = params.postId
    return typeof raw === 'string' ? raw : null
  }, [params.postId])

  const { user, loading } = useFirebaseAuth()
  const uid = user?.uid ?? null

  const { comments } = useRealtimePostComments(postId, 50)
  const { liked } = useRealtimeLike({ uid, postId })

  // Follow state is for the post's author, so it can only be read after we load the post.
  const [post, setPost] = useState<SocialPost | null>(null)
  const [commentText, setCommentText] = useState('')
  const [busy, setBusy] = useState(false)

  const { isFollowing: isFollowingAuthor } = useRealtimeFollow({
    uid,
    targetUid: post?.authorId ?? null,
  })

  useEffect(() => {
    if (!postId) return

    const ref = doc(firestore, 'posts', postId)
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setPost(null)
        return
      }
      const data = snap.data() as any
      delete data.id
      delete data._id
      setPost({ ...data, id: snap.id })
    })

    return () => unsub()
  }, [postId])

  async function handleToggleLike() {
    if (!uid || !postId || !post) return
    setBusy(true)
    try {
      if (liked) {
        await unlikePost({ postId, uid })
      } else {
        await likePost({ postId, uid })
      }
    } finally {
      setBusy(false)
    }
  }

  async function handleToggleFollow() {
    if (!uid || !postId || !post) return
    if (post.authorId === uid) return
    setBusy(true)
    try {
      if (isFollowingAuthor) {
        await unfollowUser({ uid, targetUid: post.authorId })
      } else {
        await followUser({ uid, targetUid: post.authorId })
      }
    } finally {
      setBusy(false)
    }
  }

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!uid || !postId || !user) return

    const text = commentText.trim()
    if (!text) return

    setBusy(true)
    try {
      await addComment({
        postId,
        uid,
        authorDisplayName: user.displayName,
        authorPhotoURL: user.photoURL,
        text,
      })
      setCommentText('')
    } finally {
      setBusy(false)
    }
  }

  const createdLabel = useMemo(() => {
    if (!post?.createdAt) return ''
    const d = post.createdAt.toDate?.()
    return d ? d.toLocaleString() : ''
  }, [post?.createdAt])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading…</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Login required</h1>
          <p className="text-gray-500">Please log in to view and interact with posts.</p>
          <Link href="/social/login" className="inline-flex items-center justify-center w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <Link href="/social/feed" className="text-primary-700 hover:underline font-medium">Back to feed</Link>
        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-6 text-gray-500">Post not found.</div>
      </div>
    )
  }

  const canFollow = post.authorId !== uid

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4">
      <div>
        <Link href="/social/feed" className="text-primary-700 hover:underline font-medium">Back to feed</Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-4">
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
              <div className="font-semibold text-gray-900">{post.authorDisplayName ?? post.authorId}</div>
              {createdLabel ? <div className="text-xs text-gray-500">{createdLabel}</div> : null}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {canFollow ? (
              <button
                onClick={handleToggleFollow}
                disabled={busy}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                  isFollowingAuthor
                    ? 'bg-white text-gray-700 border-gray-200'
                    : 'bg-primary-600 text-white border-primary-600'
                }`}
              >
                {isFollowingAuthor ? 'Following' : 'Follow'}
              </button>
            ) : null}

            <button
              onClick={handleToggleLike}
              disabled={busy}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                liked
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              {liked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>

        <div className="text-gray-900 whitespace-pre-wrap">{post.content}</div>
        <div className="text-xs text-gray-500">
          Visibility: <span className="font-medium">{post.visibility}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
        <h2 className="font-semibold text-gray-900">Comments</h2>

        <form onSubmit={handleSubmitComment} className="space-y-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
            placeholder="Write a comment…"
            maxLength={800}
            required
          />
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-gray-500">{commentText.length}/800</div>
            <button
              type="submit"
              disabled={busy || !commentText.trim()}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
            >
              {busy ? 'Posting…' : 'Comment'}
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {comments.length === 0 ? (
            <div className="text-sm text-gray-500">No comments yet.</div>
          ) : (
            comments
              .slice()
              .reverse()
              .map((c: SocialComment) => {
                const label = c.createdAt?.toDate?.()?.toLocaleString?.() ?? null
                return (
                  <div key={c.id} className="border border-gray-100 rounded-xl p-3">
                    <div className="text-sm font-semibold text-gray-900">
                      {c.authorDisplayName ?? c.authorId}
                      {label ? <span className="ml-2 text-xs text-gray-500">{label}</span> : null}
                    </div>
                    <div className="text-gray-800 whitespace-pre-wrap mt-1">{c.text}</div>
                  </div>
                )
              })
          )}
        </div>
      </div>
    </div>
  )
}

