'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Plus, Trash2, Edit2, Star, StarOff, ExternalLink, 
  X, Save, Calendar, Image as ImageIcon, Gift, Heart, Sparkles
} from 'lucide-react'

interface Sponsor {
  _id: string
  id?: string // Slug for identifier
  name: string
  nameAmharic?: string
  logo: string
  description: string
  website?: string
  programType: 'holiday' | 'regular' | 'charity' | 'special'
  programName: string
  programDate?: string
  episodeUrl?: string
  photos: string[]
  featured: boolean
  order: number
}

const PROGRAM_TYPES = [
  { id: 'holiday', name: 'Holiday Program', icon: Gift, color: 'bg-red-500' },
  { id: 'regular', name: 'Regular Program', icon: Building2, color: 'bg-blue-500' },
  { id: 'charity', name: 'Charity Program', icon: Heart, color: 'bg-pink-500' },
  { id: 'special', name: 'Special Event', icon: Sparkles, color: 'bg-purple-500' },
]

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [filterType, setFilterType] = useState('all')
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    nameAmharic: '',
    logo: '',
    description: '',
    website: '',
    programType: 'holiday' as 'holiday' | 'regular' | 'charity' | 'special',
    programName: '',
    programDate: '',
    episodeUrl: '',
    photos: [''],
    featured: false
  })

  useEffect(() => {
    fetchSponsors()
  }, [])

  async function fetchSponsors() {
    try {
      const response = await fetch('/api/sponsors')
      const data = await response.json()
      setSponsors(data.sponsors || [])
    } catch (error) {
      console.error('Failed to fetch sponsors:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      const url = editingSponsor ? `/api/sponsors/${editingSponsor._id}` : '/api/sponsors'
      const method = editingSponsor ? 'PATCH' : 'POST'
      
      const dataToSend = {
        ...formData,
        photos: formData.photos.filter(p => p.trim() !== '')
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })
      
      if (response.ok) {
        setMessage({ type: 'success', text: editingSponsor ? 'Sponsor updated!' : 'Sponsor added!' })
        resetForm()
        fetchSponsors()
      } else {
        setMessage({ type: 'error', text: 'Failed to save sponsor' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving sponsor' })
    }
    
    setTimeout(() => setMessage(null), 3000)
  }

  async function deleteSponsor(id: string) {
    if (!confirm('Are you sure you want to delete this sponsor?')) return
    
    try {
      await fetch(`/api/sponsors/${id}`, { method: 'DELETE' })
      setMessage({ type: 'success', text: 'Sponsor deleted' })
      fetchSponsors()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete' })
    }
    
    setTimeout(() => setMessage(null), 3000)
  }

  async function toggleFeatured(sponsor: Sponsor) {
    try {
      await fetch(`/api/sponsors/${sponsor._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !sponsor.featured })
      })
      fetchSponsors()
    } catch (error) {
      console.error('Failed to toggle featured:', error)
    }
  }

  function editSponsor(sponsor: Sponsor) {
    setEditingSponsor(sponsor)
    setFormData({
      id: sponsor.id || '',
      name: sponsor.name,
      nameAmharic: sponsor.nameAmharic || '',
      logo: sponsor.logo,
      description: sponsor.description,
      website: sponsor.website || '',
      programType: sponsor.programType,
      programName: sponsor.programName,
      programDate: sponsor.programDate ? sponsor.programDate.split('T')[0] : '',
      episodeUrl: sponsor.episodeUrl || '',
      photos: sponsor.photos.length > 0 ? sponsor.photos : [''],
      featured: sponsor.featured
    })
    setShowForm(true)
  }

  function resetForm() {
    setFormData({
      id: '',
      name: '',
      nameAmharic: '',
      logo: '',
      description: '',
      website: '',
      programType: 'holiday',
      programName: '',
      programDate: '',
      episodeUrl: '',
      photos: [''],
      featured: false
    })
    setEditingSponsor(null)
    setShowForm(false)
  }

  function addPhotoField() {
    setFormData({ ...formData, photos: [...formData.photos, ''] })
  }

  function updatePhoto(index: number, value: string) {
    const newPhotos = [...formData.photos]
    newPhotos[index] = value
    setFormData({ ...formData, photos: newPhotos })
  }

  function removePhoto(index: number) {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    setFormData({ ...formData, photos: newPhotos.length > 0 ? newPhotos : [''] })
  }

  const filteredSponsors = filterType === 'all' 
    ? sponsors 
    : sponsors.filter(s => s.programType === filterType)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners & Sponsors</h1>
          <p className="text-gray-600">Manage sponsors and collaborators for your programs</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {PROGRAM_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => setFilterType(type.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              filterType === type.id ? `${type.color} text-white` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <type.icon className="w-4 h-4" />
            {type.name}
          </button>
        ))}
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
                {editingSponsor ? 'Edit Partner' : 'Add New Partner/Sponsor'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID / Slug (e.g., sponsor-name)</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Lowercase, no spaces"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (Amharic)</label>
                  <input
                    type="text"
                    value={formData.nameAmharic}
                    onChange={(e) => setFormData({ ...formData, nameAmharic: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
                  <select
                    value={formData.programType}
                    onChange={(e) => setFormData({ ...formData, programType: e.target.value as any })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    {PROGRAM_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                  <input
                    type="text"
                    value={formData.programName}
                    onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Christmas Special 2024"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Date</label>
                  <input
                    type="date"
                    value={formData.programDate}
                    onChange={(e) => setFormData({ ...formData, programDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Episode URL <span className="text-gray-400 font-normal">(YouTube link)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.episodeUrl}
                    onChange={(e) => setFormData({ ...formData, episodeUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  rows={3}
                  placeholder="Describe the partnership and what was accomplished..."
                  required
                />
              </div>

              {/* Photo Gallery */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Photos (Gallery)
                </label>
                {formData.photos.map((photo, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={photo}
                      onChange={(e) => updatePhoto(index, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPhotoField}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                >
                  <Plus className="w-4 h-4" />
                  Add another photo
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured Partner (show prominently)</label>
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
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  <Save className="w-4 h-4" />
                  {editingSponsor ? 'Update' : 'Save'} Partner
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sponsors Grid */}
      {filteredSponsors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No partners yet</h3>
          <p className="text-gray-500 mb-4">Add sponsors and collaborators to showcase your partnerships</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add First Partner
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.map((sponsor) => {
            const programType = PROGRAM_TYPES.find(t => t.id === sponsor.programType)
            return (
              <motion.div
                key={sponsor._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-20 object-contain"
                  />
                  {sponsor.featured && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 ${programType?.color} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                    {programType?.name}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{sponsor.name}</h3>
                  {sponsor.nameAmharic && (
                    <p className="text-gray-600 text-sm">{sponsor.nameAmharic}</p>
                  )}
                  
                  <p className="text-red-600 text-sm font-medium mt-1">{sponsor.programName}</p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{sponsor.description}</p>
                  
                  {sponsor.programDate && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(sponsor.programDate).toLocaleDateString()}
                    </div>
                  )}
                  
                  {sponsor.photos.length > 0 && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <ImageIcon className="w-3 h-3" />
                      {sponsor.photos.length} photos
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <button
                      onClick={() => toggleFeatured(sponsor)}
                      className={`p-2 rounded-lg ${sponsor.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}
                      title={sponsor.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      {sponsor.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => editSponsor(sponsor)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {sponsor.website && (
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => deleteSponsor(sponsor._id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
