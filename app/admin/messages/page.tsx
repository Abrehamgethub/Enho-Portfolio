'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  X,
  Mail,
  Calendar,
  User,
  ChevronDown
} from 'lucide-react'

// Sample messages data (in production, fetch from database)
const initialMessages = [
  { 
    id: 1, 
    name: 'Abebe Kebede', 
    email: 'abebe@example.com', 
    subject: 'Collaboration Request', 
    message: 'Hello, I am interested in collaborating with Eneho Egna for a health awareness campaign in our community. Would love to discuss this further.',
    date: '2024-11-30T10:30:00',
    read: false 
  },
  { 
    id: 2, 
    name: 'Sara Hailu', 
    email: 'sara@example.com', 
    subject: 'Speaking Invitation', 
    message: 'We are organizing a health summit in Addis Ababa next month and would be honored to have one of your doctors as a keynote speaker.',
    date: '2024-11-30T08:15:00',
    read: true 
  },
  { 
    id: 3, 
    name: 'Dawit Mekonnen', 
    email: 'dawit@example.com', 
    subject: 'General Inquiry', 
    message: 'I have been following your YouTube channel and would like to know more about your upcoming episodes and how I can support your work.',
    date: '2024-11-29T14:45:00',
    read: true 
  },
  { 
    id: 4, 
    name: 'Tigist Alemayehu', 
    email: 'tigist@example.com', 
    subject: 'Partnership Proposal', 
    message: 'Our organization is looking to partner with health educators. We believe Eneho Egna would be a perfect fit for our community health initiative.',
    date: '2024-11-28T09:00:00',
    read: false 
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'unread' && !msg.read) || 
      (filterStatus === 'read' && msg.read)
    return matchesSearch && matchesFilter
  })

  const markAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ))
  }

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id))
    setShowDeleteConfirm(null)
    if (selectedMessage?.id === id) setSelectedMessage(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 mt-1">Manage contact form submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {messages.filter(m => !m.read).length} unread
          </span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'unread' | 'read')}
            className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No messages found</h3>
            <p className="text-gray-500 mt-1">
              {searchQuery ? 'Try adjusting your search' : 'Messages will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !message.read ? 'bg-primary-50/50' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message)
                  markAsRead(message.id)
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!message.read && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      )}
                      <h3 className={`font-medium truncate ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.name}
                      </h3>
                      <span className="text-xs text-gray-400">{formatDate(message.date)}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{message.email}</p>
                    <p className={`text-sm mt-1 truncate ${!message.read ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedMessage(message)
                        markAsRead(message.id)
                      }}
                      className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeleteConfirm(message.id)
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Message Details</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedMessage.name}</h3>
                    <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedMessage.date)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Subject</h4>
                  <p className="text-gray-600">{selectedMessage.subject}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Reply via Email
                </a>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(selectedMessage.id)
                  }}
                  className="px-4 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Message?</h3>
              <p className="text-gray-500 mb-6">
                This action cannot be undone. The message will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMessage(showDeleteConfirm)}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
