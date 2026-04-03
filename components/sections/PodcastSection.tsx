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
import { FeaturedVideoPlayer } from './FeaturedVideoPlayer'

export default function PodcastSection() {
  const [stats, setStats] = useState<any[]>([])
  
  const defaultPlatforms = [
    { name: "YouTube", icon: <Youtube className="w-6 h-6" />, color: "bg-red-500", href: "https://www.youtube.com/@Eneho_Hakim" },
    { name: "TikTok", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>, color: "bg-black", href: "https://www.tiktok.com/@eneho_egna" },
    { name: "Telegram", icon: <Send className="w-6 h-6" />, color: "bg-[#0088cc]", href: "https://t.me/Eneho_Tena" },
    { name: "Facebook", icon: <Facebook className="w-6 h-6" />, color: "bg-[#1877f2]", href: "https://web.facebook.com/profile.php?id=61566388200183" },
  ]

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/social-stats')
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            const sorted = data.sort((a: any, b: any) => a.order - b.order)
            // Map the icons from DB to React elements
            const mapped = sorted.map((stat: any) => {
              let iconComponent = <Star className="w-6 h-6" /> // default
              if (stat.icon === 'youtube') iconComponent = <Youtube className="w-6 h-6" />
              else if (stat.icon === 'instagram') iconComponent = <Instagram className="w-6 h-6" />
              else if (stat.icon === 'telegram') iconComponent = <Send className="w-6 h-6" />
              else if (stat.icon === 'facebook') iconComponent = <Facebook className="w-6 h-6" />
              else if (stat.icon === 'tiktok') iconComponent = <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              
              return {
                name: stat.platform,
                icon: iconComponent,
                color: stat.color,
                href: stat.url,
                followers: stat.followers
              }
            })
            setStats(mapped)
          }
        }
      } catch (error) {
        console.error('Error fetching social stats:', error)
      }
    }
    fetchStats()
  }, [])

  const platformsToDisplay = stats.length > 0 ? stats.slice(0, 4) : defaultPlatforms

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        {/* Hero Banner */}
        <FadeInUp>
          <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-3xl p-8 md:p-12 mb-12 md:mb-16 overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span className="text-white/90 text-sm font-medium">New episodes weekly</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  The Eneho Egna<br />Podcast
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-lg">
                  Health conversations in Amharic that everyone can understand. 
                  No jargon, just real talk about what matters to your wellbeing.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.youtube.com/@Eneho_Hakim" 
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Youtube className="w-5 h-5" />
                    Watch on YouTube
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://t.me/Eneho_Tena" 
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Join Telegram
                  </motion.a>
                </div>
              </div>

              {/* Right - Featured Video with Social Stats */}
              <div className="hidden lg:block w-96">
                <FeaturedVideoPlayer platforms={platformsToDisplay} />
              </div>
              
              {/* Mobile Stats - Only show on smaller screens */}
              <div className="grid grid-cols-2 gap-4 lg:hidden">
                {platformsToDisplay.map((platform, index) => (
                  <motion.a
                    key={index}
                    href={platform.href}
                    target="_blank"
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <div className={`w-14 h-14 \${platform.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3`}>
                      {platform.icon}
                    </div>
                    <div className="text-lg font-bold text-white">{platform.name}</div>
                    <div className="text-white/70 text-xs truncate max-w-full px-2">{platform.followers || 'Follow Us'}</div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Latest Episodes */}
        <FadeInUp delay={0.2}>
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              🎙️ Latest Episodes
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Catch Up on Recent Conversations
            </h3>
          </div>
          <PodcastEpisodes />
        </FadeInUp>

      </div>
    </section>
  )
}

// Latest Updates Component