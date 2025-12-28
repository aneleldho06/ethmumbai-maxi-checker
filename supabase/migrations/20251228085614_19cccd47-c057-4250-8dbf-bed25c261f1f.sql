-- Add profile_image_url column to cache Twitter profile pictures
ALTER TABLE public.leaderboard ADD COLUMN profile_image_url TEXT;