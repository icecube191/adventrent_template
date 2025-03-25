/*
  # Create error logs table

  1. New Tables
    - `error_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `screen_name` (varchar)
      - `error_message` (text)
      - `stack_trace` (text)
      - `app_version` (varchar)
      - `device_info` (jsonb)
      - `timestamp` (timestamptz)

  2. Security
    - Enable RLS on `error_logs` table
    - Add policy for authenticated users to read their own error logs
    - Add policy for service role to insert error logs
*/

CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  screen_name varchar(100) NOT NULL,
  error_message text NOT NULL,
  stack_trace text,
  app_version varchar(20) NOT NULL,
  device_info jsonb NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own error logs
CREATE POLICY "Users can read their own error logs"
  ON error_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow service role to insert error logs
CREATE POLICY "Service role can insert error logs"
  ON error_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS error_logs_user_id_idx ON error_logs(user_id);
CREATE INDEX IF NOT EXISTS error_logs_timestamp_idx ON error_logs(timestamp DESC);