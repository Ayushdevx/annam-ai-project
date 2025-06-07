'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Building, 
  IndianRupee, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  ExternalLink,
  Phone,
  MapPin,
  Users,
  Tractor,
  Droplets,
  Zap,
  Leaf,
  Shield,
  Target,
  Award,
  BookOpen,
  CreditCard,
  Banknote,
  Percent,
  TrendingUp,
  Star,
  Info
} from 'lucide-react';

export default function GovernmentSchemes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  const categories = [
    { id: 'all', name: 'All Schemes', icon: Building },
    { id: 'subsidy', name: 'Subsidies', icon: IndianRupee },
    { id: 'loan', name: 'Loans', icon: CreditCard },
    { id: 'insurance', name: 'Insurance', icon: Shield },
    { id: 'technology', name: 'Technology', icon: Zap },
    { id: 'training', name: 'Training', icon: BookOpen }
  ];

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN Samman Nidhi',
      category: 'subsidy',
      description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
      amount: '₹6,000/year',
      eligibility: 'Small and marginal farmers with landholding up to 2 hectares',
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
      deadline: '2024-12-31',
      status: 'active',
      beneficiaries: '11 crore farmers',
      applicationProcess: 'Online through PM-KISAN portal',
      contactInfo: 'PM-KISAN Helpline: 155261',
      website: 'https://pmkisan.gov.in',
      state: 'all',
      priority: 'high',
      processingTime: '30-45 days',
      lastUpdated: '2024-03-15'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'insurance',
      description: 'Crop insurance scheme providing financial support to farmers in case of crop loss',
      amount: 'Up to ₹2 lakh per farmer',
      eligibility: 'All farmers growing notified crops in notified areas',
      documents: ['Aadhaar Card', 'Land Records', 'Sowing Certificate', 'Bank Account'],
      deadline: '2024-07-31',
      status: 'active',
      beneficiaries: '5.5 crore farmers',
      applicationProcess: 'Through banks, CSCs, and insurance companies',
      contactInfo: 'PMFBY Helpline: 14447',
      website: 'https://pmfby.gov.in',
      state: 'all',
      priority: 'high',
      processingTime: '15-30 days',
      lastUpdated: '2024-03-10'
    },
    {
      id: 3,
      name: 'Kisan Credit Card (KCC)',
      category: 'loan',
      description: 'Credit facility for farmers to meet their agricultural and allied activities',
      amount: 'Up to ₹3 lakh at 4% interest',
      eligibility: 'All farmers including tenant farmers, oral lessees, and sharecroppers',
      documents: ['Aadhaar Card', 'Land Records', 'Income Certificate'],
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: '7 crore farmers',
      applicationProcess: 'Through banks and cooperative societies',
      contactInfo: 'Bank Branch or Toll-free: 1800-180-1551',
      website: 'https://www.nabard.org',
      state: 'all',
      priority: 'high',
      processingTime: '7-15 days',
      lastUpdated: '2024-03-12'
    },
    {
      id: 4,
      name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      category: 'technology',
      description: 'Financial assistance for purchase of agricultural machinery and equipment',
      amount: '40-50% subsidy on machinery',
      eligibility: 'Individual farmers, FPOs, SHGs, and cooperatives',
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Quotation'],
      deadline: '2024-06-30',
      status: 'active',
      beneficiaries: '25 lakh farmers',
      applicationProcess: 'Online through DBT Agriculture portal',
      contactInfo: 'State Agriculture Department',
      website: 'https://agrimachinery.nic.in',
      state: 'all',
      priority: 'medium',
      processingTime: '45-60 days',
      lastUpdated: '2024-03-08'
    },
    {
      id: 5,
      name: 'Micro Irrigation Fund (MIF)',
      category: 'technology',
      description: 'Support for micro irrigation systems like drip and sprinkler irrigation',
      amount: '55-75% subsidy',
      eligibility: 'All categories of farmers',
      documents: ['Aadhaar Card', 'Land Records', 'Water Source Certificate'],
      deadline: '2024-09-30',
      status: 'active',
      beneficiaries: '15 lakh farmers',
      applicationProcess: 'Through state agriculture departments',
      contactInfo: 'State Horticulture Department',
      website: 'https://pmksy.gov.in',
      state: 'all',
      priority: 'medium',
      processingTime: '60-90 days',
      lastUpdated: '2024-03-05'
    },
    {
      id: 6,
      name: 'National Mission for Sustainable Agriculture (NMSA)',
      category: 'training',
      description: 'Capacity building and training programs for sustainable agricultural practices',
      amount: 'Free training and certification',
      eligibility: 'All farmers and agricultural workers',
      documents: ['Aadhaar Card', 'Educational Certificates'],
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: '50 lakh farmers',
      applicationProcess: 'Through Krishi Vigyan Kendras and extension centers',
      contactInfo: 'Local KVK or Agriculture Extension Officer',
      website: 'https://nmsa.dac.gov.in',
      state: 'all',
      priority: 'medium',
      processingTime: '7-14 days',
      lastUpdated: '2024-03-01'
    }
  ];

  const applicationStatus = [
    {
      scheme: 'PM-KISAN Samman Nidhi',
      applicationId: 'PMK2024001234',
      status: 'approved',
      appliedDate: '2024-02-15',
      amount: '₹2,000',
      nextInstallment: '2024-04-01'
    },
    {
      scheme: 'PMFBY Crop Insurance',
      applicationId: 'PMFBY2024005678',
      status: 'under_review',
      appliedDate: '2024-03-01',
      amount: 'Pending',
      nextInstallment: 'N/A'
    },
    {
      scheme: 'Kisan Credit Card',
      applicationId: 'KCC2024009876',
      status: 'documents_required',
      appliedDate: '2024-02-28',
      amount: 'Pending',
      nextInstallment: 'N/A'
    }
  ];

  const upcomingDeadlines = [
    {
      scheme: 'PMFBY Kharif Season',
      deadline: '2024-07-31',
      daysLeft: 138,
      priority: 'high'
    },
    {
      scheme: 'SMAM Machinery Subsidy',
      deadline: '2024-06-30',
      daysLeft: 107,
      priority: 'medium'
    },
    {
      scheme: 'MIF Drip Irrigation',
      deadline: '2024-09-30',
      daysLeft: 199,
      priority: 'low'
    }
  ];

  const recentUpdates = [
    {
      title: 'PM-KISAN 16th Installment Released',
      description: 'The 16th installment of ₹2,000 has been credited to eligible farmers',
      date: '2024-03-15',
      type: 'payment'
    },
    {
      title: 'New Guidelines for PMFBY',
      description: 'Updated guidelines for crop insurance claims and premium rates',
      date: '2024-03-10',
      type: 'update'
    },
    {
      title: 'KCC Interest Rate Reduced',
      description: 'Interest rate for Kisan Credit Card reduced to 4% per annum',
      date: '2024-03-08',
      type: 'announcement'
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesState = selectedState === 'all' || scheme.state === selectedState;
    
    return matchesSearch && matchesCategory && matchesState;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'under_review': return 'bg-yellow-100 text-yellow-700';
      case 'documents_required': return 'bg-orange-100 text-orange-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle2;
      case 'under_review': return Clock;
      case 'documents_required': return FileText;
      case 'rejected': return AlertTriangle;
      default: return Info;
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Government Schemes</h2>
                    <p className="text-blue-100">सरकारी योजनाएं और सब्सिडी</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-sm text-blue-100">Active Schemes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">₹2.5L Cr</div>
                    <div className="text-sm text-blue-100">Total Allocation</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">12 Cr+</div>
                    <div className="text-sm text-blue-100">Beneficiaries</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">Helpline Numbers</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>PM-KISAN: 155261</div>
                    <div>PMFBY: 14447</div>
                    <div>KCC: 1800-180-1551</div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">Quick Apply</span>
                  </div>
                  <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                    Check Eligibility
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search schemes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schemes List */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-4">
            {filteredSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{scheme.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getPriorityColor(scheme.priority)}>
                          {scheme.priority}
                        </Badge>
                        <Badge variant="outline">
                          {scheme.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Amount: {scheme.amount}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Deadline: {scheme.deadline}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Beneficiaries: {scheme.beneficiaries}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Processing: {scheme.processingTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-cyan-600" />
                          <span className="text-sm">{scheme.contactInfo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Eligibility:</h4>
                      <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Required Documents:</h4>
                      <div className="flex flex-wrap gap-1">
                        {scheme.documents.map((doc, docIndex) => (
                          <Badge key={docIndex} variant="secondary" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                        Apply Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Form
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <span>My Applications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicationStatus.map((app, index) => {
                    const StatusIcon = getStatusIcon(app.status);
                    return (
                      <motion.div
                        key={index}
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{app.scheme}</h4>
                          <Badge className={getStatusColor(app.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {app.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div>ID: {app.applicationId}</div>
                          <div>Applied: {app.appliedDate}</div>
                          <div>Amount: {app.amount}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <Button size="sm" variant="outline" className="w-full mt-4">
                  View All Applications
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  <span>Upcoming Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <motion.div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        deadline.priority === 'high' 
                          ? 'bg-red-50 border-red-500' 
                          : deadline.priority === 'medium'
                            ? 'bg-yellow-50 border-yellow-500'
                            : 'bg-green-50 border-green-500'
                      }`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h4 className="font-semibold text-sm">{deadline.scheme}</h4>
                      <div className="text-xs text-gray-600 mt-1">
                        <div>Deadline: {deadline.deadline}</div>
                        <div className={`font-medium ${
                          deadline.daysLeft <= 30 ? 'text-red-600' : 
                          deadline.daysLeft <= 60 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {deadline.daysLeft} days left
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Updates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <span>Recent Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUpdates.map((update, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-sm">{update.title}</h4>
                        <Badge 
                          variant="secondary" 
                          className={
                            update.type === 'payment' 
                              ? 'bg-green-100 text-green-700' 
                              : update.type === 'update'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                          }
                        >
                          {update.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{update.description}</p>
                      <div className="text-xs text-gray-500">{update.date}</div>
                    </motion.div>
                  ))}
                </div>
                
                <Button size="sm" variant="outline" className="w-full mt-4">
                  View All Updates
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-purple-600" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full h-20 bg-gradient-to-r from-green-500 to-emerald-600 flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 mb-1" />
                  <span className="text-sm">Check Eligibility</span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full h-20 bg-gradient-to-r from-blue-500 to-cyan-600 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-1" />
                  <span className="text-sm">Track Application</span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full h-20 bg-gradient-to-r from-purple-500 to-pink-600 flex flex-col items-center justify-center">
                  <Download className="h-6 w-6 mb-1" />
                  <span className="text-sm">Download Forms</span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full h-20 bg-gradient-to-r from-orange-500 to-red-600 flex flex-col items-center justify-center">
                  <Phone className="h-6 w-6 mb-1" />
                  <span className="text-sm">Get Help</span>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}