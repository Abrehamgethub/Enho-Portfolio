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

export default function ServicesSection() {
  const services = [
    {
      icon: <Mic className="w-7 h-7" />,
      title: "Health Podcast",
      subtitle: "Weekly in Amharic",
      description: "Breaking down complex health topics into conversations everyone can understand.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: "School Trainings",
      subtitle: "For students & teachers",
      description: "Interactive sessions on menstrual health, hygiene, and wellness for young minds.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Free Health Camps",
      subtitle: "For communities",
      description: "Cancer screenings and checkups for those who need it most — at no cost.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Play className="w-7 h-7" />,
      title: "Documentaries",
      subtitle: "In local languages",
      description: "Films that bridge traditional and modern medicine, told in Somali & Oromiffa.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: "Medical Advice",
      subtitle: "Expert consultations",
      description: "Professional guidance from experienced doctors, online and in-person.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Health Advocacy",
      subtitle: "Raising awareness",
      description: "Partnering with organizations to push for better healthcare access nationwide.",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <FadeInUp className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary-200 text-primary-700 rounded-full text-sm font-medium mb-4">
            How We Help
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We believe health education should be accessible, engaging, and actionable. 
            Here's how we're making that happen.
          </p>
        </FadeInUp>
        
        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <motion.div 
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-200/50 border border-gray-100 h-full overflow-hidden"
              >
                {/* Gradient line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}></div>
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full mb-3">
                  {service.subtitle}
                </span>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`}></div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {/* CTA */}
        <FadeInUp delay={0.4} className="text-center mt-10 md:mt-12">
          <p className="text-gray-500 mb-4">Want to collaborate or bring us to your community?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
            Get in Touch
            <ChevronRight className="w-4 h-4" />
          </Link>
        </FadeInUp>
      </div>
    </section>
  )
}