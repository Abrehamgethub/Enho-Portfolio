'use client'

import Link from 'next/link'
import { 
  ArrowLeft, 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen,
  Heart,
  Globe,
  Mail,
  ChevronRight,
  Stethoscope,
  Users
} from 'lucide-react'
import { Doctor } from '@/lib/doctors-data'
import { Logo } from '@/components/Logo'

interface DoctorProfileProps {
  doctor: Doctor
}

export default function DoctorProfile({ doctor }: DoctorProfileProps) {
  return (
    <main className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
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
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
              <span className="text-6xl md:text-7xl font-bold">
                {doctor.name.split(' ')[1]?.[0] || 'D'}
              </span>
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {doctor.name}
              </h1>
              <p className="text-primary-200 text-xl mb-2">{doctor.credentials}</p>
              <p className="text-white/90 text-lg mb-4">{doctor.tagline}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {doctor.specialties.slice(0, 4).map((specialty, i) => (
                  <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  About
                </h2>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {doctor.experience.map((exp, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-primary-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-500"></div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-primary-600 font-medium">{exp.organization}</p>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">
                        {exp.period} {exp.location && `• ${exp.location}`}
                      </p>
                      {exp.responsibilities && (
                        <ul className="space-y-1">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  Education
                </h2>
                <div className="space-y-4">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-secondary-50 rounded-xl">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="text-primary-600">{edu.institution}</p>
                        {edu.year && <p className="text-gray-500 text-sm">{edu.year}</p>}
                        {edu.details && <p className="text-gray-500 text-sm">{edu.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteer Work */}
              {doctor.volunteerWork.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    Volunteer & Community Work
                  </h2>
                  <div className="space-y-4">
                    {doctor.volunteerWork.map((work, index) => (
                      <div key={index} className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                        <h3 className="font-bold text-primary-700">{work.role}</h3>
                        <p className="text-primary-600 font-medium">{work.organization}</p>
                        {work.period && <p className="text-gray-500 text-sm">{work.period}</p>}
                        {work.description && (
                          <p className="text-gray-600 text-sm mt-2">{work.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary-500" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.skills.map((skill, i) => (
                    <span key={i} className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {doctor.certifications.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-500" />
                    Certifications
                  </h3>
                  <ul className="space-y-3">
                    {doctor.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700 font-medium text-sm">{cert.name}</p>
                          {cert.issuer && (
                            <p className="text-gray-500 text-xs">{cert.issuer}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trainings */}
              {doctor.trainings.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary-500" />
                    Additional Training
                  </h3>
                  <ul className="space-y-2">
                    {doctor.trainings.map((training, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{training.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-500" />
                  Languages
                </h3>
                <div className="space-y-2">
                  {doctor.languages.map((lang, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      <span className="text-gray-600">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Memberships */}
              {doctor.memberships && doctor.memberships.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-500" />
                    Professional Memberships
                  </h3>
                  <div className="space-y-3">
                    {doctor.memberships.map((membership, i) => (
                      <div key={i} className="p-3 bg-secondary-50 rounded-lg">
                        <p className="font-medium text-gray-800">{membership.organization}</p>
                        {membership.since && (
                          <p className="text-sm text-gray-500">Since {membership.since}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Get in Touch</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Connect with us through our social channels or podcast.
                </p>
                <Link 
                  href="/#contact" 
                  className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container-custom text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} እነሆ እኛ (Eneho Egna). All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
