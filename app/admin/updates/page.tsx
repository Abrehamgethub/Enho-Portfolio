'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Plus, 
  Trash2, 
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Update {
  id: string
  text: string
  time: string
  createdAt: string
}

const EMOJI_OPTIONS = ['📢', '🎙️', '💊', '🏥', '❤️', '🩺', '📺', '🎉', '⚡', '🔔']

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)
  const [newText, setNewText] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('📢')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchUpdates()
  }, [])

  async function fetchUpdates() {
    try {
      const response = await fetch('/api/updates')
      const data = await response.json()
      setUpdates(data.updates || [])
    } catch (error) {
      console.error('Failed to fetch updates:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newText.trim()) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText, emoji: selectedEmoji })
      })
      
      if (response.ok) {
        setNewText('')
        setSelectedEmoji('📢')
        setMessage({ type: 'success', text: 'Update posted successfully!' })
        fetchUpdates()
      } else {
        setMessage({ type: 'error', text: 'Failed to post update' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to post update' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this update?')) return
    
    try {
      await fetch(`/api/updates/${id}`, { method: 'DELETE' })
      setUpdates(updates.filter(u => u.id !== id))
      setMessage({ type: 'success', text: 'Update deleted' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-gray-500 mt-1">Manage updates shown on the website</p>
        </div>
        <button
          onClick={fetchUpdates}
          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </motion.div>
      )}

      {/* New Update Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary-500" />
          Post New Update
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Emoji Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Emoji</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                    selectedEmoji === emoji 
                      ? 'bg-primary-100 ring-2 ring-primary-500 scale-110' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Update Text</label>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="e.g., New Episode: Understanding Diabetes Prevention"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={150}
            />
            <p className="text-xs text-gray-400 mt-1">{newText.length}/150 characters</p>
          </div>

          {/* Preview */}
          {newText && (
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Preview:</p>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-sm text-gray-200">{selectedEmoji} {newText}</p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving || !newText.trim()}
            className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post Update
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Existing Updates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-500" />
          Recent Updates ({updates.length})
        </h2>

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading...
          </div>
        ) : updates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Send className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No updates yet. Post your first update above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {updates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg group"
              >
                <div className="flex-1">
                  <p className="text-gray-900">{update.text}</p>
                  <p className="text-sm text-gray-500 mt-1">{update.time}</p>
                </div>
                <button
                  onClick={() => handleDelete(update.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
