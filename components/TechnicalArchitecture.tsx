'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, Database, Cloud, Cpu, Wifi, Shield, Zap, GitBranch, Layers, Network, Bot, Scissors as Sensors, MonitorSpeaker, Globe } from 'lucide-react';

export default function TechnicalArchitecture() {
  const architectureComponents = {
    genetrust: {
      name: 'GeneTrust',
      color: 'from-green-500 to-emerald-600',
      layers: [
        {
          name: 'Presentation Layer',
          icon: MonitorSpeaker,
          components: ['Next.js Dashboard', 'React Components', 'Real-time Visualization', 'Mobile App'],
          technologies: ['TypeScript', 'Tailwind CSS', 'Socket.IO Client', 'PWA']
        },
        {
          name: 'API Gateway',
          icon: Network,
          components: ['REST APIs', 'GraphQL Endpoints', 'Authentication', 'Rate Limiting'],
          technologies: ['Node.js', 'Express', 'JWT', 'OAuth 2.0']
        },
        {
          name: 'AI/ML Layer',
          icon: Bot,
          components: ['DNABERT Model', 'Guide RNA Prediction', 'Groq LPU Processing', 'Model Training'],
          technologies: ['Python', 'PyTorch', 'Transformers', 'Groq SDK']
        },
        {
          name: 'IoT Integration',
          icon: Sensors,
          components: ['Lab Sensors', 'Environmental Monitoring', 'Data Ingestion', 'Alert System'],
          technologies: ['MQTT', 'InfluxDB', 'Telegraf', 'WebSockets']
        },
        {
          name: 'Blockchain Layer',
          icon: Shield,
          components: ['Base Network', 'Smart Contracts', 'Data Provenance', 'Access Control'],
          technologies: ['Solidity', 'Web3.js', 'IPFS', 'Metamask']
        },
        {
          name: 'Data Layer',
          icon: Database,
          components: ['MongoDB Atlas', 'Time-series DB', 'Blockchain Storage', 'File System'],
          technologies: ['MongoDB', 'InfluxDB', 'IPFS', 'AWS S3']
        }
      ]
    },
    agrotwin: {
      name: 'AgroTwin',
      color: 'from-blue-500 to-cyan-600',
      layers: [
        {
          name: 'Digital Twin Interface',
          icon: Cpu,
          components: ['3D Visualization', 'Real-time Dashboard', 'Simulation Controls', 'Analytics'],
          technologies: ['Three.js', 'D3.js', 'React', 'WebGL']
        },
        {
          name: 'Edge Computing',
          icon: Zap,
          components: ['Edge AI Processing', 'Local Data Processing', 'Offline Capabilities', 'Sync Manager'],
          technologies: ['TensorFlow Lite', 'Docker', 'Kubernetes Edge', 'Redis']
        },
        {
          name: 'Sensor Network',
          icon: Sensors,
          components: ['Quantum Soil Sensors', 'Weather Stations', 'Hyperspectral Cameras', 'Drone Integration'],
          technologies: ['LoRaWAN', '5G IoT', 'Edge TPU', 'Computer Vision']
        },
        {
          name: 'AI Analytics Engine',
          icon: Bot,
          components: ['Predictive Models', 'Anomaly Detection', 'Crop Health AI', 'Climate Modeling'],
          technologies: ['TensorFlow', 'scikit-learn', 'Apache Spark', 'MLflow']
        },
        {
          name: 'Collaboration Platform',
          icon: Globe,
          components: ['Multi-farm Network', 'Data Sharing', 'Benchmarking', 'Knowledge Base'],
          technologies: ['Federated Learning', 'GraphQL Federation', 'Apache Kafka', 'Elasticsearch']
        },
        {
          name: 'Cloud Infrastructure',
          icon: Cloud,
          components: ['Scalable Compute', 'Data Lake', 'ML Pipeline', 'Backup & Recovery'],
          technologies: ['AWS/Azure', 'Apache Airflow', 'Delta Lake', 'Terraform']
        }
      ]
    },
    aquaterra: {
      name: 'AquaTerra',
      color: 'from-cyan-500 to-blue-600',
      layers: [
        {
          name: 'Ecosystem Dashboard',
          icon: MonitorSpeaker,
          components: ['Water-Land Visualization', 'System Controls', 'Health Monitoring', 'Alerts'],
          technologies: ['React Flow', 'Chart.js', 'WebSockets', 'Progressive Web App']
        },
        {
          name: 'Integration Hub',
          icon: GitBranch,
          components: ['System Orchestration', 'Data Fusion', 'Control Logic', 'Automation Engine'],
          technologies: ['Apache NiFi', 'Node-RED', 'RabbitMQ', 'Event Sourcing']
        },
        {
          name: 'Aquaponics AI',
          icon: Bot,
          components: ['Fish Health Monitoring', 'Water Quality Prediction', 'Nutrient Optimization', 'Growth Modeling'],
          technologies: ['Computer Vision', 'Time Series Forecasting', 'Reinforcement Learning', 'Edge AI']
        },
        {
          name: 'Water Management',
          icon: Sensors,
          components: ['Smart Pumps', 'Flow Controllers', 'Quality Sensors', 'Filtration Systems'],
          technologies: ['Industrial IoT', 'Modbus/TCP', 'SCADA Integration', 'PLC Controllers']
        },
        {
          name: 'Bio-Indicator Network',
          icon: Network,
          components: ['Fish Sensors', 'Plant Health Monitors', 'Microbial Analysis', 'Environmental Tracking'],
          technologies: ['Biosensors', 'Spectroscopy', 'Machine Learning', 'Real-time Analytics']
        },
        {
          name: 'Blockchain Water Credits',
          icon: Shield,
          components: ['Water Usage Tracking', 'Credit Trading', 'Compliance Monitoring', 'Carbon Credits'],
          technologies: ['Ethereum', 'Smart Contracts', 'Oracle Networks', 'DeFi Protocols']
        }
      ]
    }
  };

  const integrationPatterns = [
    {
      name: 'Data Flow Architecture',
      description: 'How data moves between system components',
      pattern: 'Event-Driven Architecture with CQRS',
      benefits: ['Real-time processing', 'Scalable ingestion', 'Fault tolerance']
    },
    {
      name: 'AI Model Integration',
      description: 'How AI models are deployed and updated',
      pattern: 'MLOps with Continuous Integration',
      benefits: ['Automated model updates', 'A/B testing', 'Performance monitoring']
    },
    {
      name: 'Security Framework',
      description: 'Multi-layered security approach',
      pattern: 'Zero Trust with Blockchain Verification',
      benefits: ['End-to-end encryption', 'Immutable audit trails', 'Identity verification']
    },
    {
      name: 'Scalability Design',
      description: 'How systems handle growing data and users',
      pattern: 'Microservices with Auto-scaling',
      benefits: ['Horizontal scaling', 'Service isolation', 'Cost optimization']
    }
  ];

  const infrastructureRequirements = {
    minimum: {
      name: 'Minimum Setup',
      farms: '100-500 acres',
      requirements: [
        '4G/5G connectivity (min 100 Mbps)',
        'Edge computing device (NVIDIA Jetson or equivalent)',
        '50 IoT sensors for basic monitoring',
        'Cloud storage (1TB initial)',
        'Basic weather station'
      ],
      cost: '$25,000 - $50,000'
    },
    recommended: {
      name: 'Recommended Setup',
      farms: '500-2000 acres',
      requirements: [
        'Dedicated fiber internet (1 Gbps)',
        'Multiple edge computing clusters',
        '200+ specialized sensors',
        'Local data center (10TB storage)',
        'Drone integration capabilities'
      ],
      cost: '$75,000 - $150,000'
    },
    enterprise: {
      name: 'Enterprise Setup',
      farms: '2000+ acres',
      requirements: [
        'Private network infrastructure',
        'High-performance computing cluster',
        '500+ sensors with quantum capabilities',
        'Redundant data centers (100TB+)',
        'Satellite imagery integration'
      ],
      cost: '$200,000 - $500,000'
    }
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80">
          <TabsTrigger value="overview">Architecture Overview</TabsTrigger>
          <TabsTrigger value="integration">Integration Patterns</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="security">Security & Compliance</TabsTrigger>
        </TabsList>

        {/* Architecture Overview */}
        <TabsContent value="overview" className="space-y-8">
          {Object.entries(architectureComponents).map(([key, platform]) => (
            <Card key={key} className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                  <Layers className="h-6 w-6" />
                  <span>{platform.name} Technical Architecture</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {platform.layers.map((layer, index) => {
                    const IconComponent = layer.icon;
                    return (
                      <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color}`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-semibold text-lg">{layer.name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Components</h4>
                            <ul className="space-y-1">
                              {layer.components.map((component, compIndex) => (
                                <li key={compIndex} className="text-sm text-gray-600 flex items-center">
                                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                                  {component}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-1">
                              {layer.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Integration Patterns */}
        <TabsContent value="integration" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-6 w-6 text-purple-600" />
                <span>System Integration Patterns</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrationPatterns.map((pattern, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-blue-50">
                    <h3 className="font-semibold text-lg mb-2">{pattern.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                    
                    <div className="mb-3">
                      <Badge variant="outline" className="bg-white">
                        {pattern.pattern}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {pattern.benefits.map((benefit, bIndex) => (
                          <li key={bIndex} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Flow Diagram */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-6 w-6 text-blue-600" />
                <span>Multi-Platform Data Flow</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Sensors className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">Data Collection</h3>
                    <p className="text-sm text-gray-600">IoT sensors, drones, satellites</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">AI Processing</h3>
                    <p className="text-sm text-gray-600">Edge and cloud AI models</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MonitorSpeaker className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">Actionable Insights</h3>
                    <p className="text-sm text-gray-600">Dashboards, alerts, automation</p>
                  </div>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  <p>Data flows through encrypted channels with blockchain verification for critical decisions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Infrastructure Requirements */}
        <TabsContent value="infrastructure" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="h-6 w-6 text-orange-600" />
                <span>Infrastructure Requirements by Scale</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(infrastructureRequirements).map(([key, setup]) => (
                  <div key={key} className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-lg">{setup.name}</h3>
                      <p className="text-sm text-gray-600">{setup.farms}</p>
                      <div className="text-xl font-bold text-blue-600 mt-2">{setup.cost}</div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Requirements:</h4>
                      <ul className="space-y-2">
                        {setup.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
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

        {/* Security & Compliance */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-red-600" />
                <span>Security Framework & Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-600">Security Layers</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3 bg-red-50">
                      <h4 className="font-medium text-sm">Data Encryption</h4>
                      <p className="text-xs text-gray-600">AES-256 encryption at rest, TLS 1.3 in transit</p>
                    </div>
                    <div className="border rounded-lg p-3 bg-red-50">
                      <h4 className="font-medium text-sm">Identity Management</h4>
                      <p className="text-xs text-gray-600">Multi-factor authentication, role-based access</p>
                    </div>
                    <div className="border rounded-lg p-3 bg-red-50">
                      <h4 className="font-medium text-sm">Network Security</h4>
                      <p className="text-xs text-gray-600">VPN, firewall, intrusion detection</p>
                    </div>
                    <div className="border rounded-lg p-3 bg-red-50">
                      <h4 className="font-medium text-sm">Blockchain Verification</h4>
                      <p className="text-xs text-gray-600">Immutable audit trails, smart contract security</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-600">Compliance Standards</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3 bg-blue-50">
                      <h4 className="font-medium text-sm">Agricultural Standards</h4>
                      <p className="text-xs text-gray-600">USDA, EPA regulations, organic certification</p>
                    </div>
                    <div className="border rounded-lg p-3 bg-blue-50">
                      <h4 className="font-medium text-sm">Data Protection</h4>
                      <p className="text-xs text-gray-600">GDPR, CCPA, agricultural data privacy</p>
                    </div>
                    <div className="border rounded-lg p-3 bg-blue-50">
                      <h4 className="font-medium text-sm">Genetic Regulations</h4>
                      <p className="text-xs text-gray-600">FDA, USDA-APHIS approval processes</p>
                    </div>
                    <div className="border rounded-lg p-3 bg-blue-50">
                      <h4 className="font-medium text-sm">Environmental Compliance</h4>
                      <p className="text-xs text-gray-600">Water usage regulations, carbon tracking</p>
                    </div>
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