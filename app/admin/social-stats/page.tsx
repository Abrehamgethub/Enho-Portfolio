'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  RefreshCw, 
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Youtube,
  Instagram,
  Send,
  Facebook
} from 'lucide-react'

interface SocialStat {
  _id?: string
  platform: string
  handle: string
  followers: string
  url: string
  color: string
  icon: string
  order: number
}

const DEFAULT_PLATFORMS = [
  { platform: 'YouTube', handle: '@Eneho_Hakim', followers: '21K+', color: 'bg-red-500', url: 'https://www.youtube.com/@Eneho_Hakim', icon: 'youtube', order: 1 },
  { platform: 'TikTok', handle: '@eneho_egna', followers: '34K+', color: 'bg-black', url: 'https://www.tiktok.com/@eneho_egna', icon: 'tiktok', order: 2 },
  { platform: 'Instagram', handle: '@eneho_egna_podcast', followers: '1K+', color: 'bg-gradient-to-br from-purple-600 to-pink-500', url: 'https://www.instagram.com/eneho_egna_podcast/', icon: 'instagram', order: 3 },
  { platform: 'Telegram', handle: '@Eneho_Tena', followers: '5K+', color: 'bg-blue-500', url: 'https://t.me/Eneho_Tena', icon: 'telegram', order: 4 },
  { platform: 'Facebook', handle: 'Eneho Egna', followers: '2K+', color: 'bg-blue-600', url: 'https://web.facebook.com/profile.php?id=61566388200183', icon: 'facebook', order: 5 },
]

export default function SocialStatsPage() {
  const [stats, setStats] = useState<SocialStat[]>(DEFAULT_PLATFORMS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const response = await fetch('/api/social-stats')
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          setStats(data.sort((a: SocialStat, b: SocialStat) => a.order - b.order))
        }
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const response = await fetch('/api/social-stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats })
      })
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Social media stats updated successfully!' })
        fetchStats()
      } else {
        setMessage({ type: 'error', text: 'Failed to update stats' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update stats' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  function handleStatChange(index: number, field: keyof SocialStat, value: string | number) {
    const newStats = [...stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setStats(newStats)
  }

  function getIconComponent(iconName: string) {
    switch (iconName) {
      case 'youtube': return <Youtube className="w-5 h-5 text-white" />
      case 'instagram': return <Instagram className="w-5 h-5 text-white" />
      case 'telegram': return <Send className="w-5 h-5 text-white" />
      case 'facebook': return <Facebook className="w-5 h-5 text-white" />
      default: return <div className="w-5 h-5 text-white" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Social Media Stats</h1>
          <p className="text-gray-500 mt-1">Manage your social media follower counts and links</p>
        </div>
        <button
          onClick={fetchStats}
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

      {/* Stats Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Edit Social Media Stats</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.platform}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid gap-4 p-4 bg-gray-50 rounded-lg sm:grid-cols-2 lg:grid-cols-6"
            >
              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <input
                  type="text"
                  value={stat.platform}
                  onChange={(e) => handleStatChange(index, 'platform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="YouTube"
                />
              </div>

              {/* Handle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Handle</label>
                <input
                  type="text"
                  value={stat.handle}
                  onChange={(e) => handleStatChange(index, 'handle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="@username"
                />
              </div>

              {/* Followers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
                <input
                  type="text"
                  value={stat.followers}
                  onChange={(e) => handleStatChange(index, 'followers', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="21K+"
                />
              </div>

              {/* URL */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  value={stat.url}
                  onChange={(e) => handleStatChange(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="https://..."
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color (CSS class)</label>
                <input
                  type="text"
                  value={stat.color}
                  onChange={(e) => handleStatChange(index, 'color', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="bg-red-500"
                />
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 pb-2">Preview</label>
                <div className="flex items-center gap-3">
                  <div className={`${stat.color} p-2.5 rounded-lg shadow-sm`}>
                    {getIconComponent(stat.icon)}
                  </div>
                  <a
                    href={stat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-primary-500 hover:text-primary-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.a
              key={stat.platform}
              href={stat.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  {getIconComponent(stat.icon)}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900">{stat.platform}</h3>
              <p className="text-sm text-gray-500">{stat.handle}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.followers}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
