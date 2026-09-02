import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://zvlzrflffgzmvdacgvqb.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bHpyZmxmZmd6bXZkYWNndnFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MDQwMjEsImV4cCI6MjA3MjM4MDAyMX0.Z_6r_c2_XHLZ5l_qsLu5YxKUH5V7FTOIjYXiQ4qX5MU';

let client: SupabaseClient | null = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 5
        }
      }
    });
  }
} catch (err) {
  console.warn('[Supabase] Initialization skipped:', err);
}

export const supabase = client;
