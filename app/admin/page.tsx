'use client'

import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Users, 
  Youtube, 
  TrendingUp,
  ExternalLink,
  Eye
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Messages', value: '12', icon: MessageSquare, color: 'bg-blue-500', href: '/admin/messages' },
  { label: 'Team Members', value: '3', icon: Users, color: 'bg-green-500', href: '/admin/team' },
  { label: 'YouTube Subscribers', value: '21K+', icon: Youtube, color: 'bg-red-500', href: '/admin/podcast' },
  { label: 'Site Visitors', value: '1.2K', icon: TrendingUp, color: 'bg-purple-500', href: '#' },
]

const recentMessages = [
  { id: 1, name: 'Abebe Kebede', email: 'abebe@example.com', subject: 'Collaboration Request', date: '2 hours ago' },
  { id: 2, name: 'Sara Hailu', email: 'sara@example.com', subject: 'Speaking Invitation', date: '5 hours ago' },
  { id: 3, name: 'Dawit Mekonnen', email: 'dawit@example.com', subject: 'General Inquiry', date: '1 day ago' },
]

const quickLinks = [
  { label: 'View Website', href: '/', icon: ExternalLink },
  { label: 'YouTube Channel', href: 'https://www.youtube.com/@Eneho_Hakim', icon: Youtube },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={stat.href}
              className="block bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm text-primary-500 hover:text-primary-600">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentMessages.map((message) => (
              <div key={message.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 truncate">{message.name}</h3>
                      <span className="text-xs text-gray-400">{message.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{message.email}</p>
                    <p className="text-sm text-gray-600 mt-1">{message.subject}</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links & Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <link.icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Platform Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Website</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Contact Form</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">YouTube API</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                  Configure
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
