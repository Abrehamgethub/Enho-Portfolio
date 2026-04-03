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

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-lg md:text-xl text-gray-900">
                እነሆ<span className="text-primary-500"> እኛ</span>
              </span>
              <span className="text-[8px] md:text-[9px] text-gray-400 tracking-wider">ENEHO EGNA</span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-primary-500 transition-colors">About</Link>
            <Link href="/team" className="text-gray-600 hover:text-primary-500 transition-colors">Team</Link>
            <Link href="/guests" className="text-gray-600 hover:text-primary-500 transition-colors">Guests</Link>
            <Link href="/partners" className="text-gray-600 hover:text-primary-500 transition-colors">Partners</Link>
            <Link href="/trainings" className="text-gray-600 hover:text-primary-500 transition-colors">Trainings</Link>
            <Link href="/documentaries" className="text-gray-600 hover:text-primary-500 transition-colors">Documentaries</Link>
            <Link href="/podcast" className="text-gray-600 hover:text-primary-500 transition-colors">Podcast</Link>
            <Link href="/news" className="text-gray-600 hover:text-primary-500 transition-colors">News</Link>
            <Link href="/contact" className="btn-primary text-sm">Contact Us</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">About</Link>
              <Link href="/team" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Team</Link>
              <Link href="/guests" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Guests</Link>
              <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Partners</Link>
              <Link href="/trainings" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Trainings</Link>
              <Link href="/documentaries" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Documentaries</Link>
              <Link href="/podcast" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Podcast</Link>
              <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">News</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-sm text-center">Contact Us</Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}