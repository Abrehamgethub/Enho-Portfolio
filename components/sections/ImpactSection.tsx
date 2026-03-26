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

export default function ImpactSection() {
  const totalFollowers = useTotalFollowers()

  const impactStats = [
    { number: totalFollowers, label: "People Reached", icon: <Users className="w-5 h-5" /> },
    { number: "630+", label: "Trainees", icon: <GraduationCap className="w-5 h-5" /> },
    { number: "124+", label: "Free Medical Services", icon: <Heart className="w-5 h-5" /> },
    { number: "2", label: "Documentaries", icon: <Play className="w-5 h-5" /> },
  ]

  const impactStories = [
    {
      title: "Empowering Young Women",
      description: "We've trained over 500 students across schools on menstrual health, breaking taboos and building confidence.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      stat: "500+ Students"
    },
    {
      title: "Cancer Awareness",
      description: "Free breast cancer screenings and awareness sessions, helping detect early signs and save lives.",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      stat: "Free Screenings"
    },
    {
      title: "Community Health",
      description: "Free medical services for orphanages and underserved communities — because everyone deserves care.",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      stat: "124+ People Served"
    },
    {
      title: "Bridging Traditions",
      description: "Documentaries in local languages exploring traditional medicine alongside modern healthcare.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-teal-500 to-green-500",
      stat: "2 Languages"
    }
  ]

  return (
    <section id="impact" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <FadeInUp className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Making a Difference
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Real Stories, <span className="gradient-text">Real Impact</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We don't just talk about health — we show up. From classrooms to clinics, 
            here's how we're making healthcare accessible for everyone.
          </p>
        </FadeInUp>

        {/* Stats Row */}
        <FadeInUp delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeInUp>

        {/* Impact Stories Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-10 md:mb-12">
          {impactStories.map((story, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden h-full"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${story.color}`}></div>
                
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${story.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    {story.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {story.stat}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Partners Marquee */}
        <FadeInUp delay={0.4}>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
              Trusted by Leading Organizations
            </h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {["EFDRE Custom Commission", "Yeti Pads", "YWCA Ethiopia", "Ethiopian Cancer Society", "Hope Oncology", "Ummi Orphans Charity"].map((partner, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 md:px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-default shadow-sm"
                >
                  {partner}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}