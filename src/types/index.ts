export interface User {
  id: string;
  email: string;
  full_name: string;
  hospital_id?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contact_email: string;
  legacy_systems: string[];
  modernization_progress: number;
  created_at: string;
}

export interface SystemMetric {
  id: string;
  hospital_id: string;
  system_name: string;
  uptime: number;
  response_time: number;
  modernization_status: 'legacy' | 'migrating' | 'modernized';
  last_updated: string;
}

export interface MigrationTask {
  id: string;
  hospital_id: string;
  system_name: string;
  task_description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress_percentage: number;
  estimated_completion: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}