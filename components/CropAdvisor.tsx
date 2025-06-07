'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  Bug, 
  Leaf, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Calendar,
  MapPin,
  Thermometer,
  CloudRain,
  Wind,
  Eye,
  Zap,
  Shield,
  Target,
  BarChart3,
  Clock,
  Star,
  ArrowRight,
  Wheat,
  TreePine,
  Apple,
  Grape
} from 'lucide-react';

export default function CropAdvisor() {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedRegion, setSelectedRegion] = useState('punjab');
  const [selectedSeason, setSelectedSeason] = useState('kharif');
  const [currentStage, setCurrentStage] = useState(2);

  const crops = [
    { id: 'rice', name: 'Rice (धान)', icon: Wheat, color: 'from-green-500 to-emerald-600' },
    { id: 'wheat', name: 'Wheat (गेहूं)', icon: Wheat, color: 'from-yellow-500 to-orange-600' },
    { id: 'cotton', name: 'Cotton (कपास)', icon: TreePine, color: 'from-blue-500 to-cyan-600' },
    { id: 'sugarcane', name: 'Sugarcane (गन्ना)', icon: TreePine, color: 'from-purple-500 to-pink-600' },
    { id: 'maize', name: 'Maize (मक्का)', icon: Wheat, color: 'from-orange-500 to-red-600' },
    { id: 'tomato', name: 'Tomato (टमाटर)', icon: Apple, color: 'from-red-500 to-pink-600' }
  ];

  const regions = [
    { id: 'punjab', name: 'Punjab', climate: 'Semi-arid' },
    { id: 'maharashtra', name: 'Maharashtra', climate: 'Tropical' },
    { id: 'uttar-pradesh', name: 'Uttar Pradesh', climate: 'Subtropical' },
    { id: 'karnataka', name: 'Karnataka', climate: 'Tropical' },
    { id: 'rajasthan', name: 'Rajasthan', climate: 'Arid' },
    { id: 'west-bengal', name: 'West Bengal', climate: 'Humid subtropical' }
  ];

  const seasons = [
    { id: 'kharif', name: 'Kharif (खरीफ)', months: 'Jun-Oct' },
    { id: 'rabi', name: 'Rabi (रबी)', months: 'Nov-Apr' },
    { id: 'zaid', name: 'Zaid (जायद)', months: 'Apr-Jun' }
  ];

  const cropStages = [
    { id: 1, name: 'Sowing', duration: '7-10 days', icon: Sprout },
    { id: 2, name: 'Germination', duration: '10-15 days', icon: Leaf },
    { id: 3, name: 'Vegetative', duration: '30-45 days', icon: TreePine },
    { id: 4, name: 'Flowering', duration: '15-20 days', icon: Sun },
    { id: 5, name: 'Maturity', duration: '20-30 days', icon: Wheat }
  ];

  const aiRecommendations = {
    rice: {
      irrigation: {
        frequency: 'Every 3-4 days',
        amount: '5-7 cm standing water',
        timing: 'Early morning (6-8 AM)',
        efficiency: 92,
        savings: '25% water reduction possible'
      },
      fertilizer: {
        nitrogen: '120 kg/ha',
        phosphorus: '60 kg/ha',
        potassium: '40 kg/ha',
        timing: 'Split application: 50% basal, 25% tillering, 25% panicle',
        organic: 'Apply 10 tons FYM/ha before sowing'
      },
      pestManagement: {
        majorPests: ['Brown planthopper', 'Stem borer', 'Leaf folder'],
        diseases: ['Blast', 'Bacterial blight', 'Sheath rot'],
        ipm: 'Use pheromone traps, neem oil spray, resistant varieties',
        spraySchedule: 'Preventive spray at 30, 50, 70 DAS'
      },
      currentAdvice: [
        'Apply second dose of nitrogen fertilizer',
        'Monitor for brown planthopper',
        'Maintain 2-3 cm water level',
        'Remove weeds manually or use herbicide'
      ]
    }
  };

  const weatherImpact = {
    temperature: { current: 28, optimal: '25-30°C', status: 'optimal' },
    humidity: { current: 75, optimal: '70-80%', status: 'optimal' },
    rainfall: { current: 15, optimal: '10-20mm/week', status: 'optimal' },
    windSpeed: { current: 8, optimal: '5-15 km/h', status: 'optimal' }
  };

  const yieldPrediction = {
    predicted: 6.2,
    average: 5.8,
    potential: 7.5,
    factors: [
      { name: 'Weather conditions', impact: '+8%', positive: true },
      { name: 'Soil health', impact: '+5%', positive: true },
      { name: 'Pest pressure', impact: '-2%', positive: false },
      { name: 'Water availability', impact: '+3%', positive: true }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-green-600" />
              <span>AI Crop Advisory System</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Crop</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.id} value={crop.id}>
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Season</label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season.id} value={season.id}>
                        {season.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Crop Growth Stage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Current Growth Stage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium">{currentStage}/5 stages</span>
              </div>
              <Progress value={(currentStage / 5) * 100} className="h-3" />
              
              <div className="grid grid-cols-5 gap-2">
                {cropStages.map((stage) => {
                  const IconComponent = stage.icon;
                  const isActive = stage.id === currentStage;
                  const isCompleted = stage.id < currentStage;
                  
                  return (
                    <motion.div
                      key={stage.id}
                      className={`text-center p-3 rounded-lg border-2 transition-all duration-300 ${
                        isActive 
                          ? 'border-green-500 bg-green-50' 
                          : isCompleted 
                            ? 'border-green-300 bg-green-25' 
                            : 'border-gray-200 bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent 
                        className={`h-6 w-6 mx-auto mb-2 ${
                          isActive ? 'text-green-600' : isCompleted ? 'text-green-400' : 'text-gray-400'
                        }`} 
                      />
                      <div className={`text-xs font-medium ${
                        isActive ? 'text-green-600' : isCompleted ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {stage.name}
                      </div>
                      <div className="text-xs text-gray-500">{stage.duration}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-purple-600" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="current" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="current">Current</TabsTrigger>
                  <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                  <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                  <TabsTrigger value="pest">Pest Control</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="space-y-3">
                  {aiRecommendations.rice.currentAdvice.map((advice, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{advice}</span>
                    </motion.div>
                  ))}
                </TabsContent>
                
                <TabsContent value="irrigation" className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <div className="text-xs text-gray-600">Frequency</div>
                      <div className="font-medium">{aiRecommendations.rice.irrigation.frequency}</div>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <div className="text-xs text-gray-600">Amount</div>
                      <div className="font-medium">{aiRecommendations.rice.irrigation.amount}</div>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <div className="text-xs text-gray-600">Timing</div>
                      <div className="font-medium">{aiRecommendations.rice.irrigation.timing}</div>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <div className="text-xs text-gray-600">Efficiency</div>
                      <div className="font-medium">{aiRecommendations.rice.irrigation.efficiency}%</div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-700">💡 Tip</div>
                    <div className="text-sm text-green-600">{aiRecommendations.rice.irrigation.savings}</div>
                  </div>
                </TabsContent>
                
                <TabsContent value="fertilizer" className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                      <div className="text-xs text-gray-600">Nitrogen</div>
                      <div className="font-medium">{aiRecommendations.rice.fertilizer.nitrogen}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                      <div className="text-xs text-gray-600">Phosphorus</div>
                      <div className="font-medium">{aiRecommendations.rice.fertilizer.phosphorus}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                      <div className="text-xs text-gray-600">Potassium</div>
                      <div className="font-medium">{aiRecommendations.rice.fertilizer.potassium}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-sm font-medium">Application Timing</div>
                      <div className="text-sm text-gray-600">{aiRecommendations.rice.fertilizer.timing}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium">Organic Matter</div>
                      <div className="text-sm text-gray-600">{aiRecommendations.rice.fertilizer.organic}</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="pest" className="space-y-3">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-sm font-medium text-red-700">Major Pests</div>
                      <div className="text-sm text-red-600">
                        {aiRecommendations.rice.pestManagement.majorPests.join(', ')}
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-sm font-medium text-orange-700">Diseases</div>
                      <div className="text-sm text-orange-600">
                        {aiRecommendations.rice.pestManagement.diseases.join(', ')}
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-700">IPM Strategy</div>
                      <div className="text-sm text-green-600">{aiRecommendations.rice.pestManagement.ipm}</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather Impact & Yield Prediction */}
        <div className="space-y-6">
          {/* Weather Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CloudRain className="h-6 w-6 text-blue-600" />
                  <span>Weather Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-blue-600" />
                      <span className="text-xs text-gray-600">Temperature</span>
                    </div>
                    <div className="font-medium">{weatherImpact.temperature.current}°C</div>
                    <div className="text-xs text-gray-500">{weatherImpact.temperature.optimal}</div>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                      Optimal
                    </Badge>
                  </div>
                  
                  <div className="p-3 bg-cyan-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-cyan-600" />
                      <span className="text-xs text-gray-600">Humidity</span>
                    </div>
                    <div className="font-medium">{weatherImpact.humidity.current}%</div>
                    <div className="text-xs text-gray-500">{weatherImpact.humidity.optimal}</div>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                      Optimal
                    </Badge>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CloudRain className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-gray-600">Rainfall</span>
                    </div>
                    <div className="font-medium">{weatherImpact.rainfall.current}mm</div>
                    <div className="text-xs text-gray-500">{weatherImpact.rainfall.optimal}</div>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                      Optimal
                    </Badge>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-purple-600" />
                      <span className="text-xs text-gray-600">Wind Speed</span>
                    </div>
                    <div className="font-medium">{weatherImpact.windSpeed.current} km/h</div>
                    <div className="text-xs text-gray-500">{weatherImpact.windSpeed.optimal}</div>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                      Optimal
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Yield Prediction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                  <span>Yield Prediction</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{yieldPrediction.predicted} tons/ha</div>
                    <div className="text-sm text-gray-600">Predicted Yield</div>
                    <div className="flex justify-center space-x-4 mt-2 text-xs">
                      <span>Avg: {yieldPrediction.average} t/ha</span>
                      <span>Potential: {yieldPrediction.potential} t/ha</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Yield Factors</div>
                    {yieldPrediction.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{factor.name}</span>
                        <Badge 
                          variant="secondary" 
                          className={factor.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        >
                          {factor.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}