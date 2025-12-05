'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Users, 
  Youtube, 
  TrendingUp,
  ExternalLink,
  Eye,
  Mail,
  Clock,
  ArrowUpRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

interface Stats {
  totalMessages: number
  unreadMessages: number
  totalTeam: number
  recentMessages: Message[]
}

const quickLinks = [
  { label: 'View Website', href: '/', icon: ExternalLink, color: 'from-blue-500 to-indigo-500' },
  { label: 'YouTube Channel', href: 'https://www.youtube.com/@Eneho_Hakim', icon: Youtube, color: 'from-red-500 to-orange-500' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { 
      label: 'Total Messages', 
      value: stats?.totalMessages || 0, 
      icon: MessageSquare, 
      color: 'from-green-500 to-emerald-500',
      href: '/admin/messages' 
    },
    { 
      label: 'Unread', 
      value: stats?.unreadMessages || 0, 
      icon: Mail, 
      color: 'from-blue-500 to-indigo-500',
      href: '/admin/messages' 
    },
    { 
      label: 'Team Members', 
      value: stats?.totalTeam || 3, 
      icon: Users, 
      color: 'from-purple-500 to-violet-500',
      href: '/admin/team' 
    },
    { 
      label: 'YouTube', 
      value: '21K+', 
      icon: Youtube, 
      color: 'from-red-500 to-orange-500',
      href: '/admin/podcast' 
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your website.</p>
        </div>
        <Link 
          href="/" 
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={stat.href}
              className="group block bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
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
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
            </div>
            <Link href="/admin/messages" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
              View all →
            </Link>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {stats.recentMessages.map((message) => (
                <Link 
                  key={message.id} 
                  href="/admin/messages"
                  className="block p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">{message.name}</h3>
                        {!message.read && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{message.email}</p>
                      <p className="text-sm text-gray-600 mt-1 truncate">{message.subject}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {formatDate(message.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500">No messages yet</p>
              <p className="text-sm text-gray-400 mt-1">Messages from your contact form will appear here</p>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${link.color}`}>
                    <link.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 ml-auto" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Status */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Website</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Contact Form</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Database</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Connected
                </span>
              </div>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">Pro Tip</h3>
            </div>
            <p className="text-primary-100 text-sm">
              Messages from your contact form are automatically saved. Check the Messages tab regularly to stay connected with your community!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
