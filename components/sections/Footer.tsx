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

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 md:py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-heading font-bold text-gray-900">
              እነሆ<span className="text-primary-500"> እኛ</span>
            </span>
          </div>
          
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} <span className="text-gray-800">እነሆ እኛ</span> (Eneho Egna). All rights reserved.
          </p>
          
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}