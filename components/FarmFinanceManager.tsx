'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3,
  CreditCard,
  Banknote,
  Calculator,
  Target,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Download,
  Upload,
  Wallet,
  Building,
  Tractor,
  Sprout,
  Droplets,
  Zap,
  Users,
  FileText,
  Clock,
  Star
} from 'lucide-react';

export default function FarmFinanceManager() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const financialSummary = {
    totalRevenue: 485000,
    totalExpenses: 325000,
    netProfit: 160000,
    profitMargin: 33,
    monthlyGrowth: 12.5,
    yearlyGrowth: 28.3
  };

  const expenses = [
    { category: 'Seeds', amount: 45000, percentage: 14, trend: 'up', change: 5 },
    { category: 'Fertilizers', amount: 85000, percentage: 26, trend: 'up', change: 12 },
    { category: 'Pesticides', amount: 35000, percentage: 11, trend: 'down', change: -8 },
    { category: 'Labor', amount: 95000, percentage: 29, trend: 'up', change: 15 },
    { category: 'Fuel', amount: 25000, percentage: 8, trend: 'stable', change: 2 },
    { category: 'Equipment', amount: 40000, percentage: 12, trend: 'down', change: -5 }
  ];

  const revenue = [
    { crop: 'Wheat', amount: 185000, percentage: 38, yield: '15.5 tons', price: '₹11,935/ton' },
    { crop: 'Rice', amount: 145000, percentage: 30, yield: '18.6 tons', price: '₹7,796/ton' },
    { crop: 'Cotton', amount: 95000, percentage: 20, yield: '8.6 tons', price: '₹11,047/ton' },
    { crop: 'Vegetables', amount: 60000, percentage: 12, yield: '22.5 tons', price: '₹2,667/ton' }
  ];

  const loans = [
    {
      id: 1,
      type: 'Kisan Credit Card',
      bank: 'State Bank of India',
      amount: 300000,
      outstanding: 180000,
      interestRate: 4,
      emiAmount: 15000,
      nextDue: '2024-04-01',
      status: 'active'
    },
    {
      id: 2,
      type: 'Equipment Loan',
      bank: 'Punjab National Bank',
      amount: 500000,
      outstanding: 320000,
      interestRate: 8.5,
      emiAmount: 25000,
      nextDue: '2024-03-25',
      status: 'active'
    },
    {
      id: 3,
      type: 'Crop Loan',
      bank: 'HDFC Bank',
      amount: 150000,
      outstanding: 0,
      interestRate: 7,
      emiAmount: 0,
      nextDue: 'Completed',
      status: 'completed'
    }
  ];

  const transactions = [
    { id: 1, date: '2024-03-15', type: 'income', category: 'Wheat Sale', amount: 45000, description: 'Sold 4 tons wheat to local trader' },
    { id: 2, date: '2024-03-14', type: 'expense', category: 'Fertilizer', amount: 12000, description: 'DAP fertilizer purchase' },
    { id: 3, date: '2024-03-13', type: 'expense', category: 'Labor', amount: 8000, description: 'Harvesting labor payment' },
    { id: 4, date: '2024-03-12', type: 'income', category: 'Rice Sale', amount: 32000, description: 'Sold 5 tons rice to mill' },
    { id: 5, date: '2024-03-11', type: 'expense', category: 'Fuel', amount: 3500, description: 'Diesel for tractor' }
  ];

  const budgetTargets = [
    { category: 'Seeds', budgeted: 50000, spent: 45000, remaining: 5000 },
    { category: 'Fertilizers', budgeted: 80000, spent: 85000, remaining: -5000 },
    { category: 'Labor', budgeted: 90000, spent: 95000, remaining: -5000 },
    { category: 'Equipment', budgeted: 45000, spent: 40000, remaining: 5000 }
  ];

  const subsidies = [
    {
      scheme: 'PM-KISAN',
      amount: 6000,
      status: 'received',
      nextInstallment: '2024-04-01',
      description: 'Direct income support'
    },
    {
      scheme: 'Fertilizer Subsidy',
      amount: 15000,
      status: 'pending',
      nextInstallment: '2024-03-30',
      description: 'Urea and DAP subsidy'
    },
    {
      scheme: 'Equipment Subsidy',
      amount: 25000,
      status: 'applied',
      nextInstallment: 'Under review',
      description: 'Tractor purchase subsidy'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-red-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-green-500" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'received': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'applied': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <IndianRupee className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Farm Finance Manager</h2>
                    <p className="text-green-100">Complete financial management for your farm</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">₹{(financialSummary.totalRevenue / 1000).toFixed(0)}k</div>
                    <div className="text-sm text-green-100">Total Revenue</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">+{financialSummary.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">₹{(financialSummary.netProfit / 1000).toFixed(0)}k</div>
                    <div className="text-sm text-green-100">Net Profit</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">{financialSummary.profitMargin}% margin</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Calculator className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">₹{(financialSummary.totalExpenses / 1000).toFixed(0)}k</div>
                  <div className="text-sm text-green-100">Total Expenses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">+{financialSummary.yearlyGrowth}%</div>
                  <div className="text-sm text-green-100">Yearly Growth</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <CreditCard className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">₹5L</div>
                  <div className="text-sm text-green-100">Outstanding Loans</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Building className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">₹46k</div>
                  <div className="text-sm text-green-100">Subsidies Pending</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="w-full h-20 bg-gradient-to-r from-blue-500 to-cyan-500 flex flex-col items-center justify-center"
                  onClick={() => setShowAddTransaction(true)}
                >
                  <Plus className="h-6 w-6 mb-1" />
                  <span className="text-sm">Add Transaction</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full h-20 bg-gradient-to-r from-green-500 to-emerald-500 flex flex-col items-center justify-center">
                  <Download className="h-6 w-6 mb-1" />
                  <span className="text-sm">Export Report</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full h-20 bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center">
                  <Calculator className="h-6 w-6 mb-1" />
                  <span className="text-sm">Loan Calculator</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full h-20 bg-gradient-to-r from-orange-500 to-red-500 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-1" />
                  <span className="text-sm">Tax Planning</span>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span>Revenue by Crop</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenue.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{item.crop}</h4>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        ₹{(item.amount / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Yield: {item.yield}</span>
                      <span>Price: {item.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={item.percentage} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-6 w-6 text-red-600 dark:text-red-400" />
                <span>Expense Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses.map((expense, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{expense.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">₹{(expense.amount / 1000).toFixed(0)}k</span>
                          {getTrendIcon(expense.trend)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {expense.change > 0 ? '+' : ''}{expense.change}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={expense.percentage} className="flex-1 h-2" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{expense.percentage}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Loans & Subsidies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Loans & Subsidies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="loans" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="loans">Active Loans</TabsTrigger>
                <TabsTrigger value="subsidies">Subsidies</TabsTrigger>
                <TabsTrigger value="budget">Budget Tracking</TabsTrigger>
              </TabsList>
              
              <TabsContent value="loans" className="space-y-3">
                {loans.map((loan) => (
                  <motion.div
                    key={loan.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{loan.type}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{loan.bank}</p>
                      </div>
                      <Badge className={getStatusColor(loan.status)}>
                        {loan.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Loan Amount:</span>
                        <div className="font-medium">₹{(loan.amount / 1000).toFixed(0)}k</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Outstanding:</span>
                        <div className="font-medium">₹{(loan.outstanding / 1000).toFixed(0)}k</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Interest Rate:</span>
                        <div className="font-medium">{loan.interestRate}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Next EMI:</span>
                        <div className="font-medium">{loan.nextDue}</div>
                      </div>
                    </div>
                    
                    {loan.outstanding > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Repaid</span>
                          <span>{Math.round(((loan.amount - loan.outstanding) / loan.amount) * 100)}%</span>
                        </div>
                        <Progress value={((loan.amount - loan.outstanding) / loan.amount) * 100} className="h-2" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="subsidies" className="space-y-3">
                {subsidies.map((subsidy, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{subsidy.scheme}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-green-600 dark:text-green-400">₹{subsidy.amount.toLocaleString()}</span>
                        <Badge className={getStatusColor(subsidy.status)}>
                          {subsidy.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{subsidy.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Next: {subsidy.nextInstallment}
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="budget" className="space-y-3">
                {budgetTargets.map((budget, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{budget.category}</h4>
                      <div className="text-right">
                        <div className="font-bold">₹{budget.spent.toLocaleString()} / ₹{budget.budgeted.toLocaleString()}</div>
                        <div className={`text-sm ${budget.remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {budget.remaining >= 0 ? 'Under' : 'Over'} by ₹{Math.abs(budget.remaining).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={(budget.spent / budget.budgeted) * 100} 
                      className={`h-2 ${budget.remaining < 0 ? 'bg-red-100' : ''}`} 
                    />
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span>Recent Transactions</span>
              </CardTitle>
              <Button size="sm" variant="outline">
                <FileText className="h-3 w-3 mr-1" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.category}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{transaction.description}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${
                    transaction.type === 'income' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
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