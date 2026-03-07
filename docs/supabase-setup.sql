-- ============================================
-- Supabase Setup for Learn Cryptic
-- ============================================
--
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This creates the required tables and Row Level Security policies
--
-- Prerequisites:
-- 1. Create a Supabase project at https://supabase.com
-- 2. Go to Settings > API to get your project URL and anon key
-- 3. Add these to your .env file:
--    GATSBY_SUPABASE_URL=https://your-project-id.supabase.co
--    GATSBY_SUPABASE_ANON_KEY=your-anon-key
--

-- ============================================
-- Table: users_profile
-- ============================================
-- Stores user preferences and streak data
-- Links to Supabase auth.users table

CREATE TABLE IF NOT EXISTS users_profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  show_type BOOLEAN DEFAULT true,
  dark_mode BOOLEAN DEFAULT null,  -- null = system preference
  has_seen_onboarding BOOLEAN DEFAULT false,
  has_seen_onboarding_prompt BOOLEAN DEFAULT false,
  has_completed_first_clue BOOLEAN DEFAULT false,
  streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_solved TEXT DEFAULT null,  -- Date string of last solved clue
  has_seen_achievements_intro BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own profile
CREATE POLICY "Users can view own profile" ON users_profile
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users_profile
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users_profile
  FOR UPDATE USING (auth.uid() = id);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_profile_updated_at
  BEFORE UPDATE ON users_profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- Table: completed_clues
-- ============================================
-- One row per completed clue per user

CREATE TABLE IF NOT EXISTS completed_clues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clid TEXT NOT NULL,  -- Clue ID from the app
  guesses INTEGER DEFAULT 0,
  hints INTEGER DEFAULT 0,
  how TEXT DEFAULT 'g',  -- 'g' for guess, 'h' for hint reveal
  difficulty INTEGER DEFAULT null,
  completed_at TIMESTAMPTZ DEFAULT now(),
  solve_time INTEGER DEFAULT null,  -- Solve time in seconds
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Prevent duplicate entries for same user/clue
  UNIQUE(user_id, clid)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_completed_clues_user_id ON completed_clues(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_clues_clid ON completed_clues(clid);

-- Enable RLS
ALTER TABLE completed_clues ENABLE ROW LEVEL SECURITY;

-- Users can only access their own completed clues
CREATE POLICY "Users can view own completed clues" ON completed_clues
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completed clues" ON completed_clues
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own completed clues" ON completed_clues
  FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- Table: achievements
-- ============================================
-- One row per unlocked achievement per user

CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,  -- Achievement ID from the app
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  seen_at TIMESTAMPTZ DEFAULT null,  -- When user acknowledged the achievement
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Prevent duplicate entries for same user/achievement
  UNIQUE(user_id, achievement_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Users can only access their own achievements
CREATE POLICY "Users can view own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own achievements" ON achievements
  FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- Auth Configuration
-- ============================================
-- Configure these in your Supabase Dashboard:
--
-- 1. Enable Email provider (Authentication > Providers > Email)
--    - Enable email confirmations for production
--    - Set custom email templates if desired
--
-- 2. Configure Site URL (Authentication > URL Configuration)
--    - Site URL: https://learncryptic.com (or your domain)
--    - Redirect URLs:
--      - https://learncryptic.com/auth/callback
--      - https://learncryptic.com/auth/reset-password
--      - http://localhost:8000/auth/callback (for development)
--
-- 3. Email Templates (Authentication > Email Templates)
--    - Customize the confirmation and reset password emails
--

-- ============================================
-- Optional: Create user profile on signup
-- ============================================
-- This trigger automatically creates a profile when a new user signs up

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users_profile (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================
-- Verification Queries
-- ============================================
-- Run these to verify the setup:

-- Check tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies WHERE schemaname = 'public';
