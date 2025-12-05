# Eneho Egna Portfolio - Complete Documentation

> **Last Updated:** December 2024  
> **Version:** 2.0.0  
> **Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, MongoDB

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [Pages & Routes](#6-pages--routes)
7. [Components](#7-components)
8. [API Routes](#8-api-routes)
9. [Styling System](#9-styling-system)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Doctor Profiles](#11-doctor-profiles)
12. [Content Management](#12-content-management)
13. [Deployment](#13-deployment)
14. [Troubleshooting](#14-troubleshooting)
15. [Future Improvements](#15-future-improvements)

---

## 1. Project Overview

**Eneho Egna** is a health media organization founded by three Ethiopian doctors. This website serves as their digital presence, showcasing:

- Team members and their profiles
- Their YouTube podcast
- Health education mission
- Contact form for inquiries

### Key Features
- ✅ Responsive design (mobile-first)
- ✅ Animated UI with Framer Motion
- ✅ Individual doctor profile pages with full CVs
- ✅ **Guest Portfolio** - Showcase previous guests with episode links
- ✅ **Partner Portfolio** - Highlight sponsors & holiday programs
- ✅ YouTube integration (auto-fetches latest episodes)
- ✅ Featured intro video (12-sec autoplay loop)
- ✅ Contact form with admin dashboard
- ✅ Simplified admin panel (Guests, Partners, Messages, Settings)

---

## 2. Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS styling |
| **Framer Motion** | Animations and transitions |
| **Lucide React** | Icon library |
| **MongoDB** | Database (via Mongoose) |
| **Node.js** | Runtime environment |

### Dependencies (package.json)
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "framer-motion": "^10.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x"
  }
}
```

---

## 3. Project Structure

```
Enho-Portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   ├── page.tsx             # Homepage (all sections)
│   ├── globals.css          # Global styles & utilities
│   │
│   ├── team/
│   │   └── [id]/
│   │       ├── page.tsx     # Doctor profile page wrapper
│   │       └── DoctorProfile.tsx  # Doctor profile component
│   │
│   ├── admin/               # Admin dashboard
│   │   ├── layout.tsx       # Admin layout (sidebar)
│   │   ├── page.tsx         # Dashboard overview
│   │   ├── login/
│   │   │   └── page.tsx     # Login page
│   │   ├── messages/
│   │   │   └── page.tsx     # Messages management
│   │   ├── guests/
│   │   │   └── page.tsx     # Guest portfolio management
│   │   ├── sponsors/
│   │   │   └── page.tsx     # Partner/Sponsor management
│   │   ├── podcast/
│   │   │   └── page.tsx     # Podcast settings
│   │   └── settings/
│   │       └── page.tsx     # Site settings
│   │
│   └── api/                 # API Routes
│       ├── contact/
│       │   └── route.ts     # Contact form handler
│       ├── youtube/
│       │   └── route.ts     # YouTube API integration
│       ├── messages/
│       │   ├── route.ts     # GET/POST messages
│       │   └── [id]/
│       │       └── route.ts # PATCH/DELETE single message
│       ├── team/
│       │   ├── route.ts     # GET/POST team members
│       │   └── [id]/
│       │       └── route.ts # PATCH/DELETE single member
│       ├── admin/
│       │   └── stats/
│       │       └── route.ts # Dashboard statistics
│       └── auth/
│           ├── login/
│           │   └── route.ts # Login handler
│           ├── logout/
│           │   └── route.ts # Logout handler
│           └── check/
│               └── route.ts # Auth validation
│
├── components/              # Reusable components
│   ├── Logo.tsx            # Site logo
│   ├── ContactForm.tsx     # Contact form component
│   └── PodcastEpisodes.tsx # YouTube episodes grid
│
├── lib/                     # Utilities & data
│   ├── doctors-data.ts     # Doctor profiles data
│   ├── auth.ts             # Authentication utilities
│   ├── db.ts               # Database operations (MongoDB + fallback)
│   ├── mongodb.ts          # MongoDB connection utility
│   └── models/
│       ├── Message.ts      # Message schema for MongoDB
│       ├── Guest.ts        # Guest portfolio schema
│       └── Sponsor.ts      # Partner/Sponsor schema
│
├── public/                  # Static assets
│   ├── logo.png            # Site logo
│   ├── team-photo.jpg      # Hero background
│   ├── dr-melat.jpg        # Dr. Melat's photo
│   ├── dr-tigist.jpg       # Dr. Tigist's photo
│   └── dr-birucketawit.jpg # Dr. Birucketawit's photo (if available)
│
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── .env.local              # Environment variables (create this)
```

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Enho-Portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Database (REQUIRED for persistent data)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eneho-egna?appName=cluster

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
AUTH_SECRET=your_random_secret_key

# YouTube API (optional - falls back to RSS feed)
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=UCyour_channel_id

# Telegram Notifications (optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### How to get these values:

**MongoDB Atlas (Free):**
1. Go to https://cloud.mongodb.com and create account
2. Create a free cluster (M0 Sandbox)
3. Go to **Database Access** → Add user with password
4. Go to **Network Access** → Allow access from anywhere (0.0.0.0/0)
5. Click **Connect** → **Drivers** → Copy connection string
6. Replace `<password>` with your password and add `/eneho-egna` before `?`

**YouTube API Key:**
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials → API Key

**Telegram Bot:**
1. Message @BotFather on Telegram
2. Create new bot with `/newbot`
3. Copy the token
4. Get your chat ID from @userinfobot

---

## 6. Pages & Routes

### Public Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage with all sections |
| `/team/[id]` | `app/team/[id]/page.tsx` | Individual doctor profile |

### Admin Pages

| Route | File | Description |
|-------|------|-------------|
| `/admin/login` | `app/admin/login/page.tsx` | Admin login |
| `/admin` | `app/admin/page.tsx` | Dashboard overview |
| `/admin/messages` | `app/admin/messages/page.tsx` | Contact messages |
| `/admin/guests` | `app/admin/guests/page.tsx` | **Guest portfolio** - Add guests with photos & episode links |
| `/admin/sponsors` | `app/admin/sponsors/page.tsx` | **Partners** - Manage sponsors, holiday programs |
| `/admin/podcast` | `app/admin/podcast/page.tsx` | YouTube settings |
| `/admin/settings` | `app/admin/settings/page.tsx` | Site settings |

---

## 7. Components

### `app/page.tsx` - Homepage Sections

The homepage is a single-page application with these sections:

```tsx
// Section order in app/page.tsx:
1. Navigation (About, Our Guests, Partners, Podcast + Contact button)
2. HeroSection (Full-screen with team photo)
3. AboutSection (Story + Mission statement)
4. TeamSection (Doctor cards with full photos)
5. PreviousGuestsSection (Guest portfolio from database)
6. ImpactSection (630+ trainees, 124+ medical services)
7. CertificatesSection (Recognitions & Yeti Pads partner)
8. PartnersSection (Sponsors from database)
9. ServicesSection (What they offer)
10. PodcastSection (Featured video + Latest episodes)
11. ContactSection (Form, social links)
12. Footer
```

### How to Edit Sections:

**To modify any section**, find the corresponding function in `app/page.tsx`:

```tsx
// Example: Edit the About section
function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      {/* Edit content here */}
    </section>
  )
}
```

### `components/Logo.tsx`
```tsx
// Displays the site logo
// To change logo: Replace /public/logo.png
<Logo className="w-10 h-10" />
```

### `components/ContactForm.tsx`
```tsx
// Handles contact form submission
// Sends data to /api/contact
// Displays success/error messages
```

### `components/PodcastEpisodes.tsx`
```tsx
// Fetches YouTube videos from /api/youtube
// Displays as a grid of episode cards
// Falls back to sample data if API fails
```

---

## 8. API Routes

### Contact Form API
**File:** `app/api/contact/route.ts`

```typescript
// POST /api/contact
// Saves message to database
// Optionally sends Telegram notification

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}

Response:
{ "success": true, "message": "Thank you..." }
```

### Messages API
**File:** `app/api/messages/route.ts`

```typescript
// GET /api/messages - Get all messages
// POST /api/messages - Create new message

// GET /api/messages/[id] - Get single message
// PATCH /api/messages/[id] - Update (mark as read)
// DELETE /api/messages/[id] - Delete message
```

### YouTube API
**File:** `app/api/youtube/route.ts`

```typescript
// GET /api/youtube
// Returns latest YouTube videos
// Priority: YouTube API → RSS Feed → Sample Data

Response:
{
  "videos": [
    {
      "id": "video_id",
      "title": "Episode Title",
      "thumbnail": "https://...",
      "publishedAt": "2024-01-01",
      "url": "https://youtube.com/watch?v=..."
    }
  ],
  "source": "youtube" | "rss" | "sample"
}
```

### Auth API
**Files:** `app/api/auth/login|logout|check/route.ts`

```typescript
// POST /api/auth/login - Authenticate admin
// POST /api/auth/logout - Clear session
// GET /api/auth/check - Validate session
```

---

## 9. Styling System

### Tailwind Configuration
**File:** `tailwind.config.js`

```javascript
// Custom colors defined:
colors: {
  primary: {
    50: '#f0f9ff',   // Lightest
    100: '#e0f2fe',
    // ...
    500: '#0ea5e9',  // Main brand color
    600: '#0284c7',
    // ...
    900: '#0c4a6e',  // Darkest
  },
  secondary: {
    // Gray scale for backgrounds
  }
}
```

### Global CSS Classes
**File:** `app/globals.css`

```css
/* Section padding (responsive) */
.section-padding {
  @apply py-16 md:py-24 lg:py-32;
}

/* Container with max-width */
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Card styling */
.card {
  @apply bg-white rounded-2xl shadow-lg border border-gray-100;
}

/* Gradient background */
.gradient-bg {
  @apply bg-gradient-to-br from-primary-500 to-primary-600;
}

/* Gradient text */
.gradient-text {
  @apply bg-gradient-to-r from-primary-600 to-primary-400 
         bg-clip-text text-transparent;
}
```

### Using Tailwind Classes

```tsx
// Example component with Tailwind
<div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-gray-600 mt-2">Description</p>
</div>
```

---

## 10. Admin Dashboard

### Authentication Flow

```
1. User visits /admin
2. Layout checks /api/auth/check
3. If not authenticated → Redirect to /admin/login
4. User enters credentials
5. POST /api/auth/login
6. Cookie set with token
7. Redirect to /admin
```

### Login Credentials
**Default:** (change in .env.local)
- Username: `admin`
- Password: `eneho2024`

### Admin Layout
**File:** `app/admin/layout.tsx`

- Sidebar navigation
- Mobile hamburger menu
- Auth check on every page
- Logout functionality

### Dashboard Stats
**File:** `app/admin/page.tsx`

- Fetches from `/api/admin/stats`
- Shows: Total messages, Unread, Team count
- Recent messages preview
- Quick links

### Messages Management
**File:** `app/admin/messages/page.tsx`

- View all contact form submissions
- Mark messages as read/unread
- Delete messages
- Filter by read/unread status
- Search by name, email, or subject

### Podcast & Social Media
**File:** `app/admin/podcast/page.tsx`

- View social media stats (YouTube, TikTok, Telegram, Facebook)
- YouTube API configuration instructions
- **Episode Preview**: Shows real YouTube videos from your channel
- Links to configure environment variables

---

## 10.5 Database

### MongoDB Integration
**Files:** `lib/mongodb.ts`, `lib/db.ts`, `lib/models/Message.ts`

The project uses MongoDB Atlas for persistent data storage:

```typescript
// Connection: lib/mongodb.ts
// - Connects to MongoDB using MONGODB_URI
// - Caches connection to avoid reconnecting

// Operations: lib/db.ts
// - getMessages() - Fetch all messages
// - addMessage() - Create new message
// - updateMessage() - Update message (mark as read)
// - deleteMessage() - Remove message
// - getStats() - Get dashboard statistics

// Model: lib/models/Message.ts
// - Mongoose schema for messages
// - Fields: name, email, subject, message, date, read
```

### Fallback Behavior
If `MONGODB_URI` is not set:
- Uses in-memory storage (data lost on restart)
- Useful for local development without MongoDB

### Verifying Connection
Check terminal for:
```
✅ Connected to MongoDB
```
Or check admin dashboard → Platform Status → Database

---

## 11. Doctor Profiles

### Data Source
**File:** `lib/doctors-data.ts`

```typescript
// Doctor interface
interface Doctor {
  id: string           // URL slug (e.g., "dr-melat")
  name: string         // Full name
  credentials: string  // MD, MPH, etc.
  specialty: string    // Main specialty
  tagline: string      // Short description
  image: string | null // Photo path
  about: string[]      // Bio paragraphs
  experience: Experience[]
  education: Education[]
  skills: string[]
  certifications: string[]
  languages: string[]
  volunteerWork: VolunteerWork[]
  contact: ContactInfo
}

// To add a new doctor:
// 1. Add entry to `doctors` array in lib/doctors-data.ts
// 2. Add photo to /public/
// 3. Doctor page auto-generates at /team/[id]
```

### Current Doctors

| ID | Name | Color Theme |
|----|------|-------------|
| `dr-melat` | Dr. Melat Mesfin | Violet/Purple |
| `dr-tigist` | Dr. Tigist Kahsay | Rose/Pink |
| `dr-birucketawit` | Dr. Birucketawit Alebachew | Teal/Cyan |

### Doctor Profile Page
**File:** `app/team/[id]/DoctorProfile.tsx`

Sections:
1. Hero (photo, name, credentials)
2. About
3. Experience (timeline)
4. Education
5. Volunteer Work
6. Sidebar (Skills, Certifications, Languages)
7. Contact CTA
8. Footer

### Adding a New Doctor

```typescript
// In lib/doctors-data.ts, add to the doctors array:

{
  id: 'dr-newdoctor',
  name: 'Dr. New Doctor',
  credentials: 'MD, PhD',
  specialty: 'Specialty Here',
  tagline: 'Short tagline',
  image: '/dr-newdoctor.jpg', // Add photo to /public/
  about: [
    'First paragraph...',
    'Second paragraph...'
  ],
  experience: [
    {
      title: 'Job Title',
      organization: 'Organization Name',
      period: '2020 - Present',
      description: 'Description...'
    }
  ],
  education: [
    {
      degree: 'MD - Doctor of Medicine',
      institution: 'University Name',
      year: '2020'
    }
  ],
  skills: ['Skill 1', 'Skill 2'],
  certifications: ['Cert 1', 'Cert 2'],
  languages: ['English', 'Amharic'],
  volunteerWork: [],
  contact: {
    email: 'email@example.com'
  }
}
```

---

## 12. Content Management

### Updating Text Content

| Content | File Location |
|---------|---------------|
| Hero text | `app/page.tsx` → HeroSection |
| About section | `app/page.tsx` → AboutSection |
| Services | `app/page.tsx` → ServicesSection |
| Impact stats | `app/page.tsx` → ImpactSection |
| Footer | `app/page.tsx` → Footer |
| Doctor profiles | `lib/doctors-data.ts` |

### Updating Images

| Image | Location | Size Recommendation |
|-------|----------|---------------------|
| Logo | `/public/logo.png` | 200x200px |
| Team photo (hero) | `/public/team-photo.jpg` | 1920x1080px |
| Doctor photos | `/public/dr-name.jpg` | 600x600px |

### Adding YouTube Videos

Videos are fetched automatically from the YouTube channel. To change the channel:

```env
# In .env.local
YOUTUBE_CHANNEL_ID=UC_your_channel_id
```

---

## 13. Deployment

### Vercel (Recommended)

```bash
# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

### Setting Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Add each variable:

| Variable | Value | Required |
|----------|-------|----------|
| `MONGODB_URI` | Your MongoDB connection string | ✅ Yes |
| `ADMIN_USERNAME` | Admin login username | ✅ Yes |
| `ADMIN_PASSWORD` | Admin login password | ✅ Yes |
| `AUTH_SECRET` | Random secret for auth tokens | ✅ Yes |
| `YOUTUBE_API_KEY` | YouTube Data API key | Optional |
| `YOUTUBE_CHANNEL_ID` | Your channel ID | Optional |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | Optional |
| `TELEGRAM_CHAT_ID` | Telegram chat ID | Optional |

4. Click **Save** and redeploy

### Redeploying After Changes

```bash
# Make local changes, then:
npx vercel --prod
```

### Manual Deployment

```bash
# Build
npm run build

# The output is in .next/
# Deploy .next/, public/, package.json, node_modules/
```

### Environment Variables for Production

Set these in your hosting provider:

```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=strong_password_here
AUTH_SECRET=random_32_char_string
YOUTUBE_API_KEY=your_api_key
```

### Important Notes

1. **Static Export Disabled:** The site uses API routes, so static export (`output: 'export'`) is NOT enabled.

2. **Server Required:** Needs Node.js server (Vercel, Railway, Render, etc.)

3. **Database:** Currently uses in-memory storage. For production persistence, integrate:
   - MongoDB Atlas
   - Vercel Postgres
   - Supabase
   - PlanetScale

---

## 14. Troubleshooting

### Common Issues

**1. Admin keeps logging out**
- **Cause:** Hot-reload clears sessions
- **Fix:** Already fixed with self-validating tokens

**2. YouTube videos not loading**
- **Cause:** No API key or quota exceeded
- **Fix:** Videos fall back to RSS feed automatically

**3. Contact form not working**
- **Check:** Console for errors
- **Check:** API route `/api/contact`

**4. Styles not applying**
- **Run:** `npm run dev` (not just refresh)
- **Check:** Tailwind classes are correct

**5. Doctor page 404**
- **Check:** Doctor ID in URL matches `id` in `doctors-data.ts`

### Debug Mode

Add to any component:
```tsx
console.log('Debug:', variableName)
```

Check browser DevTools → Console

### Reset Everything

```bash
# Delete build cache
rm -rf .next
rm -rf node_modules

# Reinstall
npm install

# Restart
npm run dev
```

---

## 15. Future Improvements

### Completed ✅

1. **Database Integration** ✅
   - MongoDB Atlas integration via Mongoose
   - Messages persist across deployments
   - Falls back to in-memory if MongoDB unavailable

### Recommended Enhancements

1. **Image Upload**
   - Add Cloudinary or AWS S3 integration
   - Allow uploading doctor photos from admin

2. **Rich Text Editor**
   - Add TipTap or Slate for content editing
   - WYSIWYG for doctor bios

3. **Email Notifications**
   - SendGrid or Resend for contact form
   - Email confirmation to submitters

4. **Analytics**
   - Google Analytics or Plausible
   - Track page views, form submissions

5. **SEO**
   - Add meta descriptions to all pages
   - Generate sitemap.xml
   - Add Open Graph images

6. **Performance**
   - Image optimization with next/image
   - Lazy loading for below-fold content

7. **Team Members in Database**
   - Move team data from `lib/doctors-data.ts` to MongoDB
   - Allow editing team members from admin panel

---

## Quick Reference

### File Locations Cheat Sheet

| Need to change... | Edit this file |
|-------------------|----------------|
| Homepage content | `app/page.tsx` |
| Doctor info | `lib/doctors-data.ts` |
| Doctor page design | `app/team/[id]/DoctorProfile.tsx` |
| Colors/theme | `tailwind.config.js` |
| Global styles | `app/globals.css` |
| Site metadata | `app/layout.tsx` |
| Admin credentials | `.env.local` |
| Logo | `/public/logo.png` |
| Contact form logic | `components/ContactForm.tsx` |
| YouTube settings | `app/api/youtube/route.ts` |
| Database connection | `lib/mongodb.ts` |
| Message schema | `lib/models/Message.ts` |
| Database operations | `lib/db.ts` |
| Admin podcast page | `app/admin/podcast/page.tsx` |

### Common Commands

```bash
npm run dev      # Start development
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check for errors
```

---

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check Next.js docs: https://nextjs.org/docs
4. Check Tailwind docs: https://tailwindcss.com/docs

---

*Documentation generated for Eneho Egna Portfolio v1.0.0*
