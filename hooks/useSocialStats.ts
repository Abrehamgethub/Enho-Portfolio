import { useState, useEffect } from 'react'

let cachedTotal = ""
let isFetched = false
let fetchPromise: Promise<string> | null = null

export function useTotalFollowers(defaultTotal = "57K+") {
  const [total, setTotal] = useState(cachedTotal || defaultTotal)

  useEffect(() => {
    if (isFetched && cachedTotal) {
      setTotal(cachedTotal)
      return
    }
    
    if (!fetchPromise) {
      fetchPromise = fetch('/api/social-stats')
        .then(res => res.json())
        .then((stats: any[]) => {
          if (!stats || stats.length === 0) return defaultTotal
          
          let t = 0
          for (const s of stats) {
            if (!s.followers) continue
            const numStr = s.followers.replace(/[^0-9.]/g, '')
            if (!numStr) continue
            const num = parseFloat(numStr)
            if (s.followers.toLowerCase().includes('m')) t += num * 1000000
            else if (s.followers.toLowerCase().includes('k')) t += num * 1000
            else t += num
          }
          
          if (t >= 1000000) return (t / 1000000).toFixed(1).replace(/\.0$/, '') + "M+"
          if (t >= 1000) return Math.floor(t / 1000) + "K+"
          return t + "+"
        })
        .catch(err => {
          console.error("Failed to fetch social stats:", err)
          return defaultTotal
        })
    }
    
    fetchPromise.then(val => {
      cachedTotal = val
      isFetched = true
      setTotal(val)
    })
  }, [defaultTotal])

  return total
}
