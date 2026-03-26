'use client'

import { useState, useEffect } from 'react'
import { Play, Calendar, ExternalLink, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Video {
  id: string
  title: string
  description?: string
  thumbnail: string
  publishedAt?: string
  url?: string
  category?: string
}

export default function PodcastEpisodes() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        // Fetch directly from YouTube channel
        const response = await fetch('/api/youtube')
        const data = await response.json()
        setVideos(data.videos || [])
      } catch (error) {
        console.error('Failed to fetch videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-100 rounded-2xl border border-dashed border-gray-300">
        <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">No recent episodes found</h4>
        <p className="text-gray-600 mb-6">We couldn't load the latest episodes right now. Check back later or watch directly on YouTube.</p>
        <a 
          href="https://www.youtube.com/@Eneho_Hakim" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {videos.slice(0, 3).map((video, index) => (
        <motion.a
          key={video.id}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gray-200 overflow-hidden">
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
            )}
            
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-600 ml-1" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {video.title}
            </h3>
            {video.description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {video.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-3 text-gray-500 text-xs">
              {video.publishedAt ? (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(video.publishedAt)}</span>
                </>
              ) : null}
              <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}
