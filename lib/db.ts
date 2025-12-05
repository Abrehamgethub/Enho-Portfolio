// Database utility with MongoDB support
// Falls back to in-memory storage if MONGODB_URI is not set

import connectDB from './mongodb'
import MessageModel, { IMessage } from './models/Message'

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export interface TeamMember {
  id: string
  name: string
  credentials: string
  role: string
  tagline: string
  specialties: string[]
  image: string | null
  color: string
}

// In-memory fallback storage
let inMemoryMessages: Message[] = []
let teamMembers: TeamMember[] = [
  {
    id: 'dr-melat',
    name: 'Dr. Melat Mesfin',
    credentials: 'MD, MPH',
    role: 'The Researcher',
    tagline: 'Bringing AI and public health together',
    specialties: ['Public Health', 'AI in Medicine', 'Research'],
    image: null,
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'dr-tigist',
    name: 'Dr. Tigist Kahsay',
    credentials: 'MD',
    role: 'The Healer',
    tagline: 'From ER to community health champion',
    specialties: ['Emergency Medicine', 'Dialysis', 'Telemedicine'],
    image: '/dr-tigist.jpg',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'dr-birucketawit',
    name: 'Dr. Birucketawit Alebachew',
    credentials: 'MD, BSc',
    role: 'The Educator',
    tagline: 'Making health knowledge accessible',
    specialties: ['Public Health', 'Quality Control', 'Training'],
    image: null,
    color: 'from-teal-500 to-cyan-600'
  }
]

// Helper to convert MongoDB document to Message interface
function docToMessage(doc: IMessage): Message {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    subject: doc.subject,
    message: doc.message,
    date: doc.date.toISOString(),
    read: doc.read
  }
}

// Check if MongoDB is available
async function useMongoDB(): Promise<boolean> {
  if (!process.env.MONGODB_URI) return false
  try {
    await connectDB()
    return true
  } catch {
    return false
  }
}

// Message operations
export async function getMessages(): Promise<Message[]> {
  if (await useMongoDB()) {
    const docs = await MessageModel.find().sort({ date: -1 })
    return docs.map(docToMessage)
  }
  return inMemoryMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getMessage(id: string): Promise<Message | null> {
  if (await useMongoDB()) {
    try {
      const doc = await MessageModel.findById(id)
      return doc ? docToMessage(doc) : null
    } catch {
      return null
    }
  }
  return inMemoryMessages.find(m => m.id === id) || null
}

export async function addMessage(data: Omit<Message, 'id' | 'date' | 'read'>): Promise<Message> {
  if (await useMongoDB()) {
    const doc = await MessageModel.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    })
    return docToMessage(doc)
  }
  
  // Fallback to in-memory
  const message: Message = {
    ...data,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    read: false
  }
  inMemoryMessages.push(message)
  return message
}

export async function updateMessage(id: string, data: Partial<Message>): Promise<Message | null> {
  if (await useMongoDB()) {
    try {
      const doc = await MessageModel.findByIdAndUpdate(id, data, { new: true })
      return doc ? docToMessage(doc) : null
    } catch {
      return null
    }
  }
  
  const index = inMemoryMessages.findIndex(m => m.id === id)
  if (index === -1) return null
  inMemoryMessages[index] = { ...inMemoryMessages[index], ...data }
  return inMemoryMessages[index]
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (await useMongoDB()) {
    try {
      const result = await MessageModel.findByIdAndDelete(id)
      return !!result
    } catch {
      return false
    }
  }
  
  const index = inMemoryMessages.findIndex(m => m.id === id)
  if (index === -1) return false
  inMemoryMessages.splice(index, 1)
  return true
}

export async function markMessageAsRead(id: string): Promise<Message | null> {
  return updateMessage(id, { read: true })
}

export async function getUnreadCount(): Promise<number> {
  if (await useMongoDB()) {
    return await MessageModel.countDocuments({ read: false })
  }
  return inMemoryMessages.filter(m => !m.read).length
}

// Team operations (still in-memory - doctors data from lib/doctors-data.ts)
export function getTeamMembers(): TeamMember[] {
  return teamMembers
}

export function getTeamMember(id: string): TeamMember | undefined {
  return teamMembers.find(m => m.id === id)
}

export function addTeamMember(data: Omit<TeamMember, 'id'>): TeamMember {
  const member: TeamMember = {
    ...data,
    id: `dr-${data.name.toLowerCase().split(' ').pop()}-${Date.now()}`
  }
  teamMembers.push(member)
  return member
}

export function updateTeamMember(id: string, data: Partial<TeamMember>): TeamMember | null {
  const index = teamMembers.findIndex(m => m.id === id)
  if (index === -1) return null
  teamMembers[index] = { ...teamMembers[index], ...data }
  return teamMembers[index]
}

export function deleteTeamMember(id: string): boolean {
  const index = teamMembers.findIndex(m => m.id === id)
  if (index === -1) return false
  teamMembers.splice(index, 1)
  return true
}

// Stats
export async function getStats() {
  const messages = await getMessages()
  const unreadCount = await getUnreadCount()
  
  return {
    totalMessages: messages.length,
    unreadMessages: unreadCount,
    totalTeam: teamMembers.length,
    recentMessages: messages.slice(0, 5)
  }
}
