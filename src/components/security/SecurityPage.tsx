import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { MetricsCard } from '../dashboard/MetricsCard';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Key, 
  FileText,
  Users,
  Activity,
  Scan,
  Download
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'access' | 'alert' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  user?: string;
  system: string;
}

const securityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'alert',
    severity: 'high',
    message: 'Unusual access pattern detected in EHR system',
    timestamp: '2024-01-16T10:30:00Z',
    user: 'Dr. Smith',
    system: 'Epic EHR'
  },
  {
    id: '2',
    type: 'compliance',
    severity: 'medium',
    message: 'HIPAA compliance check completed successfully',
    timestamp: '2024-01-16T09:15:00Z',
    system: 'All Systems'
  },
  {
    id: '3',
    type: 'login',
    severity: 'low',
    message: 'Failed login attempt from unknown IP',
    timestamp: '2024-01-16T08:45:00Z',
    user: 'Unknown',
    system: 'Authentication'
  },
  {
    id: '4',
    type: 'access',
    severity: 'low',
    message: 'Privileged access granted to system administrator',
    timestamp: '2024-01-16T08:00:00Z',
    user: 'Admin User',
    system: 'Database'
  }
];

const complianceStandards = [
  { name: 'HIPAA', status: 'compliant', lastAudit: '2024-01-10', score: 98 },
  { name: 'SOC 2 Type II', status: 'compliant', lastAudit: '2024-01-05', score: 96 },
  { name: 'ISO 27001', status: 'pending', lastAudit: '2023-12-15', score: 89 },
  { name: 'GDPR', status: 'compliant', lastAudit: '2024-01-12', score: 94 },
];

export const SecurityPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <Key className="h-4 w-4" />;
      case 'access':
        return <Eye className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'compliance':
        return <FileText className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
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
          <h2 className="text-3xl font-bold text-gray-900">Security & Compliance</h2>
          <p className="text-gray-600">Monitor security events and maintain compliance standards</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Scan className="h-4 w-4" />
            <span>Run Security Scan</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Security Score"
          value="96/100"
          change={2}
          trend="up"
          icon={<Shield className="h-6 w-6" />}
          color="green"
        />
        <MetricsCard
          title="Active Threats"
          value="0"
          change={-100}
          trend="down"
          icon={<AlertTriangle className="h-6 w-6" />}
          color="green"
        />
        <MetricsCard
          title="Compliance Rate"
          value="98.5%"
          change={1.5}
          trend="up"
          icon={<FileText className="h-6 w-6" />}
          color="blue"
        />
        <MetricsCard
          title="Encrypted Data"
          value="100%"
          change={0}
          trend="neutral"
          icon={<Lock className="h-6 w-6" />}
          color="green"
        />
      </div>

      {/* Compliance Standards */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Compliance Standards</h3>
          <p className="text-sm text-gray-600">Current compliance status across all standards</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{standard.name}</h4>
                  <div className="flex items-center space-x-2">
                    {standard.status === 'compliant' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      standard.status === 'compliant' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {standard.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Compliance Score:</span>
                    <span className="font-medium">{standard.score}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Audit:</span>
                    <span className="font-medium">{new Date(standard.lastAudit).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Events */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Recent Security Events</h3>
          <p className="text-sm text-gray-600">Latest security activities and alerts</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{event.system}</span>
                      {event.user && <span>• {event.user}</span>}
                      <span>• {new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(event.severity)}`}>
                  {event.severity.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Security Recommendations</h3>
          <p className="text-sm text-gray-600">AI-powered suggestions to improve security posture</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Enable Multi-Factor Authentication</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Implement MFA for all administrative accounts to reduce unauthorized access risk by 99.9%
                </p>
                <Button size="sm" className="mt-2">Implement Now</Button>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">Update Encryption Standards</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Upgrade to AES-256 encryption for enhanced data protection across all systems
                </p>
                <Button size="sm" variant="outline" className="mt-2">Schedule Update</Button>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Eye className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Enhanced Monitoring</h4>
                <p className="text-sm text-green-700 mt-1">
                  Deploy AI-powered anomaly detection for real-time threat identification
                </p>
                <Button size="sm" variant="outline" className="mt-2">Learn More</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};