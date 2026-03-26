'use client'

import { useState, useEffect } from 'react'
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
  ChevronDown,
  Inbox,
  RefreshCw,
  Send
} from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [sendingReply, setSendingReply] = useState(false)
  const [replyStatus, setReplyStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'unread' && !msg.read) || 
      (filterStatus === 'read' && msg.read)
    return matchesSearch && matchesFilter
  })

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAsRead: true })
      })
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ))
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' })
      setMessages(messages.filter(msg => msg.id !== id))
      setShowDeleteConfirm(null)
      if (selectedMessage?.id === id) setSelectedMessage(null)
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return
    
    setSendingReply(true)
    setReplyStatus(null)
    
    try {
      const res = await fetch(`/api/messages/${selectedMessage.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedMessage.email,
          subject: selectedMessage.subject,
          replyText: replyText,
          originalMessage: selectedMessage.message
        })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setReplyStatus({ type: 'success', message: 'Reply sent successfully!' })
        setTimeout(() => {
          setIsReplying(false)
          setReplyText('')
          setReplyStatus(null)
        }, 2000)
      } else {
        setReplyStatus({ type: 'error', message: data.error || 'Failed to send reply' })
      }
    } catch (error) {
      setReplyStatus({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setSendingReply(false)
    }
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
            onClick={() => {
              setSelectedMessage(null)
              setIsReplying(false)
              setReplyText('')
              setReplyStatus(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-lg font-semibold text-gray-900">Message Details</h2>
                <button
                  onClick={() => {
                    setSelectedMessage(null)
                    setIsReplying(false)
                    setReplyText('')
                    setReplyStatus(null)
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{selectedMessage.name}</h3>
                      <p className="text-primary-600 font-medium">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedMessage.date)}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2">Subject</h4>
                  <p className="text-gray-800 font-medium">{selectedMessage.subject}</p>
                  
                  <h4 className="font-semibold text-gray-900 mt-4 mb-2 border-b border-gray-200 pb-2">Message</h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                </div>

                {/* Reply UI */}
                {isReplying && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 border border-primary-100 bg-primary-50/30 rounded-xl p-5"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary-500" /> 
                      Reply to {selectedMessage.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                      This will securely send an email from <strong>enehoegna@gmail.com</strong> directly to <strong>{selectedMessage.email}</strong>.
                    </p>
                    
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={5}
                      disabled={sendingReply}
                      placeholder="Type your official response here..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 resize-none text-gray-700 mb-3 shadow-sm bg-white"
                    />
                    
                    {replyStatus && (
                      <div className={`text-sm p-3 rounded-lg mb-3 flex items-center gap-2 font-medium ${
                        replyStatus.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {replyStatus.message}
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <button
                        onClick={sendReply}
                        disabled={sendingReply || !replyText.trim()}
                        className="flex-[2] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-sm"
                      >
                        {sendingReply ? (
                          <><RefreshCw className="w-5 h-5 animate-spin" /> Sending securely...</>
                        ) : (
                          <><Send className="w-5 h-5" /> Send Reply via Email</>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsReplying(false)
                          setReplyText('')
                          setReplyStatus(null)
                        }}
                        className="flex-1 px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium text-gray-700 shadow-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Footer Actions */}
              {!isReplying && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 sticky bottom-0">
                  <button
                    onClick={() => setIsReplying(true)}
                    className="flex-[2] inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-600 font-medium text-white rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                  >
                    <Mail className="w-5 h-5" />
                    Write Reply
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap"
                    title="Open in your local email app (Outlook/Apple Mail)"
                  >
                    Open Mail App
                  </a>
                  <button
                    onClick={() => setShowDeleteConfirm(selectedMessage.id)}
                    className="px-5 py-3 text-red-600 border-2 border-red-100 bg-red-50 rounded-xl hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm"
                    title="Delete Message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
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
                  onClick={() => showDeleteConfirm && deleteMessage(showDeleteConfirm)}
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
