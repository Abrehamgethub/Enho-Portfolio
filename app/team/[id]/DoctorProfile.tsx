'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen,
  Heart,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight,
  Stethoscope,
  Users,
  Sparkles
} from 'lucide-react'
import { Doctor } from '@/lib/doctors-data'
import { Logo } from '@/components/Logo'

interface DoctorProfileProps {
  doctor: Doctor
}

// Get doctor's unique color based on their ID
const getDoctorColor = (id: string) => {
  const colors: Record<string, string> = {
    'dr-melat': 'from-violet-500 to-purple-600',
    'dr-tigist': 'from-rose-500 to-pink-600',
    'dr-biruketawit': 'from-teal-500 to-cyan-600'
  }
  return colors[id] || 'from-primary-500 to-primary-600'
}

export default function DoctorProfile({ doctor }: DoctorProfileProps) {
  const doctorColor = getDoctorColor(doctor.id)
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo className="w-10 h-10" />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-xl text-gray-900">
                  እነሆ<span className="text-primary-500"> እኛ</span>
                </span>
                <span className="text-[9px] text-gray-400 tracking-wider">ENEHO EGNA</span>
              </div>
            </Link>
            <Link 
              href="/#team" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Background decoration */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${doctorColor} opacity-10 rounded-full -translate-y-1/2 translate-x-1/3`}></div>
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr ${doctorColor} opacity-5 rounded-full translate-y-1/2 -translate-x-1/3`}></div>
        
        <div className="container-custom relative z-10 py-12 md:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            {/* Photo */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${doctorColor} opacity-20 blur-2xl scale-110 rounded-3xl`}></div>
              <div className={`relative w-64 md:w-80 aspect-[3/4] rounded-3xl bg-gradient-to-br ${doctorColor} p-1 shadow-2xl overflow-hidden`}>
                {doctor.image ? (
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top rounded-[22px] bg-white" />
                ) : (
                  <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center">
                    <span className={`text-8xl font-bold bg-gradient-to-br ${doctorColor} bg-clip-text text-transparent`}>
                      {doctor.name.split(' ')[1]?.[0] || 'D'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${doctorColor} text-white rounded-full px-4 py-1.5 text-sm font-medium mb-4`}
              >
                <Sparkles className="w-4 h-4" />
                {doctor.credentials}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3"
              >
                {doctor.name}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-lg mb-6 max-w-xl"
              >
                {doctor.tagline}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center md:justify-start gap-2"
              >
                {doctor.specialties.slice(0, 4).map((specialty, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {specialty}
                  </span>
                ))}
              </motion.div>

              {doctor.socialLinks && Object.values(doctor.socialLinks).some((v) => String(v || '').trim()) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-6 flex flex-wrap justify-center md:justify-start gap-3"
                >
                  {doctor.socialLinks.linkedin && String(doctor.socialLinks.linkedin).trim() && (
                    <a
                      href={doctor.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-500 hover:border-primary-200 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {doctor.socialLinks.twitter && String(doctor.socialLinks.twitter).trim() && (
                    <a
                      href={doctor.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter/X"
                      className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-500 hover:border-primary-200 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {doctor.socialLinks.facebook && String(doctor.socialLinks.facebook).trim() && (
                    <a
                      href={doctor.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-500 hover:border-primary-200 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {doctor.socialLinks.instagram && String(doctor.socialLinks.instagram).trim() && (
                    <a
                      href={doctor.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-500 hover:border-primary-200 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {doctor.socialLinks.website && String(doctor.socialLinks.website).trim() && (
                    <a
                      href={doctor.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-500 hover:border-primary-200 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${doctorColor}`}></div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${doctorColor} flex items-center justify-center shadow-lg`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  About
                </h2>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </motion.div>

              {/* Experience */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${doctorColor} flex items-center justify-center shadow-lg`}>
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {doctor.experience.map((exp, index) => (
                    <div key={index} className={`relative pl-6 border-l-2`} style={{ borderColor: 'rgb(196 181 253)' }}>
                      <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br ${doctorColor}`}></div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                        <p className="text-gray-700 font-medium">{exp.organization}</p>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">
                        {exp.period} {exp.location && `• ${exp.location}`}
                      </p>
                      {exp.responsibilities && (
                        <ul className="space-y-1">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${doctorColor} flex items-center justify-center shadow-lg`}>
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  Education
                </h2>
                <div className="space-y-4">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                        <GraduationCap className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        {edu.year && <p className="text-gray-500 text-sm">{edu.year}</p>}
                        {edu.details && <p className="text-gray-500 text-sm">{edu.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Volunteer Work */}
              {doctor.volunteerWork.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-200/50 border border-gray-100"
                >
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${doctorColor} flex items-center justify-center shadow-lg`}>
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    Volunteer & Community Work
                  </h2>
                  <div className="space-y-4">
                    {doctor.volunteerWork.map((work, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-gray-900">{work.role}</h3>
                        <p className="text-gray-600 font-medium">{work.organization}</p>
                        {work.period && <p className="text-gray-500 text-sm">{work.period}</p>}
                        {work.description && (
                          <p className="text-gray-600 text-sm mt-2">{work.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-gray-600" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.skills.map((skill, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              {doctor.certifications.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-600" />
                    Certifications
                  </h3>
                  <ul className="space-y-3">
                    {doctor.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <Award className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700 font-medium text-sm">{cert.name}</p>
                          {cert.issuer && (
                            <p className="text-gray-500 text-xs">{cert.issuer}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Trainings */}
              {doctor.trainings.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gray-600" />
                    Additional Training
                  </h3>
                  <ul className="space-y-2">
                    {doctor.trainings.map((training, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{training.name}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Languages */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-600" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Professional Memberships */}
              {doctor.memberships && doctor.memberships.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-600" />
                    Professional Memberships
                  </h3>
                  <div className="space-y-3">
                    {doctor.memberships.map((membership, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-xl">
                        <p className="font-medium text-gray-800 text-sm">{membership.organization}</p>
                        {membership.since && (
                          <p className="text-xs text-gray-500">Since {membership.since}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className={`bg-gradient-to-br ${doctorColor} rounded-2xl p-6 text-white shadow-lg`}
              >
                <h3 className="font-bold text-lg mb-2">Get in Touch</h3>
                <p className="text-white/80 text-sm mb-4">
                  Connect with us through our social channels or podcast.
                </p>
                <Link 
                  href="/#contact" 
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container-custom text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Logo className="w-8 h-8" />
            <span className="font-heading font-bold text-gray-900">
              እነሆ<span className="text-primary-500"> እኛ</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} እነሆ እኛ (Eneho Egna). All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
