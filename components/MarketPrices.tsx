'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  BarChart3, 
  MapPin, 
  Calendar,
  Wheat,
  Apple,
  Grape,
  TreePine,
  Leaf,
  Star,
  AlertCircle,
  CheckCircle2,
  Clock,
  Target,
  Truck,
  Store,
  Users,
  Phone,
  MessageCircle
} from 'lucide-react';

export default function MarketPrices() {
  const [selectedState, setSelectedState] = useState('punjab');
  const [selectedMandi, setSelectedMandi] = useState('ludhiana');
  const [priceAlert, setPriceAlert] = useState(false);

  const states = [
    { id: 'punjab', name: 'Punjab' },
    { id: 'haryana', name: 'Haryana' },
    { id: 'uttar-pradesh', name: 'Uttar Pradesh' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'rajasthan', name: 'Rajasthan' }
  ];

  const mandis = {
    punjab: [
      { id: 'ludhiana', name: 'Ludhiana' },
      { id: 'amritsar', name: 'Amritsar' },
      { id: 'jalandhar', name: 'Jalandhar' },
      { id: 'patiala', name: 'Patiala' }
    ]
  };

  const commodityPrices = [
    {
      id: 'wheat',
      name: 'Wheat (गेहूं)',
      icon: Wheat,
      currentPrice: 2150,
      previousPrice: 2100,
      change: 50,
      changePercent: 2.38,
      unit: 'per quintal',
      quality: 'FAQ',
      msp: 2125,
      color: 'from-yellow-500 to-orange-600',
      trend: 'up',
      volume: '2,450 quintals',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'rice',
      name: 'Rice (धान)',
      icon: Wheat,
      currentPrice: 1940,
      previousPrice: 1980,
      change: -40,
      changePercent: -2.02,
      unit: 'per quintal',
      quality: 'Common',
      msp: 2183,
      color: 'from-green-500 to-emerald-600',
      trend: 'down',
      volume: '1,850 quintals',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'cotton',
      name: 'Cotton (कपास)',
      icon: TreePine,
      currentPrice: 6200,
      previousPrice: 6150,
      change: 50,
      changePercent: 0.81,
      unit: 'per quintal',
      quality: 'Medium',
      msp: 6080,
      color: 'from-blue-500 to-cyan-600',
      trend: 'up',
      volume: '890 quintals',
      lastUpdated: '3 hours ago'
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane (गन्ना)',
      icon: TreePine,
      currentPrice: 350,
      previousPrice: 345,
      change: 5,
      changePercent: 1.45,
      unit: 'per quintal',
      quality: 'Good',
      msp: 315,
      color: 'from-purple-500 to-pink-600',
      trend: 'up',
      volume: '3,200 quintals',
      lastUpdated: '4 hours ago'
    },
    {
      id: 'maize',
      name: 'Maize (मक्का)',
      icon: Wheat,
      currentPrice: 1850,
      previousPrice: 1820,
      change: 30,
      changePercent: 1.65,
      unit: 'per quintal',
      quality: 'FAQ',
      msp: 1962,
      color: 'from-orange-500 to-red-600',
      trend: 'up',
      volume: '1,650 quintals',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'onion',
      name: 'Onion (प्याज)',
      icon: Apple,
      currentPrice: 2800,
      previousPrice: 3200,
      change: -400,
      changePercent: -12.5,
      unit: 'per quintal',
      quality: 'Medium',
      msp: null,
      color: 'from-red-500 to-pink-600',
      trend: 'down',
      volume: '950 quintals',
      lastUpdated: '1 hour ago'
    }
  ];

  const marketTrends = [
    {
      period: 'This Week',
      gainers: ['Wheat', 'Cotton', 'Maize'],
      losers: ['Rice', 'Onion'],
      avgChange: '+1.2%'
    },
    {
      period: 'This Month',
      gainers: ['Cotton', 'Sugarcane', 'Wheat'],
      losers: ['Onion', 'Potato'],
      avgChange: '+2.8%'
    }
  ];

  const priceAlerts = [
    {
      commodity: 'Wheat',
      type: 'price_target',
      message: 'Wheat price reached your target of ₹2,150/quintal',
      time: '2 hours ago',
      status: 'active'
    },
    {
      commodity: 'Rice',
      type: 'price_drop',
      message: 'Rice price dropped below ₹1,950/quintal',
      time: '1 hour ago',
      status: 'active'
    }
  ];

  const nearbyBuyers = [
    {
      name: 'Sharma Traders',
      location: '2.5 km away',
      rating: 4.5,
      contact: '+91 98765 43210',
      speciality: 'Wheat, Rice',
      lastPrice: '₹2,140/quintal',
      verified: true
    },
    {
      name: 'Punjab Agro Corp',
      location: '5.8 km away',
      rating: 4.2,
      contact: '+91 98765 43211',
      speciality: 'Cotton, Sugarcane',
      lastPrice: '₹6,180/quintal',
      verified: true
    },
    {
      name: 'Kishan Mandi',
      location: '8.2 km away',
      rating: 4.0,
      contact: '+91 98765 43212',
      speciality: 'All crops',
      lastPrice: 'Negotiable',
      verified: false
    }
  ];

  const transportOptions = [
    {
      type: 'Truck (10 ton)',
      rate: '₹15/km',
      availability: 'Available',
      contact: '+91 98765 43213'
    },
    {
      type: 'Tractor Trolley (5 ton)',
      rate: '₹8/km',
      availability: 'Available',
      contact: '+91 98765 43214'
    },
    {
      type: 'Mini Truck (3 ton)',
      rate: '₹12/km',
      availability: 'Busy',
      contact: '+91 98765 43215'
    }
  ];

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
              <IndianRupee className="h-6 w-6 text-green-600" />
              <span>Live Market Prices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Mandi</label>
                <Select value={selectedMandi} onValueChange={setSelectedMandi}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mandis[selectedState as keyof typeof mandis]?.map((mandi) => (
                      <SelectItem key={mandi.id} value={mandi.id}>
                        {mandi.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Price Alerts */}
      {priceAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <span>Price Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start justify-between p-3 bg-orange-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-700">{alert.commodity}</h4>
                      <p className="text-sm text-orange-600">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {alert.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Commodity Prices Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodityPrices.map((commodity, index) => {
            const IconComponent = commodity.icon;
            return (
              <motion.div
                key={commodity.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${commodity.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{commodity.name}</CardTitle>
                          <p className="text-sm text-gray-600">{commodity.quality} quality</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        commodity.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {commodity.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">
                          {commodity.changePercent > 0 ? '+' : ''}{commodity.changePercent}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        ₹{commodity.currentPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">{commodity.unit}</div>
                      <div className={`text-sm font-medium ${
                        commodity.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {commodity.change > 0 ? '+' : ''}₹{commodity.change} from yesterday
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-gray-50 rounded">
                        <div className="text-gray-600">MSP</div>
                        <div className="font-medium">
                          {commodity.msp ? `₹${commodity.msp}` : 'N/A'}
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <div className="text-gray-600">Volume</div>
                        <div className="font-medium">{commodity.volume}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{commodity.lastUpdated}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>Ludhiana Mandi</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Target className="h-3 w-3 mr-1" />
                        Set Alert
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        View Chart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <span>Market Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{trend.period}</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {trend.avgChange}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-600 mb-2">Top Gainers</h4>
                        <ul className="space-y-1">
                          {trend.gainers.map((gainer, gIndex) => (
                            <li key={gIndex} className="text-sm flex items-center">
                              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                              {gainer}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-red-600 mb-2">Top Losers</h4>
                        <ul className="space-y-1">
                          {trend.losers.map((loser, lIndex) => (
                            <li key={lIndex} className="text-sm flex items-center">
                              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                              {loser}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nearby Buyers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-purple-600" />
                <span>Nearby Buyers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyBuyers.map((buyer, index) => (
                  <motion.div
                    key={index}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{buyer.name}</h4>
                          {buyer.verified && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span>{buyer.location}</span>
                        </div>
                        <div className="text-sm text-gray-600">{buyer.speciality}</div>
                        <div className="text-sm font-medium text-green-600">{buyer.lastPrice}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm">{buyer.rating}</span>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Transport Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-orange-600" />
              <span>Transport Options</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {transportOptions.map((transport, index) => (
                <motion.div
                  key={index}
                  className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Truck className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h4 className="font-semibold">{transport.type}</h4>
                  <div className="text-lg font-bold text-green-600">{transport.rate}</div>
                  <Badge 
                    variant="secondary" 
                    className={`mt-2 ${
                      transport.availability === 'Available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {transport.availability}
                  </Badge>
                  <Button size="sm" className="w-full mt-3" variant="outline">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}