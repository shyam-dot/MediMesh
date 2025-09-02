import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { 
  Database, 
  Server, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Settings,
  Plus,
  Search
} from 'lucide-react';

interface LegacySystem {
  id: string;
  name: string;
  vendor: string;
  version: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: string;
  migrationProgress: number;
  criticalityLevel: 'low' | 'medium' | 'high' | 'critical';
  connectedUsers: number;
  dataVolume: string;
}

const mockSystems: LegacySystem[] = [
  {
    id: '1',
    name: 'Electronic Health Records',
    vendor: 'Epic Systems',
    version: '2019.1',
    status: 'online',
    lastUpdate: '2024-01-15',
    migrationProgress: 85,
    criticalityLevel: 'critical',
    connectedUsers: 450,
    dataVolume: '2.4 TB'
  },
  {
    id: '2',
    name: 'Billing & Revenue Cycle',
    vendor: 'Cerner Corporation',
    version: '18.3',
    status: 'online',
    lastUpdate: '2024-01-14',
    migrationProgress: 92,
    criticalityLevel: 'high',
    connectedUsers: 125,
    dataVolume: '890 GB'
  },
  {
    id: '3',
    name: 'Laboratory Information System',
    vendor: 'LabCorp',
    version: '12.5',
    status: 'maintenance',
    lastUpdate: '2024-01-10',
    migrationProgress: 45,
    criticalityLevel: 'medium',
    connectedUsers: 78,
    dataVolume: '1.2 TB'
  },
  {
    id: '4',
    name: 'Pharmacy Management',
    vendor: 'McKesson',
    version: '15.2',
    status: 'online',
    lastUpdate: '2024-01-16',
    migrationProgress: 100,
    criticalityLevel: 'high',
    connectedUsers: 95,
    dataVolume: '450 GB'
  },
  {
    id: '5',
    name: 'Radiology PACS',
    vendor: 'GE Healthcare',
    version: '11.8',
    status: 'offline',
    lastUpdate: '2024-01-08',
    migrationProgress: 30,
    criticalityLevel: 'medium',
    connectedUsers: 0,
    dataVolume: '5.8 TB'
  }
];

export const LegacySystemsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<LegacySystem | null>(null);

  const filteredSystems = mockSystems.filter(system =>
    system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    system.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="h-5 w-5 text-green-600" />;
      case 'offline':
        return <WifiOff className="h-5 w-5 text-red-600" />;
      case 'maintenance':
        return <Settings className="h-5 w-5 text-yellow-600" />;
      default:
        return <Server className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCriticalityColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
          <h2 className="text-3xl font-bold text-gray-900">Legacy Systems</h2>
          <p className="text-gray-600">Monitor and manage your existing healthcare systems</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add System</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search systems by name or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSystems.map((system, index) => (
          <motion.div
            key={system.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="cursor-pointer" onClick={() => setSelectedSystem(system)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{system.name}</h3>
                      <p className="text-sm text-gray-600">{system.vendor}</p>
                    </div>
                  </div>
                  {getStatusIcon(system.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium">{system.version}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Active Users:</span>
                    <span className="font-medium">{system.connectedUsers}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Data Volume:</span>
                    <span className="font-medium">{system.dataVolume}</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Migration Progress</span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getCriticalityColor(system.criticalityLevel)}`}>
                        {system.criticalityLevel.toUpperCase()}
                      </span>
                    </div>
                    <ProgressBar
                      progress={system.migrationProgress}
                      showLabel={false}
                      color={system.migrationProgress === 100 ? 'green' : system.migrationProgress > 75 ? 'blue' : 'yellow'}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      Last updated: {new Date(system.lastUpdate).toLocaleDateString()}
                    </span>
                    {system.migrationProgress === 100 && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* System Details Modal */}
      {selectedSystem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSystem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Database className="h-8 w-8 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedSystem.name}</h2>
                    <p className="text-gray-600">{selectedSystem.vendor} v{selectedSystem.version}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSystem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">System Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(selectedSystem.status)}
                          <span className="capitalize font-medium">{selectedSystem.status}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Connected Users:</span>
                        <span className="font-medium">{selectedSystem.connectedUsers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Data Volume:</span>
                        <span className="font-medium">{selectedSystem.dataVolume}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Migration Details</h3>
                    <ProgressBar
                      progress={selectedSystem.migrationProgress}
                      color={selectedSystem.migrationProgress === 100 ? 'green' : 'blue'}
                    />
                    <div className="mt-3 text-sm text-gray-600">
                      {selectedSystem.migrationProgress === 100 ? (
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <span>Migration completed successfully</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Estimated completion: {Math.ceil((100 - selectedSystem.migrationProgress) / 10)} weeks</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Risk Assessment</h3>
                    <div className={`p-3 rounded-lg border ${getCriticalityColor(selectedSystem.criticalityLevel)}`}>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium capitalize">{selectedSystem.criticalityLevel} Priority</span>
                      </div>
                      <p className="text-sm mt-1">
                        {selectedSystem.criticalityLevel === 'critical' && 'Immediate attention required for system stability'}
                        {selectedSystem.criticalityLevel === 'high' && 'High impact on hospital operations'}
                        {selectedSystem.criticalityLevel === 'medium' && 'Moderate impact on daily workflows'}
                        {selectedSystem.criticalityLevel === 'low' && 'Low impact on core operations'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="primary" className="w-full">
                      View Migration Plan
                    </Button>
                    <Button variant="outline" className="w-full">
                      System Configuration
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download Reports
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};