'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Upload, 
  Scan, 
  Eye, 
  Brain,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Bug,
  Droplets,
  BarChart3,
  TrendingUp,
  Download,
  Share,
  RefreshCw,
  Microscope,
  Satellite,
  Cpu,
  Activity,
  Star,
  Award,
  Shield,
  Sparkles,
  LineChart,
  Clock,
  MapPin,
  Settings,
  FileText,
  Layers,
  Database
} from 'lucide-react';

interface AnalysisResult {
  id: string;
  timestamp: Date;
  image: string;
  type: 'crop-health' | 'disease-detection' | 'pest-identification' | 'growth-analysis' | 'nutrient-deficiency' | 'stress-detection';
  confidence: number;
  findings: {
    primary: string;
    secondary: string[];
    severity: 'low' | 'medium' | 'high' | 'critical';
    recommendations: string[];
    treatmentPlan?: string[];
  };
  metadata: {
    location?: string;
    cropType?: string;
    growthStage?: string;
    weatherConditions?: string;
    soilType?: string;
    plantingDate?: string;
  };
  aiModel: string;
  processingTime: number;
}

export default function AIImageAnalysis() {
  const [selectedTab, setSelectedTab] = useState('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>('auto');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analysisTypes = [
    {
      id: 'auto',
      name: 'Auto Detection',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      description: 'AI automatically detects the best analysis type',
      features: ['Multi-model ensemble', 'Automatic classification', 'Comprehensive scan', 'All-in-one analysis']
    },
    {
      id: 'crop-health',
      name: 'Crop Health Analysis',
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      description: 'Overall plant health assessment',
      features: ['Leaf color analysis', 'Growth pattern recognition', 'Stress detection', 'Nutrient deficiency identification']
    },
    {
      id: 'disease-detection',
      name: 'Disease Detection',
      icon: Microscope,
      color: 'from-red-500 to-pink-600',
      description: 'Identify plant diseases and pathogens',
      features: ['Fungal infection detection', 'Bacterial disease identification', 'Viral symptom recognition', 'Early stage detection']
    },
    {
      id: 'pest-identification',
      name: 'Pest Identification',
      icon: Bug,
      color: 'from-orange-500 to-red-600',
      description: 'Detect and classify agricultural pests',
      features: ['Insect identification', 'Damage pattern analysis', 'Infestation level assessment', 'Treatment recommendations']
    },
    {
      id: 'growth-analysis',
      name: 'Growth Analysis',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600',
      description: 'Monitor crop development and maturity',
      features: ['Growth stage classification', 'Canopy coverage analysis', 'Fruit/grain counting', 'Yield prediction']
    },
    {
      id: 'nutrient-deficiency',
      name: 'Nutrient Analysis',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      description: 'Detect nutrient deficiencies and imbalances',
      features: ['NPK deficiency detection', 'Micronutrient analysis', 'Chlorophyll assessment', 'Fertilizer recommendations']
    },
    {
      id: 'stress-detection',
      name: 'Stress Detection',
      icon: AlertTriangle,
      color: 'from-pink-500 to-rose-600',
      description: 'Identify environmental and biological stress',
      features: ['Water stress detection', 'Heat stress analysis', 'Pathogen stress', 'Chemical stress indicators']
    }
  ];

  const mockAnalysisResults: AnalysisResult[] = [
    {
      id: '1',
      timestamp: new Date(),
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'disease-detection',
      confidence: 94.2,
      findings: {
        primary: 'Late Blight (Phytophthora infestans) detected with high confidence',
        secondary: [
          'Dark brown lesions with yellow halos on leaves',
          'White fungal growth on leaf undersides',
          'Stem browning and water-soaked appearance',
          'Progression from lower to upper leaves observed'
        ],
        severity: 'high',
        recommendations: [
          'Apply copper-based fungicide (Bordeaux mixture) immediately',
          'Improve air circulation by pruning dense foliage',
          'Remove and destroy all affected plant material',
          'Reduce irrigation frequency and avoid overhead watering',
          'Apply preventive fungicide spray to neighboring plants'
        ],
        treatmentPlan: [
          'Day 1: Apply copper fungicide, remove affected leaves',
          'Day 3: Second fungicide application if weather permits',
          'Day 7: Monitor for new symptoms, repeat if necessary',
          'Day 14: Evaluate treatment effectiveness'
        ]
      },
      metadata: {
        location: 'Field A - Section 2',
        cropType: 'Tomato (Solanum lycopersicum)',
        growthStage: 'Flowering stage (60-70 days)',
        weatherConditions: 'High humidity (85%), 24°C, light rain',
        soilType: 'Loamy soil, pH 6.5',
        plantingDate: '2024-01-15'
      },
      aiModel: 'PlantNet-Disease-v3.2',
      processingTime: 2.3
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 300000),
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'nutrient-deficiency',
      confidence: 87.8,
      findings: {
        primary: 'Nitrogen deficiency detected in early stages',
        secondary: [
          'Yellowing of lower leaves (chlorosis)',
          'Reduced leaf size compared to healthy plants',
          'Pale green coloration in upper leaves',
          'Slower growth rate observed'
        ],
        severity: 'medium',
        recommendations: [
          'Apply nitrogen-rich fertilizer (urea or ammonium sulfate)',
          'Consider foliar spray with liquid nitrogen fertilizer',
          'Monitor soil pH - optimal range 6.0-7.0',
          'Increase organic matter through compost application',
          'Schedule regular soil testing for nutrient monitoring'
        ],
        treatmentPlan: [
          'Week 1: Apply 46-0-0 urea at 50kg/acre',
          'Week 2: Foliar spray with liquid nitrogen',
          'Week 3: Monitor response and soil test',
          'Week 4: Adjust treatment based on plant response'
        ]
      },
      metadata: {
        location: 'Field B - Section 1',
        cropType: 'Wheat (Triticum aestivum)',
        growthStage: 'Vegetative stage (30-40 days)',
        weatherConditions: 'Sunny, 22°C, low humidity (45%)',
        soilType: 'Clay loam, pH 6.8',
        plantingDate: '2024-02-01'
      },
      aiModel: 'NutriSense-AI-v2.1',
      processingTime: 1.8
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 600000),
      image: 'https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'pest-identification',
      confidence: 91.5,
      findings: {
        primary: 'Aphid infestation (Myzus persicae) identified',
        secondary: [
          'Small green insects clustered on leaf undersides',
          'Honeydew deposits causing sooty mold growth',
          'Leaf curling and distortion',
          'Presence of winged and wingless forms'
        ],
        severity: 'medium',
        recommendations: [
          'Release beneficial insects (ladybugs, lacewings)',
          'Apply neem oil spray during cooler parts of day',
          'Use reflective mulch to deter flying aphids',
          'Remove heavily infested leaves manually',
          'Monitor for natural predator populations'
        ],
        treatmentPlan: [
          'Day 1: Manual removal + neem oil application',
          'Day 3: Release beneficial insects if available',
          'Day 7: Second neem oil treatment if needed',
          'Day 10: Evaluate population reduction'
        ]
      },
      metadata: {
        location: 'Greenhouse Zone 3',
        cropType: 'Bell Pepper (Capsicum annuum)',
        growthStage: 'Early flowering (45-55 days)',
        weatherConditions: 'Controlled environment, 26°C, 60% humidity',
        soilType: 'Potting mix, pH 6.5',
        plantingDate: '2024-01-20'
      },
      aiModel: 'PestID-Pro-v4.0',
      processingTime: 3.1
    }
  ];

  const aiModels = [
    { name: 'PlantNet-Disease-v3.2', accuracy: '94.7%', specialty: 'Disease Detection' },
    { name: 'CropVision-Health-v2.8', accuracy: '92.3%', specialty: 'General Health' },
    { name: 'NutriSense-AI-v2.1', accuracy: '89.6%', specialty: 'Nutrient Analysis' },
    { name: 'PestID-Pro-v4.0', accuracy: '96.1%', specialty: 'Pest Identification' },
    { name: 'GrowthTracker-v1.9', accuracy: '88.9%', specialty: 'Growth Analysis' },
    { name: 'StressDetect-v3.0', accuracy: '91.2%', specialty: 'Stress Detection' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        performAnalysis(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const performAnalysis = async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI analysis with progress updates
    const progressSteps = [
      { step: 20, message: 'Loading AI models...' },
      { step: 40, message: 'Preprocessing image...' },
      { step: 60, message: 'Running neural network analysis...' },
      { step: 80, message: 'Generating recommendations...' },
      { step: 100, message: 'Analysis complete!' }
    ];

    for (const progressStep of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setAnalysisProgress(progressStep.step);
    }

    // Generate analysis result
    const analysisType = selectedAnalysisType === 'auto' ? 
      ['crop-health', 'disease-detection', 'nutrient-deficiency'][Math.floor(Math.random() * 3)] :
      selectedAnalysisType;

    const newResult: AnalysisResult = {
      id: Date.now().toString(),
      timestamp: new Date(),
      image: imageData,
      type: analysisType as any,
      confidence: 85 + Math.random() * 15,
      findings: {
        primary: 'AI analysis completed successfully',
        secondary: [
          'Image quality: High resolution detected',
          'Lighting conditions: Adequate for analysis',
          'Plant structure: Well-defined features',
          'Background: Clean, minimal interference'
        ],
        severity: 'low',
        recommendations: [
          'Continue monitoring plant health',
          'Maintain current care regimen',
          'Schedule follow-up analysis in 1 week',
          'Document changes for comparison'
        ],
        treatmentPlan: [
          'Day 1: Continue current practices',
          'Day 7: Follow-up image capture',
          'Day 14: Comparative analysis',
          'Day 21: Treatment adjustment if needed'
        ]
      },
      metadata: {
        location: 'User Upload',
        cropType: 'Detected automatically',
        growthStage: 'Analysis in progress',
        weatherConditions: 'Not specified',
        soilType: 'Not specified',
        plantingDate: 'Not specified'
      },
      aiModel: aiModels[Math.floor(Math.random() * aiModels.length)].name,
      processingTime: 2.1 + Math.random() * 2
    };
    
    setAnalysisResults(prev => [newResult, ...prev]);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    const analysisType = analysisTypes.find(t => t.id === type);
    return analysisType ? analysisType.icon : Eye;
  };

  const getTypeColor = (type: string) => {
    const analysisType = analysisTypes.find(t => t.id === type);
    return analysisType ? analysisType.color : 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-12 h-12 bg-white/5 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">AI Computer Vision Analysis</h2>
                    <p className="text-indigo-100">Advanced crop analysis using deep learning</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <div className="text-2xl font-bold">97.3%</div>
                    <div className="text-sm text-indigo-100">AI Accuracy</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <div className="text-2xl font-bold">2.1s</div>
                    <div className="text-sm text-indigo-100">Analysis Time</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-indigo-100">Crop Types</div>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Cpu className="h-5 w-5" />
                    <span className="font-semibold">AI Engine</span>
                  </div>
                  <div className="text-sm">Deep Learning CNN</div>
                  <div className="text-xs text-indigo-200">TensorFlow 2.x</div>
                </motion.div>
                
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-5 w-5" />
                    <span className="font-semibold">Live Analysis</span>
                  </div>
                  <div className="text-sm">Real-time Processing</div>
                  <div className="text-xs text-indigo-200">GPU Accelerated</div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analysis Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span>AI Analysis Capabilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analysisTypes.map((type, index) => {
                const IconComponent = type.icon;
                const isSelected = selectedAnalysisType === type.id;
                return (
                  <motion.div
                    key={type.id}
                    className={`p-4 rounded-lg bg-gradient-to-br ${type.color} text-white cursor-pointer hover:shadow-lg transition-all duration-300 ${
                      isSelected ? 'ring-4 ring-white/50 scale-105' : ''
                    }`}
                    onClick={() => setSelectedAnalysisType(type.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="h-6 w-6" />
                      </motion.div>
                      <h3 className="font-semibold text-sm">{type.name}</h3>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-xs opacity-90 mb-3">{type.description}</p>
                    <div className="space-y-1">
                      {type.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="text-xs opacity-80 flex items-center">
                          <CheckCircle2 className="h-2 w-2 mr-1" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Analysis Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span>Image Analysis Center</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
                <TabsTrigger value="results">Analysis Results</TabsTrigger>
                <TabsTrigger value="history">Analysis History</TabsTrigger>
                <TabsTrigger value="models">AI Models</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Upload Area */}
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                      {selectedImage ? (
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={selectedImage} 
                            alt="Uploaded crop" 
                            className="max-w-full h-48 object-cover mx-auto rounded-lg shadow-lg"
                          />
                          {isAnalyzing ? (
                            <motion.div className="space-y-3">
                              <div className="flex items-center justify-center space-x-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                  <Scan className="h-5 w-5 text-blue-600" />
                                </motion.div>
                                <span className="text-sm font-medium">AI is analyzing your image...</span>
                              </div>
                              <Progress value={analysisProgress} className="w-full" />
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                Processing with {aiModels.find(m => m.specialty === (selectedAnalysisType === 'auto' ? 'General Health' : analysisTypes.find(t => t.id === selectedAnalysisType)?.name))?.name || 'AI models'}...
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Analysis progress: {analysisProgress}%
                              </div>
                            </motion.div>
                          ) : (
                            <div className="space-y-2">
                              <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto" />
                              <p className="text-sm font-medium">Image uploaded successfully!</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Analysis complete. Check results below.
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="space-y-4">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Camera className="h-16 w-16 mx-auto text-gray-400" />
                          </motion.div>
                          <div>
                            <p className="text-lg font-medium">Upload Crop Image for AI Analysis</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              Take a clear photo of your crops, leaves, or any agricultural concerns
                            </p>
                          </div>
                          <div className="flex justify-center space-x-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              <Brain className="h-3 w-3 mr-1" />
                              AI Powered
                            </Badge>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              <Zap className="h-3 w-3 mr-1" />
                              Real-time
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                              <Shield className="h-3 w-3 mr-1" />
                              Secure
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600"
                        disabled={isAnalyzing}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled={isAnalyzing}
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

                    {/* Analysis Configuration */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Analysis Configuration</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Selected Analysis Type:</label>
                          <div className="mt-1">
                            <Badge className={`bg-gradient-to-r ${getTypeColor(selectedAnalysisType)} text-white`}>
                              {analysisTypes.find(t => t.id === selectedAnalysisType)?.name || 'Auto Detection'}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Quality: High Resolution</div>
                          <div>Processing: GPU Accelerated</div>
                          <div>Models: {aiModels.length} Available</div>
                          <div>Security: End-to-End Encrypted</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Options */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">AI Models Available</h3>
                    <div className="space-y-3">
                      {aiModels.map((model, index) => (
                        <motion.div
                          key={model.name}
                          className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${
                            index % 3 === 0 ? 'from-blue-500 to-cyan-500' :
                            index % 3 === 1 ? 'from-green-500 to-emerald-500' :
                            'from-purple-500 to-pink-500'
                          }`}>
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{model.name}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{model.specialty}</p>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            <div className="text-right">
                              <div className="font-medium text-green-600">{model.accuracy}</div>
                              <div>accuracy</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Processing Pipeline</h4>
                      <div className="space-y-2">
                        {[
                          'Image preprocessing & enhancement',
                          'Multi-model ensemble analysis',
                          'Confidence scoring & validation',
                          'Treatment recommendation generation',
                          'Report compilation & export'
                        ].map((step, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              index < 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {index + 1}
                            </div>
                            <span className={index < 3 ? 'text-green-700' : 'text-gray-600'}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                {analysisResults.length > 0 ? (
                  <div className="space-y-4">
                    {analysisResults.map((result, index) => {
                      const IconComponent = getTypeIcon(result.type);
                      return (
                        <motion.div
                          key={result.id}
                          className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Image and Basic Info */}
                            <div className="space-y-4">
                              <img 
                                src={result.image} 
                                alt="Analysis result" 
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                              />
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Badge className={getSeverityColor(result.findings.severity)}>
                                    {result.findings.severity} severity
                                  </Badge>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                    {result.confidence.toFixed(1)}% confident
                                  </Badge>
                                </div>
                                <Progress value={result.confidence} className="h-2" />
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>Model: {result.aiModel}</div>
                                  <div>Time: {result.processingTime.toFixed(1)}s</div>
                                  <div>Type: {analysisTypes.find(t => t.id === result.type)?.name}</div>
                                  <div>Quality: High</div>
                                </div>
                              </div>
                            </div>

                            {/* Analysis Details */}
                            <div className="lg:col-span-2 space-y-4">
                              <div className="flex items-center space-x-2">
                                <IconComponent className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                <h3 className="font-semibold text-lg">{result.findings.primary}</h3>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-sm mb-2 flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Key Findings:
                                  </h4>
                                  <ul className="space-y-1">
                                    {result.findings.secondary.map((finding, findingIndex) => (
                                      <li key={findingIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                        <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        {finding}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sm mb-2 flex items-center">
                                    <Target className="h-3 w-3 mr-1" />
                                    Recommendations:
                                  </h4>
                                  <ul className="space-y-1">
                                    {result.findings.recommendations.slice(0, 4).map((rec, recIndex) => (
                                      <li key={recIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                        <Zap className="h-3 w-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                        {rec}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Treatment Plan */}
                              {result.findings.treatmentPlan && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2 flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Treatment Timeline:
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {result.findings.treatmentPlan.map((step, stepIndex) => (
                                      <div key={stepIndex} className="text-xs p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                        {step}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="border-t pt-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500 dark:text-gray-400">Location:</span>
                                    <div className="font-medium">{result.metadata.location}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 dark:text-gray-400">Crop:</span>
                                    <div className="font-medium">{result.metadata.cropType}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 dark:text-gray-400">Stage:</span>
                                    <div className="font-medium">{result.metadata.growthStage}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 dark:text-gray-400">Analyzed:</span>
                                    <div className="font-medium">{result.timestamp.toLocaleTimeString()}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600">
                                  <Download className="h-3 w-3 mr-1" />
                                  Export Report
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Share className="h-3 w-3 mr-1" />
                                  Share Results
                                </Button>
                                <Button size="sm" variant="outline">
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Reanalyze
                                </Button>
                                <Button size="sm" variant="outline">
                                  <FileText className="h-3 w-3 mr-1" />
                                  Treatment Plan
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Eye className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-medium mb-2">No Analysis Results Yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Upload an image to start AI-powered crop analysis
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div className="space-y-4">
                  {mockAnalysisResults.map((result, index) => {
                    const IconComponent = getTypeIcon(result.type);
                    return (
                      <motion.div
                        key={result.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, x: 5 }}
                      >
                        <img 
                          src={result.image} 
                          alt="Analysis" 
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <IconComponent className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            <h4 className="font-semibold">{result.findings.primary}</h4>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{result.metadata.location}</span>
                            <span>•</span>
                            <span>{result.metadata.cropType}</span>
                            <span>•</span>
                            <span>{result.timestamp.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getSeverityColor(result.findings.severity)}>
                            {result.findings.severity}
                          </Badge>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {result.confidence.toFixed(1)}% confidence
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="models" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiModels.map((model, index) => (
                    <motion.div
                      key={model.name}
                      className="p-4 border rounded-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${
                          index % 4 === 0 ? 'from-blue-500 to-cyan-500' :
                          index % 4 === 1 ? 'from-green-500 to-emerald-500' :
                          index % 4 === 2 ? 'from-purple-500 to-pink-500' :
                          'from-orange-500 to-red-500'
                        }`}>
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{model.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{model.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Accuracy</span>
                          <span className="font-bold text-green-600">{model.accuracy}</span>
                        </div>
                        <Progress value={parseFloat(model.accuracy)} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                          <div>Status: <span className="text-green-600">Active</span></div>
                          <div>Version: Latest</div>
                          <div>Updated: 2024</div>
                          <div>GPU: Optimized</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Model Performance Comparison</h3>
                  <div className="space-y-3">
                    {aiModels.map((model, index) => (
                      <div key={model.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="font-medium">{model.name}</span>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">{model.specialty}</div>
                          <div className="w-24">
                            <Progress value={parseFloat(model.accuracy)} className="h-2" />
                          </div>
                          <span className="font-bold text-green-600 min-w-[60px]">{model.accuracy}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}