import { NextResponse } from 'next/server'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UC_YOUR_CHANNEL_ID' // Replace with actual channel ID

export async function GET() {
  try {
    // If no API key, return sample data
    if (!YOUTUBE_API_KEY) {
      return NextResponse.json({
        videos: getSampleVideos(),
        source: 'sample'
      })
    }

    // Fetch latest videos from YouTube channel
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=6&type=video`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error('YouTube API request failed')
    }

    const data = await response.json()

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }))

    return NextResponse.json({ videos, source: 'youtube' })

  } catch (error) {
    console.error('YouTube API error:', error)
    // Return sample data on error
    return NextResponse.json({
      videos: getSampleVideos(),
      source: 'sample'
    })
  }
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
