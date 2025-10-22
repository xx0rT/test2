/*
  # Add slug field to blog_posts table

  1. Changes
    - Add `slug` column to `blog_posts` table
    - The slug will be used for URL-friendly blog post identifiers
    - Slugs must be unique
    - Add index for better query performance

  2. Notes
    - Existing posts will need slugs to be added manually via admin panel
*/

-- Add slug column to blog_posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'slug'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN slug text UNIQUE;
  END IF;
END $$;

-- Create index on slug for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
