// Simple auth utilities for admin dashboard
// In production, use a proper auth solution like NextAuth.js

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'eneho2024'
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function generateToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random().toString(36).substring(7)}`).toString('base64')
}

// Session storage (in production, use a database or Redis)
const sessions = new Map<string, { createdAt: number; expiresAt: number }>()

export function createSession(token: string): void {
  const now = Date.now()
  sessions.set(token, {
    createdAt: now,
    expiresAt: now + 24 * 60 * 60 * 1000 // 24 hours
  })
}

export function validateSession(token: string): boolean {
  const session = sessions.get(token)
  if (!session) return false
  if (Date.now() > session.expiresAt) {
    sessions.delete(token)
    return false
  }
  return true
}

export function deleteSession(token: string): void {
  sessions.delete(token)
}
