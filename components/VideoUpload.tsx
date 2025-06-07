'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Video, 
  Image as ImageIcon, 
  X, 
  CheckCircle, 
  AlertCircle,
  Play,
  FileVideo,
  Camera,
  Settings,
  Tag,
  Globe,
  Lock,
  Users
} from 'lucide-react';

interface UploadedVideo {
  id: string;
  title: string;
  description: string;
  file: File;
  thumbnail?: string;
  tags: string[];
  visibility: 'public' | 'private' | 'unlisted';
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

const VideoUpload: React.FC = () => {
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [currentUpload, setCurrentUpload] = useState<{
    title: string;
    description: string;
    tags: string;
    visibility: 'public' | 'private' | 'unlisted';
  }>({
    title: '',
    description: '',
    tags: '',
    visibility: 'public'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith('video/')) {
      uploadVideo(file);
    } else {
      alert('कृपया एक वैध वीडियो फाइल चुनें');
    }
  };

  const uploadVideo = (file: File) => {
    const videoId = Date.now().toString();
    const newVideo: UploadedVideo = {
      id: videoId,
      title: currentUpload.title || file.name.replace(/\.[^/.]+$/, ''),
      description: currentUpload.description,
      file,
      tags: currentUpload.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      visibility: currentUpload.visibility,
      status: 'uploading',
      progress: 0
    };

    setUploadedVideos(prev => [...prev, newVideo]);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadedVideos(prev => 
        prev.map(video => {
          if (video.id === videoId) {
            const newProgress = Math.min(video.progress + Math.random() * 10, 100);
            if (newProgress >= 100) {
              clearInterval(progressInterval);
              return { ...video, progress: 100, status: 'processing' };
            }
            return { ...video, progress: newProgress };
          }
          return video;
        })
      );
    }, 200);

    // Simulate processing completion
    setTimeout(() => {
      setUploadedVideos(prev => 
        prev.map(video => 
          video.id === videoId 
            ? { ...video, status: 'completed' }
            : video
        )
      );
    }, 5000);

    // Reset form
    setCurrentUpload({
      title: '',
      description: '',
      tags: '',
      visibility: 'public'
    });
  };

  const removeVideo = (videoId: string) => {
    setUploadedVideos(prev => prev.filter(video => video.id !== videoId));
  };

  const getStatusIcon = (status: UploadedVideo['status']) => {
    switch (status) {
      case 'uploading':
        return <Upload className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'processing':
        return <Settings className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: UploadedVideo['status']) => {
    switch (status) {
      case 'uploading':
        return 'अपलोड हो रहा है...';
      case 'processing':
        return 'प्रोसेसिंग हो रहा है...';
      case 'completed':
        return 'अपलोड पूरा';
      case 'error':
        return 'त्रुटि';
      default:
        return '';
    }
  };

  const getVisibilityIcon = (visibility: UploadedVideo['visibility']) => {
    switch (visibility) {
      case 'public':
        return <Globe className="h-3 w-3" />;
      case 'private':
        return <Lock className="h-3 w-3" />;
      case 'unlisted':
        return <Users className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-4xl font-bold text-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          वीडियो अपलोड करें
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          अपने कृषि संबंधी वीडियो समुदाय के साथ साझा करें
        </motion.p>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>नया वीडियो अपलोड करें</CardTitle>
            <CardDescription>
              अपने खेती के अनुभव, तकनीक या सुझाव वीडियो में साझा करें
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">वीडियो का शीर्षक</label>
                <Input
                  placeholder="अपने वीडियो का शीर्षक दें..."
                  value={currentUpload.title}
                  onChange={(e) => setCurrentUpload(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">दृश्यता</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  value={currentUpload.visibility}
                  onChange={(e) => setCurrentUpload(prev => ({ ...prev, visibility: e.target.value as any }))}
                >
                  <option value="public">सार्वजनिक</option>
                  <option value="unlisted">अनलिस्टेड</option>
                  <option value="private">निजी</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">विवरण</label>
              <Textarea
                placeholder="अपने वीडियो के बारे में विस्तार से लिखें..."
                value={currentUpload.description}
                onChange={(e) => setCurrentUpload(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">टैग (कॉमा से अलग करें)</label>
              <Input
                placeholder="जैसे: जैविक खेती, सिंचाई, फसल"
                value={currentUpload.tags}
                onChange={(e) => setCurrentUpload(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>

            {/* Upload Area */}
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${dragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">वीडियो फाइल यहाँ ड्रैग करें</h3>
                  <p className="text-muted-foreground">या फाइल चुनने के लिए क्लिक करें</p>
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    फाइल चुनें
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    रिकॉर्ड करें
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  समर्थित प्रारूप: MP4, AVI, MOV, WMV (अधिकतम 500MB)
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Uploaded Videos */}
      {uploadedVideos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>अपलोड किए गए वीडियो</CardTitle>
              <CardDescription>
                आपके अपलोड की स्थिति देखें
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {uploadedVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileVideo className="h-8 w-8 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold truncate">{video.title}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {getVisibilityIcon(video.visibility)}
                          <span className="text-xs text-muted-foreground capitalize">
                            {video.visibility === 'public' ? 'सार्वजनिक' : 
                             video.visibility === 'private' ? 'निजी' : 'अनलिस्टेड'}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeVideo(video.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusIcon(video.status)}
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(video.status)}
                      </span>
                    </div>

                    {video.status === 'uploading' && (
                      <div className="space-y-1">
                        <Progress value={video.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {Math.round(video.progress)}% पूर्ण
                        </p>
                      </div>
                    )}

                    {video.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {video.status === 'completed' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3 mr-1" />
                          देखें
                        </Button>
                        <Button size="sm" variant="outline">
                          संपादित करें
                        </Button>
                        <Button size="sm" variant="outline">
                          साझा करें
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>अच्छे वीडियो बनाने के सुझाव</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">तकनीकी गुणवत्ता</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• अच्छी रोशनी में रिकॉर्ड करें</li>
                  <li>• साफ आवाज के लिए शांत जगह चुनें</li>
                  <li>• कैमरा स्थिर रखें</li>
                  <li>• HD गुणवत्ता में रिकॉर्ड करें</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">सामग्री</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• स्पष्ट और सरल भाषा का उपयोग करें</li>
                  <li>• व्यावहारिक सुझाव दें</li>
                  <li>• अपने अनुभव साझा करें</li>
                  <li>• प्रासंगिक टैग का उपयोग करें</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VideoUpload;
