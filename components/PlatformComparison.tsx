'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Shield, 
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star
} from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
  domains: string[];
  maturity: number;
  description: string;
  keyFeatures: string[];
  metrics: {
    accuracy: string;
    timeReduction: string;
    costSaving: string;
    scalability: string;
  };
}

interface PlatformComparisonProps {
  platforms: Platform[];
}

export default function PlatformComparison({ platforms }: PlatformComparisonProps) {
  const comparisonMetrics = [
    { name: 'Technical Maturity', key: 'maturity', icon: TrendingUp },
    { name: 'Implementation Cost', values: ['$$$$', '$$$', '$$'], icon: DollarSign },
    { name: 'Deployment Time', values: ['6-9 months', '3-6 months', '9-12 months'], icon: Clock },
    { name: 'Security Level', values: ['Enterprise', 'High', 'Very High'], icon: Shield },
    { name: 'Scalability', values: ['High', 'Very High', 'High'], icon: Zap }
  ];

  const detailedComparison = {
    strengths: {
      genetrust: [
        'Highest precision in gene editing',
        'Robust blockchain security',
        'Regulatory compliance built-in',
        'Advanced AI guide RNA design'
      ],
      agrotwin: [
        'Comprehensive multi-domain integration',
        'Excellent scalability',
        'Real-time predictive analytics',
        'Collaborative farm networking'
      ],
      aquaterra: [
        'Unique water-land integration',
        'Highest water efficiency gains',
        'Ecosystem-wide optimization',
        'Innovative aquaponics automation'
      ]
    },
    weaknesses: {
      genetrust: [
        'Highest implementation cost',
        'Requires specialized expertise',
        'Regulatory approval complexities',
        'Limited to genetic applications'
      ],
      agrotwin: [
        'Complex initial setup',
        'High data management requirements',
        'Requires extensive sensor networks',
        'Integration challenges with legacy systems'
      ],
      aquaterra: [
        'Newest technology (higher risk)',
        'Limited proven case studies',
        'Requires water infrastructure changes',
        'Specialized aquaculture knowledge needed'
      ]
    },
    idealFor: {
      genetrust: [
        'Seed companies and breeders',
        'Research institutions',
        'Large agricultural corporations',
        'Government agricultural departments'
      ],
      agrotwin: [
        'Large commercial farms (1000+ acres)',
        'Agricultural cooperatives',
        'Precision agriculture consultants',
        'Smart farming initiatives'
      ],
      aquaterra: [
        'Aquaculture operations',
        'Integrated farming systems',
        'Water-scarce regions',
        'Sustainable agriculture projects'
      ]
    }
  };

  const roi = {
    genetrust: {
      initial: 150000,
      annual: 45000,
      payback: '3.3 years',
      roi5year: '180%'
    },
    agrotwin: {
      initial: 75000,
      annual: 35000,
      payback: '2.1 years',
      roi5year: '220%'
    },
    aquaterra: {
      initial: 95000,
      annual: 42000,
      payback: '2.3 years',
      roi5year: '200%'
    }
  };

  return (
    <div className="space-y-8">
      {/* Platform Overview Comparison */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span>Platform Performance Comparison</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <div key={platform.id} className="space-y-4 p-4 border rounded-lg bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{platform.name}</h3>
                  <p className="text-sm text-gray-600">{platform.subtitle}</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technical Maturity</span>
                      <span>{platform.maturity}%</span>
                    </div>
                    <Progress value={platform.maturity} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Accuracy:</span>
                      <span className="ml-1 font-medium">{platform.metrics.accuracy}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Time Saved:</span>
                      <span className="ml-1 font-medium">{platform.metrics.timeReduction}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cost Reduction:</span>
                      <span className="ml-1 font-medium">{platform.metrics.costSaving}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Scalability:</span>
                      <span className="ml-1 font-medium">{platform.metrics.scalability}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="strengths" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80">
          <TabsTrigger value="strengths">Strengths & Weaknesses</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Strengths & Weaknesses */}
        <TabsContent value="strengths" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.id} className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600 flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {detailedComparison.strengths[platform.id as keyof typeof detailedComparison.strengths].map((strength, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-amber-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Considerations
                    </h4>
                    <ul className="space-y-1">
                      {detailedComparison.weaknesses[platform.id as keyof typeof detailedComparison.weaknesses].map((weakness, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-600 flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Ideal For
                    </h4>
                    <ul className="space-y-1">
                      {detailedComparison.idealFor[platform.id as keyof typeof detailedComparison.idealFor].map((ideal, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {ideal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ROI Analysis */}
        <TabsContent value="roi" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                <span>Return on Investment Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {platforms.map((platform) => {
                  const roiData = roi[platform.id as keyof typeof roi];
                  return (
                    <div key={platform.id} className="space-y-4 p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                      <h3 className="font-semibold text-lg text-center">{platform.name}</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Initial Investment:</span>
                          <span className="font-medium">${roiData.initial.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Annual Savings:</span>
                          <span className="font-medium text-green-600">${roiData.annual.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Payback Period:</span>
                          <span className="font-medium">{roiData.payback}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">5-Year ROI:</span>
                          <span className="font-medium text-blue-600">{roiData.roi5year}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="text-xs text-gray-500 text-center">
                          Based on 1000-acre commercial operation
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Implementation Complexity */}
        <TabsContent value="implementation" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-purple-600" />
                <span>Implementation Timeline & Complexity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {platforms.map((platform, index) => (
                  <div key={platform.id} className="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-semibold">{platform.name}</h3>
                        <p className="text-sm text-gray-600">{platform.subtitle}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Deployment Time:</span>
                        <div className="font-medium">{comparisonMetrics[2].values[index]}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Complexity:</span>
                        <div className="font-medium">{index === 0 ? 'High' : index === 1 ? 'Medium' : 'Medium-High'}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Support Level:</span>
                        <div className="font-medium">{comparisonMetrics[3].values[index]}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Recommendations */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-yellow-600" />
                <span>Strategic Implementation Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-green-600">Small to Medium Farms (100-500 acres)</h3>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">Recommended: AgroTwin</Badge>
                    <p className="text-sm text-gray-600">
                      Start with AgroTwin's digital twin platform for comprehensive monitoring and gradual scaling. 
                      Lower initial investment with proven ROI.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Phase 1: Basic sensor deployment</li>
                      <li>• Phase 2: Add weather integration</li>
                      <li>• Phase 3: Full digital twin implementation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-600">Large Commercial Operations (1000+ acres)</h3>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">Recommended: Multi-Platform</Badge>
                    <p className="text-sm text-gray-600">
                      Implement AgroTwin as foundation, add GeneTrust for crop optimization, 
                      and AquaTerra for water management.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Year 1: AgroTwin deployment</li>
                      <li>• Year 2: GeneTrust integration for key crops</li>
                      <li>• Year 3: AquaTerra for water optimization</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-purple-600">Research Institutions</h3>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">Recommended: GeneTrust</Badge>
                    <p className="text-sm text-gray-600">
                      Focus on GeneTrust for cutting-edge research capabilities and regulatory compliance. 
                      Highest potential for breakthrough discoveries.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Immediate access to latest AI models</li>
                      <li>• Built-in compliance tracking</li>
                      <li>• Collaboration tools for research teams</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-cyan-600">Aquaculture & Water-Intensive Operations</h3>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">Recommended: AquaTerra</Badge>
                    <p className="text-sm text-gray-600">
                      Perfect for operations with significant water usage or aquaculture components. 
                      Highest water efficiency gains.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Integrated water-land optimization</li>
                      <li>• Aquaponics automation</li>
                      <li>• Ecosystem health monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Universal Success Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 inline mr-1" />
                    <strong>Staff Training:</strong> Invest 15-20% of budget in training programs
                  </div>
                  <div className="text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 inline mr-1" />
                    <strong>Phased Rollout:</strong> Start with pilot areas before full deployment
                  </div>
                  <div className="text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 inline mr-1" />
                    <strong>Integration Planning:</strong> Ensure compatibility with existing systems
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}