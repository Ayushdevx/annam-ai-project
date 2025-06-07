'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Search, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share2, 
  Download,
  Heart,
  Bookmark,
  Filter,
  Upload,
  Video,
  TrendingUp,
  Calendar,
  User,
  PlayCircle,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  RotateCcw,
  Settings
} from 'lucide-react';
import YouTube from 'react-youtube';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  channelId: string;
}

interface VideoPlayerProps {
  videoId: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">वीडियो प्लेयर</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="p-4">
          <YouTube videoId={videoId} opts={opts} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const YouTubeIntegration: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('search');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [watchLater, setWatchLater] = useState<string[]>([]);

  const API_KEY = 'AIzaSyA9xXhQojdYb-rKADU5KEPRehxMKbpy8Yc';

  // Sample video data for demonstration
  const sampleVideos: YouTubeVideo[] = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Modern Farming Techniques for Higher Yield',
      description: 'Learn about the latest farming techniques that can help increase your crop yield significantly.',
      thumbnail: '/api/placeholder/320/180',
      channelTitle: 'Agriculture Today',
      publishedAt: '2024-01-15',
      duration: '15:32',
      viewCount: '125,420',
      likeCount: '5,230',
      channelId: 'UC123456789'
    },
    {
      id: 'abcd1234efg',
      title: 'जैविक खेती के फायदे - Complete Guide',
      description: 'जैविक खेती के सभी फायदे और नुकसान के बारे में विस्तार से जानें।',
      thumbnail: '/api/placeholder/320/180',
      channelTitle: 'किसान चैनल',
      publishedAt: '2024-02-01',
      duration: '22:45',
      viewCount: '89,340',
      likeCount: '3,890',
      channelId: 'UC987654321'
    },
    {
      id: 'xyz789abc123',
      title: 'Smart Irrigation System Setup',
      description: 'Step by step guide to setup smart irrigation system for your farm.',
      thumbnail: '/api/placeholder/320/180',
      channelTitle: 'Smart Farming',
      publishedAt: '2024-01-28',
      duration: '18:20',
      viewCount: '67,890',
      likeCount: '2,450',
      channelId: 'UC456789123'
    },
    {
      id: 'farming123xyz',
      title: 'Crop Disease Detection using AI',
      description: 'How to use AI technology to detect diseases in crops early.',
      thumbnail: '/api/placeholder/320/180',
      channelTitle: 'AgriTech Solutions',
      publishedAt: '2024-02-10',
      duration: '12:15',
      viewCount: '45,670',
      likeCount: '1,890',
      channelId: 'UC789123456'
    }
  ];
  useEffect(() => {
    setVideos(sampleVideos);
  }, []);

  useEffect(() => {
    if (activeTab === 'trending') {
      loadTrendingVideos();
    }
  }, [activeTab]);
  const searchVideos = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}&maxResults=12`);
      if (!response.ok) throw new Error('Failed to search videos');
      
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Error searching videos:', error);
      // Fallback to sample videos if API fails
      const filteredVideos = sampleVideos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );
      setVideos(filteredVideos);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/youtube/trending?maxResults=20');
      if (!response.ok) throw new Error('Failed to load trending videos');
      
      const data = await response.json();
      setVideos(data.videos || sampleVideos);
    } catch (error) {
      console.error('Error loading trending videos:', error);
      // Fallback to sample videos if API fails
      setVideos(sampleVideos);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchVideos(searchQuery);
  };

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const toggleWatchLater = (videoId: string) => {
    setWatchLater(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const formatViews = (count: string) => {
    const num = parseInt(count.replace(/,/g, ''));
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return count;
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN');
  };

  const formatDuration = (duration: string) => {
    if (!duration || duration === 'PT0S') return '0:00';
    
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1]?.replace('H', '') || '0');
    const minutes = parseInt(match[2]?.replace('M', '') || '0');
    const seconds = parseInt(match[3]?.replace('S', '') || '0');
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-4xl font-bold text-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          कृषि वीडियो सेंटर
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          कृषि से संबंधित बेहतरीन वीडियो देखें, सीखें और साझा करें
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.form 
        onSubmit={handleSearch}
        className="relative max-w-2xl mx-auto flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="कृषि वीडियो खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={loading}>
          <Search className="h-4 w-4 mr-1" />
          खोजें
        </Button>
      </motion.form>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search">खोजें</TabsTrigger>
          <TabsTrigger value="trending">ट्रेंडिंग</TabsTrigger>
          <TabsTrigger value="favorites">पसंदीदा</TabsTrigger>
          <TabsTrigger value="watch-later">बाद में देखें</TabsTrigger>
        </TabsList>

        {/* Search Results */}
        <TabsContent value="search" className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <div 
                        className="w-full h-48 bg-gray-200 rounded-t-lg relative overflow-hidden cursor-pointer"
                        onClick={() => setSelectedVideo(video.id)}
                      >                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-white opacity-80" />
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                          {formatDuration(video.duration)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm line-clamp-2 leading-tight">
                        {video.title}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {video.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{video.channelTitle}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{formatViews(video.viewCount)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{formatViews(video.likeCount)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(video.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleFavorite(video.id)}
                          >
                            <Heart 
                              className={`h-4 w-4 ${favorites.includes(video.id) ? 'fill-current text-red-500' : ''}`} 
                            />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleWatchLater(video.id)}
                          >
                            <Clock 
                              className={`h-4 w-4 ${watchLater.includes(video.id) ? 'fill-current text-blue-500' : ''}`} 
                            />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedVideo(video.id)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          देखें
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Trending Videos */}
        <TabsContent value="trending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <div 
                      className="w-full h-48 bg-gray-200 rounded-t-lg relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedVideo(video.id)}
                    >
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white opacity-80" />
                      </div>                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        #{index + 1}
                      </Badge>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                        {formatDuration(video.duration)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm line-clamp-2 leading-tight">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{video.channelTitle}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{formatViews(video.viewCount)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{formatViews(video.likeCount)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(video.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${favorites.includes(video.id) ? 'fill-current text-red-500' : ''}`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleWatchLater(video.id)}
                        >
                          <Clock 
                            className={`h-4 w-4 ${watchLater.includes(video.id) ? 'fill-current text-blue-500' : ''}`} 
                          />
                        </Button>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => setSelectedVideo(video.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        देखें
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>        {/* Favorites */}
        <TabsContent value="favorites" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVideos.filter(video => favorites.includes(video.id)).map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <div 
                      className="w-full h-48 bg-gray-200 rounded-t-lg relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedVideo(video.id)}
                    >
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white opacity-80" />
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                        {formatDuration(video.duration)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm line-clamp-2 leading-tight">
                      {video.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="sm"
                      onClick={() => setSelectedVideo(video.id)}
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      देखें
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {favorites.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>अभी तक कोई पसंदीदा वीडियो नहीं है</p>
            </div>
          )}
        </TabsContent>        {/* Watch Later */}
        <TabsContent value="watch-later" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVideos.filter(video => watchLater.includes(video.id)).map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <div 
                      className="w-full h-48 bg-gray-200 rounded-t-lg relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedVideo(video.id)}
                    >
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white opacity-80" />
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                        {formatDuration(video.duration)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm line-clamp-2 leading-tight">
                      {video.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="sm"
                      onClick={() => setSelectedVideo(video.id)}
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      देखें
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {watchLater.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>बाद में देखने के लिए कोई वीडियो नहीं है</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayer
            videoId={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default YouTubeIntegration;
