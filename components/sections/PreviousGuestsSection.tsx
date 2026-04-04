// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Stethoscope, Users, Mic, Heart, GraduationCap, Youtube, Facebook, 
  Linkedin, Instagram, Mail, Phone, MapPin, ChevronRight, Play, 
  Award, BookOpen, Activity, Globe, Send, Star 
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerContainer, StaggerItem, HoverScale } from '@/components/Animations'
import ContactForm from '@/components/ContactForm'
import PodcastEpisodes from '@/components/PodcastEpisodes'
// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string | undefined): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }
  return null
}

// Get YouTube thumbnail - use hqdefault as it's always available
function getYouTubeThumbnail(url: string | undefined): string | null {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    // Use hqdefault (480x360) as it's always available for all videos
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return null
}

interface GuestData {
  _id: string
  name: string
  nameAmharic?: string
  title?: string
  profession?: string
  photo?: string
  photos?: string[]
  description?: string
  episodeUrl?: string
  programName?: string
  featured?: boolean
}


import { initialGuests } from '@/lib/guests-data'

export default function PreviousGuestsSection() {
  const [guests, setGuests] = useState<GuestData[]>(initialGuests)
  const [loading, setLoading] = useState(true)
  const [expandedGuest, setExpandedGuest] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await fetch('/api/guests')
        if (response.ok) {
          const data = await response.json()
          if (data.guests && data.guests.length > 0) {
            setGuests(data.guests)
          }
        }
      } catch (error) {
        console.error('Failed to fetch guests:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGuests()
  }, [])

  const toggleGuestDetails = (guestId: string) => {
    setExpandedGuest(expandedGuest === guestId ? null : guestId)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container-custom">
        <FadeInUp className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
            የእነሆ እኛ እንግዳ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Distinguished <span className="gradient-text">Guests</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Meet the inspiring doctors, health experts, and community leaders 
            who have shared their knowledge on our platform.
          </p>
        </FadeInUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {guests.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Guests Found</h3>
              <p className="text-gray-500">Wait for our upcoming guests or check back later!</p>
            </div>
          ) : (
            guests.map((guest, index) => {
              const videoThumbnail = getYouTubeThumbnail(guest.episodeUrl)
              const photo = String(guest.photo || '').trim()
              const displayImage = photo || videoThumbnail || '/logo.png'
              
              return (
                <motion.div
                  key={guest._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col"
                >
                  {/* ... rest of guest mapping remains same ... */}
                {/* Video Thumbnail as Main Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={displayImage}
                    alt={guest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      if (photo && target.src.endsWith(photo)) {
                        target.src = videoThumbnail || '/logo.png'
                        return
                      }
                      if (videoThumbnail && target.src === videoThumbnail) {
                        target.src = '/logo.png'
                        return
                      }
                      if (!target.src.endsWith('/logo.png')) {
                        target.src = '/logo.png'
                      }
                    }}
                  />
                  
                  {/* Program Name Badge */}
                  {guest.programName && (
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {guest.programName}
                    </div>
                  )}
                  
                  {guest.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  {guest.episodeUrl && (
                    <a
                      href={guest.episodeUrl}
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
                
                <div className="p-4 flex flex-col flex-grow">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {guest.title} {guest.name}
                    </h3>
                    {guest.nameAmharic && (
                      <p className="text-indigo-600 text-sm font-medium">{guest.nameAmharic}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">{guest.profession}</p>
                  </div>
                  
                  <div className="mt-3">
                    <div className={`text-gray-600 text-sm ${expandedGuest === guest._id ? '' : 'line-clamp-2'}`}>
                      {guest.description}
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedGuest === guest._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-100"
                      >
                        {/* Photo Gallery */}
                        {guest.photos && guest.photos.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-2">Gallery</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {guest.photos.map((photo: string, i: number) => (
                                <img 
                                  key={i} 
                                  src={photo} 
                                  alt={`${guest.name} - Photo ${i + 1}`}
                                  className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(photo, '_blank')}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Episode Link */}
                        {guest.episodeUrl && (
                          <a
                            href={guest.episodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors w-full justify-center"
                          >
                            <Play className="w-4 h-4" />
                            Watch Full Episode
                          </a>
                        )}
                      </motion.div>
                    )}
                    
                    {((guest.description?.length ?? 0) > 100 || (guest.photos?.length ?? 0) > 0) && (
                      <button 
                        onClick={() => toggleGuestDetails(guest._id)}
                        className="text-indigo-600 text-sm font-medium mt-2 hover:text-indigo-800 transition-colors flex items-center"
                      >
                        {expandedGuest === guest._id ? 'Show Less' : 'View Details'}
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedGuest === guest._id ? 'transform rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

// Partners & Sponsors Section