# Eneho Egna Portfolio

A modern, responsive portfolio website for **እነሆ እኛ (Eneho Egna)** - a health media organization founded by three Ethiopian female doctors, bridging traditional Ethiopian medicine with modern science.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

- **Portfolio Sections**: About, Guests, Partners, Podcast, Contact
- **Guest Portfolio**: Showcase previous guests with photos & episode links
- **Partners/Sponsors Portfolio**: Highlight collaborators & holiday programs
- **Auto YouTube Integration**: Latest episodes fetched automatically
- **Admin Dashboard**: Manage guests, partners, messages, and settings
- **Individual Doctor Profiles**: Full CV pages for each team member
- **Responsive Design**: Mobile-first with beautiful animations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Key Files

| Purpose | File |
|---------|------|
| Homepage | `app/page.tsx` |
| Doctor profiles | `lib/doctors-data.ts` |
| Guest model | `lib/models/Guest.ts` |
| Sponsor model | `lib/models/Sponsor.ts` |
| Admin pages | `app/admin/` |

## 🔐 Admin Access

**URL:** `/admin`

**Default credentials:**
- Username: `admin`
- Password: `eneho2024`

### Admin Sections:
| Section | Purpose |
|---------|---------|
| Dashboard | Overview & stats |
| Messages | Contact form submissions |
| Guests | Manage guest profiles & episode links |
| Partners | Manage sponsors & program details |
| Podcast | YouTube channel settings |
| Settings | Site configuration |

## 🖼️ Team Photos

Place doctor photos in `/public/`:
- `dr-melat.jpg`
- `dr-tigist.jpg`
- `dr-birucketawit.jpg` (if available)

## 📖 Full Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for complete details.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** MongoDB Atlas
- **Icons:** Lucide React

## 🌐 Navigation

| Menu | Links To |
|------|----------|
| About | About section |
| Our Guests | Guest portfolio |
| Partners | Partner/sponsor portfolio |
| Podcast | Podcast section with auto-playing intro video |
| Contact Us | Contact form |

## 📝 License

Private - Eneho Egna © 2024
