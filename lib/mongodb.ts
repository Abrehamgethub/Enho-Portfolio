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
  timeoutMs: number = 5000,
  fallback: T | null = null
): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`DB operation timed out after ${timeoutMs}ms`))
    }, timeoutMs)
  })

  try {
    const result = await Promise.race([promise, timeoutPromise])
    if (timer) clearTimeout(timer)
    return result
  } catch (error) {
    if (timer) clearTimeout(timer)
    
    // If it was a timeout error and we have a non-null fallback, return it
    if (error instanceof Error && error.message.includes('timed out') && fallback !== null) {
      console.warn(`⚠️ ${error.message} - using fallback`)
      return fallback
    }
    
    // Otherwise, rethrow to let the caller handle the failure (especially for writes)
    console.error('❌ DB operation failed:', error)
    throw error
  }
}

// Safe connectDB that returns null on failure instead of throwing
export async function safeConnectDB(): Promise<typeof mongoose | null> {
  try {
    return await withTimeout(connectDB(), 5000, null)
  } catch (err) {
    console.error('Failed to safely connect to DB:', err)
    return null
  }
}

export default connectDB
