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

export default function ContactSection() {
  const contactMethods = [
    { icon: <Mail className="w-6 h-6" />, label: "Email us", value: "enehoegna@gmail.com", href: "mailto:enehoegna@gmail.com", color: "from-blue-500 to-cyan-500" },
    { icon: <Send className="w-6 h-6" />, label: "Telegram", value: "@Eneho_Tena", href: "https://t.me/Eneho_Tena", color: "from-sky-500 to-blue-500" },
    { icon: <MapPin className="w-6 h-6" />, label: "Location", value: "Addis Ababa, Ethiopia", href: "#", color: "from-green-500 to-emerald-500" },
  ]

  const socials = [
    { icon: <Youtube className="w-5 h-5" />, href: "https://www.youtube.com/@Eneho_Hakim", color: "hover:bg-red-500" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/eneho_egna_podcast/", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500" },
    { icon: <Send className="w-5 h-5" />, href: "https://t.me/Eneho_Tena", color: "hover:bg-[#0088cc]" },
    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>, href: "https://www.tiktok.com/@eneho_egna", color: "hover:bg-black" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://web.facebook.com/profile.php?id=61566388200183", color: "hover:bg-[#1877f2]" },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <FadeInUp className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Let's Connect
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            We'd Love to <span className="gradient-text">Hear From You</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Whether you want to collaborate, book us for an event, or just say hello — 
            we're always excited to connect with our community.
          </p>
        </FadeInUp>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Methods */}
            <FadeInLeft>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 border border-gray-100 group"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white shadow-lg`}>
                      {method.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{method.label}</p>
                      <p className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{method.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </FadeInLeft>

            {/* Social Links Card */}
            <FadeInLeft delay={0.2}>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4">Follow Our Journey</h3>
                <p className="text-gray-400 text-sm mb-5">
                  Stay updated with our latest episodes, health tips, and community events.
                </p>
                <div className="flex gap-3">
                  {socials.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className={`w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center ${social.color} transition-colors`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </FadeInLeft>
          </div>
          
          {/* Right Side - Contact Form */}
          <FadeInRight className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Send us a Message</h3>
                  <p className="text-gray-500 text-sm">We usually respond within 24 hours</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </FadeInRight>
        </div>
        
        {/* Bottom CTA */}
        <FadeInUp delay={0.4} className="text-center mt-10 md:mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gray-50 rounded-2xl px-6 md:px-8 py-6 border border-gray-200">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white flex-shrink-0">
              <Mic className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-gray-900 text-lg">Want us at your next event?</h4>
              <p className="text-gray-500 text-sm md:text-base">Book Eneho Egna for workshops, talks, or health campaigns</p>
            </div>
            <a 
              href="mailto:enehoegna@gmail.com?subject=Event Booking Inquiry"
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-5 md:px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25 whitespace-nowrap text-sm md:text-base"
            >
              Book Us
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}