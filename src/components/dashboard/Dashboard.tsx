import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { MetricsCard } from './MetricsCard';
import { ProgressBar } from '../ui/ProgressBar';
import { 
  Activity, 
  Database, 
  Shield, 
  Zap, 
  TrendingUp,
  Server,
  Clock,
  Users,
  AlertTriangle
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

const performanceData = [
  { time: '00:00', legacy: 2400, modern: 4200 },
  { time: '04:00', legacy: 1800, modern: 4100 },
  { time: '08:00', legacy: 3200, modern: 4400 },
  { time: '12:00', legacy: 2800, modern: 4300 },
  { time: '16:00', legacy: 3600, modern: 4600 },
  { time: '20:00', legacy: 3100, modern: 4500 },
  { time: '24:00', legacy: 2200, modern: 4200 },
];

const systemStatusData = [
  { name: 'Modernized', value: 65, color: '#10B981' },
  { name: 'In Progress', value: 25, color: '#F59E0B' },
  { name: 'Legacy', value: 10, color: '#EF4444' },
];

const migrationTasks = [
  { id: 1, system: 'Patient Records (EPIC)', progress: 85, status: 'In Progress', priority: 'High' },
  { id: 2, system: 'Billing System (Cerner)', progress: 92, status: 'Nearly Complete', priority: 'Critical' },
  { id: 3, system: 'Lab Results (LabCorp)', progress: 45, status: 'In Progress', priority: 'Medium' },
  { id: 4, system: 'Pharmacy (McKesson)', progress: 100, status: 'Complete', priority: 'High' },
  { id: 5, system: 'Radiology (PACS)', progress: 30, status: 'Starting', priority: 'Low' },
];

export const Dashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
    systemUptime: 99.8,
    responseTime: 245,
    activeUsers: 1247,
    tasksCompleted: 67
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        systemUptime: +(Math.random() * 0.4 + 99.6).toFixed(1),
        responseTime: Math.floor(Math.random() * 100 + 200),
        activeUsers: Math.floor(Math.random() * 200 + 1200),
        tasksCompleted: Math.min(100, prev.tasksCompleted + Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 space-y-6"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">System Modernization Dashboard</h2>
        <p className="text-gray-600">Real-time monitoring of your legacy system migration to cloud-based AI solutions</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="System Uptime"
          value={`${realTimeData.systemUptime}%`}
          change={0.2}
          trend="up"
          icon={<Activity className="h-6 w-6" />}
          color="green"
        />
        <MetricsCard
          title="Avg Response Time"
          value={`${realTimeData.responseTime}ms`}
          change={-12}
          trend="down"
          icon={<Zap className="h-6 w-6" />}
          color="blue"
        />
        <MetricsCard
          title="Active Users"
          value={realTimeData.activeUsers.toLocaleString()}
          change={8}
          trend="up"
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <MetricsCard
          title="Migration Progress"
          value={`${Math.round(realTimeData.tasksCompleted)}%`}
          change={15}
          trend="up"
          icon={<Database className="h-6 w-6" />}
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Performance Comparison</h3>
            <p className="text-sm text-gray-600">Legacy vs Modern System Response Times (ms)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="legacy" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Legacy System"
                />
                <Line 
                  type="monotone" 
                  dataKey="modern" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Modern System"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">System Distribution</h3>
            <p className="text-sm text-gray-600">Current state of all hospital systems</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={systemStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {systemStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {systemStatusData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Migration Tasks */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Migration Tasks</h3>
              <p className="text-sm text-gray-600">Current system modernization progress</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Updates</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {migrationTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: task.id * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Server className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-900">{task.system}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      task.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <ProgressBar
                    progress={task.progress}
                    showLabel={false}
                    color={task.progress === 100 ? 'green' : task.progress > 75 ? 'blue' : 'yellow'}
                  />
                </div>
                <div className="ml-6 text-right">
                  <p className="text-sm font-medium text-gray-900">{task.status}</p>
                  <p className="text-sm text-gray-500">{task.progress}% complete</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">System Alerts & Notifications</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Security Update Completed</p>
                <p className="text-xs text-green-700">All systems updated with latest security patches</p>
              </div>
              <span className="text-xs text-green-600 ml-auto">2 min ago</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Migration Checkpoint</p>
                <p className="text-xs text-yellow-700">Lab Results system requires manual review</p>
              </div>
              <span className="text-xs text-yellow-600 ml-auto">15 min ago</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Scheduled Maintenance</p>
                <p className="text-xs text-blue-700">Database optimization scheduled for tonight at 2:00 AM</p>
              </div>
              <span className="text-xs text-blue-600 ml-auto">1 hour ago</span>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};