import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import connectDB from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  const startTime = Date.now()
  const result: any = {
    timestamp: new Date().toISOString(),
    env: {
      MONGODB_URI_SET: !!process.env.MONGODB_URI,
      MONGODB_URI_LENGTH: process.env.MONGODB_URI?.length || 0,
      MONGODB_URI_DB: process.env.MONGODB_URI?.match(/\/([^/?]+)\?/)?.[1] || 'NOT_FOUND_IN_URI',
    },
    mongoose: {
      readyState: mongoose.connection.readyState,
      readyStateLabel: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    },
    connection: 'pending',
    latencyMs: 0,
  }

  try {
    await connectDB()
    result.connection = 'SUCCESS'
    result.mongoose.readyState = mongoose.connection.readyState
    result.mongoose.readyStateLabel = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown'
    result.mongoose.database = mongoose.connection.db?.databaseName || 'unknown'
    result.mongoose.host = mongoose.connection.host || 'unknown'
    
    // Ping the database
    if (mongoose.connection.db) {
      const pingResult = await mongoose.connection.db.command({ ping: 1 })
      result.ping = pingResult
    }

    // List collections
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections().toArray()
      result.collections = collections.map(c => c.name)
    }
  } catch (error: any) {
    result.connection = 'FAILED'
    result.error = error.message
  }

  result.latencyMs = Date.now() - startTime

  const statusCode = result.connection === 'SUCCESS' ? 200 : 503
  return NextResponse.json(result, { status: statusCode })
}
