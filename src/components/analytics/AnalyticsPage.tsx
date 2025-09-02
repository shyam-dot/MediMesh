import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { MetricsCard } from '../dashboard/MetricsCard';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Database,
  Download,
  Calendar
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const performanceData = [
  { month: 'Jan', legacy: 2400, modern: 4200, savings: 1800 },
  { month: 'Feb', legacy: 2200, modern: 4400, savings: 2200 },
  { month: 'Mar', legacy: 2000, modern: 4600, savings: 2600 },
  { month: 'Apr', legacy: 1800, modern: 4800, savings: 3000 },
  { month: 'May', legacy: 1600, modern: 5000, savings: 3400 },
  { month: 'Jun', legacy: 1400, modern: 5200, savings: 3800 },
];

const costSavingsData = [
  { month: 'Jan', operational: 45000, maintenance: 25000, efficiency: 15000 },
  { month: 'Feb', operational: 48000, maintenance: 22000, efficiency: 18000 },
  { month: 'Mar', operational: 52000, maintenance: 20000, efficiency: 22000 },
  { month: 'Apr', operational: 55000, maintenance: 18000, efficiency: 25000 },
  { month: 'May', operational: 58000, maintenance: 15000, efficiency: 28000 },
  { month: 'Jun', operational: 62000, maintenance: 12000, efficiency: 32000 },
];

const systemUsageData = [
  { name: 'EHR System', usage: 85, color: '#3B82F6' },
  { name: 'Billing', usage: 92, color: '#10B981' },
  { name: 'Lab Results', usage: 67, color: '#F59E0B' },
  { name: 'Pharmacy', usage: 78, color: '#8B5CF6' },
  { name: 'Radiology', usage: 45, color: '#EF4444' },
];

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Comprehensive insights into your modernization journey</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Cost Savings"
          value="$2.4M"
          change={24}
          trend="up"
          icon={<DollarSign className="h-6 w-6" />}
          color="green"
        />
        <MetricsCard
          title="Efficiency Gain"
          value="340%"
          change={45}
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
          color="blue"
        />
        <MetricsCard
          title="Response Time Improvement"
          value="67%"
          change={12}
          trend="up"
          icon={<Clock className="h-6 w-6" />}
          color="green"
        />
        <MetricsCard
          title="User Satisfaction"
          value="94%"
          change={18}
          trend="up"
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">System Performance Trends</h3>
            <p className="text-sm text-gray-600">Response times comparison over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="legacy"
                  stackId="1"
                  stroke="#EF4444"
                  fill="#FEE2E2"
                  name="Legacy System"
                />
                <Area
                  type="monotone"
                  dataKey="modern"
                  stackId="2"
                  stroke="#10B981"
                  fill="#D1FAE5"
                  name="Modern System"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Cost Savings Breakdown</h3>
            <p className="text-sm text-gray-600">Monthly savings by category</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costSavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="operational" fill="#3B82F6" name="Operational" />
                <Bar dataKey="maintenance" fill="#10B981" name="Maintenance" />
                <Bar dataKey="efficiency" fill="#F59E0B" name="Efficiency" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Usage Analytics */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">System Usage Analytics</h3>
          <p className="text-sm text-gray-600">Current utilization rates across all systems</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={systemUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="usage"
                  >
                    {systemUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {systemUsageData.map((system) => (
                <div key={system.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: system.color }}
                    />
                    <span className="font-medium text-gray-900">{system.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{system.usage}%</span>
                    <p className="text-xs text-gray-500">utilization</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Return on Investment</h3>
          <p className="text-sm text-gray-600">Financial impact of modernization efforts</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-900">Total Savings</h4>
                  <p className="text-2xl font-bold text-green-900">$2,400,000</p>
                </div>
              </div>
              <p className="text-sm text-green-700">Cumulative savings since modernization began</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-900">ROI Percentage</h4>
                  <p className="text-2xl font-bold text-blue-900">340%</p>
                </div>
              </div>
              <p className="text-sm text-blue-700">Return on modernization investment</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-8 w-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-purple-900">Payback Period</h4>
                  <p className="text-2xl font-bold text-purple-900">8 months</p>
                </div>
              </div>
              <p className="text-sm text-purple-700">Time to recover initial investment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};