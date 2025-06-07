'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  Sprout, 
  Droplets, 
  Bug, 
  Scissors,
  Wheat,
  Sun,
  CloudRain,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Bell,
  MapPin,
  TrendingUp,
  Leaf,
  Target,
  BarChart3,
  Settings,
  Download
} from 'lucide-react';

export default function CropCalendar() {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [currentDate, setCurrentDate] = useState(new Date());

  const crops = [
    { id: 'wheat', name: 'Wheat (गेहूं)', season: 'Rabi', icon: Wheat },
    { id: 'rice', name: 'Rice (धान)', season: 'Kharif', icon: Wheat },
    { id: 'cotton', name: 'Cotton (कपास)', season: 'Kharif', icon: Leaf },
    { id: 'sugarcane', name: 'Sugarcane (गन्ना)', season: 'Annual', icon: Wheat },
    { id: 'maize', name: 'Maize (मक्का)', season: 'Kharif/Rabi', icon: Wheat }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const cropCalendar = {
    wheat: {
      sowing: { months: [10, 11], activities: ['Land preparation', 'Seed treatment', 'Sowing'] },
      vegetative: { months: [11, 12, 0, 1], activities: ['Irrigation', 'Fertilizer application', 'Weed control'] },
      reproductive: { months: [1, 2], activities: ['Flowering stage care', 'Disease monitoring', 'Nutrient management'] },
      maturity: { months: [2, 3], activities: ['Grain filling', 'Harvest preparation', 'Storage planning'] },
      harvest: { months: [3, 4], activities: ['Harvesting', 'Threshing', 'Storage'] }
    },
    rice: {
      sowing: { months: [5, 6], activities: ['Nursery preparation', 'Seed treatment', 'Transplanting'] },
      vegetative: { months: [6, 7, 8], activities: ['Water management', 'Fertilizer application', 'Weed control'] },
      reproductive: { months: [8, 9], activities: ['Flowering stage', 'Pest monitoring', 'Water management'] },
      maturity: { months: [9, 10], activities: ['Grain filling', 'Harvest timing', 'Field drying'] },
      harvest: { months: [10, 11], activities: ['Harvesting', 'Drying', 'Storage'] }
    }
  };

  const monthlyActivities = {
    wheat: {
      0: [ // January
        { type: 'irrigation', title: 'Second Irrigation', description: 'Apply irrigation at crown root initiation stage', priority: 'high', date: '15 Jan' },
        { type: 'fertilizer', title: 'Nitrogen Top Dressing', description: 'Apply remaining nitrogen fertilizer', priority: 'high', date: '20 Jan' },
        { type: 'pest', title: 'Aphid Monitoring', description: 'Monitor for aphid infestation', priority: 'medium', date: '25 Jan' }
      ],
      1: [ // February
        { type: 'irrigation', title: 'Third Irrigation', description: 'Apply irrigation at jointing stage', priority: 'high', date: '10 Feb' },
        { type: 'disease', title: 'Rust Disease Check', description: 'Monitor for yellow and brown rust', priority: 'high', date: '15 Feb' },
        { type: 'fertilizer', title: 'Foliar Spray', description: 'Apply micronutrient foliar spray', priority: 'medium', date: '20 Feb' }
      ],
      2: [ // March
        { type: 'irrigation', title: 'Fourth Irrigation', description: 'Apply irrigation at flowering stage', priority: 'high', date: '5 Mar' },
        { type: 'pest', title: 'Termite Control', description: 'Monitor and control termite damage', priority: 'medium', date: '15 Mar' },
        { type: 'harvest', title: 'Harvest Preparation', description: 'Prepare for harvesting equipment', priority: 'medium', date: '25 Mar' }
      ]
    }
  };

  const upcomingTasks = [
    {
      id: 1,
      title: 'Apply Second Irrigation',
      crop: 'Wheat',
      field: 'Field A',
      dueDate: '2024-03-18',
      priority: 'high',
      type: 'irrigation',
      status: 'pending',
      description: 'Critical irrigation at jointing stage'
    },
    {
      id: 2,
      title: 'Pest Monitoring',
      crop: 'Rice',
      field: 'Field B',
      dueDate: '2024-03-20',
      priority: 'medium',
      type: 'pest',
      status: 'pending',
      description: 'Check for brown planthopper'
    },
    {
      id: 3,
      title: 'Fertilizer Application',
      crop: 'Cotton',
      field: 'Field C',
      dueDate: '2024-03-22',
      priority: 'high',
      type: 'fertilizer',
      status: 'scheduled',
      description: 'Apply potassium fertilizer'
    },
    {
      id: 4,
      title: 'Weed Control',
      crop: 'Wheat',
      field: 'Field A',
      dueDate: '2024-03-25',
      priority: 'medium',
      type: 'weed',
      status: 'pending',
      description: 'Manual weeding required'
    }
  ];

  const weatherAlerts = [
    {
      type: 'rain',
      title: 'Heavy Rain Expected',
      message: 'Postpone irrigation and spraying activities',
      date: '2024-03-19',
      impact: 'high'
    },
    {
      type: 'temperature',
      title: 'High Temperature Alert',
      message: 'Increase irrigation frequency',
      date: '2024-03-21',
      impact: 'medium'
    }
  ];

  const seasonalTips = {
    wheat: {
      current: [
        'Monitor for late blight disease in current weather conditions',
        'Ensure adequate soil moisture for grain filling',
        'Prepare harvesting equipment and storage facilities',
        'Plan for timely harvesting to avoid grain shattering'
      ],
      upcoming: [
        'Schedule combine harvester booking',
        'Arrange for grain storage and drying facilities',
        'Plan for straw management post-harvest',
        'Prepare land for next crop rotation'
      ]
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'irrigation': return Droplets;
      case 'fertilizer': return Sprout;
      case 'pest': return Bug;
      case 'disease': return AlertTriangle;
      case 'harvest': return Scissors;
      case 'weed': return Leaf;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'irrigation': return 'from-blue-500 to-cyan-500';
      case 'fertilizer': return 'from-green-500 to-emerald-500';
      case 'pest': return 'from-red-500 to-pink-500';
      case 'disease': return 'from-orange-500 to-red-500';
      case 'harvest': return 'from-purple-500 to-pink-500';
      case 'weed': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
              <Calendar className="h-6 w-6 text-green-600" />
              <span>Crop Calendar & Activity Planner</span>
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
                        {crop.name} ({crop.season})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Month</label>
                <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CloudRain className="h-6 w-6 text-orange-600" />
                <span>Weather Alerts for Farming Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weatherAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.impact === 'high' 
                        ? 'bg-red-50 border-red-500' 
                        : 'bg-yellow-50 border-yellow-500'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-semibold ${
                          alert.impact === 'high' ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          {alert.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={
                          alert.impact === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {alert.impact}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Activities */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>{months[selectedMonth]} Activities - {crops.find(c => c.id === selectedCrop)?.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyActivities.wheat[selectedMonth as keyof typeof monthlyActivities.wheat]?.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getActivityColor(activity.type)}`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{activity.date}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getPriorityColor(activity.priority)}>
                              {activity.priority}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Bell className="h-3 w-3 mr-1" />
                              Set Reminder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }) || (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No activities scheduled for {months[selectedMonth]}</p>
                    <Button className="mt-4" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-purple-600" />
                <span>Upcoming Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => {
                  const IconComponent = getActivityIcon(task.type);
                  const daysUntilDue = Math.ceil((new Date(task.dueDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <motion.div
                      key={task.id}
                      className={`p-3 border rounded-lg hover:shadow-md transition-all duration-300 ${
                        daysUntilDue <= 1 ? 'border-red-200 bg-red-50' : 
                        daysUntilDue <= 3 ? 'border-yellow-200 bg-yellow-50' : 
                        'border-gray-200 bg-gray-50'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-1.5 rounded bg-gradient-to-r ${getActivityColor(task.type)}`}>
                          <IconComponent className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{task.title}</h4>
                          <p className="text-xs text-gray-600">{task.crop} • {task.field}</p>
                          <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {daysUntilDue === 0 ? 'Today' : 
                                 daysUntilDue === 1 ? 'Tomorrow' : 
                                 `${daysUntilDue} days`}
                              </span>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getPriorityColor(task.priority)}`}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button size="sm" variant="outline" className="w-full">
                  <Plus className="h-3 w-3 mr-1" />
                  Add New Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Seasonal Tips & Crop Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seasonal Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span>Seasonal Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="current" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="current">Current Month</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="space-y-3">
                  <h4 className="font-semibold text-green-700">March Tips for Wheat</h4>
                  {seasonalTips.wheat.current.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-700">{tip}</span>
                    </motion.div>
                  ))}
                </TabsContent>
                
                <TabsContent value="upcoming" className="space-y-3">
                  <h4 className="font-semibold text-blue-700">Upcoming Activities</h4>
                  {seasonalTips.wheat.upcoming.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-700">{tip}</span>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Crop Growth Stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <span>Crop Growth Stages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(cropCalendar.wheat).map(([stage, data], index) => {
                  const isCurrentStage = data.months.includes(selectedMonth);
                  return (
                    <motion.div
                      key={stage}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        isCurrentStage 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold capitalize ${
                          isCurrentStage ? 'text-purple-700' : 'text-gray-700'
                        }`}>
                          {stage} Stage
                        </h4>
                        {isCurrentStage && (
                          <Badge className="bg-purple-100 text-purple-700">
                            Current
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        Months: {data.months.map(m => months[m]).join(', ')}
                      </div>
                      
                      <ul className="space-y-1">
                        {data.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-sm flex items-center">
                            <span className={`w-1 h-1 rounded-full mr-2 ${
                              isCurrentStage ? 'bg-purple-500' : 'bg-gray-400'
                            }`}></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Calendar Export & Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-gray-600" />
                <span>Calendar Management</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Export Calendar
                </Button>
                <Button size="sm" variant="outline">
                  <Bell className="h-3 w-3 mr-1" />
                  Notification Settings
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-sm text-gray-600">Activities This Month</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">18</div>
                <div className="text-sm text-gray-600">Completed Tasks</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">6</div>
                <div className="text-sm text-gray-600">Pending Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}