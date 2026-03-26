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
interface Platform {
  name: string
  icon: React.ReactNode
  color: string
  href: string
}


export function FeaturedVideoPlayer({ platforms }: { platforms?: Platform[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
      {/* Video Player - Autoplay muted, 12 sec loop */}
      <div className="aspect-video relative">
        <iframe
          src="https://www.youtube.com/embed/bDyZYCSVvcs?autoplay=1&mute=1&loop=1&playlist=bDyZYCSVvcs&start=0&end=12&rel=0&modestbranding=1&playsinline=1&controls=1"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Eneho Egna Introduction"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-semibold text-sm">Watch Our Story</p>
          <span className="text-white/50 text-xs">🔇 Click video to unmute</span>
        </div>
        
        {/* Social Stats Row */}
        {platforms && (
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/20">
            {platforms.map((platform, index) => (
              <a
                key={index}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center group"
              >
                <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white mx-auto mb-1 group-hover:scale-110 transition-transform`}>
                  <div className="w-4 h-4">{platform.icon}</div>
                </div>
                <div className="text-xs font-medium text-white/80">{platform.name}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Podcast Section