'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Stethoscope, 
  Users, 
  Mic, 
  Heart, 
  GraduationCap, 
  Youtube, 
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Play,
  Award,
  BookOpen,
  Activity,
  Globe,
  Send,
  Star
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerContainer, StaggerItem, HoverScale } from '@/components/Animations'
import ContactForm from '@/components/ContactForm'
import PodcastEpisodes from '@/components/PodcastEpisodes'
import TrainingsSection from '@/components/TrainingsSection'
import DocumentariesSection from '@/components/DocumentariesSection'

// Navigation Component
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-lg md:text-xl text-gray-900">
                እነሆ<span className="text-primary-500"> እኛ</span>
              </span>
              <span className="text-[8px] md:text-[9px] text-gray-400 tracking-wider">ENEHO EGNA</span>
            </div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-primary-500 transition-colors">About</a>
            <a href="#guests" className="text-gray-600 hover:text-primary-500 transition-colors">Our Guests</a>
            <a href="#partners" className="text-gray-600 hover:text-primary-500 transition-colors">Partners</a>
            <a href="#trainings" className="text-gray-600 hover:text-primary-500 transition-colors">Trainings</a>
            <a href="#documentaries" className="text-gray-600 hover:text-primary-500 transition-colors">Documentaries</a>
            <a href="#podcast" className="text-gray-600 hover:text-primary-500 transition-colors">Podcast</a>
            <a href="#contact" className="btn-primary text-sm">Contact Us</a>
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
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">About</a>
              <a href="#guests" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Our Guests</a>
              <a href="#partners" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Partners</a>
              <a href="#trainings" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Trainings</a>
              <a href="#documentaries" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Documentaries</a>
              <a href="#podcast" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-primary-500 transition-colors py-2">Podcast</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-sm text-center">Contact Us</a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
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
              <a href="#podcast" className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium hover:bg-secondary-100 hover:scale-105 transition-all text-sm shadow-lg">
                <Play className="w-4 h-4" />
                Listen to Podcast
              </a>
              <a href="#team" className="inline-flex items-center justify-center gap-2 bg-primary-900/60 backdrop-blur-sm text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium hover:bg-primary-900/80 hover:scale-105 transition-all border border-white/30 text-sm shadow-lg">
                Meet the Team
                <ChevronRight className="w-4 h-4" />
              </a>
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
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">55K+</div>
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

// About Section
function AboutSection() {
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
                <div className="text-4xl font-bold text-primary-600">57K+</div>
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

// Team Section
function TeamSection() {
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
      id: "dr-biruketawit",
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
    <section id="team" className="section-padding bg-gray-50">
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
              <a href="#contact" className="text-primary-600 font-semibold hover:underline">Get in touch →</a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

// Impact Section
function ImpactSection() {
  const impactStats = [
    { number: "57K+", label: "People Reached", icon: <Users className="w-5 h-5" /> },
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

// Certificates Section
function CertificatesSection() {
  const recognitions = [
    { org: "Primary Schools", icon: <GraduationCap className="w-5 h-5" />, text: "Health education in classrooms" },
    { org: "Teachers Association", icon: <Users className="w-5 h-5" />, text: "Training educators on wellness" },
    { org: "Customs Commission", icon: <Award className="w-5 h-5" />, text: "Workplace health programs" },
    { org: "Yeti Pads (Partner)", icon: <Heart className="w-5 h-5" />, text: "Menstrual health advocacy" },
  ]

  return (
    <section id="certificates" className="section-padding bg-gray-50">
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

// Services Section
function ServicesSection() {
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
    <section id="services" className="section-padding bg-white">
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
          <a href="#contact" className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
            Get in Touch
            <ChevronRight className="w-4 h-4" />
          </a>
        </FadeInUp>
      </div>
    </section>
  )
}
// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }
  return null
}

// Get YouTube thumbnail - use hqdefault as it's always available
function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    // Use hqdefault (480x360) as it's always available for all videos
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return null
}

function PreviousGuestsSection() {
  const [guests, setGuests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedGuest, setExpandedGuest] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await fetch('/api/guests')
        const data = await response.json()
        setGuests(data.guests || [])
      } catch (error) {
        console.error('Failed to fetch guests:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGuests()
  }, [])

  const toggleGuestDetails = (guestId: string) => {
    setExpandedGuest(expandedGuest === guestId ? null : guestId)
  }

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container-custom">
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  if (guests.length === 0) return null

  return (
    <section id="guests" className="section-padding bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container-custom">
        <FadeInUp className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
            የእነሆ እኛ እንግዳ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Distinguished <span className="gradient-text">Guests</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Meet the inspiring doctors, health experts, and community leaders 
            who have shared their knowledge on our platform.
          </p>
        </FadeInUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {guests.map((guest, index) => {
            const videoThumbnail = getYouTubeThumbnail(guest.episodeUrl)
            const photo = String(guest.photo || '').trim()
            const displayImage = photo || videoThumbnail || '/logo.png'
            
            return (
              <motion.div
                key={guest._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col"
              >
                {/* Video Thumbnail as Main Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={displayImage}
                    alt={guest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      if (photo && target.src.endsWith(photo)) {
                        target.src = videoThumbnail || '/logo.png'
                        return
                      }
                      if (videoThumbnail && target.src === videoThumbnail) {
                        target.src = '/logo.png'
                        return
                      }
                      if (!target.src.endsWith('/logo.png')) {
                        target.src = '/logo.png'
                      }
                    }}
                  />
                  
                  {/* Program Name Badge */}
                  {guest.programName && (
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {guest.programName}
                    </div>
                  )}
                  
                  {guest.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  {guest.episodeUrl && (
                    <a
                      href={guest.episodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-red-600 ml-1" />
                      </div>
                    </a>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {guest.title} {guest.name}
                    </h3>
                    {guest.nameAmharic && (
                      <p className="text-indigo-600 text-sm font-medium">{guest.nameAmharic}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">{guest.profession}</p>
                  </div>
                  
                  <div className="mt-3">
                    <div className={`text-gray-600 text-sm ${expandedGuest === guest._id ? '' : 'line-clamp-2'}`}>
                      {guest.description}
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedGuest === guest._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-100"
                      >
                        {/* Photo Gallery */}
                        {guest.photos && guest.photos.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-2">Gallery</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {guest.photos.map((photo: string, i: number) => (
                                <img 
                                  key={i} 
                                  src={photo} 
                                  alt={`${guest.name} - Photo ${i + 1}`}
                                  className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(photo, '_blank')}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Episode Link */}
                        {guest.episodeUrl && (
                          <a
                            href={guest.episodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors w-full justify-center"
                          >
                            <Play className="w-4 h-4" />
                            Watch Full Episode
                          </a>
                        )}
                      </motion.div>
                    )}
                    
                    {(guest.description?.length > 100 || guest.photos?.length > 0) && (
                      <button 
                        onClick={() => toggleGuestDetails(guest._id)}
                        className="text-indigo-600 text-sm font-medium mt-2 hover:text-indigo-800 transition-colors flex items-center"
                      >
                        {expandedGuest === guest._id ? 'Show Less' : 'View Details'}
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedGuest === guest._id ? 'transform rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Partners & Sponsors Section
function PartnersSection() {
  const [sponsors, setSponsors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('all')
  const [expandedSponsor, setExpandedSponsor] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const response = await fetch('/api/sponsors')
        const data = await response.json()
        setSponsors(data.sponsors || [])
      } catch (error) {
        console.error('Failed to fetch sponsors:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSponsors()
  }, [])

  const toggleSponsorDetails = (sponsorId: string) => {
    setExpandedSponsor(expandedSponsor === sponsorId ? null : sponsorId)
  }

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container-custom">
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  if (sponsors.length === 0) return null

  const filteredSponsors = activeType === 'all' 
    ? sponsors 
    : sponsors.filter(s => s.programType === activeType)

  const programTypes = [
    { id: 'all', name: 'All Programs' },
    { id: 'holiday', name: 'Holiday Programs' },
    { id: 'charity', name: 'Charity Programs' },
    { id: 'special', name: 'Special Events' },
  ]

  return (
    <section id="partners" className="section-padding bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container-custom">
        <FadeInUp className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted <span className="gradient-text">Collaborators</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Organizations that have partnered with us to bring health programs 
            and community initiatives to life.
          </p>
        </FadeInUp>

        {/* Filter Tabs */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {programTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeType === type.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-amber-100'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.map((sponsor, index) => {
            const videoThumbnail = getYouTubeThumbnail(sponsor.episodeUrl)
            const displayImage = videoThumbnail || sponsor.logo
            
            return (
              <motion.div
                key={sponsor._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col"
              >
                {/* Video Thumbnail as Main Image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={displayImage}
                    alt={sponsor.name}
                    className={`w-full h-full ${videoThumbnail ? 'object-cover' : 'object-contain p-4'} group-hover:scale-105 transition-transform duration-500`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      if (sponsor.logo && target.src !== sponsor.logo) {
                        target.src = sponsor.logo
                        target.className = 'w-full h-full object-contain p-4'
                      }
                    }}
                  />
                  
                  {/* Program Name Badge */}
                  {sponsor.programName && (
                    <div className="absolute top-3 left-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {sponsor.programName}
                    </div>
                  )}
                  
                  {/* Program Type Badge */}
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    sponsor.programType === 'holiday' ? 'bg-red-500 text-white' :
                    sponsor.programType === 'charity' ? 'bg-pink-500 text-white' :
                    sponsor.programType === 'special' ? 'bg-purple-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {sponsor.programType === 'holiday' ? 'Holiday' :
                     sponsor.programType === 'charity' ? 'Charity' :
                     sponsor.programType === 'special' ? 'Special' : 'Regular'}
                  </span>
                  
                  {/* Play Button Overlay */}
                  {sponsor.episodeUrl && (
                    <a
                      href={sponsor.episodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-red-600 ml-1" />
                      </div>
                    </a>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div>
                    <h3 className="font-bold text-gray-900">{sponsor.name}</h3>
                    {sponsor.nameAmharic && (
                      <p className="text-gray-500 text-sm">{sponsor.nameAmharic}</p>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <div className={`text-gray-600 text-sm ${expandedSponsor === sponsor._id ? '' : 'line-clamp-2'}`}>
                      {sponsor.description}
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedSponsor === sponsor._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-100"
                      >
                        {sponsor.impact && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">Impact</h4>
                            <p className="text-gray-600 text-sm">{sponsor.impact}</p>
                          </div>
                        )}
                        
                        {/* Photo Gallery */}
                        {sponsor.photos && sponsor.photos.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-2">Gallery</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {sponsor.photos.map((photo: string, i: number) => (
                                <img 
                                  key={i} 
                                  src={photo} 
                                  alt={`${sponsor.name} - Photo ${i + 1}`}
                                  className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(photo, '_blank')}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Episode Link */}
                        {sponsor.episodeUrl && (
                          <a
                            href={sponsor.episodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors w-full justify-center"
                          >
                            <Play className="w-4 h-4" />
                            Watch Full Episode
                          </a>
                        )}
                        
                        {sponsor.website && (
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 text-amber-600 text-sm font-medium hover:text-amber-700 border border-amber-200 rounded-lg px-4 py-2 hover:bg-amber-50 transition-colors w-full mt-2"
                          >
                            Visit Website
                          </a>
                        )}
                      </motion.div>
                    )}
                    
                    {(sponsor.description?.length > 80 || sponsor.photos?.length > 0 || sponsor.episodeUrl) && (
                      <button 
                        onClick={() => toggleSponsorDetails(sponsor._id)}
                        className="text-amber-600 text-sm font-medium mt-2 hover:text-amber-700 transition-colors flex items-center"
                      >
                        {expandedSponsor === sponsor._id ? 'Show Less' : 'View Details'}
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedSponsor === sponsor._id ? 'transform rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action for potential sponsors */}
        <FadeInUp delay={0.3} className="mt-12">
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Interested in Partnering With Us?</h3>
            <p className="text-white/80 mb-4 max-w-xl mx-auto">
              Join our mission to bring health education and community wellness programs to Ethiopia.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors"
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

// Featured Video Component (replaces Live Updates)
interface Platform {
  name: string
  icon: React.ReactNode
  color: string
  href: string
}

function FeaturedVideoPlayer({ platforms }: { platforms?: Platform[] }) {
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
function PodcastSection() {
  const platforms = [
    { name: "YouTube", icon: <Youtube className="w-6 h-6" />, color: "bg-red-500", href: "https://www.youtube.com/@Eneho_Hakim" },
    { name: "TikTok", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>, color: "bg-black", href: "https://www.tiktok.com/@eneho_egna" },
    { name: "Telegram", icon: <Send className="w-6 h-6" />, color: "bg-[#0088cc]", href: "https://t.me/Eneho_Tena" },
    { name: "Facebook", icon: <Facebook className="w-6 h-6" />, color: "bg-[#1877f2]", href: "https://web.facebook.com/profile.php?id=61566388200183" },
  ]

  return (
    <section id="podcast" className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        {/* Hero Banner */}
        <FadeInUp>
          <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-3xl p-8 md:p-12 mb-12 md:mb-16 overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span className="text-white/90 text-sm font-medium">New episodes weekly</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  The Eneho Egna<br />Podcast
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-lg">
                  Health conversations in Amharic that everyone can understand. 
                  No jargon, just real talk about what matters to your wellbeing.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.youtube.com/@Eneho_Hakim" 
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Youtube className="w-5 h-5" />
                    Watch on YouTube
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://t.me/Eneho_Tena" 
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Join Telegram
                  </motion.a>
                </div>
              </div>

              {/* Right - Featured Video with Social Stats */}
              <div className="hidden lg:block w-96">
                <FeaturedVideoPlayer platforms={platforms} />
              </div>
              
              {/* Mobile Stats - Only show on smaller screens */}
              <div className="grid grid-cols-2 gap-4 lg:hidden">
                {platforms.map((platform, index) => (
                  <motion.a
                    key={index}
                    href={platform.href}
                    target="_blank"
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <div className={`w-14 h-14 ${platform.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3`}>
                      {platform.icon}
                    </div>
                    <div className="text-lg font-bold text-white">{platform.name}</div>
                    <div className="text-white/70 text-xs">Follow Us</div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Latest Episodes */}
        <FadeInUp delay={0.2}>
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              🎙️ Latest Episodes
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Catch Up on Recent Conversations
            </h3>
          </div>
          <PodcastEpisodes />
        </FadeInUp>

      </div>
    </section>
  )
}

// Latest Updates Component
function LatestUpdates({ socials }: { socials: { icon: React.ReactNode; href: string; color: string }[] }) {
  const [updates, setUpdates] = useState([
    { id: '1', text: '🎙️ New Episode: Understanding Diabetes Prevention', time: '2 hours ago' },
    { id: '2', text: '💊 Health Tip: 5 ways to boost your immune system', time: '5 hours ago' },
    { id: '3', text: '📢 Join us LIVE this Saturday for Q&A session!', time: '1 day ago' },
  ])

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetch('/api/updates')
        const data = await response.json()
        if (data.updates && data.updates.length > 0) {
          setUpdates(data.updates)
        }
      } catch (error) {
        console.error('Failed to fetch updates:', error)
      }
    }
    fetchUpdates()
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Send className="w-5 h-5 text-blue-400" />
        <h3 className="font-semibold">Latest Updates</h3>
        <a 
          href="https://t.me/Eneho_Tena" 
          target="_blank" 
          className="ml-auto text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          View Telegram <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      
      {/* Static Updates Display */}
      {updates.length > 0 ? (
        <div className="space-y-3 max-h-32 overflow-y-auto">
          {updates.map((update) => (
            <div key={update.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-sm text-gray-200 line-clamp-2">{update.text}</p>
              <p className="text-xs text-gray-500 mt-1">{update.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <Send className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No updates yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

// Contact Section
function ContactSection() {
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
    <section id="contact" className="section-padding bg-white">
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

// Footer
function Footer() {
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

// Main Page
export default function Home() {
  const [activeSection, setActiveSection] = useState('about')

  const sections = [
    { id: 'about', label: 'About Us', component: <AboutSection /> },
    { id: 'guests', label: 'Guests', component: <PreviousGuestsSection /> },
    { id: 'partners', label: 'Partners', component: <PartnersSection /> },
    { id: 'trainings', label: 'Trainings', component: <TrainingsSection /> },
    { id: 'documentaries', label: 'Documentaries', component: <DocumentariesSection /> },
  ]

  return (
    <main>
      <Navigation />
      <HeroSection />
      
      {/* News & Updates Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Latest Updates
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Stay <span className="gradient-text">Updated</span> With Eneho
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Get the latest news, health tips, and announcements from our team.
              </p>
            </div>
            
            <LatestUpdates socials={[]} />
          </FadeInUp>
        </div>
      </section>
      
      {/* Section Navigation */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our <span className="gradient-text">Work</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover more about our mission, guests, partners, and the impact we're making together.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          
          {/* Active Section */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sections.find(s => s.id === activeSection)?.component}
          </motion.div>
        </div>
      </section>

      {/* Always Visible Sections */}
      <TeamSection />
      <ImpactSection />
      <CertificatesSection />
      <ServicesSection />
      <PodcastSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
