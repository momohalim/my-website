# Admin Panel System - Setup & Usage Guide

## 🚀 Quick Start

This project now includes a complete admin panel system that allows you to manage all website content dynamically. The system is built with:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Real-time**: Live content updates via Supabase Realtime

## 🎯 Current Status

**The application is currently running in DEMO MODE** with default content because Supabase is not configured.

### Demo Mode Features:

- ✅ Website displays with default content
- ✅ All UI components work correctly
- ❌ Admin panel requires Supabase setup
- ❌ Content changes won't persist
- ❌ Image uploads won't work

## 🔧 Setup Instructions

### 1. Configure Supabase

Follow the detailed instructions in `supabase-setup.md` to:

1. Create a Supabase project
2. Set up the database schema
3. Configure authentication
4. Set up image storage

### 2. Update Environment Variables

Replace the values in `.env`:

```env
VITE_SUPABASE_URL=your_actual_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

### 3. Test the System

1. Restart your development server: `npm run dev`
2. Visit `/admin/home` to access the admin panel
3. Log in with your admin credentials
4. Start editing content!

## 📱 How to Use the Admin Panel

### Accessing the Admin Panel

- URL: `http://localhost:8080/admin/home`
- Login with the admin account you created in Supabase

### Managing Content

#### Home Page (`/admin/home`)

- **Hero Section**: Main banner with title, subtitle, description, and background image
- **Three Pillars**: Core service pillars with individual titles, descriptions, and images
- **Quote Section**: Inspirational quote with background image
- **Testimonials**: Client testimonials with names, roles, and testimonial text
- **Call to Action**: Final section with title, description, and button text

#### Other Pages (`/admin/about`, `/admin/services`, etc.)

- **Hero Section**: Page-specific banner content
- **Main Content**: Rich text content for the page body
- **Page-specific Fields**: Custom fields based on page type

### Image Management

- **Upload**: Drag & drop or click to upload images
- **Preview**: See images before saving
- **CDN**: All images served via Supabase CDN
- **Formats**: Supports PNG, JPG, GIF (max 5MB)

### Content Saving

- **Auto-save**: Changes can be saved manually with the "Save" button
- **Real-time**: Changes appear on the live website immediately
- **Validation**: Form validation ensures content integrity

## 🔒 Security Features

- **Authentication**: Secure login via Supabase Auth
- **Authorization**: Only admin users can edit content
- **Row-Level Security**: Database-level protection
- **Protected Routes**: Admin panel requires authentication

## 🌐 Live Website Features

- **Dynamic Content**: All content loaded from database
- **Real-time Updates**: Changes appear instantly
- **Fallback Content**: Default content if database unavailable
- **Responsive Design**: Works on all devices

## 🐛 Troubleshooting

### "Demo Mode" Banner Appears

- This means Supabase isn't configured
- Follow the setup instructions in `supabase-setup.md`
- Update your `.env` file with real credentials

### "Error fetching content" Message

- Check your Supabase project is active
- Verify environment variables are correct
- Ensure database tables exist (run the SQL from setup guide)

### Admin Login Fails

- Verify the admin user exists in Supabase
- Check the email in `AuthContext.tsx` matches your admin user
- Ensure Row Level Security policies are set up correctly

### Images Won't Upload

- Check the `images` bucket exists in Supabase Storage
- Verify storage policies are configured
- Ensure bucket is set to public

## 📁 File Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx       # Admin panel layout
│   │   ├── AdminLogin.tsx        # Login component
│   │   ├── ImageUpload.tsx       # Image upload component
│   │   └── ProtectedRoute.tsx    # Route protection
│   └── ConfigurationBanner.tsx   # Demo mode banner
├── contexts/
│   └── AuthContext.tsx           # Authentication context
├── hooks/
│   └── useContent.ts             # Content management hooks
├── lib/
│   └── supabase.ts               # Supabase client config
├── pages/
│   ├── admin/
│   │   ├── AdminHome.tsx         # Home page editor
│   │   └── AdminPageEditor.tsx   # Generic page editor
│   └── DynamicHome.tsx           # Dynamic home page
└── ...
```

## 🚀 Deployment

The system is ready for deployment to:

- **Vercel** (recommended)
- **Netlify**
- **Any React hosting platform**

### Deployment Checklist:

1. ✅ Configure Supabase project
2. ✅ Set environment variables in hosting platform
3. ✅ Update admin email in code and database
4. ✅ Test admin panel functionality
5. ✅ Verify real-time updates work

## 🎨 Customization

### Adding New Content Sections

1. Update the page content schema in `useContent.ts`
2. Add form fields in the admin components
3. Update the public page components to display new content

### Styling Changes

- Admin panel uses the same Tailwind theme as the main site
- Modify `tailwind.config.ts` for global theme changes
- Component-specific styles in individual files

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify Supabase dashboard for database/auth issues
3. Review the setup instructions in `supabase-setup.md`
4. Ensure all environment variables are correctly set

---

**Ready to get started?** Follow the setup instructions in `supabase-setup.md` to activate the full admin system!
