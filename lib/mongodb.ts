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
    console.error('❌ MONGODB_URI is not set')
    return null
  }

  if (cached.conn) {
    console.log('🔄 Using cached MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // Reduced from 3000 to catch timeouts faster
      connectTimeoutMS: 2000, // Reduced
      socketTimeoutMS: 5000,
      family: 4, // Force IPv4 to avoid Atlas connectivity issues
    }

    console.log('🔌 Connecting to MongoDB...')
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully')
      return mongoose
    }).catch((err) => {
      console.error('❌ MongoDB connection failed:', err)
      cached.promise = null
      throw err
    })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (e) {
    cached.promise = null
    throw e
  }
}

// Helper: wrap any async DB operation with a timeout to prevent serverless hanging
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 4500, // Reduced slightly to stay within serverless 5s-10s windows
  fallback: T | null = null
): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Database operation timed out after ${timeoutMs}ms`))
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
    console.error('❌ DB operation failure:', error)
    throw error
  }
}

// Safe connectDB that returns null on failure instead of throwing
export async function safeConnectDB(): Promise<typeof mongoose | null> {
  try {
    // We give connection 4s, leaving 1s for the function to respond before standard 5s Vercel limit
    return await withTimeout(connectDB(), 4000, null)
  } catch (err) {
    console.error('Failed to safely connect to DB within timeout:', err)
    return null
  }
}

export default connectDB
