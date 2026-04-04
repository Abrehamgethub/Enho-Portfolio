// Database utility with MongoDB support
import connectDB from './mongodb'
import MessageModel, { IMessage } from './models/Message'

// Export connectToDatabase for new API routes
export async function connectToDatabase() {
  try {
    await connectDB()
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
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

// Message operations
export async function getMessages(): Promise<Message[]> {
  await connectToDatabase()
  const docs = await MessageModel.find().sort({ date: -1 })
  return docs.map(docToMessage)
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
  await connectToDatabase()
  const messages = await getMessages()
  const unreadCount = await getUnreadCount()
  
  // Note: Total team count will be managed via its own model now
  return {
    totalMessages: messages.length,
    unreadMessages: unreadCount,
    recentMessages: messages.slice(0, 5)
  }
}
