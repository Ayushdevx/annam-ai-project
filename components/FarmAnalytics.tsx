'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  Leaf, 
  Droplets,
  Zap,
  Target,
  Calendar,
  Download,
  Share,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Thermometer,
  Sun,
  CloudRain,
  Wind,
  Gauge,
  PieChart,
  LineChart,
  Activity,
  Award,
  Truck,
  Store
} from 'lucide-react';

export default function FarmAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('yield');
  const [selectedField, setSelectedField] = useState('all');

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  const fields = [
    { id: 'all', name: 'All Fields' },
    { id: 'field1', name: 'Field A - Wheat' },
    { id: 'field2', name: 'Field B - Rice' },
    { id: 'field3', name: 'Field C - Cotton' },
    { id: 'field4', name: 'Field D - Vegetables' }
  ];

  const kpiData = {
    yield: {
      current: 6.2,
      previous: 5.8,
      target: 7.0,
      unit: 'tons/ha',
      trend: 'up',
      change: 6.9
    },
    revenue: {
      current: 285000,
      previous: 260000,
      target: 320000,
      unit: '₹',
      trend: 'up',
      change: 9.6
    },
    costs: {
      current: 125000,
      previous: 140000,
      target: 120000,
      unit: '₹',
      trend: 'down',
      change: -10.7
    },
    profit: {
      current: 160000,
      previous: 120000,
      target: 200000,
      unit: '₹',
      trend: 'up',
      change: 33.3
    },
    waterUsage: {
      current: 1250,
      previous: 1580,
      target: 1100,
      unit: 'liters/ha',
      trend: 'down',
      change: -20.9
    },
    efficiency: {
      current: 92,
      previous: 85,
      target: 95,
      unit: '%',
      trend: 'up',
      change: 8.2
    }
  };

  const productionData = [
    { crop: 'Wheat', area: 2.5, yield: 6.2, production: 15.5, revenue: 155000, profit: 62000 },
    { crop: 'Rice', area: 3.2, yield: 5.8, production: 18.6, revenue: 186000, profit: 74400 },
    { crop: 'Cotton', area: 4.1, yield: 2.1, production: 8.6, revenue: 172000, profit: 51600 },
    { crop: 'Vegetables', area: 1.8, yield: 12.5, production: 22.5, revenue: 225000, profit: 112500 }
  ];

  const costBreakdown = [
    { category: 'Seeds', amount: 25000, percentage: 20, trend: 'stable' },
    { category: 'Fertilizers', amount: 35000, percentage: 28, trend: 'up' },
    { category: 'Pesticides', amount: 18000, percentage: 14, trend: 'down' },
    { category: 'Labor', amount: 30000, percentage: 24, trend: 'up' },
    { category: 'Fuel', amount: 12000, percentage: 10, trend: 'stable' },
    { category: 'Others', amount: 5000, percentage: 4, trend: 'stable' }
  ];

  const monthlyTrends = [
    { month: 'Oct', yield: 5.2, revenue: 220000, costs: 135000, water: 1450 },
    { month: 'Nov', yield: 5.5, revenue: 240000, costs: 130000, water: 1380 },
    { month: 'Dec', yield: 5.8, revenue: 260000, costs: 125000, water: 1320 },
    { month: 'Jan', yield: 6.0, revenue: 270000, costs: 120000, water: 1280 },
    { month: 'Feb', yield: 6.2, revenue: 285000, costs: 125000, water: 1250 }
  ];

  const benchmarkData = {
    regional: {
      yield: { farm: 6.2, average: 5.5, top10: 7.2 },
      efficiency: { farm: 92, average: 78, top10: 95 },
      costs: { farm: 125000, average: 145000, top10: 110000 }
    },
    national: {
      yield: { farm: 6.2, average: 4.8, top10: 6.8 },
      efficiency: { farm: 92, average: 72, top10: 88 },
      costs: { farm: 125000, average: 155000, top10: 125000 }
    }
  };

  const alerts = [
    {
      type: 'performance',
      title: 'Yield Target Achievement',
      message: 'Current yield is 88% of target. Consider optimization strategies.',
      severity: 'medium',
      action: 'Review fertilizer application'
    },
    {
      type: 'cost',
      title: 'Fertilizer Cost Increase',
      message: 'Fertilizer costs increased by 15% compared to last month.',
      severity: 'high',
      action: 'Explore alternative suppliers'
    },
    {
      type: 'efficiency',
      title: 'Water Efficiency Improved',
      message: 'Water usage reduced by 21% while maintaining yield.',
      severity: 'low',
      action: 'Continue current practices'
    }
  ];

  const recommendations = [
    {
      category: 'Yield Optimization',
      suggestions: [
        'Increase nitrogen application by 10% in Field A',
        'Implement precision seeding in Field C',
        'Consider drought-resistant varieties for next season'
      ],
      impact: 'High',
      investment: '₹15,000'
    },
    {
      category: 'Cost Reduction',
      suggestions: [
        'Bulk purchase fertilizers for 20% discount',
        'Implement integrated pest management',
        'Use solar pumps to reduce fuel costs'
      ],
      impact: 'Medium',
      investment: '₹45,000'
    },
    {
      category: 'Sustainability',
      suggestions: [
        'Install drip irrigation system',
        'Use organic fertilizers for premium pricing',
        'Implement crop rotation for soil health'
      ],
      impact: 'High',
      investment: '₹85,000'
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity;
  };

  const getTrendColor = (trend: string, isPositive: boolean = true) => {
    if (trend === 'up') return isPositive ? 'text-green-500' : 'text-red-500';
    if (trend === 'down') return isPositive ? 'text-red-500' : 'text-green-500';
    return 'text-gray-500';
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-green-600" />
                <span>Farm Analytics Dashboard</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Export Report
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map((period) => (
                      <SelectItem key={period.id} value={period.id}>
                        {period.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Field</label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map((field) => (
                      <SelectItem key={field.id} value={field.id}>
                        {field.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Metric</label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yield">Yield</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="profit">Profit</SelectItem>
                    <SelectItem value="efficiency">Efficiency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(kpiData).map(([key, data], index) => {
            const TrendIcon = getTrendIcon(data.trend);
            const isPositiveMetric = !['costs', 'waterUsage'].includes(key);
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </h3>
                        <div className="text-2xl font-bold text-gray-900">
                          {data.unit === '₹' ? `₹${(data.current / 1000).toFixed(0)}k` : 
                           `${data.current}${data.unit !== '₹' ? data.unit : ''}`}
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        getTrendColor(data.trend, isPositiveMetric)
                      }`}>
                        <TrendIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {data.change > 0 ? '+' : ''}{data.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Target: {data.unit === '₹' ? `₹${(data.target / 1000).toFixed(0)}k` : 
                                      `${data.target}${data.unit !== '₹' ? data.unit : ''}`}</span>
                        <span>{((data.current / data.target) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(data.current / data.target) * 100} className="h-2" />
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Previous: {data.unit === '₹' ? `₹${(data.previous / 1000).toFixed(0)}k` : 
                                `${data.previous}${data.unit !== '₹' ? data.unit : ''}`}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <span>Performance Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' 
                        ? 'bg-red-50 border-red-500' 
                        : alert.severity === 'medium'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-green-50 border-green-500'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`font-semibold ${
                        alert.severity === 'high' ? 'text-red-700' : 
                        alert.severity === 'medium' ? 'text-yellow-700' : 'text-green-700'
                      }`}>
                        {alert.title}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={
                          alert.severity === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : alert.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <p className="text-xs text-gray-500">Action: {alert.action}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span>Production Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productionData.map((crop, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{crop.crop}</h4>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {crop.area} acres
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600">Yield</div>
                        <div className="font-medium">{crop.yield} t/ha</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Production</div>
                        <div className="font-medium">{crop.production} tons</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Revenue</div>
                        <div className="font-medium">₹{(crop.revenue / 1000).toFixed(0)}k</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Profit</div>
                        <div className="font-medium text-green-600">₹{(crop.profit / 1000).toFixed(0)}k</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Profitability</span>
                        <span>{((crop.profit / crop.revenue) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(crop.profit / crop.revenue) * 100} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-6 w-6 text-blue-600" />
                <span>Cost Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {costBreakdown.map((cost, index) => {
                  const TrendIcon = getTrendIcon(cost.trend);
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{cost.category}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">₹{(cost.amount / 1000).toFixed(0)}k</span>
                            <TrendIcon className={`h-3 w-3 ${getTrendColor(cost.trend, false)}`} />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={cost.percentage} className="flex-1 h-2" />
                          <span className="text-xs text-gray-600">{cost.percentage}%</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total Costs</span>
                    <span>₹{costBreakdown.reduce((sum, cost) => sum + cost.amount, 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Benchmarking & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Benchmarking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-purple-600" />
                <span>Performance Benchmarking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="regional" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="regional">Regional</TabsTrigger>
                  <TabsTrigger value="national">National</TabsTrigger>
                </TabsList>
                
                <TabsContent value="regional" className="space-y-4">
                  {Object.entries(benchmarkData.regional).map(([metric, data], index) => (
                    <div key={metric} className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold capitalize mb-3">{metric}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Your Farm</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={85} className="w-16 h-2" />
                            <span className="font-medium">{data.farm}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Regional Average</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={65} className="w-16 h-2" />
                            <span className="text-gray-600">{data.average}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Top 10%</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={95} className="w-16 h-2" />
                            <span className="text-green-600">{data.top10}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="national" className="space-y-4">
                  {Object.entries(benchmarkData.national).map(([metric, data], index) => (
                    <div key={metric} className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold capitalize mb-3">{metric}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Your Farm</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={90} className="w-16 h-2" />
                            <span className="font-medium">{data.farm}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">National Average</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={55} className="w-16 h-2" />
                            <span className="text-gray-600">{data.average}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Top 10%</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={85} className="w-16 h-2" />
                            <span className="text-green-600">{data.top10}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-orange-600" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{rec.category}</h4>
                      <div className="flex space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={
                            rec.impact === 'High' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }
                        >
                          {rec.impact} Impact
                        </Badge>
                        <Badge variant="outline">
                          {rec.investment}
                        </Badge>
                      </div>
                    </div>
                    
                    <ul className="space-y-1">
                      {rec.suggestions.map((suggestion, sugIndex) => (
                        <li key={sugIndex} className="text-sm flex items-start">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600">
                        Implement
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-6 w-6 text-blue-600" />
              <span>Monthly Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {monthlyTrends.map((month, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold text-center mb-3">{month.month}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Yield:</span>
                      <span className="font-medium">{month.yield} t/ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span className="font-medium">₹{(month.revenue / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Costs:</span>
                      <span className="font-medium">₹{(month.costs / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water:</span>
                      <span className="font-medium">{month.water}L/ha</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        ₹{((month.revenue - month.costs) / 1000).toFixed(0)}k
                      </div>
                      <div className="text-xs text-gray-600">Profit</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}