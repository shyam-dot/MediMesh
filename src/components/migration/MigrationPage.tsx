import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { 
  GitMerge, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Calendar,
  Users,
  Database
} from 'lucide-react';

interface MigrationTask {
  id: string;
  systemName: string;
  taskName: string;
  description: string;
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed';
  progress: number;
  estimatedTime: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  dependencies: string[];
}

const mockTasks: MigrationTask[] = [
  {
    id: '1',
    systemName: 'Epic EHR',
    taskName: 'Patient Data Migration',
    description: 'Migrate patient records to cloud-based AI-enhanced storage',
    status: 'running',
    progress: 78,
    estimatedTime: '2 hours remaining',
    assignedTo: 'Dr. Sarah Chen',
    priority: 'critical',
    startDate: '2024-01-15',
    dependencies: ['Database Backup', 'Security Validation']
  },
  {
    id: '2',
    systemName: 'Cerner Billing',
    taskName: 'Revenue Cycle Integration',
    description: 'Connect billing system to AI-powered analytics platform',
    status: 'completed',
    progress: 100,
    estimatedTime: 'Completed',
    assignedTo: 'Mike Rodriguez',
    priority: 'high',
    startDate: '2024-01-10',
    dependencies: ['API Setup', 'Data Validation']
  },
  {
    id: '3',
    systemName: 'LabCorp LIS',
    taskName: 'Lab Results Automation',
    description: 'Implement AI-driven result analysis and reporting',
    status: 'pending',
    progress: 0,
    estimatedTime: '5 days',
    assignedTo: 'Jennifer Park',
    priority: 'medium',
    startDate: '2024-01-20',
    dependencies: ['System Analysis', 'Workflow Mapping']
  },
  {
    id: '4',
    systemName: 'McKesson Pharmacy',
    taskName: 'Inventory Optimization',
    description: 'Deploy AI-powered inventory management and drug interaction checking',
    status: 'running',
    progress: 45,
    estimatedTime: '3 days remaining',
    assignedTo: 'David Kim',
    priority: 'high',
    startDate: '2024-01-12',
    dependencies: ['Drug Database Sync']
  },
  {
    id: '5',
    systemName: 'GE PACS',
    taskName: 'Image Analysis Enhancement',
    description: 'Integrate AI-powered diagnostic assistance for radiology',
    status: 'paused',
    progress: 25,
    estimatedTime: 'Paused',
    assignedTo: 'Dr. Lisa Wang',
    priority: 'medium',
    startDate: '2024-01-08',
    dependencies: ['Hardware Upgrade', 'Staff Training']
  }
];

export const MigrationPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<MigrationTask | null>(null);

  const filteredTasks = filter === 'all' 
    ? mockTasks 
    : mockTasks.filter(task => task.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Migration Tasks</h2>
          <p className="text-gray-600">Track and manage your system modernization progress</p>
        </div>
        <Button className="flex items-center space-x-2">
          <GitMerge className="h-4 w-4" />
          <span>New Migration</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            {['all', 'running', 'pending', 'completed', 'paused'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 text-xs">
                  ({status === 'all' ? mockTasks.length : mockTasks.filter(t => t.status === status).length})
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="cursor-pointer" onClick={() => setSelectedTask(task)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                      <h3 className="font-semibold text-gray-900">{task.taskName}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Database className="h-4 w-4" />
                        <span>{task.systemName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{task.assignedTo}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(task.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <ProgressBar
                          progress={task.progress}
                          showLabel={false}
                          color={task.status === 'completed' ? 'green' : task.status === 'failed' ? 'red' : 'blue'}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{task.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="ml-6 flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <span className="text-2xl font-bold text-gray-900">{task.progress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTask.taskName}</h2>
                  <p className="text-gray-600">{selectedTask.systemName}</p>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Task Description</h3>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Progress Overview</h3>
                  <ProgressBar progress={selectedTask.progress} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Dependencies</h3>
                  <div className="space-y-2">
                    {selectedTask.dependencies.map((dep, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-600">{dep}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  {selectedTask.status === 'running' && (
                    <Button variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Task
                    </Button>
                  )}
                  {selectedTask.status === 'paused' && (
                    <Button variant="primary">
                      <Play className="h-4 w-4 mr-2" />
                      Resume Task
                    </Button>
                  )}
                  {selectedTask.status === 'failed' && (
                    <Button variant="primary">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retry Task
                    </Button>
                  )}
                  <Button variant="outline">View Logs</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};