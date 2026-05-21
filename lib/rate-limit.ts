import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

/**
 * Basic in-memory rate limiter based on IP address.
 * Warning: In a serverless environment (like Vercel functions), this memory 
 * is ephemeral and not shared across instances. This provides lightweight 
 * abuse protection but isn't a strict global rate limit.
 */
export function rateLimit(request: NextRequest, config: RateLimitConfig): boolean {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();

  const record = store[ip];

  if (!record) {
    store[ip] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return true; // Allowed
  }

  if (now > record.resetTime) {
    // Reset window
    store[ip] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return true; // Allowed
  }

  if (record.count >= config.maxRequests) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
}

// Periodically clean up expired entries to prevent memory leaks
// (Only runs if the Node process stays alive)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const ip in store) {
      if (now > store[ip].resetTime) {
        delete store[ip];
      }
    }
  }, 60 * 60 * 1000); // Clean up every hour
}
