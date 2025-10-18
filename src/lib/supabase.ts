import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Podcast = {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  youtube_id: string;
  guest?: string;
  duration?: number;
  tags: string[];
  category: string;
  published_at: string;
  created_at: string;
};

export type Formation = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  youtube_playlist_url?: string;
  pdf_resources: { name: string; url: string }[];
  category: string;
  tags: string[];
  published_at: string;
  created_at: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image?: string;
  author: string;
  category: string;
  tags: string[];
  related_podcast_id?: string;
  published_at: string;
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_type: 'webinar' | 'workshop' | 'talk';
  youtube_url?: string;
  registration_url?: string;
  is_past: boolean;
  created_at: string;
};
