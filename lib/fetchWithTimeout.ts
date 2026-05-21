/**
 * Fetch wrapper with automatic timeout via AbortController.
 * Prevents hanging requests when Firestore or the network is slow.
 */
export async function fetchWithTimeout(
  url: string,
  opts?: RequestInit & { timeout?: number }
): Promise<Response> {
  const { timeout = 8000, ...fetchOpts } = opts || {}
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    return await fetch(url, { ...fetchOpts, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}
