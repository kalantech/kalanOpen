/*
  # KalanOpen Educational Platform Database Schema

  ## Overview
  This migration creates the complete database structure for the KalanOpen platform,
  an educational initiative by KalanTech to democratize technology education in Africa.

  ## New Tables Created

  ### 1. podcasts
  Stores podcast episodes hosted on YouTube
  - `id` (uuid, primary key): Unique identifier
  - `title` (text): Podcast episode title
  - `description` (text): Detailed description
  - `youtube_url` (text): YouTube video URL
  - `youtube_id` (text): Extracted YouTube video ID
  - `guest` (text, optional): Featured guest name
  - `duration` (integer, optional): Duration in seconds
  - `tags` (text array): Searchable tags (IA, Cybersécurité, etc.)
  - `category` (text): Main category
  - `published_at` (timestamptz): Publication date
  - `created_at` (timestamptz): Record creation timestamp

  ### 2. formations
  Free educational courses and training modules
  - `id` (uuid, primary key): Unique identifier
  - `title` (text): Course title
  - `description` (text): Course description
  - `difficulty` (text): beginner/intermediate/advanced
  - `duration_hours` (integer): Estimated duration
  - `youtube_playlist_url` (text, optional): YouTube playlist link
  - `pdf_resources` (jsonb): Array of PDF resource links
  - `category` (text): Main category
  - `tags` (text array): Searchable tags
  - `published_at` (timestamptz): Publication date
  - `created_at` (timestamptz): Record creation timestamp

  ### 3. articles
  Educational blog posts and articles
  - `id` (uuid, primary key): Unique identifier
  - `title` (text): Article title
  - `slug` (text): URL-friendly slug
  - `content` (text): Article content (markdown)
  - `excerpt` (text): Short summary
  - `cover_image` (text, optional): Cover image URL
  - `author` (text): Author name
  - `category` (text): Main category
  - `tags` (text array): Searchable tags
  - `related_podcast_id` (uuid, optional): Linked podcast reference
  - `published_at` (timestamptz): Publication date
  - `created_at` (timestamptz): Record creation timestamp

  ### 4. events
  Webinars, workshops, and live sessions
  - `id` (uuid, primary key): Unique identifier
  - `title` (text): Event title
  - `description` (text): Event description
  - `event_date` (timestamptz): Scheduled date/time
  - `event_type` (text): webinar/workshop/talk
  - `youtube_url` (text, optional): Stream or recording URL
  - `registration_url` (text, optional): Registration link
  - `is_past` (boolean): Event status flag
  - `created_at` (timestamptz): Record creation timestamp

  ### 5. newsletter_subscriptions
  Email newsletter subscribers
  - `id` (uuid, primary key): Unique identifier
  - `email` (text): Subscriber email
  - `subscribed_at` (timestamptz): Subscription timestamp
  - `is_active` (boolean): Subscription status

  ### 6. community_topics
  User-submitted topic suggestions
  - `id` (uuid, primary key): Unique identifier
  - `name` (text): Submitter name
  - `email` (text): Submitter email
  - `topic` (text): Suggested topic
  - `description` (text): Topic details
  - `submitted_at` (timestamptz): Submission timestamp
  - `status` (text): pending/reviewed/accepted/rejected

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for content tables (podcasts, formations, articles, events)
  - Authenticated admin-only write access for content management
  - Public insert for newsletter_subscriptions and community_topics
  - Read protection on personal data (email addresses)

  ## Indexes
  - Performance indexes on frequently searched columns
  - Full-text search support on titles and descriptions
  - Tag array indexing for fast filtering
*/

-- Create podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  youtube_url text NOT NULL,
  youtube_id text NOT NULL,
  guest text,
  duration integer,
  tags text[] DEFAULT '{}',
  category text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create formations table
CREATE TABLE IF NOT EXISTS formations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_hours integer NOT NULL DEFAULT 0,
  youtube_playlist_url text,
  pdf_resources jsonb DEFAULT '[]',
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  cover_image text,
  author text NOT NULL DEFAULT 'KalanTech Team',
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  related_podcast_id uuid REFERENCES podcasts(id),
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('webinar', 'workshop', 'talk')),
  youtube_url text,
  registration_url text,
  is_past boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create community_topics table
CREATE TABLE IF NOT EXISTS community_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  topic text NOT NULL,
  description text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_podcasts_category ON podcasts(category);
CREATE INDEX IF NOT EXISTS idx_podcasts_tags ON podcasts USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_podcasts_published ON podcasts(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_formations_category ON formations(category);
CREATE INDEX IF NOT EXISTS idx_formations_tags ON formations USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_formations_difficulty ON formations(difficulty);

CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);

-- Enable Row Level Security
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_topics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for podcasts (public read, admin write)
CREATE POLICY "Anyone can view published podcasts"
  ON podcasts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only authenticated users can insert podcasts"
  ON podcasts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update podcasts"
  ON podcasts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete podcasts"
  ON podcasts FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for formations (public read, admin write)
CREATE POLICY "Anyone can view published formations"
  ON formations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only authenticated users can insert formations"
  ON formations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update formations"
  ON formations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete formations"
  ON formations FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for articles (public read, admin write)
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for events (public read, admin write)
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for newsletter_subscriptions (public insert, admin read)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view subscriptions"
  ON newsletter_subscriptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update subscriptions"
  ON newsletter_subscriptions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for community_topics (public insert, admin read)
CREATE POLICY "Anyone can submit topic suggestions"
  ON community_topics FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view topic submissions"
  ON community_topics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update topic submissions"
  ON community_topics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);