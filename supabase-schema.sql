-- Pawblis Dog Training - Database Schema
-- Run this in your Supabase SQL Editor

-- Create the clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Consultation
  consultation_date DATE,
  
  -- Owner Data
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  
  -- Dog Data
  dog_breed TEXT,
  dog_sex TEXT,
  dog_reproductive_status TEXT,
  consultation_reason TEXT,
  dog_weight TEXT,
  dog_birth_date DATE,
  dog_adoption_date DATE,
  adoption_status TEXT,
  dog_origin TEXT,
  consultation_motives TEXT,
  
  -- Environment
  housing_type TEXT,
  interior_access TEXT,
  where_left_alone TEXT,
  how_stays_alone TEXT,
  
  -- Walks & Feeding
  walk_start_age TEXT,
  control_tools TEXT,
  food_type TEXT,
  food_brand TEXT,
  food_administration TEXT,
  treats TEXT,
  treats_when TEXT,
  is_glutton BOOLEAN DEFAULT false,
  food_removal_reaction TEXT,
  
  -- Daily Routine
  walks_number_duration TEXT,
  post_walk_routine TEXT,
  feeding_schedule TEXT,
  other_animals JSONB DEFAULT '[]'::jsonb,
  
  -- Socialization
  socialization_family TEXT,
  socialization_strangers TEXT,
  socialization_known_dogs TEXT,
  socialization_unknown_dogs TEXT,
  
  -- Behavior
  elimination_behavior TEXT,
  sleep_location TEXT,
  uses_kongs TEXT,
  chases_bikes_kids TEXT,
  previous_training TEXT,
  training_method TEXT,
  play_behavior TEXT,
  phobias JSONB DEFAULT '[]'::jsonb,
  stimulus_reaction TEXT,
  repetitive_behavior TEXT,
  punishments_type TEXT,
  punishments_frequency TEXT,
  punishments_context TEXT,
  punishments_start TEXT,
  
  -- Medical
  medical_history_type TEXT,
  medical_history_start TEXT,
  medical_history_frequency TEXT,
  consultation_observations TEXT,
  medical_problems TEXT,
  current_medication TEXT
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own clients
CREATE POLICY "Users can view own clients"
  ON public.clients FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own clients
CREATE POLICY "Users can insert own clients"
  ON public.clients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own clients
CREATE POLICY "Users can update own clients"
  ON public.clients FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own clients
CREATE POLICY "Users can delete own clients"
  ON public.clients FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON public.clients(created_at DESC);
