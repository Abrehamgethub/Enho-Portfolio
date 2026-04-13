// Database utility with MongoDB support
import connectDB, { safeConnectDB, withTimeout } from './mongodb'
import MessageModel, { IMessage } from './models/Message'
import UpdateModel, { IUpdate } from './models/Update'

// Export connectToDatabase for API routes — throws on failure so callers see errors
export async function connectToDatabase() {
  return await connectDB()
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

// Message operations — all throw on DB failure (no silent fallback)
export async function getMessages(): Promise<Message[]> {
  await connectToDatabase()
  const docs = await withTimeout(MessageModel.find().sort({ date: -1 }).exec(), 8000)
  return docs.map(docToMessage)
}

export async function getMessage(id: string): Promise<Message | null> {
  await connectToDatabase()
  const doc = await MessageModel.findById(id)
  return doc ? docToMessage(doc) : null
}

export async function addMessage(data: Omit<Message, 'id' | 'date' | 'read'>): Promise<Message> {
  await connectToDatabase()
  const doc = await withTimeout(MessageModel.create({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message
  }), 8000)
  
  return docToMessage(doc)
}

export async function updateMessage(id: string, data: Partial<Message>): Promise<Message | null> {
  await connectToDatabase()
  const doc = await withTimeout(MessageModel.findByIdAndUpdate(id, data, { new: true }), 8000)
  return doc ? docToMessage(doc) : null
}

export async function deleteMessage(id: string): Promise<boolean> {
  await connectToDatabase()
  const result = await withTimeout(MessageModel.findByIdAndDelete(id), 8000)
  return !!result
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
  
  return {
    totalMessages: messages.length,
    unreadMessages: unreadCount,
    totalTeam: 3,
    recentMessages: messages.slice(0, 5)
  }
}

export async function getUpdates(): Promise<Update[]> {
  await connectToDatabase()
  const docs = await withTimeout(UpdateModel.find({ active: true }).sort({ createdAt: -1 }).exec(), 8000)
  return docs.map((doc: IUpdate) => ({
    id: doc._id.toString(),
    text: doc.text,
    emoji: doc.emoji,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
    active: doc.active
  }))
}

export async function addUpdate(data: Omit<Update, 'id' | 'createdAt'>): Promise<Update> {
  await connectToDatabase()
  const doc = await withTimeout(UpdateModel.create({
    text: data.text,
    emoji: data.emoji || '📢',
    active: data.active !== false
  }), 8000)

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
  const doc = await withTimeout(UpdateModel.findByIdAndUpdate(id, data, { new: true }), 8000)
  if (!doc) return null
  return {
    id: doc._id.toString(),
    text: doc.text,
    emoji: doc.emoji,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
    active: doc.active
  }
}

export async function deleteUpdate(id: string): Promise<boolean> {
  await connectToDatabase()
  const result = await withTimeout(UpdateModel.findByIdAndDelete(id), 8000)
  return !!result
}
