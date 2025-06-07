'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Droplets, 
  Zap, 
  Clock, 
  Thermometer, 
  Wind, 
  Sun, 
  CloudRain,
  Gauge,
  Settings,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Wifi,
  Battery,
  Target,
  BarChart3,
  Leaf,
  Sprout
} from 'lucide-react';

export default function SmartIrrigation() {
  const [systemStatus, setSystemStatus] = useState('auto');
  const [irrigationActive, setIrrigationActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [moistureThreshold, setMoistureThreshold] = useState([65]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const zones = [
    {
      id: 'zone1',
      name: 'Field A - Wheat',
      crop: 'Wheat',
      area: '2.5 acres',
      soilMoisture: 72,
      temperature: 28,
      humidity: 65,
      status: 'optimal',
      lastIrrigation: '2 hours ago',
      nextScheduled: '6 hours',
      waterUsed: 450,
      efficiency: 92,
      sensors: 4,
      batteryLevel: 85
    },
    {
      id: 'zone2',
      name: 'Field B - Rice',
      crop: 'Rice',
      area: '3.2 acres',
      soilMoisture: 58,
      temperature: 30,
      humidity: 70,
      status: 'needs_water',
      lastIrrigation: '8 hours ago',
      nextScheduled: 'Now',
      waterUsed: 680,
      efficiency: 88,
      sensors: 6,
      batteryLevel: 92
    },
    {
      id: 'zone3',
      name: 'Field C - Cotton',
      crop: 'Cotton',
      area: '4.1 acres',
      soilMoisture: 45,
      temperature: 32,
      humidity: 55,
      status: 'critical',
      lastIrrigation: '12 hours ago',
      nextScheduled: 'Urgent',
      waterUsed: 520,
      efficiency: 85,
      sensors: 5,
      batteryLevel: 78
    },
    {
      id: 'zone4',
      name: 'Field D - Vegetables',
      crop: 'Mixed Vegetables',
      area: '1.8 acres',
      soilMoisture: 78,
      temperature: 26,
      humidity: 75,
      status: 'optimal',
      lastIrrigation: '4 hours ago',
      nextScheduled: '8 hours',
      waterUsed: 320,
      efficiency: 95,
      sensors: 3,
      batteryLevel: 88
    }
  ];

  const weatherData = {
    current: {
      temperature: 29,
      humidity: 68,
      windSpeed: 12,
      rainfall: 0,
      evapotranspiration: 5.2
    },
    forecast: [
      { day: 'Today', temp: 29, humidity: 68, rain: 0, et: 5.2 },
      { day: 'Tomorrow', temp: 31, humidity: 65, rain: 15, et: 5.8 },
      { day: 'Day 3', temp: 28, humidity: 75, rain: 25, et: 4.5 },
      { day: 'Day 4', temp: 27, humidity: 80, rain: 40, et: 3.8 },
      { day: 'Day 5', temp: 30, humidity: 62, rain: 5, et: 6.1 }
    ]
  };

  const systemStats = {
    totalWaterUsed: 1970,
    waterSaved: 785,
    efficiency: 90,
    activeSensors: 18,
    alerts: 2,
    energyUsed: 45,
    costSavings: 2850
  };

  const irrigationSchedule = [
    { time: '06:00', zone: 'Field A', duration: '45 min', status: 'completed' },
    { time: '07:30', zone: 'Field D', duration: '30 min', status: 'completed' },
    { time: '14:00', zone: 'Field B', duration: '60 min', status: 'active' },
    { time: '16:30', zone: 'Field C', duration: '75 min', status: 'scheduled' },
    { time: '18:00', zone: 'Field A', duration: '30 min', status: 'scheduled' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-700';
      case 'needs_water': return 'bg-yellow-100 text-yellow-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return CheckCircle2;
      case 'needs_water': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return CheckCircle2;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Droplets className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Smart Irrigation System</h2>
                    <p className="text-blue-100">AI-powered water management</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">{systemStats.totalWaterUsed}L</div>
                    <div className="text-sm text-blue-100">Water Used Today</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">{systemStats.waterSaved}L</div>
                    <div className="text-sm text-blue-100">Water Saved</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">{systemStats.efficiency}%</div>
                    <div className="text-sm text-blue-100">Efficiency</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">₹{systemStats.costSavings}</div>
                    <div className="text-sm text-blue-100">Cost Savings</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">System Control</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Auto Mode</span>
                      <Switch 
                        checked={autoMode} 
                        onCheckedChange={setAutoMode}
                        className="data-[state=checked]:bg-white/30"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span>Moisture Threshold</span>
                      <span className="font-semibold">{moistureThreshold[0]}%</span>
                    </div>
                    <Slider
                      value={moistureThreshold}
                      onValueChange={setMoistureThreshold}
                      max={100}
                      min={30}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zone Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-green-600" />
              <span>Zone Monitoring</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map((zone, index) => {
                const StatusIcon = getStatusIcon(zone.status);
                return (
                  <motion.div
                    key={zone.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{zone.name}</h3>
                        <p className="text-sm text-gray-600">{zone.crop} • {zone.area}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(zone.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {zone.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded">
                        <div className="flex items-center space-x-1">
                          <Droplets className="h-3 w-3 text-blue-600" />
                          <span className="text-xs text-gray-600">Soil Moisture</span>
                        </div>
                        <div className="font-semibold">{zone.soilMoisture}%</div>
                        <Progress value={zone.soilMoisture} className="h-1 mt-1" />
                      </div>
                      <div className="p-2 bg-orange-50 rounded">
                        <div className="flex items-center space-x-1">
                          <Thermometer className="h-3 w-3 text-orange-600" />
                          <span className="text-xs text-gray-600">Temperature</span>
                        </div>
                        <div className="font-semibold">{zone.temperature}°C</div>
                      </div>
                      <div className="p-2 bg-cyan-50 rounded">
                        <div className="flex items-center space-x-1">
                          <Wind className="h-3 w-3 text-cyan-600" />
                          <span className="text-xs text-gray-600">Humidity</span>
                        </div>
                        <div className="font-semibold">{zone.humidity}%</div>
                      </div>
                      <div className="p-2 bg-green-50 rounded">
                        <div className="flex items-center space-x-1">
                          <Gauge className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-gray-600">Efficiency</span>
                        </div>
                        <div className="font-semibold">{zone.efficiency}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Last: {zone.lastIrrigation}</span>
                      <span>Next: {zone.nextScheduled}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-3 w-3 text-green-500" />
                        <span className="text-xs">{zone.sensors} sensors</span>
                        <Battery className="h-3 w-3 text-blue-500" />
                        <span className="text-xs">{zone.batteryLevel}%</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Droplets className="h-3 w-3 mr-1" />
                        Irrigate
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Integration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CloudRain className="h-6 w-6 text-blue-600" />
                <span>Weather Integration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                    <div className="font-semibold">{weatherData.current.temperature}°C</div>
                    <div className="text-xs text-gray-600">Temperature</div>
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg text-center">
                    <Droplets className="h-5 w-5 mx-auto mb-1 text-cyan-600" />
                    <div className="font-semibold">{weatherData.current.humidity}%</div>
                    <div className="text-xs text-gray-600">Humidity</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <Wind className="h-5 w-5 mx-auto mb-1 text-green-600" />
                    <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                    <div className="text-xs text-gray-600">Wind Speed</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <Sun className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                    <div className="font-semibold">{weatherData.current.evapotranspiration} mm</div>
                    <div className="text-xs text-gray-600">ET Rate</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">5-Day Forecast Impact</h4>
                  <div className="space-y-2">
                    {weatherData.forecast.map((day, index) => (
                      
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium w-16">{day.day}</span>
                        <div className="flex items-center space-x-2 text-xs">
                          <span>{day.temp}°C</span>
                          <span>{day.humidity}%</span>
                          <span className="text-blue-600">{day.rain}mm</span>
                        </div>
                        <div className="text-xs">
                          {day.rain > 20 ? (
                            <Badge className="bg-blue-100 text-blue-700">Skip irrigation</Badge>
                          ) : day.et > 5.5 ? (
                            <Badge className="bg-red-100 text-red-700">Increase water</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">Normal</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Irrigation Schedule */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {irrigationSchedule.map((schedule, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      schedule.status === 'active' 
                        ? 'bg-blue-50 border-blue-200' 
                        : schedule.status === 'completed'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        schedule.status === 'active' 
                          ? 'bg-blue-500 animate-pulse' 
                          : schedule.status === 'completed'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="font-medium">{schedule.time}</div>
                        <div className="text-sm text-gray-600">{schedule.zone}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{schedule.duration}</div>
                      <Badge 
                        variant="secondary" 
                        className={
                          schedule.status === 'active' 
                            ? 'bg-blue-100 text-blue-700' 
                            : schedule.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                        }
                      >
                        {schedule.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Total scheduled time:</span>
                  <span className="font-medium">4 hours 20 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated water usage:</span>
                  <span className="font-medium">1,250 liters</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics & Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <span>Analytics & Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="efficiency" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                <TabsTrigger value="usage">Water Usage</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="efficiency" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">90%</div>
                    <div className="text-sm text-gray-600">Overall Efficiency</div>
                    <div className="text-xs text-green-600">+5% from last month</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-gray-600">Target Achievement</div>
                    <div className="text-xs text-blue-600">Excellent performance</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <Leaf className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">12%</div>
                    <div className="text-sm text-gray-600">Crop Yield Increase</div>
                    <div className="text-xs text-purple-600">Due to optimal irrigation</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-cyan-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Daily Water Usage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Field A (Wheat)</span>
                        <span className="font-medium">450L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Field B (Rice)</span>
                        <span className="font-medium">680L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Field C (Cotton)</span>
                        <span className="font-medium">520L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Field D (Vegetables)</span>
                        <span className="font-medium">320L</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>1,970L</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Weekly Trend</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monday</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={85} className="w-16 h-2" />
                          <span className="text-sm">1,850L</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tuesday</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={92} className="w-16 h-2" />
                          <span className="text-sm">1,970L</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Wednesday</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={78} className="w-16 h-2" />
                          <span className="text-sm">1,680L</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Thursday</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={88} className="w-16 h-2" />
                          <span className="text-sm">1,890L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="savings" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Cost Savings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Water bill reduction</span>
                        <span className="font-medium text-green-600">₹1,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Energy savings</span>
                        <span className="font-medium text-green-600">₹850</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Labor cost reduction</span>
                        <span className="font-medium text-green-600">₹750</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Monthly Savings</span>
                        <span className="text-green-600">₹2,850</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Environmental Impact</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Water saved</span>
                        <span className="font-medium text-blue-600">785L/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Energy saved</span>
                        <span className="font-medium text-blue-600">45 kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Carbon footprint reduction</span>
                        <span className="font-medium text-blue-600">12 kg CO₂</span>
                      </div>
                      <div className="border-t pt-2">
                        <Badge className="bg-green-100 text-green-700">
                          <Leaf className="h-3 w-3 mr-1" />
                          Eco-friendly farming
                        </Badge>
                      </div>
                    </div>
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