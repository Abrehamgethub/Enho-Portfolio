'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit2,
  CheckCircle,
  AlertCircle,
  Video,
  Globe,
  Calendar,
  User,
  Play,
  Eye,
  Clock
} from 'lucide-react'

interface Documentary {
  _id?: string
  title: string
  description: string
  language: string
  duration: string
  releaseDate: string
  director: string
  producer: string
  thumbnailUrl: string
  videoUrl: string
  gallery: string[]
  topics: string[]
  featured: boolean
  views: number
  status: string
}

const LANGUAGES = ['Amharic', 'Oromiffa', 'Somali', 'Tigrinya', 'English']
const STATUSES = ['Production', 'Released', 'Coming Soon']

export default function DocumentariesPage() {
  const [documentaries, setDocumentaries] = useState<Documentary[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Documentary | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchDocumentaries()
  }, [])

  async function fetchDocumentaries() {
    try {
      const response = await fetch('/api/documentaries')
      if (response.ok) {
        const data = await response.json()
        setDocumentaries(data.documentaries || [])
      }
    } catch (error) {
      console.error('Failed to fetch documentaries:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(documentary: Documentary) {
    try {
      const method = documentary._id ? 'PUT' : 'POST'
      const response = await fetch('/api/documentaries', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(documentary)
      })
      
      if (response.ok) {
        setMessage({ type: 'success', text: `Documentary ${documentary._id ? 'updated' : 'created'} successfully!` })
        setShowForm(false)
        setEditing(null)
        fetchDocumentaries()
      } else {
        setMessage({ type: 'error', text: 'Failed to save documentary' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save documentary' })
    } finally {
      setTimeout(() => setMessage(null), 3000)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this documentary?')) return
    
    try {
      await fetch(`/api/documentaries?id=${id}`, { method: 'DELETE' })
      setMessage({ type: 'success', text: 'Documentary deleted' })
      fetchDocumentaries()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete' })
    }
  }

  function handleEdit(documentary: Documentary) {
    setEditing(documentary)
    setShowForm(true)
  }

  function handleNew() {
    setEditing({
      title: '',
      description: '',
      language: 'Amharic',
      duration: '',
      releaseDate: '',
      director: '',
      producer: '',
      thumbnailUrl: '',
      videoUrl: '',
      gallery: [],
      topics: [],
      featured: false,
      views: 0,
      status: 'Coming Soon'
    })
    setShowForm(true)
  }

  if (showForm && editing) {
    return <DocumentaryForm documentary={editing} onSave={handleSave} onCancel={() => setShowForm(false)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Documentaries</h1>
          <p className="text-gray-500 mt-1">Manage your health documentary films</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchDocumentaries}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Documentary
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </motion.div>
      )}

      {/* Documentaries List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading documentaries...
          </div>
        ) : documentaries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No documentaries yet. Create your first documentary!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documentaries.map((doc, index) => (
              <motion.div
                key={doc._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {doc.thumbnailUrl ? (
                      <img 
                        src={doc.thumbnailUrl} 
                        alt={doc.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Video className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      {doc.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Featured</span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === 'Released' ? 'bg-green-100 text-green-700' :
                        doc.status === 'Production' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{doc.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Globe className="w-4 h-4" />
                        {doc.language}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        {doc.duration}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <User className="w-4 h-4" />
                        {doc.director}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        {doc.views.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={doc.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Play className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc._id!)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Documentary Form Component
function DocumentaryForm({ 
  documentary, 
  onSave, 
  onCancel 
}: { 
  documentary: Documentary
  onSave: (documentary: Documentary) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState(documentary)
  const [saving, setSaving] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    onSave(formData)
  }

  function handleChange(field: keyof Documentary, value: any) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {documentary._id ? 'Edit Documentary' : 'New Documentary'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={formData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 45 minutes"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
            <input
              type="date"
              value={formData.releaseDate}
              onChange={(e) => handleChange('releaseDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
            <input
              type="text"
              value={formData.director}
              onChange={(e) => handleChange('director', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Producer</label>
            <input
              type="text"
              value={formData.producer}
              onChange={(e) => handleChange('producer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
          <input
            type="url"
            value={formData.thumbnailUrl}
            onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="https://..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
          <input
            type="url"
            value={formData.videoUrl}
            onChange={(e) => handleChange('videoUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="https://youtube.com/watch?v=..."
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured Documentary
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Documentary'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
