import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  slug: string;
  title_cs: string;
  title_en: string;
  content_cs: string;
  content_en: string;
  excerpt_cs: string;
  excerpt_en: string;
  image_url: string | null;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string | null;
}

export interface Pricing {
  id: string;
  season: string;
  title_cs: string;
  title_en: string;
  description_cs: string | null;
  description_en: string | null;
  price_per_night: number;
  min_nights: number;
  max_guests: number;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_login: string | null;
}
