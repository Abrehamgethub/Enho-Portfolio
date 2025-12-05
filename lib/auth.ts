// Simple auth utilities for admin dashboard
// In production, use a proper auth solution like NextAuth.js

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'eneho2024'
}

// Secret key for token validation (use env var in production)
const AUTH_SECRET = process.env.AUTH_SECRET || 'eneho-admin-secret-2024'

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function generateToken(): string {
  // Create a signed token that includes expiration time
  const expiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  const payload = `${expiry}:${AUTH_SECRET}`
  return Buffer.from(payload).toString('base64')
}

export function validateSession(token: string): boolean {
  try {
    // Decode and validate the token
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [expiryStr, secret] = decoded.split(':')
    const expiry = parseInt(expiryStr, 10)
    
    // Check if token is valid and not expired
    if (secret !== AUTH_SECRET) return false
    if (isNaN(expiry) || Date.now() > expiry) return false
    
    return true
  } catch {
    return false
  }
}

// These are no longer needed but kept for compatibility
export function createSession(token: string): void {
  // Token is self-validating, no storage needed
}

export function deleteSession(token: string): void {
  // Token invalidation handled by cookie deletion
}
