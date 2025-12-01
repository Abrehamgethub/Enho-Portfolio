'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  X,
  Save,
  GraduationCap,
  Briefcase,
  Award,
  Image as ImageIcon
} from 'lucide-react'

const initialTeam = [
  {
    id: 'dr-melat',
    name: 'Dr. Melat Mesfin',
    credentials: 'MD, MPH',
    role: 'Co-Founder & Co-host',
    specialties: ['Public Health', 'AI in Medicine', 'Research', 'Reproductive Health'],
    education: ['MD - Yekatit 12 Hospital Medical College', 'MPH - Addis Ababa University', 'BSc Public Health - University of Gondar'],
    experience: 'EPHI COVID-19 Response, World Bank GBV Project, AMREF Research',
    image: null
  },
  {
    id: 'dr-tigist',
    name: 'Dr. Tigist Kahsay',
    credentials: 'MD',
    role: 'Co-Founder & Co-host',
    specialties: ['Emergency Medicine', 'Dialysis Care', 'Telemedicine', 'TB/HIV Care'],
    education: ['MD - Jimma University Medical College'],
    experience: 'Girum Hospital (ER & Dialysis), St Urael Internal Medicine Specialty Clinic',
    image: '/dr-tigist.jpg'
  },
  {
    id: 'dr-birucketawit',
    name: 'Dr. Birucketawit Alebachew',
    credentials: 'MD, BSc',
    role: 'Co-Founder & Co-host',
    specialties: ['Public Health', 'Quality Control', 'Project Management', 'Healthcare Delivery'],
    education: ['MD - Yirgalem Hospital Medical College', 'BSc Public Health - University of Gondar'],
    experience: 'Kotebe Health Center, Pioneer College, FMHACA Quality Control',
    image: null
  }
]

type TeamMember = typeof initialTeam[0]

export default function TeamPage() {
  const [team, setTeam] = useState(initialTeam)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const emptyMember: TeamMember = {
    id: '',
    name: '',
    credentials: '',
    role: '',
    specialties: [],
    education: [],
    experience: '',
    image: null
  }

  const [formData, setFormData] = useState<TeamMember>(emptyMember)
  const [specialtiesInput, setSpecialtiesInput] = useState('')
  const [educationInput, setEducationInput] = useState('')

  const openEditor = (member?: TeamMember) => {
    if (member) {
      setFormData(member)
      setSpecialtiesInput(member.specialties.join(', '))
      setEducationInput(member.education.join('\n'))
      setEditingMember(member)
      setIsAdding(false)
    } else {
      setFormData({ ...emptyMember, id: `dr-${Date.now()}` })
      setSpecialtiesInput('')
      setEducationInput('')
      setEditingMember(null)
      setIsAdding(true)
    }
  }

  const closeEditor = () => {
    setEditingMember(null)
    setIsAdding(false)
    setFormData(emptyMember)
  }

  const saveMember = () => {
    const updatedMember = {
      ...formData,
      specialties: specialtiesInput.split(',').map(s => s.trim()).filter(Boolean),
      education: educationInput.split('\n').map(s => s.trim()).filter(Boolean)
    }

    if (isAdding) {
      setTeam([...team, updatedMember])
    } else {
      setTeam(team.map(m => m.id === updatedMember.id ? updatedMember : m))
    }
    closeEditor()
  }

  const deleteMember = (id: string) => {
    setTeam(team.filter(m => m.id !== id))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-500 mt-1">Manage doctor profiles displayed on the website</p>
        </div>
        <button
          onClick={() => openEditor()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <motion.div
            key={member.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Avatar */}
            <div className="h-32 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white">
                  {member.name.split(' ')[1]?.[0] || 'D'}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-primary-500 text-sm">{member.credentials}</p>
              <p className="text-gray-500 text-sm">{member.role}</p>

              <div className="mt-4 flex flex-wrap gap-1">
                {member.specialties.slice(0, 3).map((specialty, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
                {member.specialties.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{member.specialties.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => openEditor(member)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(member.id)}
                  className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {(editingMember || isAdding) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeEditor}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-lg font-semibold text-gray-900">
                  {isAdding ? 'Add Team Member' : 'Edit Team Member'}
                </h2>
                <button onClick={closeEditor} className="p-2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Dr. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Credentials</label>
                    <input
                      type="text"
                      value={formData.credentials}
                      onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="MD, MPH"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Co-Founder & Co-host"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-1" />
                    Specialties (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={specialtiesInput}
                    onChange={(e) => setSpecialtiesInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Public Health, Emergency Medicine, Research"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Award className="w-4 h-4 inline mr-1" />
                    Education (one per line)
                  </label>
                  <textarea
                    value={educationInput}
                    onChange={(e) => setEducationInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="MD - University Name&#10;MPH - University Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    Experience
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={2}
                    placeholder="Hospital Name (Role), Organization (Role)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="w-4 h-4 inline mr-1" />
                    Profile Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value || null })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="/dr-name.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Place image in /public folder and enter path like /dr-name.jpg</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
                <button
                  onClick={closeEditor}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveMember}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Team Member?</h3>
              <p className="text-gray-500 mb-6">
                This will remove the doctor from the website. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMember(showDeleteConfirm)}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
