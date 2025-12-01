'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Youtube, 
  ExternalLink, 
  RefreshCw,
  Settings,
  CheckCircle,
  AlertCircle,
  Copy,
  Eye
} from 'lucide-react'

export default function PodcastPage() {
  const [channelId, setChannelId] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const socialStats = [
    { platform: 'YouTube', handle: '@Eneho_Hakim', followers: '21K+', color: 'bg-red-500', url: 'https://www.youtube.com/@Eneho_Hakim' },
    { platform: 'TikTok', handle: '@eneho_egna', followers: '34K+', color: 'bg-black', url: 'https://www.tiktok.com/@eneho_egna' },
    { platform: 'Telegram', handle: '@Eneho_Tena', followers: '5K+', color: 'bg-blue-500', url: 'https://t.me/Eneho_Tena' },
    { platform: 'Facebook', handle: 'Eneho Egna', followers: '2K+', color: 'bg-blue-600', url: 'https://web.facebook.com/profile.php?id=61566388200183' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Podcast & Social Media</h1>
        <p className="text-gray-500 mt-1">Manage your YouTube integration and social media links</p>
      </div>

      {/* Social Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialStats.map((stat, index) => (
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
                <Youtube className="w-5 h-5 text-white" />
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900">{stat.platform}</h3>
            <p className="text-sm text-gray-500">{stat.handle}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.followers}</p>
          </motion.a>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* YouTube API Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Youtube className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">YouTube API Configuration</h2>
              <p className="text-sm text-gray-500">Connect your YouTube channel to display latest episodes</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 pr-10"
                  placeholder="UC..."
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Find it at <a href="https://commentpicker.com/youtube-channel-id.php" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Channel ID Finder</a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="AIza..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Get from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Google Cloud Console</a>
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4" />
                    Save Configuration
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Configuration Required</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Add these as environment variables in Vercel Dashboard → Settings → Environment Variables
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Episode Preview</h2>
            <a 
              href="/#podcast" 
              target="_blank"
              className="text-sm text-primary-500 hover:text-primary-600 inline-flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              View on Site
            </a>
          </div>

          {/* Sample Episode Cards */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg bg-gray-50">
                <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">Episode Title {i}</h4>
                  <p className="text-xs text-gray-500 mt-1">Sample episode description...</p>
                  <p className="text-xs text-gray-400 mt-1">Nov {20 + i}, 2024</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Episodes will auto-update from your YouTube channel
          </p>
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Setup Instructions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">1. Get YouTube Channel ID</h3>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Go to your YouTube channel page</li>
              <li>Copy the URL (e.g., youtube.com/@Eneho_Hakim)</li>
              <li>Paste it in a Channel ID finder tool</li>
              <li>Copy the ID (starts with UC...)</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">2. Get YouTube API Key</h3>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Go to Google Cloud Console</li>
              <li>Create a new project</li>
              <li>Enable YouTube Data API v3</li>
              <li>Create credentials → API Key</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
