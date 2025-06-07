'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Upload, 
  Scan, 
  AlertTriangle, 
  CheckCircle2, 
  Leaf,
  Bug,
  Droplets,
  Thermometer,
  Eye,
  Download,
  Share,
  History,
  Zap,
  Target,
  Brain,
  Microscope,
  Shield
} from 'lucide-react';

export default function CropDiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detectionHistory = [
    {
      id: 1,
      date: '2024-03-15',
      crop: 'Wheat',
      disease: 'Leaf Rust',
      confidence: 94,
      severity: 'high',
      treatment: 'Fungicide application recommended',
      status: 'treated'
    },
    {
      id: 2,
      date: '2024-03-14',
      crop: 'Rice',
      disease: 'Brown Spot',
      confidence: 87,
      severity: 'medium',
      treatment: 'Improve drainage and apply fungicide',
      status: 'monitoring'
    },
    {
      id: 3,
      date: '2024-03-13',
      crop: 'Cotton',
      disease: 'Healthy',
      confidence: 96,
      severity: 'none',
      treatment: 'Continue current practices',
      status: 'healthy'
    }
  ];

  const diseaseDatabase = [
    {
      name: 'Leaf Rust',
      crop: 'Wheat',
      symptoms: ['Orange pustules on leaves', 'Yellowing of leaves', 'Premature leaf drop'],
      causes: ['Fungal infection', 'High humidity', 'Moderate temperatures'],
      treatment: ['Apply fungicide', 'Improve air circulation', 'Remove infected leaves'],
      prevention: ['Use resistant varieties', 'Proper spacing', 'Avoid overhead irrigation']
    },
    {
      name: 'Brown Spot',
      crop: 'Rice',
      symptoms: ['Brown spots on leaves', 'Lesions with yellow halos', 'Grain discoloration'],
      causes: ['Fungal pathogen', 'Poor drainage', 'Nutrient deficiency'],
      treatment: ['Fungicide spray', 'Improve drainage', 'Balanced fertilization'],
      prevention: ['Seed treatment', 'Proper water management', 'Crop rotation']
    },
    {
      name: 'Bacterial Blight',
      crop: 'Cotton',
      symptoms: ['Water-soaked lesions', 'Yellowing leaves', 'Defoliation'],
      causes: ['Bacterial infection', 'Wounds or injuries', 'High humidity'],
      treatment: ['Copper-based bactericide', 'Remove infected plants', 'Improve drainage'],
      prevention: ['Use certified seeds', 'Avoid mechanical damage', 'Proper sanitation']
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        disease: 'Leaf Rust',
        confidence: 92,
        severity: 'medium',
        crop: 'Wheat',
        affectedArea: 15,
        recommendations: [
          'Apply fungicide within 24 hours',
          'Monitor surrounding plants',
          'Improve air circulation',
          'Consider resistant varieties for next season'
        ],
        treatment: {
          immediate: 'Propiconazole-based fungicide',
          dosage: '0.1% solution',
          frequency: 'Every 7-10 days',
          duration: '3 applications'
        }
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'none': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'treated': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'monitoring': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'healthy': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Microscope className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">AI Disease Detection</h2>
                    <p className="text-green-100">Advanced crop health analysis using computer vision</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-green-100">Accuracy Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-green-100">Diseases Detected</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-green-100">AI Monitoring</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-5 w-5" />
                    <span className="font-semibold">AI Model</span>
                  </div>
                  <div className="text-sm">PlantNet v3.2</div>
                  <div className="text-xs text-green-100">Latest agricultural AI</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">Detection Speed</span>
                  </div>
                  <div className="text-sm">Less than 3 seconds</div>
                  <div className="text-xs text-green-100">Real-time analysis</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span>Disease Detection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded crop" 
                      className="max-w-full h-48 object-cover mx-auto rounded-lg"
                    />
                    {isAnalyzing && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <Scan className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="text-sm">Analyzing image...</span>
                        </div>
                        <Progress value={66} className="w-full" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="h-16 w-16 mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-medium">Upload Crop Image</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Take a clear photo of affected leaves or plants
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TYW1wbGUgQ3JvcCBJbWFnZTwvdGV4dD48L3N2Zz4=');
                    analyzeImage();
                  }}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span>Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{analysisResult.disease}</h3>
                      <Badge className={getSeverityColor(analysisResult.severity)}>
                        {analysisResult.severity} severity
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Confidence:</span>
                        <span className="font-medium">{analysisResult.confidence}%</span>
                      </div>
                      <Progress value={analysisResult.confidence} className="h-2" />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Affected Area:</span>
                        <span className="font-medium">{analysisResult.affectedArea}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Immediate Treatment</h4>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="space-y-1 text-sm">
                        <div><strong>Fungicide:</strong> {analysisResult.treatment.immediate}</div>
                        <div><strong>Dosage:</strong> {analysisResult.treatment.dosage}</div>
                        <div><strong>Frequency:</strong> {analysisResult.treatment.frequency}</div>
                        <div><strong>Duration:</strong> {analysisResult.treatment.duration}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recommendations</h4>
                    <ul className="space-y-1">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Save Report
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Scan className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">Upload an image to start analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span>Detection History & Disease Database</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="history" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="history">Recent Detections</TabsTrigger>
                <TabsTrigger value="database">Disease Database</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="space-y-3">
                {detectionHistory.map((detection) => (
                  <motion.div
                    key={detection.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{detection.crop}</span>
                        <span className="text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{detection.date}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getSeverityColor(detection.severity)}>
                          {detection.severity}
                        </Badge>
                        <Badge className={getStatusColor(detection.status)}>
                          {detection.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold">{detection.disease}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{detection.treatment}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        Confidence: {detection.confidence}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="database" className="space-y-3">
                {diseaseDatabase.map((disease, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{disease.name}</h3>
                      <Badge variant="outline">{disease.crop}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-1">Symptoms</h4>
                        <ul className="space-y-1">
                          {disease.symptoms.map((symptom, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-orange-600 dark:text-orange-400 mb-1">Causes</h4>
                        <ul className="space-y-1">
                          {disease.causes.map((cause, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">Treatment</h4>
                        <ul className="space-y-1">
                          {disease.treatment.map((treatment, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-1">Prevention</h4>
                        <ul className="space-y-1">
                          {disease.prevention.map((prevention, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                              {prevention}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}