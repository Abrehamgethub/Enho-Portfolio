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
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

interface Update {
  id: string
  text: string
  time: string
  createdAt?: string
}

export default function LatestUpdates() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetchWithTimeout('/api/updates')
        const data = await response.json()
        
        if (data.updates) {
          setUpdates(data.updates)
        }
      } catch (error) {
        // Silently fail
      } finally {
        setHasLoaded(true)
      }
    }
    fetchUpdates()
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Send className="w-5 h-5 text-blue-400" />
        <h3 className="font-semibold">Latest Updates</h3>
        <a 
          href="https://t.me/Eneho_Tena" 
          target="_blank" 
          className="ml-auto text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          View Telegram <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      
      {/* Updates Display */}
      {!hasLoaded ? (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10 animate-pulse h-16" />
          ))}
        </div>
      ) : updates.length > 0 ? (
        <div className="space-y-3 max-h-32 overflow-y-auto">
          {updates.map((update) => (
            <div key={update.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-sm text-gray-200 line-clamp-2">{update.text}</p>
              <p className="text-xs text-gray-500 mt-1">{update.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <Send className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No updates yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}