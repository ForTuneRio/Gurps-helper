-- Create rate_limits table for tracking API requests per user
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  request_count INT DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_endpoint 
ON public.rate_limits(user_id, endpoint, window_start DESC);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window
ON public.rate_limits(window_start DESC);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own rate limit records
CREATE POLICY "Users can view own rate limits"
ON public.rate_limits FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Service role can insert/update rate limit records
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
USING (auth.role() = 'service_role');
