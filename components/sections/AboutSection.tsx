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

export default function AboutSection() {
  const totalFollowers = useTotalFollowers()

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: "Compassion", desc: "We care deeply about every life" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Education", desc: "Knowledge is power" },
    { icon: <Users className="w-6 h-6" />, title: "Community", desc: "Together we're stronger" },
    { icon: <Globe className="w-6 h-6" />, title: "Access", desc: "Healthcare for everyone" },
  ]

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-20">
          {/* Left - Story */}
          <FadeInLeft>
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We're <span className="gradient-text">Eneho Egna</span> — <br className="hidden md:block" />
              and we're here for you.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              In Amharic, our name means <strong>"Here We Are"</strong> — a promise that wherever 
              health education is needed, we'll show up. Three doctors, one mission: making 
              healthcare knowledge accessible to every Ethiopian.
            </p>
            <p className="text-gray-500 mb-8">
              From weekly podcasts to free cancer screenings, from school workshops to 
              documentaries in local languages — we're bridging the gap between medicine and people.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-4xl font-bold text-primary-600">3</div>
                <div className="text-gray-500 text-sm">Doctors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600">2017</div>
                <div className="text-gray-500 text-sm">Founded</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600">{totalFollowers}</div>
                <div className="text-gray-500 text-sm">Community</div>
              </div>
            </div>
          </FadeInLeft>
          
          {/* Right - Values Cards */}
          <FadeInRight>
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-200 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-200 rounded-full opacity-50 blur-3xl"></div>
              
              <div className="relative grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 ${
                      index === 1 || index === 2 ? 'mt-6' : ''
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white mb-4">
                      {value.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-500">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInRight>
        </div>
        
        {/* Mission Statement */}
        <FadeInUp className="mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4 font-amharic">
              "በቻናላችን ልዩ የሆነውን ኢትዮጵያዊ እይታ በመጠቀም ጤናን ከዘመናዊ ህክምናና ባህላዊ ሕክምና አንጻር እንመለከታለን። 
              አላማችን በታካሚዎች፣ በዘመናዊና ባህላዊ ሐኪሞች መካከል ድልድይ ማበጀት ነው።"
            </p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              A channel led by three female doctors — bridging traditional Ethiopian medicine with modern science 
              to empower viewers towards comprehensive well-being.
            </p>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}