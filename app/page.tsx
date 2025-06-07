'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Cpu, 
  Droplets, 
  Dna, 
  MessageCircle, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  Leaf,
  Fish,
  Wheat,
  Bot,
  BarChart3,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Smartphone,
  Satellite,
  CloudRain,
  Sun,
  Thermometer,
  Wind,
  Eye,
  Calculator,
  Calendar,
  Users,
  IndianRupee,
  Tractor,
  Sprout,
  TreePine,
  Mountain,
  Waves,
  Star,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Plane,
  Camera,
  Microscope,
  Wallet,
  Mic,
  Brain
} from 'lucide-react';
import AIFarmingAssistant from '@/components/AIFarmingAssistant';
import FloatingAIAssistant from '@/components/FloatingAIAssistant';
import PlatformComparison from '@/components/PlatformComparison';
import TechnicalArchitecture from '@/components/TechnicalArchitecture';
import FarmerCommunity from '@/components/FarmerCommunity';
import YouTubeIntegration from '@/components/YouTubeIntegration';
import VideoUpload from '@/components/VideoUpload';
import QuickAccess from '@/components/QuickAccess';
import ImplementationGuide from '@/components/ImplementationGuide';
import CropAdvisor from '@/components/CropAdvisor';
import WeatherDashboard from '@/components/WeatherDashboard';
import MarketPrices from '@/components/MarketPrices';
import SmartIrrigation from '@/components/SmartIrrigation';
import SoilHealthMonitor from '@/components/SoilHealthMonitor';
import CropCalendar from '@/components/CropCalendar';
import FarmAnalytics from '@/components/FarmAnalytics';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import DroneMonitoring from '@/components/DroneMonitoring';
import CropDiseaseDetection from '@/components/CropDiseaseDetection';
import FarmFinanceManager from '@/components/FarmFinanceManager';
import VoiceAssistant from '@/components/VoiceAssistant';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [weatherAnimation, setWeatherAnimation] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN'));
    };
    
    updateTime(); // Set initial time
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const platforms = [
    {
      id: 'genetrust',
      name: 'GeneTrust',
      subtitle: 'Precision Crop Gene Editing',
      icon: Dna,
      color: 'from-green-500 to-emerald-600',
      domains: ['Genetics', 'AI', 'Blockchain'],
      maturity: 85,
      description: 'Revolutionary CRISPR-based gene editing platform combining AI-driven guide RNA design, real-time lab monitoring, and blockchain security for Indian crop varieties.',
      keyFeatures: [
        'AI-powered guide RNA optimization for Indian crops',
        'IoT lab environment monitoring',
        'Blockchain data integrity',
        'Regulatory compliance tracking',
        'Drought-resistant variety development',
        'Pest-resistant crop engineering'
      ],
      metrics: {
        accuracy: '95%',
        timeReduction: '70%',
        costSaving: '40%',
        scalability: 'High'
      },
      indianContext: {
        crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize'],
        benefits: 'Develop climate-resilient varieties for Indian conditions',
        investment: '₹15-50 lakhs for research institutions'
      }
    },
    {
      id: 'agrotwin',
      name: 'AgroTwin Intelligence',
      subtitle: 'Multi-Domain Digital Twin Platform',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-600',
      domains: ['Digital Twin', 'IoT', 'Quantum Sensors'],
      maturity: 78,
      description: 'Comprehensive farm digital twin integrating soil health, crop monitoring, weather prediction, and livestock management tailored for Indian farming conditions.',
      keyFeatures: [
        'Quantum soil sensors for Indian soil types',
        'Edge AI hyperspectral imaging',
        'Monsoon prediction modeling',
        'Multi-farm collaboration network',
        'Regional crop advisory system',
        'Integrated pest management'
      ],
      metrics: {
        accuracy: '92%',
        timeReduction: '60%',
        costSaving: '35%',
        scalability: 'Very High'
      },
      indianContext: {
        crops: ['All major Indian crops', 'Regional varieties'],
        benefits: 'Optimize for monsoon patterns and local conditions',
        investment: '₹5-25 lakhs for medium farms'
      }
    },
    {
      id: 'aquaterra',
      name: 'AquaTerra Nexus',
      subtitle: 'Integrated Water-Land Ecosystem AI',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-600',
      domains: ['Aquaponics', 'Water Management', 'Ecosystem AI'],
      maturity: 72,
      description: 'First truly integrated land-water agricultural system optimizing aquaponics, irrigation, and livestock water management for water-scarce Indian regions.',
      keyFeatures: [
        'AI-optimized aquaponics for Indian fish varieties',
        'Smart water cycling and conservation',
        'Ecosystem health scoring',
        'Water-to-food efficiency maximization',
        'Groundwater monitoring integration',
        'Rainwater harvesting optimization'
      ],
      metrics: {
        accuracy: '89%',
        timeReduction: '65%',
        costSaving: '45%',
        scalability: 'High'
      },
      indianContext: {
        crops: ['Rice-fish systems', 'Aquaponics vegetables'],
        benefits: 'Maximize water efficiency in drought-prone areas',
        investment: '₹8-30 lakhs for integrated systems'
      }
    }
  ];

  const indianStats = [
    {
      icon: Users,
      value: '60%',
      label: 'Population in Agriculture',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: MapPin,
      value: '146M',
      label: 'Agricultural Holdings',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: IndianRupee,
      value: '₹50T',
      label: 'Agricultural GDP',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Droplets,
      value: '40%',
      label: 'Water Usage Reduction Potential',
      color: 'text-cyan-600 dark:text-cyan-400'
    }
  ];

  const quickActions = [
    {
      icon: CloudRain,
      title: 'Weather Forecast',
      description: 'Real-time weather updates',
      color: 'from-blue-500 to-cyan-500',
      action: () => setActiveTab('weather')
    },
    {
      icon: IndianRupee,
      title: 'Market Prices',
      description: 'Live commodity prices',
      color: 'from-green-500 to-emerald-500',
      action: () => setActiveTab('market')
    },
    {
      icon: Sprout,
      title: 'Crop Advisory',
      description: 'AI-powered recommendations',
      color: 'from-orange-500 to-red-500',
      action: () => setActiveTab('crops')
    },
    {
      icon: Droplets,
      title: 'Smart Irrigation',
      description: 'Water management system',
      color: 'from-cyan-500 to-blue-500',
      action: () => setActiveTab('irrigation')
    }
  ];

  const advancedFeatures = [
    {
      icon: Plane,
      title: 'Drone Monitoring',
      description: 'Aerial crop surveillance with AI analysis',
      color: 'from-purple-500 to-pink-600',
      action: () => setActiveTab('drone'),
      badge: 'New'
    },
    {
      icon: Microscope,
      title: 'Disease Detection',
      description: 'AI-powered crop disease identification',
      color: 'from-teal-500 to-green-600',
      action: () => setActiveTab('disease'),
      badge: 'AI'
    },
    {
      icon: Wallet,
      title: 'Finance Manager',
      description: 'Complete farm financial management',
      color: 'from-emerald-500 to-green-600',
      action: () => setActiveTab('finance'),
      badge: 'Pro'
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Control your farm with voice commands',
      color: 'from-pink-500 to-purple-600',
      action: () => setActiveTab('voice'),
      badge: 'Voice'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green-200 dark:bg-green-800/30 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-200 dark:bg-blue-800/30 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-200 dark:bg-cyan-800/30 rounded-full opacity-20"
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-green-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  किसान AI प्लेटफॉर्म
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Smart Agriculture for Indian Farmers</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                {mounted && <span>{currentTime}</span>}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="crops">Crop Advisory</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
              <TabsTrigger value="soil">Soil Health</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="schemes">Schemes</TabsTrigger>
              <TabsTrigger value="drone">Drone</TabsTrigger>
              <TabsTrigger value="disease">Disease AI</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="voice">Voice</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="architecture">Tech</TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <motion.h2 
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        भारतीय कृषि का भविष्य
                      </motion.h2>
                      <motion.p 
                        className="text-xl mb-6 text-green-100"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        AI-powered smart farming solutions designed specifically for Indian agriculture
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                      >
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Satellite className="h-3 w-3 mr-1" />
                          Satellite Monitoring
                        </Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Bot className="h-3 w-3 mr-1" />
                          AI Recommendations
                        </Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Smartphone className="h-3 w-3 mr-1" />
                          Mobile First
                        </Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Brain className="h-3 w-3 mr-1" />
                          Voice Control
                        </Badge>
                      </motion.div>
                    </div>
                    <div className="relative">
                      <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        {indianStats.map((stat, index) => {
                          const IconComponent = stat.icon;
                          return (
                            <motion.div
                              key={index}
                              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <IconComponent className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                              <div className="text-2xl font-bold">{stat.value}</div>
                              <div className="text-sm text-green-100">{stat.label}</div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-yellow-600" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card 
                            className={`cursor-pointer bg-gradient-to-br ${action.color} text-white border-0 hover:shadow-lg transition-all duration-300`}
                            onClick={action.action}
                          >
                            <CardContent className="p-4 text-center">
                              <IconComponent className="h-8 w-8 mx-auto mb-2" />
                              <h3 className="font-semibold">{action.title}</h3>
                              <p className="text-sm opacity-90">{action.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Advanced Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-6 w-6 text-purple-600" />
                    <span>Advanced AI Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {advancedFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card 
                            className={`cursor-pointer bg-gradient-to-br ${feature.color} text-white border-0 hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                            onClick={feature.action}
                          >
                            {feature.badge && (
                              <Badge className="absolute top-2 right-2 bg-white/20 text-white border-white/30 text-xs">
                                {feature.badge}
                              </Badge>
                            )}
                            <CardContent className="p-4 text-center">
                              <IconComponent className="h-8 w-8 mx-auto mb-2" />
                              <h3 className="font-semibold">{feature.title}</h3>
                              <p className="text-sm opacity-90">{feature.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Platform Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {platforms.map((platform, index) => {
                  const IconComponent = platform.icon;
                  return (
                    <motion.div
                      key={platform.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <motion.div 
                              className={`p-3 rounded-lg bg-gradient-to-r ${platform.color}`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <IconComponent className="h-8 w-8 text-white" />
                            </motion.div>
                            <div className="flex flex-wrap gap-1">
                              {platform.domains.map((domain) => (
                                <Badge key={domain} variant="secondary" className="text-xs">
                                  {domain}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <CardTitle className="text-xl">{platform.name}</CardTitle>
                          <CardDescription className="dark:text-gray-400">{platform.subtitle}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{platform.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Platform Maturity</span>
                              <span>{platform.maturity}%</span>
                            </div>
                            <Progress value={platform.maturity} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Key Features:</h4>
                            <ul className="space-y-1">
                              {platform.keyFeatures.slice(0, 4).map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t pt-3 dark:border-gray-700">
                            <h4 className="font-medium text-sm text-orange-600 dark:text-orange-400 mb-2">Indian Context:</h4>
                            <div className="space-y-1 text-xs">
                              <div><strong>Crops:</strong> {platform.indianContext.crops.join(', ')}</div>
                              <div><strong>Investment:</strong> {platform.indianContext.investment}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Accuracy:</span>
                              <span className="ml-1 font-medium">{platform.metrics.accuracy}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Time Saved:</span>
                              <span className="ml-1 font-medium">{platform.metrics.timeReduction}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Cost Reduction:</span>
                              <span className="ml-1 font-medium">{platform.metrics.costSaving}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Scalability:</span>
                              <span className="ml-1 font-medium">{platform.metrics.scalability}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Market Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-blue-600" />
                    <span>Impact on Indian Agriculture</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div 
                      className="text-center space-y-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit mx-auto">
                        <Wheat className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="text-lg font-semibold">50M+ Hectares</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Under Smart Management</div>
                    </motion.div>
                    <motion.div 
                      className="text-center space-y-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-lg font-semibold">10M+ Farmers</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Using AI Technology</div>
                    </motion.div>
                    <motion.div 
                      className="text-center space-y-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-full w-fit mx-auto">
                        <Droplets className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="text-lg font-semibold">40% Reduction</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">In Water Usage</div>
                    </motion.div>
                    <motion.div 
                      className="text-center space-y-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-fit mx-auto">
                        <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="text-lg font-semibold">35% Increase</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">In Crop Yields</div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="crops">
            <CropAdvisor />
          </TabsContent>

          <TabsContent value="weather">
            <WeatherDashboard />
          </TabsContent>

          <TabsContent value="market">
            <MarketPrices />
          </TabsContent>

          <TabsContent value="irrigation">
            <SmartIrrigation />
          </TabsContent>

          <TabsContent value="soil">
            <SoilHealthMonitor />
          </TabsContent>

          <TabsContent value="calendar">
            <CropCalendar />
          </TabsContent>

          <TabsContent value="analytics">
            <FarmAnalytics />
          </TabsContent>

          <TabsContent value="schemes">
            <GovernmentSchemes />
          </TabsContent>

          <TabsContent value="drone">
            <DroneMonitoring />
          </TabsContent>

          <TabsContent value="disease">
            <CropDiseaseDetection />
          </TabsContent>

          <TabsContent value="finance">
            <FarmFinanceManager />
          </TabsContent>

          <TabsContent value="voice">
            <VoiceAssistant />
          </TabsContent>

          <TabsContent value="community">
            <FarmerCommunity />
          </TabsContent>

          <TabsContent value="videos">
            <div className="space-y-6">
              <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="youtube">YouTube Videos</TabsTrigger>
                  <TabsTrigger value="upload">Upload Video</TabsTrigger>
                </TabsList>
                <TabsContent value="youtube">
                  <YouTubeIntegration />
                </TabsContent>
                <TabsContent value="upload">
                  <VideoUpload />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="architecture">
            <TechnicalArchitecture />
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />
    </div>
  );
}