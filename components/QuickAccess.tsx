'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sprout, 
  Cloud, 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin,
  Phone,
  MessageCircle
} from 'lucide-react';

const QuickAccess = () => {
  const quickActions = [
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "Crop Planner",
      description: "Plan your crop rotation and planting schedule",
      action: "Plan Now"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Weather Forecast",
      description: "7-day weather forecast for your location",
      action: "Check Weather"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Market Prices",
      description: "Latest commodity prices and trends",
      action: "View Prices"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Consultation",
      description: "Connect with agricultural experts",
      action: "Book Session"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Farm Schedule",
      description: "Manage your daily farm activities",
      action: "View Schedule"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Help Center",
      description: "Get support and answers to your questions",
      action: "Get Help"
    }
  ];

  const emergencyContacts = [
    {
      icon: <Phone className="h-4 w-4" />,
      title: "Agricultural Helpline",
      number: "1800-XXX-XXXX"
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      title: "Nearest Veterinary",
      number: "Emergency Services"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            Quick Access
          </CardTitle>
          <CardDescription>
            Access frequently used tools and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-green-600 mt-1">
                      {action.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                      <p className="text-xs text-gray-600 mb-3">{action.description}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        {action.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <div className="text-red-600">
                  {contact.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{contact.title}</div>
                  <div className="text-xs text-gray-600">{contact.number}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickAccess;