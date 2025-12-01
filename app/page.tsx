'use client'

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
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Play,
  Award,
  BookOpen,
  Activity,
  Globe,
  Send
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerContainer, StaggerItem, HoverScale } from '@/components/Animations'
import ContactForm from '@/components/ContactForm'
import PodcastEpisodes from '@/components/PodcastEpisodes'

// Navigation Component
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2">
            <Logo className="w-10 h-10" />
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-xl text-gray-900">
                እነሆ<span className="text-primary-500"> እኛ</span>
              </span>
              <span className="text-[9px] text-gray-400 tracking-wider">ENEHO EGNA</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-primary-500 transition-colors">About</a>
            <a href="#team" className="text-gray-600 hover:text-primary-500 transition-colors">Our Team</a>
            <a href="#impact" className="text-gray-600 hover:text-primary-500 transition-colors">Impact</a>
            <a href="#podcast" className="text-gray-600 hover:text-primary-500 transition-colors">Podcast</a>
            <a href="#contact" className="btn-primary text-sm">Contact Us</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
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
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient Overlay - seamless blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-800/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/50 to-transparent"></div>
      </motion.div>
      
      <div className="container-custom relative z-10 pb-16 pt-32">
        <div className="max-w-2xl">
          <div className="text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Mic className="w-4 h-4" />
              <span className="text-sm font-medium">Health Media & Community Wellness</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Empowering Health,
              <br />
              <span className="text-secondary-300">One Story at a Time</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-xl"
            >
              A collective of dedicated Ethiopian physicians bringing evidence-based health education, 
              community outreach, and medical expertise through modern media.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#podcast" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-secondary-100 hover:scale-105 transition-all">
                <Play className="w-5 h-5" />
                Listen to Podcast
              </a>
              <a href="#team" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 hover:scale-105 transition-all border border-white/30">
                Meet the Team
                <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold">55K+</div>
                <div className="text-white/70 text-sm">Social Followers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">8+</div>
                <div className="text-white/70 text-sm">Training Programs</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">3</div>
                <div className="text-white/70 text-sm">Expert Physicians</div>
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
  return (
    <section id="about" className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInLeft>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="gradient-text">Eneho-Egna</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Eneho-Egna (meaning &quot;For Us&quot; in Amharic) is more than a medical team — 
              we are a movement dedicated to making healthcare knowledge accessible to everyone.
            </p>
            <p className="text-gray-600 mb-6">
              Founded by three passionate physicians, we combine clinical expertise with modern media 
              to educate, inspire, and serve our community. From our popular podcast to free medical 
              screenings, we believe health education is a fundamental right.
            </p>
            
            <StaggerContainer className="grid grid-cols-2 gap-4">
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Health Education</h4>
                    <p className="text-sm text-gray-500">Evidence-based content</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Community Care</h4>
                    <p className="text-sm text-gray-500">Free medical services</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Mic className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Media Presence</h4>
                    <p className="text-sm text-gray-500">Podcast & documentaries</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Training</h4>
                    <p className="text-sm text-gray-500">Workshops & seminars</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </FadeInLeft>
          
          <FadeInRight>
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="font-heading font-bold text-xl mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To bridge the gap between medical expertise and public understanding through 
                accessible, engaging, and trustworthy health communication.
              </p>
              <div className="h-px bg-secondary-200 mb-6"></div>
              <h3 className="font-heading font-bold text-xl mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A healthier Ethiopia where every individual has access to quality health 
                information and preventive care, regardless of location or background.
              </p>
            </div>
          </FadeInRight>
        </div>
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
      role: "Co-Founder & Co-host",
      specialties: ["Public Health", "AI in Medicine", "Research", "Reproductive Health"],
      education: [
        "MD - Yekatit 12 Hospital Medical College",
        "MPH - Addis Ababa University",
        "BSc Public Health - University of Gondar"
      ],
      certifications: [
        "Disability Inclusion in Humanitarian Coordination",
        "Mental Health & Psychosocial Support",
        "Risk Communication & Community Engagement"
      ],
      experience: "EPHI COVID-19 Response, World Bank GBV Project, AMREF Research",
      image: null
    },
    {
      id: "dr-tigist",
      name: "Dr. Tigist Kahsay",
      credentials: "MD",
      role: "Co-Founder & Co-host",
      specialties: ["Emergency Medicine", "Dialysis Care", "Telemedicine", "TB/HIV Care"],
      education: [
        "MD - Jimma University Medical College"
      ],
      certifications: [
        "Guideline-Based Hemodialysis (Ethiopian Kidney Association)",
        "National Comprehensive TBL and TB/HIV",
        "Virtual Assistants (ALX Africa)"
      ],
      experience: "Girum Hospital (ER & Dialysis), St Urael Internal Medicine Specialty Clinic",
      image: null
    },
    {
      id: "dr-birucketawit",
      name: "Dr. Birucketawit Alebachew",
      credentials: "MD, BSc",
      role: "Co-Founder & Co-host",
      specialties: ["Public Health", "Quality Control", "Project Management", "Healthcare Delivery"],
      education: [
        "MD - Yirgalem Hospital Medical College",
        "BSc Public Health - University of Gondar"
      ],
      certifications: [
        "Project Management (Addis Ababa University)",
        "Effective Teaching Skills (Pioneer College CPD Center)",
        "Video Editing (Donkey Tube)"
      ],
      experience: "Kotebe Health Center (General Practitioner), Pioneer College (Graduate Assistant), FMHACA (Quality Control Officer)",
      image: null
    }
  ]

  return (
    <section id="team" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Three dedicated physicians combining clinical expertise with a passion for health education 
            and community service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index} 
              className={`card hover:shadow-xl transition-shadow duration-300 flex flex-col h-full ${doctor.placeholder ? 'opacity-60' : ''}`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${doctor.placeholder ? 'bg-secondary-200' : 'gradient-bg'}`}>
                  {doctor.placeholder ? (
                    <Users className="w-12 h-12 text-gray-400" />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      {doctor.name.split(' ')[1]?.[0] || 'D'}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                {doctor.credentials && (
                  <p className="text-primary-500 font-medium">{doctor.credentials}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">{doctor.role}</p>
              </div>
              
              {/* Content wrapper for flex grow */}
              <div className="flex-grow">
                {/* Specialties */}
                {!doctor.placeholder && (
                  <>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specialties.map((specialty, i) => (
                          <span key={i} className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Education</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {doctor.education.map((edu, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <GraduationCap className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Experience</h4>
                      <p className="text-sm text-gray-600">{doctor.experience}</p>
                    </div>
                  </>
                )}
                
                {doctor.placeholder && (
                  <p className="text-center text-gray-400 text-sm">
                    Profile details will be updated shortly
                  </p>
                )}
              </div>
              
              {/* Button always at bottom */}
              {!doctor.placeholder && doctor.id && (
                <Link 
                  href={`/team/${doctor.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  View Full Profile
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Impact Section
function ImpactSection() {
  const socialStats = [
    { platform: "YouTube", count: "21K+", label: "Subscribers" },
    { platform: "TikTok", count: "34.2K", label: "Followers" },
    { platform: "LinkedIn", count: "1K+", label: "Followers" },
    { platform: "Facebook", count: "700+", label: "Followers" }
  ]

  const impactCategories = [
    {
      title: "Health Training Programs",
      icon: <GraduationCap className="w-6 h-6" />,
      stats: "9 Trainings",
      items: [
        "8 Menstrual Health & Hygiene trainings with Yeti Pads at government schools & YWCA",
        "1 Cervical & Breast Cancer awareness training at EFDRE Custom Commission"
      ]
    },
    {
      title: "Free Medical Services",
      icon: <Heart className="w-6 h-6" />,
      stats: "3 Campaigns",
      items: [
        "Breast cancer screening at EFDRE Custom Commission",
        "General medical checkup at Ummi Orphans Charity",
        "General medical checkup at Yewedekutin Ansu Charity"
      ]
    },
    {
      title: "Free Media Coverage",
      icon: <Mic className="w-6 h-6" />,
      stats: "4 Programs",
      items: [
        "World Spinal Bifida & Hydrocephalus Day Campaign with HOPE-SBH",
        "Holiday programs with Mathiwos Wondu Ethiopian Cancer Society",
        "Coverage at Hope Oncology Center",
        "Coverage at Ummi Orphans Charity"
      ]
    },
    {
      title: "Medical Documentaries",
      icon: <Play className="w-6 h-6" />,
      stats: "2 Films",
      items: [
        "BOSAD Project: Traditional Bone Setting for Musculoskeletal Injury",
        "Produced in Somali & Afan Oromoo languages"
      ]
    }
  ]

  const partners = [
    "EFDRE Custom Commission",
    "Yeti Pads",
    "YWCA Ethiopia",
    "HOPE-SBH",
    "Mathiwos Wondu Ethiopian Cancer Society",
    "Hope Oncology Center",
    "Ummi Orphans Charity & Development Institute",
    "Yewedekutin Ansu Charity Association",
    "BOSAD Project"
  ]

  return (
    <section id="impact" className="section-padding gradient-bg text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our Impact
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto">
            Beyond the podcast, we&apos;re actively serving communities through training, 
            free medical services, media coverage, and health campaigns.
          </p>
        </div>

        {/* Social Media Reach */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Social Media Reach</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.count}</div>
                <div className="text-primary-200 text-sm">{stat.platform} {stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-2xl font-bold">57K+</span>
            <span className="text-primary-200 ml-2">Total Combined Followers</span>
          </div>
        </div>
        
        {/* Impact Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {impactCategories.map((category, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{category.title}</h3>
                  <span className="text-primary-300 text-sm">{category.stats}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-primary-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-300 mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Partners */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Partner Organizations</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((partner, index) => (
              <span key={index} className="bg-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Certificates Section
function CertificatesSection() {
  const certificates = [
    {
      image: "/certificates/cert1.jpg",
      title: "Appreciation Certificate",
      issuer: "Bole Sub City Wereda 12 Primary School",
      year: "2017",
      description: "Recognition for health education contributions"
    },
    {
      image: "/certificates/cert2.jpg",
      title: "Certificate of Appreciation",
      issuer: "Addis Ababa City Administration Gullele Sub-city Teachers Association",
      year: "2017",
      description: "For Eneho Egna health awareness training"
    },
    {
      image: "/certificates/cert3.jpg",
      title: "Certificate of Appreciation",
      issuer: "EFDR Customs Commission",
      year: "2017",
      description: "For Eneho Egna Medical Podcast health education"
    },
    {
      image: "/certificates/cert4.jpg",
      title: "Certificate of Appreciation",
      issuer: "Yeti Pads",
      year: "2017",
      description: "For Eneho-Egna Podcast menstrual health awareness"
    }
  ]

  return (
    <section id="certificates" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recognition & <span className="gradient-text">Certificates</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our work has been recognized by various organizations for making a positive impact 
            on community health education.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <div key={index} className="card group hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Certificate Image */}
              <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden bg-secondary-100">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                  <Award className="w-12 h-12 text-primary-500" />
                </div>
              </div>
              
              {/* Certificate Info */}
              <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
              <p className="text-primary-600 text-sm font-medium mb-2">{cert.issuer}</p>
              <p className="text-gray-500 text-sm">{cert.description}</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">{cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Health Podcast",
      description: "Weekly episodes covering health topics in accessible Amharic, making medical knowledge available to everyone."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Training & Workshops",
      description: "Capacity building on menstrual health, cancer awareness, and reproductive health for schools and organizations."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community Health Services",
      description: "Free medical checkups, cancer screenings, and health consultations in underserved communities."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Medical Consultation",
      description: "Professional medical advice and telemedicine services from experienced physicians."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Health Content Creation",
      description: "Educational videos, documentaries, and social media content on critical health issues."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Research & Advocacy",
      description: "Contributing to public health research and advocating for better healthcare policies."
    }
  ]

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From podcasting to community outreach, we offer a range of services aimed at 
            improving health literacy and access to care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Podcast Section
function PodcastSection() {
  return (
    <section id="podcast" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <FadeInUp className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 rounded-full px-4 py-2 mb-6">
            <Mic className="w-4 h-4" />
            <span className="text-sm font-medium">Now Streaming</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Eneho-Egna <span className="gradient-text">Podcast</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us every week as we break down complex medical topics into easy-to-understand 
            conversations. From mental health to chronic diseases, we cover it all — in Amharic.
          </p>
        </FadeInUp>

        {/* Social Links */}
        <FadeInUp delay={0.2} className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.a whileHover={{ scale: 1.05 }} href="https://www.youtube.com/@Eneho_Hakim" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
            <Youtube className="w-5 h-5" />
            YouTube (21K+)
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="https://t.me/Eneho_Tena" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0088cc] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#006699] transition-colors">
            <Send className="w-5 h-5" />
            Telegram
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="https://www.tiktok.com/@eneho_egna" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            TikTok (34K+)
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="https://www.linkedin.com/company/eneho-egna-እነሆ-እኛ-podcast" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0077b5] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#005885] transition-colors">
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="https://web.facebook.com/profile.php?id=61566388200183" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1877f2] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#0d65d9] transition-colors">
            <Facebook className="w-5 h-5" />
            Facebook
          </motion.a>
        </FadeInUp>

        {/* Latest Episodes */}
        <FadeInUp delay={0.3}>
          <h3 className="text-2xl font-bold mb-6 text-center">Latest Episodes</h3>
          <PodcastEpisodes />
        </FadeInUp>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          <FadeInLeft>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Get in Touch
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Have questions? Want to collaborate? Interested in booking us for a training or event? 
              We&apos;d love to hear from you.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">enehoegna@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="font-medium">+251 91 XXX XXXX</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-medium">Addis Ababa, Ethiopia</p>
                </div>
              </motion.div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.youtube.com/@Eneho_Hakim" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition-colors" title="YouTube">
                <Youtube className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://t.me/Eneho_Tena" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0088cc] transition-colors" title="Telegram">
                <Send className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.tiktok.com/@eneho_egna" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black transition-colors" title="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.linkedin.com/company/eneho-egna-እነሆ-እኛ-podcast" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077b5] transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://web.facebook.com/profile.php?id=61566388200183" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877f2] transition-colors" title="Facebook">
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </FadeInLeft>
          
          {/* Contact Form */}
          <FadeInRight>
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-white">Send us a message</h3>
              <ContactForm />
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
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
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
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
