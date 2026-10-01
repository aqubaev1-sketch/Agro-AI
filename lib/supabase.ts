import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id')
);

let client: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Не удалось инициализировать Supabase клиент:', error);
  }
}

export const supabase = client;

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  planId: 'free' | 'basic' | 'pro';
  diagnosesUsedThisMonth: number;
  totalDiagnosesCount: number;
  createdAt: string;
}
