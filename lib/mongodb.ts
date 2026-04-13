import mongoose from 'mongoose'

// CRITICAL: Do NOT read process.env.MONGODB_URI at module level.
// In Vercel serverless, env vars may not be available at module init time.
// Always read inside the function.

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

async function connectDB(): Promise<typeof mongoose> {
  // Read MONGODB_URI lazily at call time, NOT at module load time
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined in environment variables. ' +
      'Set it in Vercel Project Settings → Environment Variables.'
    )
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      family: 4,
      maxPoolSize: 5,
      retryWrites: true,
      w: 'majority' as const,
    }

    console.log('🔌 Connecting to MongoDB...')
    cached.promise = mongoose.connect(uri, opts).then((m) => {
      console.log('✅ MongoDB connected successfully to:', m.connection.db?.databaseName || 'unknown')
      return m
    }).catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message)
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
  timeoutMs: number = 8000,
  fallback?: T
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
    
    // If it was a timeout error and we have an explicit fallback, return it
    if (error instanceof Error && error.message.includes('timed out') && fallback !== undefined) {
      console.warn(`⚠️ ${error.message} - using fallback`)
      return fallback
    }
    
    throw error
  }
}

// Safe connectDB that returns null on failure instead of throwing.
// Use this ONLY for public read routes where you want graceful degradation.
// For admin write routes, use connectDB() directly so errors are visible.
export async function safeConnectDB(): Promise<typeof mongoose | null> {
  try {
    return await withTimeout(connectDB(), 12000)
  } catch (err: any) {
    console.error('❌ safeConnectDB failed:', err.message)
    return null
  }
}

export default connectDB
