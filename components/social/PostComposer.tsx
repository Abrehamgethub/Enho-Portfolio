'use client'

import { useState } from 'react'
import type { Visibility } from '@/hooks/useRealtimePosts'
import { createPost } from '@/lib/social/firestoreWrites'

export function PostComposer(props: {
  uid: string
  authorDisplayName?: string | null
  authorPhotoURL?: string | null
  defaultVisibility?: Visibility
}) {
  const { uid, authorDisplayName, authorPhotoURL, defaultVisibility = 'public' } = props

  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState<Visibility>(defaultVisibility)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!content.trim()) return
      await createPost({
        uid,
        authorDisplayName,
        authorPhotoURL,
        content: content.trim(),
        visibility,
      })
      setContent('')
      setVisibility(defaultVisibility)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Post visibility</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as Visibility)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="public">Public</option>
          <option value="followers">Followers</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          MVP feed currently shows `public` and your own posts.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
          placeholder="Share an update…"
          required
          maxLength={500}
        />
        <div className="text-xs text-gray-500 mt-1">{content.length}/500</div>
      </div>

      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}

      <button
        type="submit"
        disabled={saving || !content.trim()}
        className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
      >
        {saving ? 'Posting…' : 'Post'}
      </button>
    </form>
  )
}

