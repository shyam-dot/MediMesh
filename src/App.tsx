import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthForm } from './components/auth/AuthForm';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { LegacySystemsPage } from './components/systems/LegacySystemsPage';
import { MigrationPage } from './components/migration/MigrationPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { SecurityPage } from './components/security/SecurityPage';
import { PerformancePage } from './components/performance/PerformancePage';
import { SettingsPage } from './components/settings/SettingsPage';

interface User {
  email: string;
  hospitalName: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, hospitalName: string) => {
    setUser({ email, hospitalName });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Toaster position="top-right" />
        
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header hospitalName={user.hospitalName} userEmail={user.email} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/systems" element={<LegacySystemsPage />} />
              <Route path="/migration" element={<MigrationPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;