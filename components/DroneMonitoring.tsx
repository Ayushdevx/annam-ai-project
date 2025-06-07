'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plane, 
  Camera, 
  Satellite, 
  MapPin, 
  Battery, 
  Wifi,
  Play,
  Pause,
  RotateCcw,
  Download,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Thermometer,
  Droplets,
  Bug,
  Leaf
} from 'lucide-react';

export default function DroneMonitoring() {
  const [selectedDrone, setSelectedDrone] = useState('drone1');
  const [isFlying, setIsFlying] = useState(false);
  const [missionProgress, setMissionProgress] = useState(0);

  const drones = [
    {
      id: 'drone1',
      name: 'AgroScout-1',
      status: 'active',
      battery: 85,
      altitude: 120,
      speed: 15,
      location: 'Field A - Sector 2',
      mission: 'Crop Health Survey',
      coverage: 75,
      flightTime: '45 min',
      lastMaintenance: '2 days ago'
    },
    {
      id: 'drone2',
      name: 'AgroScout-2',
      status: 'charging',
      battery: 100,
      altitude: 0,
      speed: 0,
      location: 'Base Station',
      mission: 'Standby',
      coverage: 0,
      flightTime: '0 min',
      lastMaintenance: '1 day ago'
    },
    {
      id: 'drone3',
      name: 'AgroScout-3',
      status: 'maintenance',
      battery: 45,
      altitude: 0,
      speed: 0,
      location: 'Service Center',
      mission: 'Maintenance',
      coverage: 0,
      flightTime: '0 min',
      lastMaintenance: 'In progress'
    }
  ];

  const missionData = {
    totalArea: 250,
    coveredArea: 187,
    remainingArea: 63,
    estimatedTime: '2h 15m',
    detectedIssues: 12,
    healthyAreas: 85,
    concernAreas: 15
  };

  const detectedIssues = [
    {
      type: 'pest',
      severity: 'high',
      location: 'Field A - Grid 15',
      description: 'Brown planthopper infestation detected',
      confidence: 92,
      action: 'Immediate spraying required'
    },
    {
      type: 'disease',
      severity: 'medium',
      location: 'Field B - Grid 8',
      description: 'Early blight symptoms observed',
      confidence: 78,
      action: 'Monitor and apply fungicide'
    },
    {
      type: 'nutrient',
      severity: 'low',
      location: 'Field C - Grid 22',
      description: 'Nitrogen deficiency signs',
      confidence: 85,
      action: 'Apply nitrogen fertilizer'
    },
    {
      type: 'water',
      severity: 'medium',
      location: 'Field A - Grid 30',
      description: 'Water stress indicators',
      confidence: 88,
      action: 'Increase irrigation frequency'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'charging': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'maintenance': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'pest': return Bug;
      case 'disease': return AlertTriangle;
      case 'nutrient': return Leaf;
      case 'water': return Droplets;
      default: return AlertTriangle;
    }
  };

  useEffect(() => {
    if (isFlying) {
      const interval = setInterval(() => {
        setMissionProgress(prev => {
          if (prev >= 100) {
            setIsFlying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isFlying]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Plane className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Drone Monitoring System</h2>
                    <p className="text-blue-100">AI-powered aerial crop surveillance</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{missionData.coveredArea}</div>
                    <div className="text-sm text-blue-100">Acres Surveyed</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{detectedIssues.length}</div>
                    <div className="text-sm text-blue-100">Issues Detected</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-blue-100">Active Drones</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5" />
                    <span className="font-semibold">Mission Progress</span>
                  </div>
                  <div className="text-2xl font-bold">{missionProgress}%</div>
                  <Progress value={missionProgress} className="mt-2" />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => setIsFlying(!isFlying)}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {isFlying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                    {isFlying ? 'Pause' : 'Start'} Mission
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Drone Fleet Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Satellite className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Drone Fleet Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {drones.map((drone, index) => (
                <motion.div
                  key={drone.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedDrone === drone.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedDrone(drone.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{drone.name}</h3>
                    <Badge className={getStatusColor(drone.status)}>
                      {drone.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Battery className="h-3 w-3 text-green-500" />
                        <span className="text-xs">Battery</span>
                      </div>
                      <span className="text-sm font-medium">{drone.battery}%</span>
                    </div>
                    <Progress value={drone.battery} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Altitude:</span>
                        <span className="ml-1 font-medium">{drone.altitude}m</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Speed:</span>
                        <span className="ml-1 font-medium">{drone.speed} km/h</span>
                      </div>
                    </div>
                    
                    <div className="text-xs">
                      <div className="text-gray-500 dark:text-gray-400">Mission:</div>
                      <div className="font-medium">{drone.mission}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Feed & Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span>Live Feed - {drones.find(d => d.id === selectedDrone)?.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20"></div>
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    LIVE • {new Date().toLocaleTimeString()}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Field A - Sector 2 | Alt: 120m
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Drone Camera Feed</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Return
                  </Button>
                  <Button size="sm" variant="outline">
                    <Zap className="h-3 w-3 mr-1" />
                    Auto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detected Issues */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <span>Detected Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detectedIssues.map((issue, index) => {
                  const IconComponent = getIssueIcon(issue.type);
                  return (
                    <motion.div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          <span className="font-medium capitalize">{issue.type} Issue</span>
                        </div>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600 dark:text-gray-400">{issue.description}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Location: {issue.location} • Confidence: {issue.confidence}%
                        </div>
                        <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          Action: {issue.action}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <Progress value={issue.confidence} className="h-1" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Mission Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span>Mission Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="coverage" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="coverage">Coverage</TabsTrigger>
                <TabsTrigger value="health">Crop Health</TabsTrigger>
                <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="coverage" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{missionData.coveredArea}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Acres Covered</div>
                    <Progress value={(missionData.coveredArea / missionData.totalArea) * 100} className="mt-2" />
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{missionData.remainingArea}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Acres Remaining</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">ETA: {missionData.estimatedTime}</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round((missionData.coveredArea / missionData.totalArea) * 100)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completion</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">On Schedule</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="health" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Healthy Areas</h4>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{missionData.healthyAreas}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">of surveyed area</div>
                    <Progress value={missionData.healthyAreas} className="mt-2" />
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Areas of Concern</h4>
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">{missionData.concernAreas}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">require attention</div>
                    <Progress value={missionData.concernAreas} className="mt-2" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-blue-700 dark:text-blue-400">Immediate Actions</span>
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• Apply pesticide to Grid 15 for planthopper control</li>
                      <li>• Increase irrigation in Grid 30 to address water stress</li>
                      <li>• Monitor Grid 8 for disease progression</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-700 dark:text-green-400">Optimization Opportunities</span>
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• Reduce fertilizer application in over-performing areas</li>
                      <li>• Adjust irrigation schedule based on soil moisture data</li>
                      <li>• Consider crop rotation in underperforming sections</li>
                    </ul>
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