'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  Lightbulb,
  Target,
  TrendingUp,
  Shield,
  Zap,
  BookOpen,
  Settings
} from 'lucide-react';

export default function ImplementationGuide() {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const implementationPhases = [
    {
      name: 'Assessment & Planning',
      duration: '2-4 weeks',
      cost: '$5,000 - $15,000',
      progress: 100,
      status: 'recommended',
      tasks: [
        'Farm infrastructure assessment',
        'Current technology audit',
        'ROI analysis and budgeting',
        'Team readiness evaluation',
        'Platform selection based on needs',
        'Implementation timeline creation'
      ],
      deliverables: [
        'Technical assessment report',
        'Implementation roadmap',
        'Budget allocation plan',
        'Risk assessment matrix'
      ],
      risks: ['Inadequate infrastructure', 'Budget constraints', 'Skill gaps'],
      success_factors: ['Stakeholder buy-in', 'Clear objectives', 'Realistic timeline']
    },
    {
      name: 'Infrastructure Setup',
      duration: '4-8 weeks',
      cost: '$25,000 - $100,000',
      progress: 75,
      status: 'in-progress',
      tasks: [
        'Network infrastructure deployment',
        'Sensor installation and calibration',
        'Edge computing device setup',
        'Cloud platform configuration',
        'Security system implementation',
        'Backup and recovery setup'
      ],
      deliverables: [
        'Functioning sensor network',
        'Secure network connectivity',
        'Cloud infrastructure',
        'Monitoring systems'
      ],
      risks: ['Installation delays', 'Compatibility issues', 'Weather disruptions'],
      success_factors: ['Quality hardware', 'Professional installation', 'Thorough testing']
    },
    {
      name: 'Platform Deployment',
      duration: '6-12 weeks',
      cost: '$50,000 - $200,000',
      progress: 50,
      status: 'pending',
      tasks: [
        'Software installation and configuration',
        'AI model training and calibration',
        'Data integration and validation',
        'User interface customization',
        'Workflow automation setup',
        'Initial data collection and analysis'
      ],
      deliverables: [
        'Operational platform',
        'Trained AI models',
        'Custom dashboards',
        'Automated workflows'
      ],
      risks: ['Integration complexity', 'Data quality issues', 'Model accuracy'],
      success_factors: ['Proper data preparation', 'Iterative testing', 'User feedback']
    },
    {
      name: 'Training & Adoption',
      duration: '4-6 weeks',
      cost: '$10,000 - $30,000',
      progress: 25,
      status: 'planning',
      tasks: [
        'Staff training program delivery',
        'User manual and documentation',
        'Hands-on practice sessions',
        'Support system establishment',
        'Change management activities',
        'Performance baseline establishment'
      ],
      deliverables: [
        'Trained workforce',
        'User documentation',
        'Support procedures',
        'Performance baselines'
      ],
      risks: ['Resistance to change', 'Learning curve', 'Support gaps'],
      success_factors: ['Comprehensive training', 'Ongoing support', 'Clear benefits communication']
    },
    {
      name: 'Optimization & Scale',
      duration: 'Ongoing',
      cost: '$5,000 - $20,000/month',
      progress: 0,
      status: 'future',
      tasks: [
        'Performance monitoring and optimization',
        'Feature expansion and upgrades',
        'Scale to additional areas/crops',
        'Advanced analytics implementation',
        'Integration with new technologies',
        'Continuous improvement initiatives'
      ],
      deliverables: [
        'Optimized performance',
        'Expanded capabilities',
        'Improved ROI',
        'Best practices documentation'
      ],
      risks: ['Technology obsolescence', 'Scaling challenges', 'Maintenance costs'],
      success_factors: ['Regular updates', 'Performance monitoring', 'Continuous learning']
    }
  ];

  const bestPractices = [
    {
      category: 'Project Management',
      icon: Target,
      practices: [
        'Start with pilot areas before full deployment',
        'Establish clear success metrics and KPIs',
        'Regular stakeholder communication and updates',
        'Agile implementation with iterative improvements',
        'Risk mitigation planning and contingencies'
      ]
    },
    {
      category: 'Technical Implementation',
      icon: Settings,
      practices: [
        'Ensure robust network connectivity before deployment',
        'Implement comprehensive backup and recovery systems',
        'Use staged deployment to minimize disruption',
        'Regular system monitoring and maintenance',
        'Keep software and security updates current'
      ]
    },
    {
      category: 'Change Management',
      icon: Users,
      practices: [
        'Involve key stakeholders in planning process',
        'Provide comprehensive training programs',
        'Establish internal champions and support network',
        'Communicate benefits clearly and regularly',
        'Create feedback loops for continuous improvement'
      ]
    },
    {
      category: 'Data Management',
      icon: Shield,
      practices: [
        'Establish data governance policies',
        'Ensure data quality and validation processes',
        'Implement proper security and access controls',
        'Create data backup and recovery procedures',
        'Plan for data migration and integration'
      ]
    }
  ];

  const commonChallenges = [
    {
      challenge: 'High Initial Investment',
      impact: 'High',
      solutions: [
        'Phased implementation to spread costs',
        'Government grants and subsidies research',
        'ROI-focused pilot projects',
        'Equipment leasing options',
        'Cooperative purchasing with other farms'
      ]
    },
    {
      challenge: 'Technology Integration Complexity',
      impact: 'Medium',
      solutions: [
        'Professional implementation services',
        'Thorough system compatibility testing',
        'API-first integration approach',
        'Staged rollout with testing phases',
        'Vendor support and training'
      ]
    },
    {
      challenge: 'Staff Skills Gap',
      impact: 'Medium',
      solutions: [
        'Comprehensive training programs',
        'Hiring specialized personnel',
        'External consulting support',
        'Gradual technology introduction',
        'User-friendly interface design'
      ]
    },
    {
      challenge: 'Data Quality and Reliability',
      impact: 'High',
      solutions: [
        'Sensor calibration and maintenance',
        'Data validation algorithms',
        'Multiple data source verification',
        'Regular system health checks',
        'Backup data collection methods'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'future': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="roadmap" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80">
          <TabsTrigger value="roadmap">Implementation Roadmap</TabsTrigger>
          <TabsTrigger value="practices">Best Practices</TabsTrigger>
          <TabsTrigger value="challenges">Common Challenges</TabsTrigger>
          <TabsTrigger value="resources">Resources & Support</TabsTrigger>
        </TabsList>

        {/* Implementation Roadmap */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-blue-600" />
                <span>Implementation Timeline & Phases</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Phase Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {implementationPhases.map((phase, index) => (
                    <Button
                      key={index}
                      variant={selectedPhase === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPhase(index)}
                      className="text-xs p-2 h-auto flex flex-col"
                    >
                      <div>{phase.name}</div>
                      <Badge className={`mt-1 ${getStatusColor(phase.status)}`} variant="secondary">
                        {phase.status}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* Selected Phase Details */}
                <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{implementationPhases[selectedPhase].name}</h3>
                        <Badge className={getStatusColor(implementationPhases[selectedPhase].status)}>
                          {implementationPhases[selectedPhase].status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-600">Duration:</span>
                          <div className="font-medium">{implementationPhases[selectedPhase].duration}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Estimated Cost:</span>
                          <div className="font-medium">{implementationPhases[selectedPhase].cost}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{implementationPhases[selectedPhase].progress}%</span>
                        </div>
                        <Progress value={implementationPhases[selectedPhase].progress} className="h-2" />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Key Tasks:</h4>
                          <ul className="space-y-1">
                            {implementationPhases[selectedPhase].tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-sm text-gray-600 flex items-center">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Deliverables:</h4>
                        <ul className="space-y-1">
                          {implementationPhases[selectedPhase].deliverables.map((deliverable, delIndex) => (
                            <li key={delIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                          <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                          Key Risks:
                        </h4>
                        <ul className="space-y-1">
                          {implementationPhases[selectedPhase].risks.map((risk, riskIndex) => (
                            <li key={riskIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          Success Factors:
                        </h4>
                        <ul className="space-y-1">
                          {implementationPhases[selectedPhase].success_factors.map((factor, factorIndex) => (
                            <li key={factorIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Practices */}
        <TabsContent value="practices" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                <span>Implementation Best Practices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bestPractices.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
                      <div className="flex items-center space-x-2 mb-3">
                        <IconComponent className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold">{category.category}</h3>
                      </div>
                      <ul className="space-y-2">
                        {category.practices.map((practice, practiceIndex) => (
                          <li key={practiceIndex} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {practice}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Common Challenges */}
        <TabsContent value="challenges" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                <span>Common Implementation Challenges & Solutions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {commonChallenges.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gradient-to-br from-amber-50 to-red-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{item.challenge}</h3>
                      <Badge variant={item.impact === 'High' ? 'destructive' : 'secondary'}>
                        {item.impact} Impact
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Recommended Solutions:</h4>
                      <ul className="space-y-1">
                        {item.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="text-sm text-gray-600 flex items-start">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources & Support */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <span>Training & Documentation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 bg-blue-50">
                    <h4 className="font-medium text-sm">Online Training Platform</h4>
                    <p className="text-xs text-gray-600">Comprehensive video tutorials and hands-on exercises</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-blue-50">
                    <h4 className="font-medium text-sm">User Documentation</h4>
                    <p className="text-xs text-gray-600">Step-by-step guides and troubleshooting resources</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-blue-50">
                    <h4 className="font-medium text-sm">Certification Programs</h4>
                    <p className="text-xs text-gray-600">Professional certification for system administrators</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-blue-50">
                    <h4 className="font-medium text-sm">Community Forums</h4>
                    <p className="text-xs text-gray-600">Peer support and knowledge sharing platform</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <span>Professional Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 bg-green-50">
                    <h4 className="font-medium text-sm">Implementation Consulting</h4>
                    <p className="text-xs text-gray-600">Expert guidance for deployment and optimization</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-green-50">
                    <h4 className="font-medium text-sm">24/7 Technical Support</h4>
                    <p className="text-xs text-gray-600">Round-the-clock assistance for critical issues</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-green-50">
                    <h4 className="font-medium text-sm">Custom Development</h4>
                    <p className="text-xs text-gray-600">Tailored solutions for specific farm requirements</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-green-50">
                    <h4 className="font-medium text-sm">Managed Services</h4>
                    <p className="text-xs text-gray-600">Ongoing maintenance and optimization services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-purple-600" />
                <span>Funding & Financial Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 bg-purple-50">
                  <h3 className="font-semibold mb-2">Government Programs</h3>
                  <ul className="text-sm space-y-1">
                    <li>• USDA NRCS EQIP funding</li>
                    <li>• State agricultural grants</li>
                    <li>• Rural development loans</li>
                    <li>• Conservation incentives</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4 bg-purple-50">
                  <h3 className="font-semibold mb-2">Private Financing</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Equipment financing</li>
                    <li>• Technology leasing programs</li>
                    <li>• AgTech investment funds</li>
                    <li>• Cooperative purchasing</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4 bg-purple-50">
                  <h3 className="font-semibold mb-2">ROI Acceleration</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Pilot project funding</li>
                    <li>• Performance guarantees</li>
                    <li>• Shared savings models</li>
                    <li>• Phased payment plans</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}