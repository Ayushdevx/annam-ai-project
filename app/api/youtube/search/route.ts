import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = 'AIzaSyA9xXhQojdYb-rKADU5KEPRehxMKbpy8Yc';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const maxResults = searchParams.get('maxResults') || '12';
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Add agriculture-related terms to improve search relevance
    const enhancedQuery = `${query} farming agriculture किसान खेती`;
    
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(enhancedQuery)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}&order=relevance&videoEmbeddable=true&regionCode=IN&relevanceLanguage=hi`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    // Get video details including duration and statistics
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    
    const detailsResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    const detailsData = await detailsResponse.json();

    // Combine search results with video details
    const enrichedVideos = data.items.map((item: any) => {
      const details = detailsData.items.find((detail: any) => detail.id === item.id.videoId);
      
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        duration: details?.contentDetails?.duration || 'PT0S',
        viewCount: details?.statistics?.viewCount || '0',
        likeCount: details?.statistics?.likeCount || '0',
        channelId: item.snippet.channelId
      };
    });

    return NextResponse.json({
      videos: enrichedVideos,
      totalResults: data.pageInfo.totalResults,
      nextPageToken: data.nextPageToken
    });

  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos from YouTube' },
      { status: 500 }
    );
  }
}

// Helper function to convert ISO 8601 duration to readable format
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1]?.replace('H', '') || '0');
  const minutes = parseInt(match[2]?.replace('M', '') || '0');
  const seconds = parseInt(match[3]?.replace('S', '') || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
