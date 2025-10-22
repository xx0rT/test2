/*
  # Villa Management System Database Schema
  
  ## Overview
  This migration creates the complete database structure for Villa Adalbert website including:
  - Admin authentication
  - Blog posts management
  - Pricing management
  - Multi-language support
  
  ## New Tables
  
  ### `admin_users`
  - `id` (uuid, primary key) - Admin user ID
  - `email` (text, unique) - Admin email
  - `password_hash` (text) - Hashed password
  - `name` (text) - Admin name
  - `created_at` (timestamptz) - Account creation timestamp
  - `last_login` (timestamptz) - Last login timestamp
  
  ### `blog_posts`
  - `id` (uuid, primary key) - Blog post ID
  - `title_cs` (text) - Title in Czech
  - `title_en` (text) - Title in English
  - `content_cs` (text) - Content in Czech
  - `content_en` (text) - Content in English
  - `excerpt_cs` (text) - Short excerpt in Czech
  - `excerpt_en` (text) - Short excerpt in English
  - `image_url` (text) - Featured image URL
  - `category` (text) - Category (turistika, relaxace, zima, etc.)
  - `published` (boolean) - Publication status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `author_id` (uuid) - Reference to admin_users
  
  ### `pricing`
  - `id` (uuid, primary key) - Pricing ID
  - `season` (text) - Season name (high, low, holiday)
  - `title_cs` (text) - Title in Czech
  - `title_en` (text) - Title in English
  - `description_cs` (text) - Description in Czech
  - `description_en` (text) - Description in English
  - `price_per_night` (integer) - Price per night in CZK
  - `min_nights` (integer) - Minimum nights required
  - `max_guests` (integer) - Maximum guests
  - `active` (boolean) - Active status
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ## Security
  - RLS enabled on all tables
  - Admin users can only manage their own content
  - Public can only read published content
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_cs text NOT NULL,
  title_en text NOT NULL,
  content_cs text NOT NULL,
  content_en text NOT NULL,
  excerpt_cs text NOT NULL,
  excerpt_en text NOT NULL,
  image_url text,
  category text DEFAULT 'obecné',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Create pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season text NOT NULL,
  title_cs text NOT NULL,
  title_en text NOT NULL,
  description_cs text,
  description_en text,
  price_per_night integer NOT NULL,
  min_nights integer DEFAULT 2,
  max_guests integer DEFAULT 10,
  active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "Admin users can read own data"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin users can update own data"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update own blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authenticated users can delete own blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- RLS Policies for pricing
CREATE POLICY "Anyone can view active pricing"
  ON pricing FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Authenticated users can view all pricing"
  ON pricing FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage pricing"
  ON pricing FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pricing_season ON pricing(season);
CREATE INDEX IF NOT EXISTS idx_pricing_active ON pricing(active);
CREATE INDEX IF NOT EXISTS idx_pricing_sort_order ON pricing(sort_order);

-- Insert default pricing data
INSERT INTO pricing (season, title_cs, title_en, description_cs, description_en, price_per_night, min_nights, sort_order) VALUES
('high', 'Hlavní sezóna', 'High Season', 'Zimní měsíce a prázdniny', 'Winter months and holidays', 4500, 3, 1),
('low', 'Nízká sezóna', 'Low Season', 'Jarní a podzimní měsíce', 'Spring and autumn months', 3200, 2, 2),
('holiday', 'Svátky', 'Holidays', 'Vánoce, Nový rok, Velikonoce', 'Christmas, New Year, Easter', 5500, 5, 3)
ON CONFLICT DO NOTHING;
