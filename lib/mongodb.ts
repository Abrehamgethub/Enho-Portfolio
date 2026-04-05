import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI not defined - using in-memory fallback')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 5000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ MongoDB connection error:', e)
    throw e
  }

  return cached.conn
}

// Helper: wrap any async DB operation with a timeout to prevent serverless hanging
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 4000,
  fallback: T
): Promise<T> {
  let timer: NodeJS.Timeout
  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`⚠️ DB operation timed out after ${timeoutMs}ms, using fallback`)
      resolve(fallback)
    }, timeoutMs)
  })

  try {
    const result = await Promise.race([promise, timeout])
    clearTimeout(timer!)
    return result
  } catch (error) {
    clearTimeout(timer!)
    console.error('DB operation failed, using fallback:', error)
    return fallback
  }
}

// Safe connectDB that never throws — returns null on failure
export async function safeConnectDB(): Promise<typeof mongoose | null> {
  try {
    return await withTimeout(connectDB(), 4000, null)
  } catch {
    return null
  }
}

export default connectDB
