'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/Animations'
import { 
  GraduationCap, 
  Users, 
  Clock, 
  MapPin, 
  Calendar,
  ChevronRight,
  ArrowRight
} from 'lucide-react'

interface Training {
  _id: string
  title: string
  description: string
  category: string
  targetAudience: string
  duration: string
  date: string
  location: string
  instructor: string
  imageUrl?: string
  featured: boolean
  status: string
}

export default function TrainingsSection() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrainings() {
      try {
        const response = await fetch('/api/trainings?featured=true')
        if (response.ok) {
          const data = await response.json()
          setTrainings(data.slice(0, 6)) // Show max 6 trainings
        }
      } catch (error) {
        console.error('Failed to fetch trainings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrainings()
  }, [])

  const featuredTrainings = trainings.filter(t => t.featured)
  const upcomingTrainings = trainings.filter(t => !t.featured && t.status === 'Upcoming')

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <FadeInUp className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Educational Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Health <span className="gradient-text">Training</span> Programs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join our comprehensive health education programs designed for schools, communities, 
            and healthcare professionals.
          </p>
        </FadeInUp>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-200 animate-pulse"></div>
            <p className="text-gray-500">Loading training programs...</p>
          </div>
        ) : (
          <>
            {/* Featured Trainings */}
            {featuredTrainings.length > 0 && (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredTrainings.map((training, index) => (
                  <StaggerItem key={training._id}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden h-full"
                    >
                      {/* Image */}
                      <div className="h-48 bg-gradient-to-br from-teal-400 to-cyan-500 relative">
                        {training.imageUrl ? (
                          <img 
                            src={training.imageUrl} 
                            alt={training.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <GraduationCap className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                            {training.category}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            training.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            training.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {training.status}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{training.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{training.description}</p>
                        
                        <div className="space-y-2 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{training.targetAudience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{training.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{training.location}</span>
                          </div>
                        </div>
                        
                        <button className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors">
                          Learn More
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {/* Upcoming Trainings */}
            {upcomingTrainings.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Programs</h3>
                <div className="space-y-4">
                  {upcomingTrainings.map((training, index) => (
                    <motion.div
                      key={training._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{training.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(training.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {training.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {training.location}
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
                        Register
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* No Trainings */}
            {trainings.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Training Programs Yet</h3>
                <p className="text-gray-600">We're preparing new training programs. Check back soon!</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
