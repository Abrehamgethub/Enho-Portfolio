'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Youtube, 
  Plus, 
  Trash2, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Play,
  Search,
  Grid,
  List
} from 'lucide-react'

interface Video {
  _id?: string
  id: string
  title: string
  thumbnail: string
  category: string
  order: number
  active: boolean
}

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

const CATEGORIES = [
  { id: 'latest', name: 'Latest Episodes', color: 'bg-green-500' },
  { id: 'pregnancy', name: 'እርግዝና እና ወሊድ | Pregnancy & Maternity', color: 'bg-pink-500' },
  { id: 'children-health', name: 'የልጆች ጤና | Children\'s Health', color: 'bg-blue-500' },
  { id: 'mothers-health', name: 'የእናቶች ጤና | Mother\'s Health', color: 'bg-purple-500' },
]
// Note: Guest episodes are now managed via Admin → Guests (link episode URL per guest)
// Note: Holiday Special episodes are now managed via Admin → Partners (program photos & details)

export default function EpisodesPage() {
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([])
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingYT, setLoadingYT] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchUrl, setSearchUrl] = useState('')
  const [addCategory, setAddCategory] = useState('general')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchFeaturedVideos()
    fetchYouTubeVideos()
  }, [])

  async function fetchFeaturedVideos() {
    try {
      const response = await fetch('/api/featured-videos?active=false')
      const data = await response.json()
      setFeaturedVideos(data.videos || [])
    } catch (error) {
      console.error('Failed to fetch featured videos:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchYouTubeVideos() {
    try {
      const response = await fetch('/api/youtube')
      const data = await response.json()
      setYoutubeVideos(data.videos || [])
    } catch (error) {
      console.error('Failed to fetch YouTube videos:', error)
    } finally {
      setLoadingYT(false)
    }
  }

  async function addFromYouTube(video: YouTubeVideo, category: string = 'general') {
    setAdding(true)
    try {
      const response = await fetch('/api/featured-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId: video.id,
          title: video.title,
          thumbnail: video.thumbnail,
          category
        })
      })
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Video added to featured!' })
        fetchFeaturedVideos()
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.error || 'Failed to add video' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add video' })
    } finally {
      setAdding(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  async function addFromUrl() {
    if (!searchUrl.trim()) return
    
    // Extract video ID from YouTube URL
    const match = searchUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s?]+)/)
    if (!match) {
      setMessage({ type: 'error', text: 'Invalid YouTube URL' })
      setTimeout(() => setMessage(null), 3000)
      return
    }
    
    const videoId = match[1]
    setAdding(true)
    
    try {
      // Fetch video info from YouTube oEmbed
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
      const oembedData = await oembedRes.json()
      
      await addFromYouTube({
        id: videoId,
        title: oembedData.title || 'Untitled Video',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        publishedAt: new Date().toISOString()
      }, addCategory)
      
      setSearchUrl('')
      setAddCategory('general')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch video info' })
      setTimeout(() => setMessage(null), 3000)
    } finally {
      setAdding(false)
    }
  }

  async function toggleActive(video: Video) {
    try {
      await fetch(`/api/featured-videos/${video._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !video.active })
      })
      fetchFeaturedVideos()
    } catch (error) {
      console.error('Failed to toggle video:', error)
    }
  }

  async function updateCategory(video: Video, category: string) {
    try {
      await fetch(`/api/featured-videos/${video._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category })
      })
      fetchFeaturedVideos()
    } catch (error) {
      console.error('Failed to update category:', error)
    }
  }

  async function removeVideo(video: Video) {
    if (!confirm('Remove this video from featured?')) return
    
    try {
      await fetch(`/api/featured-videos/${video._id}`, { method: 'DELETE' })
      setFeaturedVideos(featuredVideos.filter(v => v._id !== video._id))
      setMessage({ type: 'success', text: 'Video removed' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to remove' })
    }
  }

  const isVideoFeatured = (videoId: string) => featuredVideos.some(v => v.id === videoId)

  const filteredFeatured = selectedCategory === 'all' 
    ? featuredVideos 
    : featuredVideos.filter(v => v.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Episodes</h1>
          <p className="text-gray-500 mt-1">Choose which videos appear in Latest Episodes</p>
        </div>
        <button
          onClick={() => { fetchFeaturedVideos(); fetchYouTubeVideos(); }}
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

      {/* Add from URL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary-500" />
          Add Video by URL
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            placeholder="Paste YouTube video URL (e.g., https://youtu.be/abc123)"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <select
            value={addCategory}
            onChange={(e) => setAddCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white min-w-[180px]"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button
            onClick={addFromUrl}
            disabled={adding || !searchUrl.trim()}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {adding ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </button>
        </div>
      </motion.div>

      {/* Featured Videos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Grid className="w-5 h-5 text-primary-500" />
            Featured Episodes ({filteredFeatured.filter(v => v.active).length} active)
          </h2>
          
          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading...
          </div>
        ) : filteredFeatured.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Youtube className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No featured videos yet</p>
            <p className="text-sm">Add videos from below or paste a URL above</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeatured.map((video) => (
              <div
                key={video._id}
                className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                  video.active ? 'border-green-500 shadow-lg' : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="aspect-video relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </a>
                  </div>
                  {video.active && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium">
                      Active
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{video.title}</h3>
                  
                  {/* Category Selector */}
                  <select
                    value={video.category}
                    onChange={(e) => updateCategory(video, e.target.value)}
                    className="w-full text-xs p-2 border rounded-lg mb-2 bg-gray-50"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleActive(video)}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        video.active 
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {video.active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {video.active ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => removeVideo(video)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* YouTube Videos - Quick Add */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500" />
          Your YouTube Videos (Quick Add)
        </h2>

        {loadingYT ? (
          <div className="text-center py-8 text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading from YouTube...
          </div>
        ) : youtubeVideos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Youtube className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No videos found</p>
            <p className="text-sm">Configure YouTube API in Podcast settings</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {youtubeVideos.slice(0, 12).map((video) => (
              <div
                key={video.id}
                className={`relative rounded-xl overflow-hidden border transition-all ${
                  isVideoFeatured(video.id) ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="aspect-video relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  {isVideoFeatured(video.id) && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-xs line-clamp-2 mb-2">{video.title}</h3>
                  {isVideoFeatured(video.id) ? (
                    <div className="text-xs text-green-600 font-medium text-center py-2">
                      ✓ Already Added
                    </div>
                  ) : (
                    <button
                      onClick={() => addFromYouTube(video)}
                      disabled={adding}
                      className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-primary-500 text-white rounded-lg text-xs font-medium hover:bg-primary-600 disabled:opacity-50"
                    >
                      <Plus className="w-3 h-3" />
                      Add to Featured
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
