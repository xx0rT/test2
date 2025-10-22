# Vila Adalbert - Admin Panel & Multi-language Setup

## Overview
This document describes the complete implementation of:
1. Multi-language support (Czech, English, German, Slovak)
2. Pricing page (replacing O vile/ochi-team)
3. Admin panel with authentication
4. Blog management system
5. Pricing management system

## Database Setup

### Supabase Tables Created

#### 1. admin_users
Stores admin user credentials
- `id` - UUID primary key
- `email` - Unique email
- `password_hash` - Hashed password
- `name` - Admin name
- `created_at` - Timestamp
- `last_login` - Last login timestamp

#### 2. blog_posts
Stores blog posts in multiple languages
- `id` - UUID primary key
- `title_cs`, `title_en` - Titles in Czech/English
- `content_cs`, `content_en` - Content in Czech/English
- `excerpt_cs`, `excerpt_en` - Excerpts in Czech/English
- `image_url` - Featured image
- `category` - Blog category
- `published` - Publication status
- `author_id` - Reference to admin_users

#### 3. pricing
Stores pricing information
- `id` - UUID primary key
- `season` - Season identifier (high, low, holiday)
- `title_cs`, `title_en` - Titles in Czech/English
- `description_cs`, `description_en` - Descriptions
- `price_per_night` - Price in CZK
- `min_nights` - Minimum nights required
- `max_guests` - Maximum guests
- `active` - Active status
- `sort_order` - Display order

### Default Pricing Data
The migration includes 3 default pricing entries:
- High Season (4500 Kč/night, min 3 nights)
- Low Season (3200 Kč/night, min 2 nights)
- Holidays (5500 Kč/night, min 5 nights)

## Multi-language Support

### Languages Supported
- Czech (cs) - Default
- English (en)
- German (de)
- Slovak (sk)

### Implementation
1. **Language Context** (`/context/LanguageContext.tsx`)
   - Provides language state management
   - Accessible via `useLanguage()` hook

2. **Translations File** (`/translations/index.ts`)
   - Contains all translations for all languages
   - Organized by sections (nav, home, pricing, contact, etc.)

3. **Language Switcher**
   - Added to Navbar (desktop)
   - Added to MobileNav (mobile)
   - Dropdown with all 4 languages

### Usage in Components
```tsx
import { useLanguage } from '@/context/LanguageContext';

function Component() {
  const { language, setLanguage, t } = useLanguage();

  return <h1>{t.nav.home}</h1>; // Displays based on current language
}
```

## Pages Structure

### Public Pages
1. **`/pricing`** (NEW - replaces /ochi-team)
   - Displays pricing from database
   - Multi-language support
   - Real-time data from Supabase
   - Book now button links to contact

### Admin Pages
1. **`/admin/login`**
   - Authentication page
   - Email/password login
   - Uses Supabase Auth

2. **`/admin/dashboard`**
   - Main admin dashboard
   - Links to blog and pricing management
   - Protected route

3. **`/admin/blogs`**
   - List all blog posts
   - Create new blog posts
   - Edit existing posts
   - Delete posts
   - Toggle publish status
   - Multi-language editing (CS/EN)

4. **`/admin/pricing`**
   - List all pricing entries
   - Create new pricing
   - Edit existing pricing
   - Delete pricing
   - Toggle active status
   - Multi-language editing (CS/EN)

## Navigation Updates

### Main Navbar Changes
**Before:**
- Domů, Vybavení, Galerie, **O Vile**, Aktivity, Kontakt

**After:**
- Domů, Vybavení, Galerie, **Ceník**, Aktivity, Kontakt

### Route Changes
- `/ochi-team` → `/pricing`

## Environment Variables Required

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

This will install the new `@supabase/supabase-js` dependency.

### 2. Set Up Supabase
The migration has already been applied to create:
- Database tables
- Row Level Security policies
- Default pricing data

### 3. Create First Admin User
You need to create an admin user in Supabase:

**Option A: Using Supabase Dashboard**
1. Go to Authentication in Supabase dashboard
2. Click "Add User"
3. Enter email and password
4. User will be able to log in at `/admin/login`

**Option B: Using SQL**
```sql
-- This will be added in a future migration
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('admin@viladalbert.cz', crypt('your_password', gen_salt('bf')), now());
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Admin Panel
1. Navigate to `http://localhost:3000/admin/login`
2. Log in with your admin credentials
3. Access dashboard at `/admin/dashboard`

## Features

### Pricing Management
- ✅ Add/Edit/Delete pricing entries
- ✅ Multi-language support (CS/EN)
- ✅ Set price per night
- ✅ Configure minimum nights
- ✅ Set maximum guests
- ✅ Toggle active status
- ✅ Sort order for display
- ✅ Season categorization

### Blog Management
- ✅ Add/Edit/Delete blog posts
- ✅ Multi-language support (CS/EN)
- ✅ Category selection
- ✅ Image URL support
- ✅ Publish/Draft status
- ✅ Rich content editing
- ✅ Author tracking

### Language System
- ✅ 4 languages (CS, EN, DE, SK)
- ✅ Persistent language selection
- ✅ Language switcher in navbar
- ✅ All pages translated
- ✅ Database content in CS/EN

### Security
- ✅ Row Level Security (RLS) enabled
- ✅ Authenticated admin access only
- ✅ Public can only view published/active content
- ✅ Protected admin routes
- ✅ Secure authentication

## File Structure

```
/pages
  /pricing
    index.tsx          # New pricing page
  /admin
    login.tsx          # Admin login
    dashboard.tsx      # Admin dashboard
    blogs.tsx          # Blog management
    pricing.tsx        # Pricing management

/lib
  supabase.ts          # Supabase client & types

/components
  Navbar.tsx           # Updated with pricing link & language switcher
  MobileNav.tsx        # Updated with pricing link & language switcher

/translations
  index.ts             # All translations for 4 languages

/context
  LanguageContext.tsx  # Language state management

/supabase/migrations
  create_villa_management_tables.sql  # Database schema
```

## Next Steps

1. **Create admin user** in Supabase
2. **Test admin login** at `/admin/login`
3. **Add pricing entries** via admin panel
4. **Create blog posts** via admin panel
5. **Test language switching** on frontend
6. **Verify pricing page** displays correctly

## Support & Maintenance

### Adding New Languages
1. Add language to `/translations/index.ts`
2. Add language option to Navbar and MobileNav
3. Update LanguageContext type

### Extending Blog Features
- Add more categories in blog form
- Implement image upload (currently URL only)
- Add rich text editor
- Add SEO fields

### Extending Pricing Features
- Add seasonal date ranges
- Implement availability calendar
- Add special offers/discounts
- Link to booking system

## Security Considerations

⚠️ **Important:**
- Change default admin password immediately
- Use strong passwords
- Keep Supabase keys secure
- Never commit `.env.local` to git
- Regularly backup database
- Monitor admin access logs

## Troubleshooting

### Can't log in to admin panel
- Check Supabase Auth is enabled
- Verify user exists in auth.users
- Check environment variables are set
- Look for errors in browser console

### Pricing not showing on frontend
- Check pricing entries are marked as `active`
- Verify Supabase connection
- Check browser console for errors
- Ensure RLS policies allow public read

### Language switching not working
- Verify LanguageProvider wraps app
- Check translations file structure
- Ensure useLanguage hook is used correctly
- Check browser console for errors
