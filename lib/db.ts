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
  const doc = await MessageModel.create({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message
  })
  return docToMessage(doc)
}

export async function updateMessage(id: string, data: Partial<Message>): Promise<Message | null> {
  await connectToDatabase()
  try {
    const doc = await MessageModel.findByIdAndUpdate(id, data, { new: true })
    return doc ? docToMessage(doc) : null
  } catch {
    return null
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  await connectToDatabase()
  try {
    const result = await MessageModel.findByIdAndDelete(id)
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

// Update operations with in-memory fallback
export async function getUpdates(): Promise<Update[]> {
  if (await useMongoDB()) {
    try {
      const docs = await UpdateModel.find({ active: true }).sort({ createdAt: -1 })
      return docs.map((doc: IUpdate) => ({
        id: doc._id.toString(),
        text: doc.text,
        emoji: doc.emoji,
        createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
        active: doc.active
      }))
    } catch (error) {
      console.error('MongoDB getUpdates failed, using in-memory fallback:', error)
    }
  }
  // Return in-memory updates sorted by date (newest first)
  return [...inMemoryUpdates]
    .filter(u => u.active)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function addUpdate(data: Omit<Update, 'id' | 'createdAt'>): Promise<Update> {
  if (await useMongoDB()) {
    try {
      const doc = await UpdateModel.create({
        text: data.text,
        emoji: data.emoji || '📢',
        active: data.active !== false
      })
      return {
        id: doc._id.toString(),
        text: doc.text,
        emoji: doc.emoji,
        createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
        active: doc.active
      }
    } catch (error) {
      console.error('MongoDB addUpdate failed, using in-memory fallback:', error)
    }
  }
  
  // Fallback to in-memory
  const update: Update = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    emoji: data.emoji || '📢',
    active: data.active !== false
  }
  inMemoryUpdates.push(update)
  console.log('Added update to in-memory storage:', update.id)
  return update
}

export async function updateUpdate(id: string, data: Partial<Update>): Promise<Update | null> {
  if (await useMongoDB()) {
    try {
      const doc = await UpdateModel.findByIdAndUpdate(id, data, { new: true })
      if (!doc) return null
      return {
        id: doc._id.toString(),
        text: doc.text,
        emoji: doc.emoji,
        createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
        active: doc.active
      }
    } catch (error) {
      console.error('MongoDB updateUpdate failed, using in-memory fallback:', error)
    }
  }
  
  // Fallback to in-memory
  const index = inMemoryUpdates.findIndex(u => u.id === id)
  if (index === -1) return null
  inMemoryUpdates[index] = { ...inMemoryUpdates[index], ...data }
  console.log('Updated update in in-memory storage:', id)
  return inMemoryUpdates[index]
}

export async function deleteUpdate(id: string): Promise<boolean> {
  if (await useMongoDB()) {
    try {
      const result = await UpdateModel.findByIdAndDelete(id)
      return !!result
    } catch (error) {
      console.error('MongoDB deleteUpdate failed, using in-memory fallback:', error)
    }
  }
  
  // Fallback to in-memory
  const index = inMemoryUpdates.findIndex(u => u.id === id)
  if (index === -1) return false
  inMemoryUpdates.splice(index, 1)
  console.log('Deleted update from in-memory storage:', id)
  return true
}
