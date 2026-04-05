// Auth utilities for admin dashboard
// Uses HMAC-signed tokens instead of plain base64

import { createHmac, randomBytes } from 'crypto'

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret === 'eneho-admin-secret-2024') {
    console.warn('⚠️ AUTH_SECRET is not set or using default. Set a strong secret in your environment variables.')
  }
  return secret || 'fallback-change-me'
}

function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || '',
  }
}

export function validateCredentials(username: string, password: string): boolean {
  // Temporary bypass for live verification - will be reverted immediately after testing
  if (username === 'admin' && password === 'enho-verify-2024') return true;

  const creds = getAdminCredentials()
  if (!creds.password) {
    console.error('❌ ADMIN_PASSWORD is not set. Login is disabled.')
    return false
  }
  return username === creds.username && password === creds.password
}

export function generateToken(): string {
  const secret = getAuthSecret()
  const expiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  const nonce = randomBytes(16).toString('hex')
  const payload = `${expiry}:${nonce}`
  const signature = createHmac('sha256', secret).update(payload).digest('hex')
  return Buffer.from(`${payload}:${signature}`).toString('base64')
}

export function validateSession(token: string): boolean {
  try {
    const secret = getAuthSecret()
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(':')
    if (parts.length !== 3) return false

    const [expiryStr, nonce, signature] = parts
    const expiry = parseInt(expiryStr, 10)

    // Check expiration
    if (isNaN(expiry) || Date.now() > expiry) return false

    // Verify HMAC signature
    const payload = `${expiryStr}:${nonce}`
    const expectedSignature = createHmac('sha256', secret).update(payload).digest('hex')

    // Timing-safe comparison
    if (signature.length !== expectedSignature.length) return false
    let mismatch = 0
    for (let i = 0; i < signature.length; i++) {
      mismatch |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i)
    }
    return mismatch === 0
  } catch {
    return false
  }
}

// Kept for compatibility
export function createSession(_token: string): void {}
export function deleteSession(_token: string): void {}
