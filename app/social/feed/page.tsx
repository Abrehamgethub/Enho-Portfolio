'use client'

import { PostComposer } from '@/components/social/PostComposer'
import { PostCard } from '@/components/social/PostCard'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { useRealtimePosts } from '@/hooks/useRealtimePosts'
import Link from 'next/link'

export default function SocialFeedPage() {
  const { user, loading } = useFirebaseAuth()

  const uid = user?.uid ?? null
  const { posts } = useRealtimePosts(uid, 20)

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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Social</h1>
            <p className="text-gray-500 mt-1">Login to create posts, likes, comments, and follows.</p>
          </div>
          <Link href="/social/login" className="inline-flex items-center justify-center w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Social Feed</h1>
          <p className="text-gray-500 mt-1">Real-time posts with likes, comments, and follows.</p>
        </div>
        <div className="text-sm text-gray-500">
          Signed in as <span className="font-medium text-gray-700">{user.displayName || user.email || user.uid}</span>
        </div>
      </div>

      <PostComposer
        uid={user.uid}
        authorDisplayName={user.displayName}
        authorPhotoURL={user.photoURL}
      />

      <div className="space-y-3">
        {posts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center text-gray-500">
            No posts yet.
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} viewerUid={user.uid} />)
        )}
      </div>
    </div>
  )
}

