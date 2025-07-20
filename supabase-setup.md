# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Click "New Project"
4. Choose your organization
5. Fill in your project details:
   - Name: `awaken-her-power` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the closest to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" → "API"
3. Copy the following values:
   - Project URL
   - `anon` `public` API key

## 3. Set Up Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Create Database Tables

Go to the SQL Editor in your Supabase dashboard and run this SQL:

```sql
-- Create the pages table
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on slug for faster queries
CREATE INDEX pages_slug_idx ON pages(slug);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Allow everyone to read pages (for public website)
CREATE POLICY "Allow public read access" ON pages
  FOR SELECT USING (true);

-- Allow authenticated admin users to insert/update pages
CREATE POLICY "Allow admin insert" ON pages
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'email' = 'admin@awakenherpower.com' OR
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );

CREATE POLICY "Allow admin update" ON pages
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = 'admin@awakenherpower.com' OR
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );

-- Insert default content for all pages
INSERT INTO pages (slug, content) VALUES
('home', '{
  "hero": {
    "title": "Awaken Her Power",
    "subtitle": "Within",
    "description": "Embrace your feminine strength, align with your deepest truth, and create a life that flows with purpose and joy.",
    "buttonText": "Start Your Journey",
    "backgroundImage": "/assets/hero_woman_spa.jpg"
  },
  "pillars": {
    "title": "The Three Pillars",
    "subtitle": "A holistic approach to awakening your feminine power through emotional wellness, career alignment, and authentic self-expression.",
    "pillar1": {
      "title": "Emotional Wellness",
      "description": "Heal deep wounds, release limiting beliefs, and cultivate emotional intelligence that serves your highest self.",
      "image": "/assets/pillar_emotion.jpg"
    },
    "pillar2": {
      "title": "Career Alignment",
      "description": "Discover your soul''s calling and create a career path that honors both your ambitions and your values.",
      "image": "/assets/pillar_career.jpg"
    },
    "pillar3": {
      "title": "Feminine Power Activation",
      "description": "Embrace your intuition, creativity, and natural cycles to live in harmony with your feminine essence.",
      "image": "/assets/pillar_feminine.jpg"
    }
  },
  "quote": {
    "text": "The most powerful thing you can do is to begin to honor the woman you''re becoming while loving the woman you''ve been.",
    "author": "— Your journey starts with self-compassion",
    "backgroundImage": "/assets/bubblebath_reflection.jpg"
  },
  "testimonials": {
    "title": "Transformation Stories",
    "subtitle": "Real women, real breakthroughs, real power awakened.",
    "testimonials": [
      {
        "name": "Sarah Martinez",
        "text": "Working with this coach transformed how I see myself. I finally feel aligned with my true purpose and confident in my feminine power.",
        "role": "Marketing Director"
      },
      {
        "name": "Amara Johnson",
        "text": "The deep inner work we did together helped me break through patterns that were holding me back. I''m living authentically now.",
        "role": "Entrepreneur"
      },
      {
        "name": "Elena Rodriguez",
        "text": "I discovered strength I didn''t know I had. This journey awakened something beautiful within me that I''m still exploring.",
        "role": "Creative Director"
      }
    ]
  },
  "cta": {
    "title": "Take the First Step",
    "description": "Your transformation begins with a single conversation. Let''s talk about where you are and where you want to be.",
    "buttonText": "Book Your Clarity Session"
  }
}'),
('about', '{
  "hero": {
    "title": "About",
    "subtitle": "Your Journey to Authentic Power",
    "description": "Learn more about our approach to feminine empowerment and transformation."
  },
  "content": "Welcome to a space where your feminine power is not just acknowledged but celebrated and cultivated. Here, we believe that every woman carries within her an innate wisdom, strength, and creative force that, when awakened, can transform not only her own life but the world around her."
}'),
('services', '{
  "hero": {
    "title": "Services",
    "subtitle": "Transformational Coaching Programs",
    "description": "Discover our comprehensive programs designed to awaken your feminine power."
  },
  "content": "Our services are designed to meet you wherever you are on your journey of self-discovery and empowerment.",
  "service1": {
    "title": "Individual Coaching",
    "description": "One-on-one coaching sessions tailored to your unique journey and goals."
  }
}'),
('transform', '{
  "hero": {
    "title": "Transform",
    "subtitle": "Your Transformation Awaits",
    "description": "Begin your journey of self-discovery and empowerment."
  },
  "content": "Transformation is not about becoming someone else; it''s about becoming who you truly are."
}'),
('contact', '{
  "hero": {
    "title": "Contact",
    "subtitle": "Let''s Connect",
    "description": "Ready to begin your transformation? Reach out and let''s start the conversation."
  },
  "content": "We would love to hear from you and learn more about your journey.",
  "email": "hello@awakenherpower.com",
  "phone": "(555) 123-4567",
  "address": "123 Wellness Way\nTransformation City, TC 12345"
}')
ON CONFLICT (slug) DO NOTHING;
```

## 5. Set Up Storage for Images

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `images`
3. Make the bucket public by going to bucket settings and enabling "Public bucket"
4. Set up the following RLS policies for the images bucket:

```sql
-- Allow public access to view images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated admin users to upload images
CREATE POLICY "Admin can upload images" ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  (auth.jwt() ->> 'email' = 'admin@awakenherpower.com' OR
   auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Allow authenticated admin users to delete images
CREATE POLICY "Admin can delete images" ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' AND
  (auth.jwt() ->> 'email' = 'admin@awakenherpower.com' OR
   auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);
```

## 6. Create Admin User

1. Go to Authentication → Users in your Supabase dashboard
2. Click "Add user"
3. Enter:
   - Email: `admin@awakenherpower.com` (or your preferred admin email)
   - Password: Create a strong password
   - Email Confirm: Check this to auto-confirm
4. Click "Create user"

## 7. Enable Realtime (Optional)

If you want real-time updates when content changes:

1. Go to Database → Replication in your Supabase dashboard
2. Enable replication for the `pages` table

## 8. Test Your Setup

1. Start your development server: `npm run dev`
2. Visit `/admin/home` in your browser
3. Log in with your admin credentials
4. Try editing some content and saving
5. Check that changes appear on the public website immediately

## Security Notes

- The admin email is currently hardcoded as `admin@awakenherpower.com`. You can change this in:
  - `src/contexts/AuthContext.tsx` (line with `isAdmin` calculation)
  - The RLS policies in your database
- Make sure to use strong passwords for your admin account
- Consider setting up additional security measures like MFA for production use
- The `anon` key is safe to expose in your frontend as it has limited permissions

## Deployment Notes

When deploying to production:

1. Make sure your environment variables are set in your hosting platform
2. Update the admin email in your code and database policies
3. Consider using a custom domain for your Supabase project
4. Enable additional security features like email confirmations
