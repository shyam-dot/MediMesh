import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200'
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`p-3 rounded-full ${colorClasses[color]}`}
            >
              {icon}
            </motion.div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <motion.p 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-gray-900"
              >
                {value}
              </motion.p>
            </div>
          </div>

          {change !== undefined && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};