import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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