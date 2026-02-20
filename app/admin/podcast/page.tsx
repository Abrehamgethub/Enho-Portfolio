'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Youtube, 
  ExternalLink, 
  RefreshCw,
  Settings,
  CheckCircle,
  AlertCircle,
  Copy,
  Eye,
  Play,
  Instagram,
  Send,
  Facebook
} from 'lucide-react'

interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount?: string
}

export default function PodcastPage() {
  const [channelId, setChannelId] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [videos, setVideos] = useState<Video[]>([])
  const [loadingVideos, setLoadingVideos] = useState(true)
  const [socialStats, setSocialStats] = useState<any[]>([])

  useEffect(() => {
    fetchVideos()
    fetchSocialStats()
  }, [])

  async function fetchVideos() {
    try {
      const response = await fetch('/api/youtube')
      if (response.ok) {
        const data = await response.json()
        setVideos(data.videos || [])
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    } finally {
      setLoadingVideos(false)
    }
  }

  async function fetchSocialStats() {
    try {
      const response = await fetch('/api/social-stats')
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          // Convert icon names back to React components
          const statsWithIcons = data.map((stat: any) => {
            let iconComponent
            switch (stat.icon) {
              case 'youtube':
                iconComponent = <Youtube className="w-5 h-5 text-white" />
                break
              case 'instagram':
                iconComponent = <Instagram className="w-5 h-5 text-white" />
                break
              case 'telegram':
                iconComponent = <Send className="w-5 h-5 text-white" />
                break
              case 'facebook':
                iconComponent = <Facebook className="w-5 h-5 text-white" />
                break
              case 'tiktok':
                iconComponent = <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                break
              default:
                iconComponent = <div className="w-5 h-5 text-white" />
            }
            return { ...stat, icon: iconComponent }
          })
          setSocialStats(statsWithIcons)
        }
      }
    } catch (error) {
      console.error('Failed to fetch social stats:', error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

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
                {stat.icon}
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

          {/* Real Episode Cards from YouTube */}
          <div className="space-y-4">
            {loadingVideos ? (
              <div className="text-center py-8 text-gray-500">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                Loading episodes...
              </div>
            ) : videos.length > 0 ? (
              videos.slice(0, 4).map((video) => (
                <a 
                  key={video.id} 
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-28 h-20 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{video.title}</h4>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(video.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500">No episodes loaded</p>
                <p className="text-xs text-gray-400 mt-1">Add YouTube API key to display episodes</p>
              </div>
            )}
          </div>

          {videos.length > 0 && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              Showing {Math.min(videos.length, 4)} of {videos.length} episodes
            </p>
          )}
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
