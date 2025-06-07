'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play,
  Pause,
  RotateCcw,
  Settings,
  Languages,
  Headphones,
  Radio,
  Zap,
  Brain,
  MessageCircle,
  Phone,
  Globe,
  Star,
  Heart,
  Coffee,
  Sparkles
} from 'lucide-react';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hindi');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [confidence, setConfidence] = useState(0);

  const languages = [
    { id: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'punjabi', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { id: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
    { id: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { id: 'tamil', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const voiceCommands = [
    { command: 'मौसम की जानकारी दो', translation: 'Tell me about weather', category: 'weather' },
    { command: 'फसल की स्थिति बताओ', translation: 'Tell crop status', category: 'crops' },
    { command: 'सिंचाई शुरू करो', translation: 'Start irrigation', category: 'irrigation' },
    { command: 'बाजार के भाव बताओ', translation: 'Tell market prices', category: 'market' },
    { command: 'खाद की जरूरत है', translation: 'Need fertilizer', category: 'fertilizer' },
    { command: 'कीट नियंत्रण की सलाह', translation: 'Pest control advice', category: 'pest' }
  ];

  const recentCommands = [
    { command: 'आज का मौसम कैसा है?', response: 'आज का तापमान 28°C है, हल्की बारिश की संभावना है।', time: '2 min ago' },
    { command: 'गेहूं की कीमत क्या है?', response: 'गेहूं की आज की कीमत ₹2,150 प्रति क्विंटल है।', time: '5 min ago' },
    { command: 'सिंचाई कब करनी चाहिए?', response: 'मिट्टी की नमी 65% है, कल सुबह सिंचाई करें।', time: '10 min ago' }
  ];

  const quickActions = [
    { icon: Radio, label: 'Weather Update', command: 'मौसम अपडेट', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, label: 'Quick Status', command: 'त्वरित स्थिति', color: 'from-green-500 to-emerald-500' },
    { icon: Phone, label: 'Emergency Help', command: 'आपातकालीन सहायता', color: 'from-red-500 to-pink-500' },
    { icon: MessageCircle, label: 'Ask Question', command: 'प्रश्न पूछें', color: 'from-purple-500 to-blue-500' }
  ];

  const startListening = () => {
    setIsListening(true);
    setIsProcessing(false);
    // Simulate voice recognition
    setTimeout(() => {
      setIsProcessing(true);
      setConfidence(Math.floor(Math.random() * 20) + 80);
      setTimeout(() => {
        setLastCommand('आज का मौसम कैसा है?');
        setIsListening(false);
        setIsProcessing(false);
        speakResponse();
      }, 2000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
  };

  const speakResponse = () => {
    setIsSpeaking(true);
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
    }, 4000);
  };

  const executeQuickAction = (command: string) => {
    setLastCommand(command);
    speakResponse();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Headphones className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Voice Assistant</h2>
                    <p className="text-purple-100">बोलकर अपने खेत को नियंत्रित करें</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">6</div>
                    <div className="text-sm text-purple-100">Languages</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-purple-100">Voice Commands</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-purple-100">Accuracy</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Languages className="h-5 w-5" />
                    <span className="font-semibold">Current Language</span>
                  </div>
                  <div className="text-lg font-bold">
                    {languages.find(l => l.id === currentLanguage)?.flag} {languages.find(l => l.id === currentLanguage)?.name}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-5 w-5" />
                    <span className="font-semibold">AI Status</span>
                  </div>
                  <div className="text-sm">Ready to Listen</div>
                  <div className="text-xs text-purple-100">Confidence: {confidence}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span>Voice Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Voice Button */}
              <div className="text-center">
                <motion.div
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    onClick={isListening ? stopListening : startListening}
                    className={`w-32 h-32 rounded-full flex items-center justify-center text-white relative overflow-hidden ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-pink-600' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600'
                    }`}
                    animate={{
                      boxShadow: isListening 
                        ? [
                            "0 0 0 0 rgba(239, 68, 68, 0.7)",
                            "0 0 0 20px rgba(239, 68, 68, 0)",
                            "0 0 0 0 rgba(239, 68, 68, 0.7)"
                          ]
                        : "0 10px 20px rgba(34, 197, 94, 0.3)"
                    }}
                    transition={{
                      boxShadow: {
                        duration: 1.5,
                        repeat: isListening ? Infinity : 0,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isListening ? (
                        <motion.div
                          key="listening"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MicOff className="h-12 w-12" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="not-listening"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Mic className="h-12 w-12" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  
                  {/* Listening Animation */}
                  {isListening && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-red-300"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0.3, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
                
                <div className="mt-4">
                  <div className="text-lg font-semibold">
                    {isListening ? 'सुन रहा हूं...' : 
                     isProcessing ? 'समझ रहा हूं...' : 
                     isSpeaking ? 'बोल रहा हूं...' : 'बोलने के लिए दबाएं'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isListening ? 'Listening for commands' : 
                     isProcessing ? 'Processing your request' : 
                     isSpeaking ? 'Speaking response' : 'Tap to start voice command'}
                  </div>
                </div>
              </div>

              {/* Voice Controls */}
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="flex flex-col items-center p-3 h-auto"
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4 mb-1" /> : <VolumeX className="h-4 w-4 mb-1" />}
                  <span className="text-xs">{voiceEnabled ? 'Mute' : 'Unmute'}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex flex-col items-center p-3 h-auto"
                >
                  <Settings className="h-4 w-4 mb-1" />
                  <span className="text-xs">Settings</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex flex-col items-center p-3 h-auto"
                >
                  <RotateCcw className="h-4 w-4 mb-1" />
                  <span className="text-xs">Reset</span>
                </Button>
              </div>

              {/* Language Selection */}
              <div>
                <h4 className="font-semibold mb-3">Select Language</h4>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.id}
                      onClick={() => setCurrentLanguage(lang.id)}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        currentLanguage === lang.id 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions & Commands */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => executeQuickAction(action.command)}
                      className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white text-center hover:shadow-lg transition-all`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{action.label}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Voice Commands List */}
              <div>
                <h4 className="font-semibold mb-3">Common Voice Commands</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                  {voiceCommands.map((cmd, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => executeQuickAction(cmd.command)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-sm">{cmd.command}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{cmd.translation}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {cmd.category}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Last Command */}
              {lastCommand && (
                <motion.div
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-blue-700 dark:text-blue-400">Last Command</span>
                  </div>
                  <div className="text-sm">{lastCommand}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Confidence: {confidence}%
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Commands History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Recent Voice Interactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCommands.map((interaction, index) => (
                <motion.div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Mic className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{interaction.command}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{interaction.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Volume2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-700 dark:text-gray-300">{interaction.response}</div>
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
  );
}