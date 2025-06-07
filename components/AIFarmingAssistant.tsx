'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Leaf, 
  Droplets, 
  Thermometer,
  Cloud,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIFarmingAssistantProps {
  onClose: () => void;
}

export default function AIFarmingAssistant({ onClose }: AIFarmingAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI Farming Assistant. I can help you with crop management, soil analysis, irrigation planning, pest control, and implementing the latest agricultural technologies. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "How can I improve my crop yields?",
        "What's the best irrigation schedule for tomatoes?",
        "How do I implement precision agriculture?",
        "Tell me about soil health monitoring"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Leaf, label: "Crop Health", color: "text-green-600" },
    { icon: Droplets, label: "Irrigation", color: "text-blue-600" },
    { icon: Thermometer, label: "Climate", color: "text-red-600" },
    { icon: TrendingUp, label: "Analytics", color: "text-purple-600" }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes('yield') || lowerMessage.includes('productivity')) {
      response = `To improve crop yields, I recommend implementing precision agriculture techniques:

🌱 **Soil Optimization**: Use GeneTrust's quantum soil sensors to monitor nutrient levels in real-time. Optimal soil pH should be 6.0-7.0 for most crops.

📊 **Data-Driven Decisions**: Deploy AgroTwin's digital twin platform to simulate different fertilizer applications and predict outcomes before implementation.

💧 **Smart Irrigation**: Implement AquaTerra's water management system to optimize irrigation timing and reduce water waste by up to 40%.

🤖 **AI-Powered Monitoring**: Use hyperspectral imaging to detect early signs of stress or disease, allowing for preventive action.

Expected results: 15-25% yield increase within the first growing season.`;
      
      suggestions = [
        "What about specific fertilizer recommendations?",
        "How do I set up soil monitoring sensors?",
        "Tell me about pest management strategies",
        "What crops work best with precision agriculture?"
      ];
    } else if (lowerMessage.includes('irrigation') || lowerMessage.includes('water')) {
      response = `Smart irrigation is crucial for optimal crop growth. Here's my recommendation:

💧 **Scheduling**: Water early morning (6-8 AM) to minimize evaporation. Deep, infrequent watering promotes root development.

📱 **Technology Integration**: 
- Install soil moisture sensors every 50 feet
- Use weather data to adjust irrigation schedules
- Implement drip irrigation for 30-50% water savings

🌡️ **Environmental Factors**: Adjust based on:
- Temperature (reduce by 20% when <70°F)
- Humidity (increase when <40%)
- Wind speed (avoid irrigation in high winds)

🎯 **Crop-Specific Guidelines**:
- Tomatoes: 1-2 inches per week, consistent moisture
- Corn: Heavy watering during tasseling stage
- Leafy greens: Light, frequent watering

Expected savings: 35-45% reduction in water usage with maintained or improved yields.`;
      
      suggestions = [
        "How do I calculate water requirements?",
        "What's the ROI of smart irrigation systems?",
        "Tell me about drought-resistant crop varieties",
        "How do I detect irrigation system problems?"
      ];
    } else if (lowerMessage.includes('precision agriculture') || lowerMessage.includes('technology')) {
      response = `Implementing precision agriculture can transform your farming operation:

🚀 **Getting Started**:
1. Soil mapping and testing (priority #1)
2. GPS-guided equipment installation
3. Drone/satellite imagery setup
4. Data management platform deployment

🛰️ **Core Technologies**:
- **Variable Rate Technology (VRT)**: Apply inputs precisely where needed
- **GPS Guidance**: Reduce overlap and improve efficiency
- **Remote Sensing**: Monitor crop health from above
- **IoT Sensors**: Real-time field condition monitoring

📊 **Expected Benefits**:
- 15-20% reduction in input costs
- 10-15% increase in yields
- 25-30% improvement in operational efficiency
- Better environmental sustainability

💰 **Investment Timeline**:
- Year 1: Basic GPS and soil testing ($15k-25k)
- Year 2: Add sensors and imaging ($10k-20k)
- Year 3: Full automation integration ($20k-40k)

ROI typically achieved within 2-3 years for operations over 500 acres.`;
      
      suggestions = [
        "What's the minimum farm size for precision ag?",
        "How do I choose the right technology vendor?",
        "Tell me about crop monitoring drones",
        "What training do my workers need?"
      ];
    } else if (lowerMessage.includes('soil') || lowerMessage.includes('health')) {
      response = `Soil health is the foundation of successful farming. Here's how to optimize it:

🧪 **Testing & Analysis**:
- Test soil pH, nutrients, and organic matter quarterly
- Use GeneTrust's quantum sensors for molecular-level analysis
- Monitor soil compaction and structure

🌱 **Improvement Strategies**:
- Cover crops during off-season (crimson clover, winter rye)
- Reduce tillage to preserve soil structure
- Add organic matter (compost, manure) annually
- Implement crop rotation to break pest cycles

📊 **Key Indicators to Monitor**:
- Organic matter: Target 3-5%
- pH levels: 6.0-7.0 for most crops
- Nutrient balance: N-P-K ratios
- Microbial activity and diversity

🔄 **Regenerative Practices**:
- No-till or minimum tillage
- Diverse crop rotations
- Integrated pest management
- Strategic grazing (if applicable)

Timeline: Significant soil health improvements typically seen within 2-3 years of consistent practices.`;
      
      suggestions = [
        "How often should I test my soil?",
        "What are the best cover crops for my region?",
        "Tell me about soil compaction solutions",
        "How do I improve soil organic matter?"
      ];
    } else {
      response = `I understand you're looking for farming guidance. I can help with:

🌾 **Crop Management**: Planting, growth monitoring, harvest optimization
🌱 **Soil Health**: Testing, amendments, regenerative practices
💧 **Water Management**: Irrigation scheduling, conservation techniques
🛡️ **Pest & Disease Control**: Integrated management strategies
📊 **Technology Integration**: Precision agriculture, AI platforms
🌍 **Sustainability**: Environmental impact reduction, carbon farming

Could you be more specific about what aspect of farming you'd like to focus on? I'm here to provide detailed, actionable advice based on the latest agricultural research and technology.`;
      
      suggestions = [
        "How can I reduce my farming costs?",
        "What's the best crop rotation strategy?",
        "Tell me about sustainable farming practices",
        "How do I prepare for climate change impacts?"
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col bg-white/95 backdrop-blur-sm">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>AI Farming Assistant</span>
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </CardTitle>
                <p className="text-sm text-gray-600">Powered by agricultural AI and machine learning</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Badge 
                  key={action.label} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => setInput(`Tell me about ${action.label.toLowerCase()}`)}
                >
                  <IconComponent className={`h-3 w-3 mr-1 ${action.color}`} />
                  {action.label}
                </Badge>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 border'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-2 max-w-[80%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 border rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-green-50 hover:border-green-300"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4 bg-gray-50/80">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming, crops, soil, irrigation, or agricultural technology..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}