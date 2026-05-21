'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '@/lib/firebase'
import { upsertUserProfile } from '@/lib/social/firestoreWrites'

export default function SocialLoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const title = useMemo(() => {
    return mode === 'login' ? 'Login to Social' : 'Create Social Account'
  }, [mode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        await upsertUserProfile({
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: displayName || cred.user.displayName,
          photoURL: cred.user.photoURL,
        })
      } else {
        const cred = await signInWithEmailAndPassword(firebaseAuth, email, password)
        await upsertUserProfile({
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName,
          photoURL: cred.user.photoURL,
        })
      }

      router.push('/social/feed')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">Use Firebase Auth (email/password).</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 px-3 py-2 rounded-lg border ${
              mode === 'login' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 px-3 py-2 rounded-lg border ${
              mode === 'signup' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Sign up
          </button>
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Dr. A"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="you@example.com"
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="••••••••"
            type="password"
            required
            minLength={6}
          />
        </div>

        {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Working…' : mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>
    </div>
  )
}

