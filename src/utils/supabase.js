import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.GATSBY_SUPABASE_URL;
const supabaseAnonKey = process.env.GATSBY_SUPABASE_ANON_KEY;

// Only create client if environment variables are configured
// This allows the app to work without Supabase (anonymous-only mode)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};
