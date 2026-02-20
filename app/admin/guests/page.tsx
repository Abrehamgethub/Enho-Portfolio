'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Plus, Trash2, Edit2, Star, StarOff, ExternalLink, 
  Upload, X, Save, Calendar, Briefcase
} from 'lucide-react'

interface Guest {
  _id: string
  name: string
  nameAmharic?: string
  title: string
  profession: string
  photo?: string
  photos?: string[]
  description: string
  episodeUrl: string
  episodeDate?: string
  programName?: string
  featured: boolean
  order: number
}

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }
  return null
}

function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return null
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    nameAmharic: '',
    title: '',
    profession: '',
    photo: '',
    photos: [] as string[],
    description: '',
    episodeUrl: '',
    episodeDate: '',
    programName: '',
    featured: false
  })
  const [newPhotoUrl, setNewPhotoUrl] = useState('')

  useEffect(() => {
    fetchGuests()
  }, [])

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      const url = editingGuest ? `/api/guests/${editingGuest._id}` : '/api/guests'
      const method = editingGuest ? 'PATCH' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setMessage({ type: 'success', text: editingGuest ? 'Guest updated!' : 'Guest added!' })
        resetForm()
        fetchGuests()
      } else {
        setMessage({ type: 'error', text: 'Failed to save guest' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving guest' })
    }
    
    setTimeout(() => setMessage(null), 3000)
  }

  async function deleteGuest(id: string) {
    if (!confirm('Are you sure you want to delete this guest?')) return
    
    try {
      await fetch(`/api/guests/${id}`, { method: 'DELETE' })
      setMessage({ type: 'success', text: 'Guest deleted' })
      fetchGuests()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete' })
    }
    
    setTimeout(() => setMessage(null), 3000)
  }

  async function toggleFeatured(guest: Guest) {
    try {
      await fetch(`/api/guests/${guest._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !guest.featured })
      })
      fetchGuests()
    } catch (error) {
      console.error('Failed to toggle featured:', error)
    }
  }

  function editGuest(guest: Guest) {
    setEditingGuest(guest)
    setFormData({
      name: guest.name,
      nameAmharic: guest.nameAmharic || '',
      title: guest.title,
      profession: guest.profession,
      photo: guest.photo || '',
      photos: guest.photos || [],
      description: guest.description,
      episodeUrl: guest.episodeUrl,
      episodeDate: guest.episodeDate ? guest.episodeDate.split('T')[0] : '',
      programName: guest.programName || '',
      featured: guest.featured
    })
    setNewPhotoUrl('')
    setShowForm(true)
  }

  function resetForm() {
    setFormData({
      name: '',
      nameAmharic: '',
      title: '',
      profession: '',
      photo: '',
      photos: [],
      description: '',
      episodeUrl: '',
      episodeDate: '',
      programName: '',
      featured: false
    })
    setNewPhotoUrl('')
    setEditingGuest(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Previous Guests</h1>
          <p className="text-gray-600">Manage guests who have appeared on your channel</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Guest
        </button>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {editingGuest ? 'Edit Guest' : 'Add New Guest'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (Amharic)</label>
                  <input
                    type="text"
                    value={formData.nameAmharic}
                    onChange={(e) => setFormData({ ...formData, nameAmharic: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (Dr., Prof., etc.)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Dr., Prof., Mr., Ms."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Cardiologist, Health Expert"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Optional. If empty, the episode thumbnail will be used automatically.</p>
                {formData.photo && (
                  <img src={formData.photo} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Brief description about the guest and their expertise..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Episode URL (YouTube)</label>
                  <input
                    type="url"
                    value={formData.episodeUrl}
                    onChange={(e) => setFormData({ ...formData, episodeUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://youtube.com/watch?v=..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Episode Date</label>
                  <input
                    type="date"
                    value={formData.episodeDate}
                    onChange={(e) => setFormData({ ...formData, episodeDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                <input
                  type="text"
                  value={formData.programName}
                  onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Health Talk, Special Interview"
                />
              </div>

              {/* Gallery Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Photos (optional)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter photo URL and click Add"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newPhotoUrl.trim()) {
                        setFormData({ ...formData, photos: [...formData.photos, newPhotoUrl.trim()] })
                        setNewPhotoUrl('')
                      }
                    }}
                    className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200"
                  >
                    Add
                  </button>
                </div>
                {formData.photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img src={photo} alt={`Gallery ${index + 1}`} className="w-16 h-16 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, photos: formData.photos.filter((_, i) => i !== index) })
                          }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured Guest (show prominently)</label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4" />
                  {editingGuest ? 'Update' : 'Save'} Guest
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guests Grid */}
      {guests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No guests yet</h3>
          <p className="text-gray-500 mb-4">Add your previous guests to showcase them</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add First Guest
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guests.map((guest) => (
            <motion.div
              key={guest._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                {(() => {
                  const thumbnail = guest.episodeUrl ? getYouTubeThumbnail(guest.episodeUrl) : null
                  const imageSrc = (guest.photo || '').trim() || thumbnail || '/logo.png'
                  return (
                <img
                  src={imageSrc}
                  alt={guest.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    if (target.src.endsWith('/logo.png')) return
                    target.src = '/logo.png'
                  }}
                />
                  )
                })()}
                {guest.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {guest.title} {guest.name}
                    </h3>
                    {guest.nameAmharic && (
                      <p className="text-gray-600 text-sm">{guest.nameAmharic}</p>
                    )}
                  </div>
                </div>
                
                <p className="text-indigo-600 text-sm font-medium mt-1">{guest.profession}</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{guest.description}</p>
                
                {guest.episodeDate && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(guest.episodeDate).toLocaleDateString()}
                  </div>
                )}
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <button
                    onClick={() => toggleFeatured(guest)}
                    className={`p-2 rounded-lg ${guest.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}
                    title={guest.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    {guest.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => editGuest(guest)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {guest.episodeUrl && (
                    <a
                      href={guest.episodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => deleteGuest(guest._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
