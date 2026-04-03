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

export default function TeamSection() {
  const doctors = [
    {
      id: "dr-melat",
      name: "Dr. Melat Mesfin",
      credentials: "MD, MPH",
      role: "The Researcher",
      tagline: "Bringing AI and public health together",
      specialties: ["Public Health", "AI in Medicine", "Research"],
      color: "from-violet-500 to-purple-600",
      image: "/dr-melat.jpg"
    },
    {
      id: "dr-tigist",
      name: "Dr. Tigist Kahsay",
      credentials: "MD",
      role: "The Healer",
      tagline: "From ER to community health champion",
      specialties: ["Emergency Medicine", "Dialysis", "Telemedicine"],
      color: "from-rose-500 to-pink-600",
      image: "/dr-tigist.jpg"
    },
    {
      id: "dr-birucketawit",
      name: "Dr. Birucketawit Alebachew",
      credentials: "MD, BSc",
      role: "The Educator",
      tagline: "Making health knowledge accessible",
      specialties: ["Public Health", "Quality Control", "Training"],
      color: "from-teal-500 to-cyan-600",
      image: "/dr-birucketawit.jpg"
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <FadeInUp className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            The Faces Behind Eneho Egna
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet the <span className="gradient-text">Doctors</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Three physicians. One shared dream. Together, we're changing how Ethiopia 
            thinks about health — one conversation at a time.
          </p>
        </FadeInUp>
        
        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 h-full flex flex-col"
              >
                {/* Photo Section */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  {doctor.image ? (
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 bg-white"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${doctor.color} opacity-10 flex items-center justify-center`}>
                      <span className={`text-8xl font-bold bg-gradient-to-br ${doctor.color} bg-clip-text text-transparent`}>
                        {doctor.name.split(' ')[1]?.[0] || 'D'}
                      </span>
                    </div>
                  )}
                  {/* Full white overlay for consistent brightness */}
                  <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                </div>
                
                {/* Info */}
                <div className="px-6 pb-6 text-center flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 min-h-[56px] flex items-center justify-center">{doctor.name}</h3>
                  <p className={`font-semibold bg-gradient-to-r ${doctor.color} bg-clip-text text-transparent`}>
                    {doctor.credentials}
                  </p>
                  <div className="mt-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {doctor.role}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm italic mb-4 h-[40px] flex items-center justify-center">"{doctor.tagline}"</p>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4 h-[60px] items-start content-start">
                    {doctor.specialties.map((specialty, i) => (
                      <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-100">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="mt-auto pt-2">
                    <Link 
                      href={`/team/${doctor.id}`}
                      className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r ${doctor.color} hover:shadow-lg transition-all duration-300`}
                    >
                      View Full Profile
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <FadeInUp delay={0.5} className="text-center mt-10 md:mt-12">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="flex -space-x-3">
              {doctors.map((doc, i) => (
                <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${doc.color} border-2 border-white flex items-center justify-center shadow-md`}>
                  {doc.image ? (
                    <img src={doc.image} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white text-xs font-bold">{doc.name.split(' ')[1]?.[0]}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Want to work with us?</p>
              <Link href="/contact" className="text-primary-600 font-semibold hover:underline">Get in touch →</Link>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}