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

export default function CertificatesSection() {
  const recognitions = [
    { org: "Primary Schools", icon: <GraduationCap className="w-5 h-5" />, text: "Health education in classrooms" },
    { org: "Teachers Association", icon: <Users className="w-5 h-5" />, text: "Training educators on wellness" },
    { org: "Customs Commission", icon: <Award className="w-5 h-5" />, text: "Workplace health programs" },
    { org: "Yeti Pads (Partner)", icon: <Heart className="w-5 h-5" />, text: "Menstrual health advocacy" },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <FadeInUp>
          <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                {/* Left content */}
                <div className="md:max-w-md">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium mb-4">
                    ✨ Recognized Excellence
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    Trusted by Organizations Across Ethiopia
                  </h2>
                  <p className="text-white/80 text-base md:text-lg">
                    Our dedication to community health has earned recognition from schools, 
                    government bodies, and leading health organizations.
                  </p>
                </div>
                
                {/* Right - Recognition badges */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {recognitions.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                          {item.icon}
                        </div>
                        <span className="text-white font-semibold text-sm">{item.org}</span>
                      </div>
                      <p className="text-white/70 text-xs">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Bottom stat */}
              <div className="mt-8 pt-8 border-t border-white/20 flex flex-wrap items-center gap-6 md:gap-12">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white">4+</div>
                  <div className="text-white/70 text-sm">Official Certificates</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white">9+</div>
                  <div className="text-white/70 text-sm">Training Programs</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white">2017</div>
                  <div className="text-white/70 text-sm">Making Impact Since</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}