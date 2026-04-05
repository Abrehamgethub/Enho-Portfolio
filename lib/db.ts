// Database utility with MongoDB support
import connectDB, { safeConnectDB, withTimeout } from './mongodb'
import MessageModel, { IMessage } from './models/Message'
import UpdateModel, { IUpdate } from './models/Update'

// Export connectToDatabase for new API routes — never throws, never hangs
export async function connectToDatabase() {
  const conn = await safeConnectDB()
  if (!conn) {
    console.warn('⚠️ connectToDatabase: MongoDB unavailable, operations will use fallbacks')
  }
  return conn
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export interface Update {
  id: string
  text: string
  emoji: string
  createdAt: string
  active: boolean
}

// Helper to convert MongoDB document to Message interface
function docToMessage(doc: IMessage): Message {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    subject: doc.subject,
    message: doc.message,
    date: doc.date instanceof Date ? doc.date.toISOString() : new Date(doc.date).toISOString(),
    read: doc.read
  }
}

// In-memory storage for fallback when MongoDB is not available
let inMemoryUpdates: Update[] = []

// Helper to check if MongoDB is available — safe, never throws or hangs
async function useMongoDB(): Promise<boolean> {
  if (!process.env.MONGODB_URI) return false
  try {
    const conn = await safeConnectDB()
    return conn !== null
  } catch {
    return false
  }
}

// Message operations
export async function getMessages(): Promise<Message[]> {
  try {
    const conn = await connectToDatabase()
    if (!conn) return []
    const docs = await withTimeout(MessageModel.find().sort({ date: -1 }).exec(), 4000, [])
    return Array.isArray(docs) ? docs.map(docToMessage) : []
  } catch (error) {
    console.error('getMessages failed:', error)
    return []
  }
}

export async function getMessage(id: string): Promise<Message | null> {
  await connectToDatabase()
  try {
    const doc = await MessageModel.findById(id)
    return doc ? docToMessage(doc) : null
  } catch {
    return null
  }
}

export async function addMessage(data: Omit<Message, 'id' | 'date' | 'read'>): Promise<Message> {
  await connectToDatabase()
  const doc = await withTimeout(MessageModel.create({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message
  }), 5000, null)
  
  if (!doc) throw new Error('Failed to save message to database')
  return docToMessage(doc)
}

export async function updateMessage(id: string, data: Partial<Message>): Promise<Message | null> {
  await connectToDatabase()
  try {
    const doc = await withTimeout(MessageModel.findByIdAndUpdate(id, data, { new: true }), 5000, null)
    return doc ? docToMessage(doc) : null
  } catch {
    return null
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  await connectToDatabase()
  try {
    const result = await withTimeout(MessageModel.findByIdAndDelete(id), 5000, null)
    return !!result
  } catch {
    return false
  }
}

export async function markMessageAsRead(id: string): Promise<Message | null> {
  return updateMessage(id, { read: true })
}

export async function getUnreadCount(): Promise<number> {
  await connectToDatabase()
  return await MessageModel.countDocuments({ read: false })
}

// Stats
export async function getStats() {
  try {
    const conn = await connectToDatabase()
    if (!conn) {
      return { totalMessages: 0, unreadMessages: 0, totalTeam: 3, recentMessages: [] }
    }
    const messages = await getMessages()
    const unreadCount = await getUnreadCount()
    
    return {
      totalMessages: messages.length,
      unreadMessages: unreadCount,
      totalTeam: 3,
      recentMessages: messages.slice(0, 5)
    }
  } catch (error) {
    console.error('getStats failed:', error)
    return { totalMessages: 0, unreadMessages: 0, totalTeam: 3, recentMessages: [] }
  }
}

export async function getUpdates(): Promise<Update[]> {
  try {
    const conn = await connectToDatabase()
    if (!conn) return []
    const docs = await withTimeout(UpdateModel.find({ active: true }).sort({ createdAt: -1 }).exec(), 4000, null)
    if (!docs) return []
    return docs.map((doc: IUpdate) => ({
      id: doc._id.toString(),
      text: doc.text,
      emoji: doc.emoji,
      createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
      active: doc.active
    }))
  } catch (error) {
    console.error('getUpdates failed:', error)
    return []
  }
}

export async function addUpdate(data: Omit<Update, 'id' | 'createdAt'>): Promise<Update> {
  await connectToDatabase()
  const doc = await withTimeout(UpdateModel.create({
    text: data.text,
    emoji: data.emoji || '📢',
    active: data.active !== false
  }), 5000, null)
  
  if (!doc) throw new Error('Failed to save update to database')
  
  return {
    id: doc._id.toString(),
    text: doc.text,
    emoji: doc.emoji,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
    active: doc.active
  }
}

export async function updateUpdate(id: string, data: Partial<Update>): Promise<Update | null> {
  await connectToDatabase()
  try {
    const doc = await withTimeout(UpdateModel.findByIdAndUpdate(id, data, { new: true }), 5000, null)
    if (!doc) return null
    return {
      id: doc._id.toString(),
      text: doc.text,
      emoji: doc.emoji,
      createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
      active: doc.active
    }
  } catch (error) {
    console.error('updateUpdate failed:', error)
    return null
  }
}

export async function deleteUpdate(id: string): Promise<boolean> {
  await connectToDatabase()
  try {
    const result = await withTimeout(UpdateModel.findByIdAndDelete(id), 5000, null)
    return !!result
  } catch (error) {
    console.error('deleteUpdate failed:', error)
    return false
  }
}
