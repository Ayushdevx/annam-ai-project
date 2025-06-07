'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  MessageCircle, 
  Heart, 
  Share2, 
  Edit3, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Bookmark,
  Send,
  Image as ImageIcon,
  Video,
  FileText,
  Star,
  ChevronRight,
  Globe
} from 'lucide-react';

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
  location: string;
  isJoined: boolean;
}

interface BlogPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  title: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

const FarmerCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Sample data
  const [communityGroups, setCommunityGroups] = useState<CommunityGroup[]>([
    {
      id: '1',
      name: 'Organic Farming Enthusiasts',
      description: 'Share experiences and tips about organic farming practices',
      members: 2847,
      category: 'Organic',
      image: '/api/placeholder/300/200',
      location: 'Pan India',
      isJoined: true
    },
    {
      id: '2',
      name: 'Rice Farmers Network',
      description: 'Connect with rice farmers and learn about best practices',
      members: 5632,
      category: 'Crops',
      image: '/api/placeholder/300/200',
      location: 'Punjab, Haryana',
      isJoined: false
    },
    {
      id: '3',
      name: 'Smart Irrigation Solutions',
      description: 'Discuss modern irrigation techniques and water conservation',
      members: 1923,
      category: 'Technology',
      image: '/api/placeholder/300/200',
      location: 'Maharashtra',
      isJoined: true
    },
    {
      id: '4',
      name: 'Young Farmers Club',
      description: 'Platform for young entrepreneurs in agriculture',
      members: 3456,
      category: 'Youth',
      image: '/api/placeholder/300/200',
      location: 'All India',
      isJoined: false
    }
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      author: {
        name: 'राम कुमार',
        avatar: '/api/placeholder/40/40',
        location: 'Punjab'
      },
      title: 'मेरे धान की फसल में बंपर उत्पादन',
      content: 'इस साल मैंने SRI (System of Rice Intensification) तकनीक का इस्तेमाल किया और परिणाम अद्भुत हैं। प्रति एकड़ 25% अधिक उत्पादन मिला है। यहाँ मैं अपना अनुभव साझा कर रहा हूँ...',
      image: '/api/placeholder/500/300',
      likes: 45,
      comments: 12,
      shares: 8,
      timestamp: '2 hours ago',
      tags: ['Rice', 'SRI', 'High Yield'],
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '2',
      author: {
        name: 'सुनीता देवी',
        avatar: '/api/placeholder/40/40',
        location: 'Haryana'
      },
      title: 'ड्रिप इरिगेशन से पानी की 60% बचत',
      content: 'पिछले साल ड्रिप इरिगेशन सिस्टम लगवाया था। अब तक का अनुभव शानदार है। पानी की बचत के साथ-साथ फसल की गुणवत्ता भी बेहतर हुई है...',
      likes: 67,
      comments: 23,
      shares: 15,
      timestamp: '5 hours ago',
      tags: ['Irrigation', 'Water Conservation', 'Technology'],
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      author: {
        name: 'अजय सिंह',
        avatar: '/api/placeholder/40/40',
        location: 'Rajasthan'
      },
      title: 'जैविक खाद से मिली बेहतर पैदावार',
      content: 'रासायनिक खाद छोड़कर जैविक खाद का इस्तेमाल शुरू किया। शुरुआत में डर था लेकिन नतीजे देखकर हैरान हूँ। मिट्टी की सेहत भी सुधरी है...',
      likes: 89,
      comments: 34,
      shares: 22,
      timestamp: '1 day ago',
      tags: ['Organic', 'Fertilizer', 'Soil Health'],
      isLiked: false,
      isBookmarked: true
    }
  ]);

  const handleJoinGroup = (groupId: string) => {
    setCommunityGroups(groups =>
      groups.map(group =>
        group.id === groupId
          ? { ...group, isJoined: !group.isJoined, members: group.isJoined ? group.members - 1 : group.members + 1 }
          : group
      )
    );
  };

  const handleLikePost = (postId: string) => {
    setBlogPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleBookmarkPost = (postId: string) => {
    setBlogPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          avatar: '/api/placeholder/40/40',
          location: 'Your Location'
        },
        title: newPostTitle,
        content: newPostContent,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now',
        tags: ['New Post'],
        isLiked: false,
        isBookmarked: false
      };
      setBlogPosts([newPost, ...blogPosts]);
      setNewPostTitle('');
      setNewPostContent('');
      setShowCreatePost(false);
    }
  };

  const filteredGroups = communityGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-4xl font-bold text-green-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          किसान समुदाय
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          अन्य किसानों से जुड़ें, अनुभव साझा करें, और एक साथ सीखें
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.div 
        className="relative max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="समुदाय या पोस्ट खोजें..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">समुदाय खोजें</TabsTrigger>
          <TabsTrigger value="my-groups">मेरे समुदाय</TabsTrigger>
          <TabsTrigger value="feed">समुदायिक फ़ीड</TabsTrigger>
          <TabsTrigger value="create">पोस्ट बनाएं</TabsTrigger>
        </TabsList>

        {/* Discover Communities */}
        <TabsContent value="discover" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="w-full h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mb-3"></div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{group.members.toLocaleString()} सदस्य</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{group.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{group.category}</Badge>
                      <Button
                        size="sm"
                        variant={group.isJoined ? "outline" : "default"}
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        {group.isJoined ? 'छोड़ें' : 'जुड़ें'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* My Groups */}
        <TabsContent value="my-groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityGroups.filter(group => group.isJoined).map((group) => (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="w-full h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mb-3"></div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{group.members.toLocaleString()} सदस्य</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{group.category}</Badge>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        चैट करें
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Community Feed */}
        <TabsContent value="feed" className="space-y-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{post.author.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{post.author.location}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleBookmarkPost(post.id)}
                      >
                        <Bookmark 
                          className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} 
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                    </div>
                    {post.image && (
                      <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">#{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLikePost(post.id)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <Heart 
                            className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current text-red-500' : ''}`} 
                          />
                          {post.likes}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Create Post */}
        <TabsContent value="create" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>नई पोस्ट बनाएं</CardTitle>
                <CardDescription>
                  अपना अनुभव और ज्ञान समुदाय के साथ साझा करें
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="पोस्ट का शीर्षक..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <Textarea
                  placeholder="अपना अनुभव या सवाल यहाँ लिखें..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={6}
                />
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    फोटो जोड़ें
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-1" />
                    वीडियो जोड़ें
                  </Button>
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setNewPostTitle('');
                      setNewPostContent('');
                    }}
                  >
                    रद्द करें
                  </Button>
                  <Button onClick={handleCreatePost}>
                    <Send className="h-4 w-4 mr-1" />
                    पोस्ट करें
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerCommunity;
