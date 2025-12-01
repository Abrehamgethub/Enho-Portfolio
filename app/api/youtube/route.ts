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
      if (rssVideos.length > 0) {
        return NextResponse.json({ videos: rssVideos, source: 'rss' })
      }
      return NextResponse.json({ videos: getSampleVideos(), source: 'sample' })
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
    if (rssVideos.length > 0) {
      return NextResponse.json({ videos: rssVideos, source: 'rss' })
    }
    return NextResponse.json({ videos: getSampleVideos(), source: 'sample' })
  }
}

// Fetch from YouTube RSS feed (no API key required!)
async function fetchFromRSS(): Promise<any[]> {
  try {
    // Eneho Hakim YouTube channel ID
    // To find yours: https://commentpicker.com/youtube-channel-id.php
    const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCRdVN9EeQrw0zD9tCz1i1LA'
    
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

function getSampleVideos() {
  return [
    {
      id: '1',
      title: 'Understanding Diabetes: Prevention & Management',
      description: 'In this episode, we discuss diabetes prevention strategies and management tips.',
      thumbnail: '/podcast-thumb-1.jpg',
      publishedAt: '2024-11-15T10:00:00Z',
      url: 'https://www.youtube.com/@Eneho_Hakim'
    },
    {
      id: '2',
      title: 'Mental Health Awareness in Ethiopia',
      description: 'Breaking the stigma around mental health and discussing available resources.',
      thumbnail: '/podcast-thumb-2.jpg',
      publishedAt: '2024-11-08T10:00:00Z',
      url: 'https://www.youtube.com/@Eneho_Hakim'
    },
    {
      id: '3',
      title: 'Women\'s Health: Reproductive Care Basics',
      description: 'Essential information about women\'s reproductive health and wellness.',
      thumbnail: '/podcast-thumb-3.jpg',
      publishedAt: '2024-11-01T10:00:00Z',
      url: 'https://www.youtube.com/@Eneho_Hakim'
    },
    {
      id: '4',
      title: 'Nutrition Tips for a Healthier Life',
      description: 'Practical nutrition advice tailored for Ethiopian dietary habits.',
      thumbnail: '/podcast-thumb-4.jpg',
      publishedAt: '2024-10-25T10:00:00Z',
      url: 'https://www.youtube.com/@Eneho_Hakim'
    },
    {
      id: '5',
      title: 'First Aid Basics Everyone Should Know',
      description: 'Life-saving first aid techniques for emergency situations.',
      thumbnail: '/podcast-thumb-5.jpg',
      publishedAt: '2024-10-18T10:00:00Z',
      url: 'https://www.youtube.com/@Eneho_Hakim'
    },
    {
      id: '6',
      title: 'Hypertension: The Silent Killer',
      description: 'Understanding high blood pressure and how to manage it effectively.',
      thumbnail: '/podcast-thumb-6.jpg',
      publishedAt: '2024-10-11T10:00:00Z',
      url: 'https://www.youtube.com/@Eneho_Hakim'
    }
  ]
}
