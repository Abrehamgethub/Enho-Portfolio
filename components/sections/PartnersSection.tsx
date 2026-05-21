'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Stethoscope, Users, Mic, Heart, GraduationCap, Youtube, Facebook, 
  Linkedin, Instagram, Mail, Phone, MapPin, ChevronRight, Play, 
  Award, BookOpen, Activity, Globe, Send, Star, Building2
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerContainer, StaggerItem, HoverScale } from '@/components/Animations'
import ContactForm from '@/components/ContactForm'
import PodcastEpisodes from '@/components/PodcastEpisodes'
import { getYouTubeVideoId, getYouTubeThumbnail } from '@/lib/youtube'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

interface SponsorData {
  id: string
  name: string
  nameAmharic?: string
  logo?: string
  description?: string
  website?: string
  programType?: string
  programName?: string
  episodeUrl?: string
  photos?: string[]
  impact?: string
  featured?: boolean
}


export default function PartnersSection() {
  const [sponsors, setSponsors] = useState<SponsorData[]>([])
  const [loading, setLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [activeType, setActiveType] = useState('all')
  const [expandedSponsor, setExpandedSponsor] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const response = await fetchWithTimeout('/api/sponsors')
        if (response.ok) {
          const data = await response.json()
          setSponsors(data.sponsors || [])
        }
      } catch (error) {
        console.error('Failed to fetch sponsors:', error)
      } finally {
        setLoading(false)
        setHasLoaded(true)
      }
    }
    fetchSponsors()
  }, [])

  const toggleSponsorDetails = (sponsorId: string) => {
    setExpandedSponsor(expandedSponsor === sponsorId ? null : sponsorId)
  }

  const filteredSponsors = activeType === 'all' 
    ? sponsors 
    : sponsors.filter(s => s.programType === activeType)

  const programTypes = [
    { id: 'all', name: 'All Programs' },
    { id: 'regular', name: 'Regular Programs' },
    { id: 'holiday', name: 'Holiday Programs' },
    { id: 'charity', name: 'Charity Programs' },
    { id: 'special', name: 'Special Events' },
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container-custom">
        <FadeInUp className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted <span className="gradient-text">Collaborators</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Organizations that have partnered with us to bring health programs 
            and community initiatives to life.
          </p>
        </FadeInUp>

        {/* Filter Tabs */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {programTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeType === type.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-amber-100'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </FadeInUp>

        {!hasLoaded ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Partners Found</h3>
              <p className="text-gray-500">We are currently updating our partner list for this category.</p>
            </div>
          ) : (
            filteredSponsors.map((sponsor, index) => {
              const videoThumbnail = getYouTubeThumbnail(sponsor.episodeUrl)
              const displayImage = videoThumbnail || sponsor.logo
              
              return (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col"
                >
                {/* Video Thumbnail as Main Image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={displayImage}
                    alt={sponsor.name}
                    className={`w-full h-full ${videoThumbnail ? 'object-cover' : 'object-contain p-4'} group-hover:scale-105 transition-transform duration-500`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      if (sponsor.logo && target.src !== sponsor.logo) {
                        target.src = sponsor.logo
                        target.className = 'w-full h-full object-contain p-4'
                      }
                    }}
                  />
                  
                  {/* Program Name Badge */}
                  {sponsor.programName && (
                    <div className="absolute top-3 left-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {sponsor.programName}
                    </div>
                  )}
                  
                  {/* Program Type Badge */}
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    sponsor.programType === 'holiday' ? 'bg-red-500 text-white' :
                    sponsor.programType === 'charity' ? 'bg-pink-500 text-white' :
                    sponsor.programType === 'special' ? 'bg-purple-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {sponsor.programType === 'holiday' ? 'Holiday' :
                     sponsor.programType === 'charity' ? 'Charity' :
                     sponsor.programType === 'special' ? 'Special' : 'Regular'}
                  </span>
                  
                  {/* Play Button Overlay */}
                  {sponsor.episodeUrl && (
                    <a
                      href={sponsor.episodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-red-600 ml-1" />
                      </div>
                    </a>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div>
                    <h3 className="font-bold text-gray-900">{sponsor.name}</h3>
                    {sponsor.nameAmharic && (
                      <p className="text-gray-500 text-sm">{sponsor.nameAmharic}</p>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <div className={`text-gray-600 text-sm ${expandedSponsor === sponsor.id ? '' : 'line-clamp-2'}`}>
                      {sponsor.description}
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedSponsor === sponsor.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-100"
                      >
                        {sponsor.impact && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">Impact</h4>
                            <p className="text-gray-600 text-sm">{sponsor.impact}</p>
                          </div>
                        )}
                        
                        {/* Photo Gallery */}
                        {sponsor.photos && sponsor.photos.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-2">Gallery</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {sponsor.photos.map((photo: string, i: number) => (
                                <img 
                                  key={`${photo}-${i}`} 
                                  src={photo} 
                                  alt={`${sponsor.name} - Photo ${i + 1}`}
                                  className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(photo, '_blank')}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Episode Link */}
                        {sponsor.episodeUrl && (
                          <a
                            href={sponsor.episodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors w-full justify-center"
                          >
                            <Play className="w-4 h-4" />
                            Watch Full Episode
                          </a>
                        )}
                        
                        {sponsor.website && (
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 text-amber-600 text-sm font-medium hover:text-amber-700 border border-amber-200 rounded-lg px-4 py-2 hover:bg-amber-50 transition-colors w-full mt-2"
                          >
                            Visit Website
                          </a>
                        )}
                      </motion.div>
                    )}
                    
                    {((sponsor.description?.length ?? 0) > 80 || (sponsor.photos?.length ?? 0) > 0 || sponsor.episodeUrl) && (
                      <button 
                        onClick={() => toggleSponsorDetails(sponsor.id)}
                        className="text-amber-600 text-sm font-medium mt-2 hover:text-amber-700 transition-colors flex items-center"
                      >
                        {expandedSponsor === sponsor.id ? 'Show Less' : 'View Details'}
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedSponsor === sponsor.id ? 'transform rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
        )}


        {/* Call to Action for potential sponsors */}
        <FadeInUp delay={0.3} className="mt-12">
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Interested in Partnering With Us?</h3>
            <p className="text-white/80 mb-4 max-w-xl mx-auto">
              Join our mission to bring health education and community wellness programs to Ethiopia.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors"
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

// Featured Video Component (replaces Live Updates)