# እነሆ እኛ - Admin Guide
## Simple Guide for Managing Your Website

---

## How to Login

1. Open your website and add `/admin` to the end of the URL.
2. Enter your admin **Username** and **Password**.
3. Click **Sign In**.

If you are logged in successfully, you will be redirected to the admin dashboard.

---

## Admin Dashboard Overview

The admin dashboard is used to manage the content that appears on your website.

Main sections (in the left sidebar):

| Section | URL | What it does |
|---|---|---|
| **Dashboard** | `/admin` | Shows quick stats and recent messages |
| **Messages** | `/admin/messages` | View contact form submissions and mark them as read |
| **Guests** | `/admin/guests` | Add/edit guest profiles and link each guest to a YouTube episode |
| **Partners** | `/admin/sponsors` | Add/edit sponsors/partners and program details + photo gallery |
| **Podcast** | `/admin/podcast` | Shows social links + YouTube setup instructions + episode preview |
| **Settings** | `/admin/settings` | Shows site settings UI and a checklist of environment variables |

Additional pages (available by URL, even if not shown in the sidebar):

| Section | URL | What it does |
|---|---|---|
| **Team** | `/admin/team` | Manage team member cards (doctors) |
| **Episodes** | `/admin/episodes` | Choose which YouTube videos appear as “Latest Episodes” on the website |
| **Updates** | `/admin/updates` | Post short “News & Updates” messages shown on the homepage |

---

## Important: What Gets Saved Permanently

Some admin content is saved in MongoDB (permanent), and some is “in-memory” (temporary).

To have permanent saving, you must set `MONGODB_URI` in your hosting environment (for example in Vercel).

| Content | Where it is stored |
|---|---|
| **Messages** | MongoDB if configured, otherwise temporary in-memory fallback |
| **Guests** | MongoDB |
| **Partners** | MongoDB |
| **Episodes (Featured Videos)** | MongoDB |
| **Updates** | MongoDB |
| **Team** | Temporary in-memory (resets on server restart/redeploy) |

---

## Managing Team Members (Doctors)

URL: `/admin/team`

You can add/edit/delete team members shown on the website.

Fields you can manage:

- **Full Name**
- **Credentials**
- **Role**
- **Specialties** (comma-separated)
- **Education** (one per line)
- **Experience**
- **Profile Image URL** (recommended: put the image in `/public` and use a path like `/dr-name.jpg`)
- **Social Media Links** (LinkedIn, X/Twitter, Facebook, Instagram, Website)

Note: Team changes are currently stored temporarily (in-memory). If you redeploy or restart the server, these changes may reset.

---

## Managing Guests

URL: `/admin/guests`

Guests are doctors/experts who appeared on your show.

Required fields:

- **Name (English)**
- **Profession**
- **Description**
- **Episode URL (YouTube)**

Optional fields:

- **Name (Amharic)**
- **Title** (Dr., Prof., etc.)
- **Episode Date**
- **Program Name**
- **Photo URL** (if empty, the system can use the YouTube thumbnail)
- **Gallery Photos** (multiple URLs)
- **Featured Guest** (to highlight)

Tips:

- If **Photo URL** is empty, the guest card will use the YouTube thumbnail from **Episode URL**.
- Use **Gallery Photos** for behind-the-scenes or additional images.

---

## Managing Partners (Sponsors)

URL: `/admin/sponsors`

Partners are organizations that sponsored or collaborated with your programs.

Common fields:

- **Organization Name**
- **Program Type** (Holiday / Regular / Charity / Special)
- **Program Name**
- **Logo URL**
- **Description**

Optional fields:

- **Name (Amharic)**
- **Website**
- **Program Date**
- **Episode URL** (YouTube link related to the program)
- **Program Photos (Gallery)**
- **Featured Partner**

---

## Managing Episodes (Latest Episodes on the Website)

URL: `/admin/episodes`

This page lets you control which videos appear on the site in “Latest Episodes”.

You can:

- Add a video by pasting a YouTube URL
- Add videos from the “Your YouTube Videos” list
- Choose a **Category**
- Toggle a video **Show/Hide** (active)
- Remove a video from the featured list

Notes:

- Guest episodes are managed in **Guests** (by setting each guest’s **Episode URL**).
- Holiday or sponsor program videos are managed in **Partners**.

---

## News & Updates

URL: `/admin/updates`

Use this page to post short update messages that appear on the website.

You can:

- Select an emoji
- Write an update (up to 150 characters)
- Post it
- Delete older updates

---

## Viewing Messages (Contact Form)

URL: `/admin/messages`

People who contact you through the website will appear here.

You can:

- Search by name/email/subject
- Filter by read/unread
- Click a message to view the full details
- Reply via email
- Delete messages

---

## Podcast & YouTube Integration

URL: `/admin/podcast`

This page provides:

- Social channel links
- YouTube setup instructions
- A preview list of YouTube episodes

Important:

- The “Save Configuration” button is currently a UI-only action.
- The website reads YouTube settings from environment variables:
  - `YOUTUBE_API_KEY`
  - `YOUTUBE_CHANNEL_ID`

If `YOUTUBE_API_KEY` is not set, the site falls back to the YouTube RSS feed.

---

## Settings

URL: `/admin/settings`

This page shows a settings UI and a checklist of environment variables.

Important:

- The “Save Changes” button is currently a UI-only action.
- To change admin login credentials, update environment variables:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `AUTH_SECRET`

Environment variables checklist (recommended for production):

| Variable | Required | Purpose |
|---|---:|---|
| `MONGODB_URI` | Yes | Stores guests/partners/episodes/updates/messages permanently |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `AUTH_SECRET` | Yes | Used to sign/validate admin session token |
| `YOUTUBE_CHANNEL_ID` | Recommended | Used for YouTube RSS fallback and YouTube API queries |
| `YOUTUBE_API_KEY` | Optional | If set, site uses YouTube Data API v3 (otherwise RSS fallback) |
| `TELEGRAM_BOT_TOKEN` | Optional | Sends Telegram notifications on new contact submissions |
| `TELEGRAM_CHAT_ID` | Optional | Telegram chat destination for notifications |

---

## How to Get Image URLs

Since the admin uses image URLs, here's how to get them:

### Option 1: Use Imgur (Free)
1. Go to [imgur.com](https://imgur.com)
2. Click **New Post**
3. Upload your image
4. Right-click the image → **Copy Image Address**
5. Paste in admin form

### Option 2: Use Google Drive
1. Upload image to Google Drive
2. Right-click → **Share** → **Anyone with link**
3. Copy the link
4. Change the URL format:
   - From: `https://drive.google.com/file/d/FILE_ID/view`
   - To: `https://drive.google.com/uc?id=FILE_ID`

### Option 3: Use ImgBB (Free)
1. Go to [imgbb.com](https://imgbb.com)
2. Upload your image
3. Copy the **Direct Link**

---

## 📺 Getting YouTube Video URLs

1. Go to YouTube
2. Open the video you want
3. Click **Share** button
4. Copy the URL (e.g., `https://youtu.be/VIDEO_ID`)

**Or** copy from the address bar:
`https://www.youtube.com/watch?v=VIDEO_ID`

---

## ✅ Best Practices

### For Images
- Use clear, high-quality photos
- Recommended size: 800x800 pixels for profiles
- Use JPG or PNG format

### For Guests
- Always add the YouTube episode URL - it creates a nice video thumbnail
- Add a good description to help visitors know about the guest
- Use the gallery for behind-the-scenes photos

### For Partners
- Add the logo for brand recognition
- Include the episode URL if there's a video
- Add program photos to show the collaboration

---

## ❓ Common Questions

### Q: The image is not showing?
**A:** Make sure:
- The URL ends with `.jpg`, `.png`, or `.webp`
- The link is publicly accessible
- Try opening the URL in a new browser tab to test

### Q: Video thumbnail not appearing?
**A:** Make sure:
- The YouTube URL is correct
- The video is public (not private or unlisted)

### Q: Changes not showing on website?
**A:** 
- Refresh the page (Ctrl+R or Cmd+R)
- Clear browser cache
- Wait a few seconds and try again

### Q: Guests/Partners/Episodes/Updates are not saving?
**A:** This usually means MongoDB is not connected.

- Ensure `MONGODB_URI` is set in Vercel (Project Settings → Environment Variables)
- Redeploy after setting environment variables

### Q: I can login locally but not on Vercel?
**A:** Make sure these are set in Vercel:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `AUTH_SECRET`

### Q: Forgot admin password?
**A:** Contact your website administrator to reset it.

---

## 📞 Need Help?

If you have any issues:
1. Check this guide first
2. Contact your website administrator
3. Email: [abrehamsam2023@gmail.com]

---

*Last Updated: December 2025*

