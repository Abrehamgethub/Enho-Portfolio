'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/Animations'
import { 
  Play, 
  Globe, 
  Clock, 
  Eye, 
  Calendar,
  ChevronRight,
  ArrowRight
} from 'lucide-react'

interface Documentary {
  _id: string
  title: string
  description: string
  language: string
  duration: string
  releaseDate: string
  director: string
  thumbnailUrl: string
  videoUrl: string
  featured: boolean
  views: number
  status: string
}

export default function DocumentariesSection() {
  const [documentaries, setDocumentaries] = useState<Documentary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocumentaries() {
      try {
        const response = await fetch('/api/documentaries')
        if (response.ok) {
          const data = await response.json()
          setDocumentaries(data.slice(0, 6)) // Show max 6 documentaries
        }
      } catch (error) {
        console.error('Failed to fetch documentaries:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDocumentaries()
  }, [])

  const featuredDocumentaries = documentaries.filter(d => d.featured)
  const releasedDocumentaries = documentaries.filter(d => !d.featured && d.status === 'Released')

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <FadeInUp className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            Health Documentaries
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="gradient-text">Documentary</span> Films
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our collection of health documentaries in local languages, 
            bridging traditional medicine with modern science.
          </p>
        </FadeInUp>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-200 animate-pulse"></div>
            <p className="text-gray-500">Loading documentaries...</p>
          </div>
        ) : (
          <>
            {/* Featured Documentaries */}
            {featuredDocumentaries.length > 0 && (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredDocumentaries.map((doc, index) => (
                  <StaggerItem key={doc._id}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden h-full group cursor-pointer"
                      onClick={() => window.open(doc.videoUrl, '_blank')}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-purple-400 to-indigo-500">
                        {doc.thumbnailUrl ? (
                          <img 
                            src={doc.thumbnailUrl} 
                            alt={doc.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-purple-600 ml-1" />
                          </div>
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                            Featured
                          </span>
                          <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                            {doc.language}
                          </span>
                        </div>
                        
                        {/* Duration */}
                        <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white text-xs rounded">
                          {doc.duration}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{doc.views.toLocaleString()} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(doc.releaseDate).getFullYear()}</span>
                          </div>
                        </div>
                        
                        <button className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-600 transition-colors">
                          Watch Now
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {/* Released Documentaries */}
            {releasedDocumentaries.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">More Documentaries</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {releasedDocumentaries.map((doc, index) => (
                    <motion.div
                      key={doc._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer group"
                      onClick={() => window.open(doc.videoUrl, '_blank')}
                    >
                      {/* Thumbnail */}
                      <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                        {doc.thumbnailUrl ? (
                          <img 
                            src={doc.thumbnailUrl} 
                            alt={doc.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center">
                            <Play className="w-6 h-6 text-purple-500" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {doc.language}
                          </span>
                          <span className="text-xs text-gray-500">{doc.duration}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{doc.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{doc.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {doc.views.toLocaleString()}
                          </span>
                          <span>Director: {doc.director}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* No Documentaries */}
            {documentaries.length === 0 && (
              <div className="text-center py-12">
                <Play className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Documentaries Yet</h3>
                <p className="text-gray-600">Our documentary collection is coming soon. Stay tuned!</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
