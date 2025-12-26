-- Create leaderboard table for storing user scores
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0,
  original_count INTEGER NOT NULL DEFAULT 0,
  reply_count INTEGER NOT NULL DEFAULT 0,
  retweet_count INTEGER NOT NULL DEFAULT 0,
  total_mentions INTEGER NOT NULL DEFAULT 0,
  rank_title TEXT NOT NULL DEFAULT 'Curious Commuter',
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to read the leaderboard (public leaderboard)
CREATE POLICY "Anyone can view leaderboard"
ON public.leaderboard
FOR SELECT
USING (true);

-- Create policy for anyone to insert into leaderboard (anonymous submissions)
CREATE POLICY "Anyone can insert into leaderboard"
ON public.leaderboard
FOR INSERT
WITH CHECK (true);

-- Create policy for anyone to update leaderboard entries
CREATE POLICY "Anyone can update leaderboard entries"
ON public.leaderboard
FOR UPDATE
USING (true);

-- Create index for fast score-based sorting
CREATE INDEX idx_leaderboard_score ON public.leaderboard(score DESC);

-- Create index for username lookups
CREATE INDEX idx_leaderboard_username ON public.leaderboard(username);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_leaderboard_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  NEW.last_checked = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leaderboard_updated_at
BEFORE UPDATE ON public.leaderboard
FOR EACH ROW
EXECUTE FUNCTION public.update_leaderboard_updated_at();

-- Enable realtime for leaderboard table
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;