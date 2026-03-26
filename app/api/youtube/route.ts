import { NextResponse } from 'next/server'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
// Eneho Hakim channel ID - get this from your YouTube channel
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCyour_channel_id_here'

export async function GET() {
  try {
    // If no API key, try fetching from RSS feed as fallback
    if (!YOUTUBE_API_KEY) {
      // Try RSS feed approach (no API key needed)
      const rssVideos = await fetchFromRSS()
      return NextResponse.json({ videos: rssVideos || [], source: rssVideos.length > 0 ? 'rss' : 'none' })
    }

    // Fetch latest videos from YouTube channel using API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=6&type=video`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('YouTube API error:', errorData)
      throw new Error('YouTube API request failed')
    }

    const data = await response.json()

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }))

    return NextResponse.json({ videos, source: 'youtube' })

  } catch (error) {
    console.error('YouTube API error:', error)
    // Try RSS as fallback
    const rssVideos = await fetchFromRSS()
    return NextResponse.json({ videos: rssVideos || [], source: rssVideos.length > 0 ? 'rss' : 'none' })
  }
}

// Fetch from YouTube RSS feed (no API key required!)
async function fetchFromRSS(): Promise<any[]> {
  try {
    // Eneho Hakim YouTube channel ID
    // To find yours: https://commentpicker.com/youtube-channel-id.php
    const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCU2XkPTOjJDaPeFl0qj7wJQ'
    
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }
    )
    
    if (!response.ok) return []
    
    const xml = await response.text()
    
    // Parse XML to extract video info
    const videos: any[] = []
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || []
    
    for (const entry of entries.slice(0, 6)) {
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1]
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1]
      const description = entry.match(/<media:description>([^<]*)<\/media:description>/)?.[1] || ''
      
      if (videoId && title) {
        videos.push({
          id: videoId,
          title: decodeHTMLEntities(title),
          description: decodeHTMLEntities(description),
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          publishedAt: published,
          url: `https://www.youtube.com/watch?v=${videoId}`
        })
      }
    }
    
    return videos
  } catch (error) {
    console.error('RSS fetch error:', error)
    return []
  }
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}
