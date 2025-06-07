import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = 'AIzaSyA9xXhQojdYb-rKADU5KEPRehxMKbpy8Yc';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const maxResults = searchParams.get('maxResults') || '20';
  
  try {
    // Get trending agriculture videos
    const agricultureQueries = [
      'modern farming techniques',
      'organic farming India',
      'smart irrigation',
      'crop disease detection',
      'dairy farming',
      'vegetable farming',
      'rice cultivation',
      'wheat farming',
      'जैविक खेती',
      'स्मार्ट खेती',
      'किसान तकनीक',
      'फसल की देखभाल'
    ];

    const randomQuery = agricultureQueries[Math.floor(Math.random() * agricultureQueries.length)];
    
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(randomQuery)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}&order=viewCount&videoEmbeddable=true&regionCode=IN&publishedAfter=${getDateWeeksAgo(4)}`
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

    // Combine search results with video details and sort by view count
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
    }).sort((a: any, b: any) => parseInt(b.viewCount) - parseInt(a.viewCount));

    return NextResponse.json({
      videos: enrichedVideos,
      totalResults: data.pageInfo.totalResults
    });

  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending videos from YouTube' },
      { status: 500 }
    );
  }
}

function getDateWeeksAgo(weeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() - (weeks * 7));
  return date.toISOString();
}
