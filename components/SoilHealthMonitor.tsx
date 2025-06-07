'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Droplets, 
  Zap, 
  Thermometer, 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Target,
  MapPin,
  Calendar,
  Beaker,
  Microscope,
  Sprout,
  TreePine,
  Bug,
  Shield,
  Clock,
  Eye,
  Settings,
  Download
} from 'lucide-react';

export default function SoilHealthMonitor() {
  const [selectedField, setSelectedField] = useState('field1');
  const [selectedDepth, setSelectedDepth] = useState('surface');

  const fields = [
    {
      id: 'field1',
      name: 'Field A - Wheat',
      area: '2.5 acres',
      crop: 'Wheat',
      soilType: 'Loamy',
      lastTested: '2 days ago',
      healthScore: 85,
      status: 'good'
    },
    {
      id: 'field2',
      name: 'Field B - Rice',
      area: '3.2 acres',
      crop: 'Rice',
      soilType: 'Clay',
      lastTested: '1 day ago',
      healthScore: 72,
      status: 'moderate'
    },
    {
      id: 'field3',
      name: 'Field C - Cotton',
      area: '4.1 acres',
      crop: 'Cotton',
      soilType: 'Sandy Loam',
      lastTested: '3 days ago',
      healthScore: 68,
      status: 'needs_attention'
    }
  ];

  const soilParameters = {
    field1: {
      ph: { value: 6.8, optimal: '6.0-7.0', status: 'optimal', trend: 'stable' },
      nitrogen: { value: 280, optimal: '250-350', status: 'optimal', trend: 'up', unit: 'kg/ha' },
      phosphorus: { value: 45, optimal: '40-60', status: 'optimal', trend: 'stable', unit: 'kg/ha' },
      potassium: { value: 180, optimal: '150-200', status: 'optimal', trend: 'down', unit: 'kg/ha' },
      organicMatter: { value: 3.2, optimal: '3.0-5.0', status: 'optimal', trend: 'up', unit: '%' },
      moisture: { value: 65, optimal: '60-80', status: 'optimal', trend: 'stable', unit: '%' },
      temperature: { value: 24, optimal: '20-30', status: 'optimal', trend: 'stable', unit: '°C' },
      conductivity: { value: 0.8, optimal: '0.5-1.5', status: 'optimal', trend: 'stable', unit: 'dS/m' },
      compaction: { value: 15, optimal: '10-20', status: 'optimal', trend: 'stable', unit: 'psi' },
      microbialActivity: { value: 78, optimal: '70-90', status: 'optimal', trend: 'up', unit: 'index' }
    }
  };

  const nutrientRecommendations = [
    {
      nutrient: 'Nitrogen',
      current: 280,
      recommended: 320,
      action: 'Apply 40 kg/ha urea',
      timing: 'Next week',
      priority: 'medium'
    },
    {
      nutrient: 'Phosphorus',
      current: 45,
      recommended: 50,
      action: 'Apply 15 kg/ha DAP',
      timing: 'Before next irrigation',
      priority: 'low'
    },
    {
      nutrient: 'Potassium',
      current: 180,
      recommended: 200,
      action: 'Apply 25 kg/ha MOP',
      timing: 'With next fertilizer dose',
      priority: 'medium'
    },
    {
      nutrient: 'Organic Matter',
      current: 3.2,
      recommended: 4.0,
      action: 'Add 2 tons/ha compost',
      timing: 'Before next season',
      priority: 'high'
    }
  ];

  const soilAlerts = [
    {
      type: 'warning',
      title: 'Potassium Levels Declining',
      message: 'Potassium levels in Field A have decreased by 8% in the last month',
      field: 'Field A',
      severity: 'medium',
      action: 'Apply potassium fertilizer'
    },
    {
      type: 'info',
      title: 'Optimal Moisture Levels',
      message: 'All fields maintain optimal moisture levels due to recent irrigation',
      field: 'All Fields',
      severity: 'low',
      action: 'Continue current irrigation schedule'
    }
  ];

  const microbialData = {
    bacteria: { count: 2.8, unit: 'billion/g', status: 'high', trend: 'up' },
    fungi: { count: 1.2, unit: 'million/g', status: 'moderate', trend: 'stable' },
    actinomycetes: { count: 0.8, unit: 'million/g', status: 'high', trend: 'up' },
    diversity: { index: 78, unit: 'Shannon index', status: 'good', trend: 'up' }
  };

  const historicalTrends = [
    { month: 'Jan', ph: 6.5, nitrogen: 260, phosphorus: 42, potassium: 195, organic: 2.8 },
    { month: 'Feb', ph: 6.6, nitrogen: 270, phosphorus: 44, potassium: 190, organic: 3.0 },
    { month: 'Mar', ph: 6.8, nitrogen: 280, phosphorus: 45, potassium: 180, organic: 3.2 },
    { month: 'Apr', ph: 6.7, nitrogen: 275, phosphorus: 43, potassium: 185, organic: 3.1 },
    { month: 'May', ph: 6.8, nitrogen: 280, phosphorus: 45, potassium: 180, organic: 3.2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': case 'good': case 'high': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'needs_attention': case 'low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Leaf className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Soil Health Monitor</h2>
                    <p className="text-green-100">Real-time soil analysis and recommendations</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedField === field.id 
                          ? 'bg-white/20 border-2 border-white/50' 
                          : 'bg-white/10 hover:bg-white/15'
                      }`}
                      onClick={() => setSelectedField(field.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-sm font-medium">{field.name}</div>
                      <div className="text-xs text-green-100">{field.area}</div>
                      <div className="text-lg font-bold">{field.healthScore}%</div>
                      <Badge className={`mt-1 ${getStatusColor(field.status)}`}>
                        {field.status.replace('_', ' ')}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Microscope className="h-5 w-5" />
                    <span className="font-semibold">Active Sensors</span>
                  </div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-green-100">Monitoring 3 fields</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">Last Analysis</span>
                  </div>
                  <div className="text-lg font-bold">2 hours ago</div>
                  <div className="text-sm text-green-100">Auto-updated</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Soil Alerts */}
      {soilAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <span>Soil Health Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {soilAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' 
                        ? 'bg-red-50 border-red-500' 
                        : alert.severity === 'medium'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-blue-50 border-blue-500'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-semibold ${
                          alert.severity === 'high' ? 'text-red-700' : 
                          alert.severity === 'medium' ? 'text-yellow-700' : 'text-blue-700'
                        }`}>
                          {alert.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Field: {alert.field} • Action: {alert.action}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={
                          alert.severity === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : alert.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Soil Parameters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Beaker className="h-6 w-6 text-blue-600" />
              <span>Soil Parameters - {fields.find(f => f.id === selectedField)?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(soilParameters.field1).map(([key, param], index) => (
                <motion.div
                  key={key}
                  className="p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                    {getTrendIcon(param.trend)}
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {param.value}{param.unit && ` ${param.unit}`}
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    Optimal: {param.optimal}
                  </div>
                  
                  <Badge className={getStatusColor(param.status)}>
                    {param.status}
                  </Badge>
                  
                  <div className="mt-3">
                    <Progress 
                      value={
                        param.status === 'optimal' ? 85 : 
                        param.status === 'moderate' ? 60 : 40
                      } 
                      className="h-2" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nutrient Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-green-600" />
                <span>Nutrient Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nutrientRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{rec.nutrient}</h4>
                        <div className="text-sm text-gray-600">
                          Current: {rec.current} → Target: {rec.recommended}
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={
                          rec.priority === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : rec.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-blue-600">{rec.action}</div>
                      <div className="text-xs text-gray-500">Timing: {rec.timing}</div>
                    </div>
                    
                    <div className="mt-3">
                      <Progress 
                        value={(rec.current / rec.recommended) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Microbial Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bug className="h-6 w-6 text-purple-600" />
                <span>Microbial Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(microbialData).map(([key, data], index) => (
                  <motion.div
                    key={key}
                    className="p-3 bg-purple-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold capitalize">{key}</h4>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(data.trend)}
                        <Badge className={getStatusColor(data.status)}>
                          {data.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{data.count}</span>
                      <span className="text-sm text-gray-600">{data.unit}</span>
                    </div>
                    
                    <Progress 
                      value={
                        data.status === 'high' ? 85 : 
                        data.status === 'good' ? 75 : 
                        data.status === 'moderate' ? 60 : 40
                      } 
                      className="h-2 mt-2" 
                    />
                  </motion.div>
                ))}
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-700">Soil Health Score</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">85/100</div>
                  <div className="text-sm text-green-600">Excellent microbial diversity</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Historical Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <span>Historical Trends</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="nutrients" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
                <TabsTrigger value="ph">pH Levels</TabsTrigger>
                <TabsTrigger value="organic">Organic Matter</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="nutrients" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Nitrogen Trend</h4>
                    <div className="space-y-2">
                      {historicalTrends.slice(-3).map((trend, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{trend.month}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={(trend.nitrogen / 350) * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">{trend.nitrogen}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Phosphorus Trend</h4>
                    <div className="space-y-2">
                      {historicalTrends.slice(-3).map((trend, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{trend.month}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={(trend.phosphorus / 60) * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">{trend.phosphorus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Potassium Trend</h4>
                    <div className="space-y-2">
                      {historicalTrends.slice(-3).map((trend, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{trend.month}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={(trend.potassium / 200) * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">{trend.potassium}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ph" className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-3">pH Level Changes</h4>
                  <div className="space-y-3">
                    {historicalTrends.map((trend, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{trend.month}</span>
                        <div className="flex items-center space-x-3">
                          <Progress value={(trend.ph / 8) * 100} className="w-24 h-3" />
                          <span className="text-lg font-bold">{trend.ph}</span>
                          <Badge className={
                            trend.ph >= 6.0 && trend.ph <= 7.0 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }>
                            {trend.ph >= 6.0 && trend.ph <= 7.0 ? 'Optimal' : 'Monitor'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="organic" className="space-y-4">
                <div className="p-4 bg-brown-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Organic Matter Progress</h4>
                  <div className="space-y-3">
                    {historicalTrends.map((trend, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{trend.month}</span>
                        <div className="flex items-center space-x-3">
                          <Progress value={(trend.organic / 5) * 100} className="w-24 h-3" />
                          <span className="text-lg font-bold">{trend.organic}%</span>
                          <div className="flex items-center space-x-1">
                            {index > 0 && trend.organic > historicalTrends[index - 1].organic ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : index > 0 && trend.organic < historicalTrends[index - 1].organic ? (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            ) : (
                              <div className="h-3 w-3 bg-gray-400 rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-3">Improvements</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                        Organic matter increased by 14%
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                        pH levels stabilized in optimal range
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                        Nitrogen levels consistently good
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-3">Areas to Monitor</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                        Potassium showing declining trend
                      </li>
                      <li className="flex items-center text-sm">
                        <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                        Phosphorus needs regular monitoring
                      </li>
                      <li className="flex items-center text-sm">
                        <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                        Increase organic matter application
                      </li>
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