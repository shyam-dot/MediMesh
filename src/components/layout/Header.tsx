import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Bell, Settings, User } from 'lucide-react';

interface HeaderProps {
  hospitalName?: string;
  userEmail?: string;
}

export const Header: React.FC<HeaderProps> = ({ hospitalName, userEmail }) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">MediMesh</h1>
          </motion.div>
          {hospitalName && (
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">|</span>
              <span className="ml-2 text-sm text-gray-700">{hospitalName}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </motion.button>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-700">{userEmail || 'admin@hospital.com'}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-blue-600 rounded-full p-2"
            >
              <User className="h-5 w-5 text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};