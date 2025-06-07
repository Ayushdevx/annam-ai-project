'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Snowflake, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye,
  Zap,
  Umbrella,
  Sunrise,
  Sunset,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MapPin,
  Satellite,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Search,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  dewPoint: number;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

interface ForecastData {
  time: string;
  temp: number;
  condition: string;
  icon: string;
  rain: number;
  humidity: number;
  windSpeed: number;
}

interface DailyForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  rain: number;
  humidity: number;
}

export default function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<ForecastData[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState('Delhi');
  const [currentTime, setCurrentTime] = useState(new Date());

  const API_KEY = "13ec30e73b1c11975b6070bf962822eb";
  const BASE_URL = "https://api.openweathermap.org/data/2.5";
  const GEO_URL = "https://api.openweathermap.org/geo/1.0";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWeatherData('Delhi');
  }, []);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get coordinates for the city
      const geoResponse = await fetch(
        `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();
      
      if (geoData.length === 0) {
        throw new Error('City not found');
      }
      
      const { lat, lon, name, country } = geoData[0];
      
      // Fetch current weather
      const currentResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const currentData = await currentResponse.json();
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();
      
      // Process current weather
      const weather: WeatherData = {
        location: `${name}, ${country}`,
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
        windDirection: getWindDirection(currentData.wind.deg),
        pressure: currentData.main.pressure,
        visibility: Math.round(currentData.visibility / 1000),
        uvIndex: 6, // UV index not available in free tier
        dewPoint: Math.round(currentData.main.temp - ((100 - currentData.main.humidity) / 5)),
        feelsLike: Math.round(currentData.main.feels_like),
        sunrise: new Date(currentData.sys.sunrise * 1000).toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sunset: new Date(currentData.sys.sunset * 1000).toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        icon: currentData.weather[0].icon
      };
      
      // Process hourly forecast (next 8 hours)
      const hourly = forecastData.list.slice(0, 8).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].description,
        icon: item.weather[0].icon,
        rain: item.rain ? Math.round(item.rain['3h'] || 0) : 0,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6)
      }));
      
      // Process daily forecast (next 5 days)
      const daily = [];
      const processedDays = new Set();
      
      for (const item of forecastData.list) {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!processedDays.has(dayKey) && daily.length < 7) {
          processedDays.add(dayKey);
          daily.push({
            day: date.toLocaleDateString('en-IN', { weekday: 'long' }),
            date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            condition: item.weather[0].description,
            icon: item.weather[0].icon,
            rain: item.rain ? Math.round((item.rain['3h'] || 0) * 100 / 3) : 0,
            humidity: item.main.humidity
          });
        }
      }
      
      setCurrentWeather(weather);
      setHourlyForecast(hourly);
      setWeeklyForecast(daily);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: any } = {
      '01d': Sun, '01n': Sun,
      '02d': Cloud, '02n': Cloud,
      '03d': Cloud, '03n': Cloud,
      '04d': Cloud, '04n': Cloud,
      '09d': CloudRain, '09n': CloudRain,
      '10d': CloudRain, '10n': CloudRain,
      '11d': Zap, '11n': Zap,
      '13d': Snowflake, '13n': Snowflake,
      '50d': Wind, '50n': Wind
    };
    return iconMap[iconCode] || Cloud;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherData(searchCity.trim());
    }
  };

  const weatherAlerts = [
    {
      type: 'warning',
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall expected in next 24 hours. Avoid irrigation and protect crops.',
      severity: 'high',
      validUntil: '2024-03-17 18:00'
    }
  ];

  const farmingAdvice = {
    irrigation: {
      recommendation: 'Postpone irrigation for next 2 days due to expected rainfall',
      waterSaving: '40% water can be saved',
      timing: 'Resume irrigation on Thursday morning'
    },
    fieldWork: {
      recommendation: 'Complete harvesting by tomorrow evening',
      reason: 'Heavy rain expected from Wednesday',
      alternative: 'Use covered storage for harvested crops'
    },
    spraying: {
      recommendation: 'Avoid pesticide/fertilizer spraying',
      reason: 'Rain will wash away chemicals',
      nextWindow: 'Friday morning after rain stops'
    }
  };

  const soilMoisture = {
    current: 75,
    optimal: '60-80%',
    status: 'optimal',
    forecast: [
      { day: 'Today', moisture: 75 },
      { day: 'Tomorrow', moisture: 85 },
      { day: 'Wed', moisture: 95 },
      { day: 'Thu', moisture: 90 },
      { day: 'Fri', moisture: 80 },
      { day: 'Sat', moisture: 70 },
      { day: 'Sun', moisture: 60 }
    ]
  };

  if (loading && !currentWeather) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => fetchWeatherData(searchCity)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Search city..."
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current Weather */}
      {currentWeather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"
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
                className="absolute bottom-10 left-10 w-16 h-16 bg-white/5 rounded-full"
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
            </div>

            <CardContent className="p-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Weather Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{currentWeather.location}</span>
                    <span className="text-xs opacity-75">• {currentTime.toLocaleTimeString('en-IN')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <motion.div 
                      className="text-6xl font-bold"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentWeather.temperature}°
                    </motion.div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        {(() => {
                          const IconComponent = getWeatherIcon(currentWeather.icon);
                          return <IconComponent className="h-16 w-16 mb-2" />;
                        })()}
                      </motion.div>
                      <div className="text-lg capitalize">{currentWeather.condition}</div>
                      <div className="text-sm opacity-80">Feels like {currentWeather.feelsLike}°C</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Droplets className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm opacity-80">Humidity</div>
                      <div className="font-semibold">{currentWeather.humidity}%</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Wind className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm opacity-80">Wind</div>
                      <div className="font-semibold">{currentWeather.windSpeed} km/h</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Eye className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm opacity-80">Visibility</div>
                      <div className="font-semibold">{currentWeather.visibility} km</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Thermometer className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm opacity-80">Pressure</div>
                      <div className="font-semibold">{currentWeather.pressure} hPa</div>
                    </motion.div>
                  </div>
                </div>

                {/* Sun Times & Additional Info */}
                <div className="space-y-4">
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Sunrise className="h-4 w-4" />
                        <span className="text-sm">Sunrise</span>
                      </div>
                      <span className="font-semibold">{currentWeather.sunrise}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sunset className="h-4 w-4" />
                        <span className="text-sm">Sunset</span>
                      </div>
                      <span className="font-semibold">{currentWeather.sunset}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Dew Point</span>
                        <span className="font-semibold">{currentWeather.dewPoint}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Wind Direction</span>
                        <span className="font-semibold">{currentWeather.windDirection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">UV Index</span>
                        <span className="font-semibold">{currentWeather.uvIndex}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-orange-200 dark:border-orange-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <span>Weather Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weatherAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' 
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-500' 
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-semibold ${
                          alert.severity === 'high' 
                            ? 'text-red-700 dark:text-red-400' 
                            : 'text-yellow-700 dark:text-yellow-400'
                        }`}>
                          {alert.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Valid until: {alert.validUntil}</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={
                          alert.severity === 'high' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Forecast with Animated Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span>Hourly Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hourlyForecast.map((hour, index) => {
                  const IconComponent = getWeatherIcon(hour.icon);
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-12">{hour.time}</span>
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        <span className="text-sm capitalize">{hour.condition}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">{hour.temp}°C</span>
                        <div className="flex items-center space-x-1">
                          <Droplets className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{hour.rain}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Wind className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{hour.windSpeed}km/h</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Temperature Trend Chart */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-sm font-medium mb-3">Temperature Trend</h4>
                <div className="flex items-end justify-between h-20">
                  {hourlyForecast.slice(0, 6).map((hour, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">{hour.temp}°</span>
                      <motion.div
                        className="bg-blue-500 w-4 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${(hour.temp / Math.max(...hourlyForecast.map(h => h.temp))) * 60}px` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {hour.time.split(':')[0]}h
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Forecast */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span>7-Day Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyForecast.map((day, index) => {
                  const IconComponent = getWeatherIcon(day.icon);
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-20">
                          <div className="text-sm font-medium">{day.day}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{day.date}</div>
                        </div>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                        >
                          <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        <span className="text-sm capitalize">{day.condition}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{day.high}°/{day.low}°</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">H/L</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Droplets className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{day.rain}%</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Farming Advice & Soil Moisture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farming Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span>Weather-Based Farming Advice</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="irrigation" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                  <TabsTrigger value="fieldwork">Field Work</TabsTrigger>
                  <TabsTrigger value="spraying">Spraying</TabsTrigger>
                </TabsList>
                
                <TabsContent value="irrigation" className="space-y-3">
                  <motion.div 
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Irrigation Advice</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300 mb-2">{farmingAdvice.irrigation.recommendation}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {farmingAdvice.irrigation.waterSaving}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{farmingAdvice.irrigation.timing}</p>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="fieldwork" className="space-y-3">
                  <motion.div 
                    className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Field Work Advice</h4>
                    <p className="text-sm text-orange-600 dark:text-orange-300 mb-2">{farmingAdvice.fieldWork.recommendation}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Reason: {farmingAdvice.fieldWork.reason}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{farmingAdvice.fieldWork.alternative}</p>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="spraying" className="space-y-3">
                  <motion.div 
                    className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Spraying Advice</h4>
                    <p className="text-sm text-red-600 dark:text-red-300 mb-2">{farmingAdvice.spraying.recommendation}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Reason: {farmingAdvice.spraying.reason}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Next window: {farmingAdvice.spraying.nextWindow}</p>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Soil Moisture Forecast with Animated Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                <span>Soil Moisture Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-3xl font-bold text-cyan-600 dark:text-cyan-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {soilMoisture.current}%
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Current Soil Moisture</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Optimal: {soilMoisture.optimal}</div>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Optimal Level
                  </Badge>
                </motion.div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">7-Day Moisture Forecast</div>
                  {soilMoisture.forecast.map((day, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="text-sm w-16">{day.day}</span>
                      <div className="flex-1 mx-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                          <Progress value={day.moisture} className="h-2" />
                        </motion.div>
                      </div>
                      <span className="text-sm font-medium w-12">{day.moisture}%</span>
                    </motion.div>
                  ))}
                </div>

                {/* Moisture Trend Visualization */}
                <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Moisture Trend</h4>
                  <div className="flex items-end justify-between h-16">
                    {soilMoisture.forecast.map((day, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <motion.div
                          className="bg-cyan-500 w-3 rounded-t"
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.moisture / 100) * 40}px` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {day.day.slice(0, 3)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}