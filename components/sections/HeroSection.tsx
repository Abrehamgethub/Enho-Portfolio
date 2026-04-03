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
import { useTotalFollowers } from '@/hooks/useSocialStats'

export default function HeroSection() {
  const totalFollowers = useTotalFollowers()

  return (
    <section className="relative min-h-[65vh] sm:min-h-[75vh] md:min-h-screen flex flex-col overflow-hidden">
      {/* Team Photo as Background */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src="/team-photo.jpg" 
          alt="Eneho Egna Team - Dr. Melat, Dr. Tigist, and Dr. Birucketawit"
          className="w-full h-full object-cover object-[center_15%] md:object-center"
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-primary-900/30"></div>
        {/* Stronger gradient at the bottom for text area */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] md:h-[55%] bg-gradient-to-t from-primary-900 via-primary-900/90 to-transparent"></div>
      </motion.div>
      
      {/* Spacer to push content down - faces stay visible */}
      <div className="flex-1 min-h-[30%] md:min-h-0"></div>
      
      {/* Content at the very bottom */}
      <div className="relative z-10 pb-4 md:pb-10 px-4">
        <div className="container-custom">
          <div className="max-w-3xl text-white drop-shadow-lg">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-primary-900/60 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 shadow-lg"
            >
              <Mic className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-medium">Health Media & Community Wellness</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
            >
              Empowering Health, <span className="text-secondary-300">One Story at a Time</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-sm md:text-base lg:text-lg text-white mb-4 md:mb-6 max-w-2xl"
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
            >
              A collective of dedicated Ethiopian physicians bringing evidence-based health education 
              and community wellness through modern media.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-2 md:gap-3"
            >
              <Link href="/podcast" className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium hover:bg-secondary-100 hover:scale-105 transition-all text-sm shadow-lg">
                <Play className="w-4 h-4" />
                Listen to Podcast
              </Link>
              <Link href="/team" className="inline-flex items-center justify-center gap-2 bg-primary-900/60 backdrop-blur-sm text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium hover:bg-primary-900/80 hover:scale-105 transition-all border border-white/30 text-sm shadow-lg">
                Meet the Team
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            {/* Stats - compact row */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-6 md:gap-10 mt-5 md:mt-6 pt-4 md:pt-5 border-t border-white/30"
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
            >
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{totalFollowers}</div>
                <div className="text-white/80 text-xs">Social Followers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">8+</div>
                <div className="text-white/80 text-xs">Training Programs</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">3</div>
                <div className="text-white/80 text-xs">Expert Physicians</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}