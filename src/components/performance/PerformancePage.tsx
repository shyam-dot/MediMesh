import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { MetricsCard } from '../dashboard/MetricsCard';
import { 
  Zap, 
  Cpu, 
  HardDrive, 
  Wifi, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const realTimeMetrics = [
  { time: '10:00', cpu: 45, memory: 62, network: 78, response: 245 },
  { time: '10:05', cpu: 52, memory: 65, network: 82, response: 230 },
  { time: '10:10', cpu: 48, memory: 68, network: 75, response: 255 },
  { time: '10:15', cpu: 55, memory: 70, network: 88, response: 220 },
  { time: '10:20', cpu: 42, memory: 64, network: 85, response: 240 },
  { time: '10:25', cpu: 38, memory: 61, network: 90, response: 210 },
];

const systemComparison = [
  { system: 'Response Time', legacy: 85, modern: 95 },
  { system: 'Reliability', legacy: 70, modern: 98 },
  { system: 'Scalability', legacy: 45, modern: 92 },
  { system: 'Security', legacy: 60, modern: 96 },
  { system: 'User Experience', legacy: 55, modern: 94 },
  { system: 'Cost Efficiency', legacy: 40, modern: 88 },
];

export const PerformancePage: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    networkLatency: 78,
    responseTime: 245
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        cpuUsage: Math.floor(Math.random() * 30 + 35),
        memoryUsage: Math.floor(Math.random() * 20 + 55),
        networkLatency: Math.floor(Math.random() * 40 + 60),
        responseTime: Math.floor(Math.random() * 100 + 200)
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Performance Monitoring</h2>
          <p className="text-gray-600">Real-time system performance and optimization insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Data</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="CPU Usage"
          value={`${realTimeData.cpuUsage}%`}
          change={-5}
          trend="down"
          icon={<Cpu className="h-6 w-6" />}
          color="blue"
        />
        <MetricsCard
          title="Memory Usage"
          value={`${realTimeData.memoryUsage}%`}
          change={3}
          trend="up"
          icon={<HardDrive className="h-6 w-6" />}
          color="yellow"
        />
        <MetricsCard
          title="Network Latency"
          value={`${realTimeData.networkLatency}ms`}
          change={-12}
          trend="down"
          icon={<Wifi className="h-6 w-6" />}
          color="green"
        />
        <MetricsCard
          title="Response Time"
          value={`${realTimeData.responseTime}ms`}
          change={-8}
          trend="down"
          icon={<Zap className="h-6 w-6" />}
          color="blue"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Real-time System Metrics</h3>
            <p className="text-sm text-gray-600">Live performance data over the last 30 minutes</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realTimeMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="CPU Usage (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Memory Usage (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="network" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Network Latency (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Legacy vs Modern Comparison</h3>
            <p className="text-sm text-gray-600">Performance comparison across key metrics</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={systemComparison}>
                <PolarGrid />
                <PolarAngleAxis dataKey="system" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Legacy System"
                  dataKey="legacy"
                  stroke="#EF4444"
                  fill="#FEE2E2"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Modern System"
                  dataKey="modern"
                  stroke="#10B981"
                  fill="#D1FAE5"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Optimization Recommendations */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Optimization Recommendations</h3>
          <p className="text-sm text-gray-600">Intelligent suggestions to improve system performance</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-900">Database Query Optimization</h4>
                <p className="text-sm text-green-700 mt-1">
                  Implementing query caching could reduce database response time by 45%
                </p>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm">Apply Optimization</Button>
                  <Button size="sm" variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">Potential Savings</p>
                <p className="text-lg font-bold text-green-900">$15K/month</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <Cpu className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Auto-scaling Configuration</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Configure intelligent auto-scaling to handle peak loads more efficiently
                </p>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm">Configure Now</Button>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 font-medium">Performance Gain</p>
                <p className="text-lg font-bold text-blue-900">+67%</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200"
            >
              <Settings className="h-5 w-5 text-purple-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-purple-900">Legacy System Optimization</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Optimize legacy system connections to reduce integration overhead
                </p>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm">Schedule Optimization</Button>
                  <Button size="sm" variant="outline">Impact Analysis</Button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-600 font-medium">Efficiency Boost</p>
                <p className="text-lg font-bold text-purple-900">+34%</p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Overall Health</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="font-medium">99.97%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Error Rate</span>
                <span className="font-medium text-green-600">0.03%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Incident</span>
                <span className="font-medium">12 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Resource Utilization</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">CPU</span>
                  <span className="text-sm font-medium">{realTimeData.cpuUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${realTimeData.cpuUsage}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Memory</span>
                  <span className="text-sm font-medium">{realTimeData.memoryUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-green-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${realTimeData.memoryUsage}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="text-sm font-medium">73%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full w-[73%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart Services
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Optimize Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};