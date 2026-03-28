# EcoTrack — Sustainable Living Community

**Live Site:** https://your-ecotrack.netlify.app

EcoTrack is a community platform for eco-conscious people to discover and join sustainability challenges, share practical eco-EcoTips, explore local green events, and track their personal environmental impact. The focus is on measurable, community-driven progress that encourages real-world habit change.

## Project Overview

EcoTrack brings together people who want to live more sustainably. Users can join challenges (e.g., Plastic-Free July, Energy Saving Week), log their progress, share EcoTips with the community, and see how their actions contribute to collective impact metrics like total CO₂ saved and kilograms of plastic reduced.

## Key Features

- **Sustainability Challenges**
  - Browse 4–6 active challenges on the home page with title, category, target metric, and image
  - View full challenge details
  - Join a challenge and update your progress percentage

- **Community EcoTips**
  - Latest 5 EcoTips displayed on the home page (title, author name, upvotes, date)
  - Create your own EcoTips with category and content

- **Green Events**
  - Upcoming 4 events with title, date, location, and short description

- **Personal Impact Dashboard**
  - See all challenges you’ve joined
  - Update progress and view status (Not Started / Ongoing / Finished)

- **Authentication**
  - Email & password registration with password strength validation
  - Google sign-in via Firebase Auth
  - Protected routes redirect to `/user` and return you to the intended page after sign-in
  - Forgot password link (route included; flow optional)

- **Live Statistics**
  - Community-wide aggregates (e.g., total CO₂ saved, total plastic reduced)

## Tech Stack

**Client**

- React + React Router
- Firebase Authentication
- Tailwind CSS
- React Toastify (styled toast notifications)

**Server**

- Node.js + Express
- MongoDB + Mongoose
- CORS, dotenv

**Hosting**

- Client: Netlify / Surge / Firebase
- Server: Vercel

## Assignment Requirements Met

✓ **Git Commits**

- Client side: 15+ notable commits
- Server side: 8+ notable commits

✓ **README**

- Meaningful README with project name and live site URL
- 5+ bullet points highlighting features

✓ **No Lorem Ipsum**

- All copy is original; no default `alert()` — all feedback uses styled toasts

✓ **Deployment**

- SPA hosting with proper 404 fallback so page refresh on any route works
- Domain added to Firebase authorized domains (if using Netlify/Surge)
- Authenticated users stay on protected routes after reload

## Layout Structure

**Header**

- Left: Logo + “EcoTrack”
- Center: Home | Challenges | My Activities
- Right:
  - Not logged in → Login | Register
  - Logged in → Avatar + Name → Profile | My Activities | Logout
- Mobile: Hamburger menu

**Footer**

- © 2025 EcoTrack
- Quick links: About, Contact
- Social media icons (X, Facebook, Instagram)
- Accessibility & PrivacyPolicy note

**Layouts**

- Public Layout: Home, Challenges listing
- Dashboard Layout (protected): My Activities, Profile

## Home Page Sections

**Dynamic**

1. Hero Banner — featured challenge carousel with “View Challenge” CTA
2. Live Statistics — community totals from the database
3. Active Challenges — 4–6 challenge cards
4. Recent EcoTips — latest 5 community EcoTips
5. Upcoming Events — 4 upcoming events

**Static**

- Why Go Green? — concise benefits of sustainable living
- How It Works — 3 steps: Join a challenge → Track progress → Share EcoTips

## API Endpoints (Server)

**Challenges**

- `GET /api/challenges` — list with optional filters
  - `category` → `$in`
  - `startDate` → `$gte`
  - `endDate` → `$lte`
  - `participants` → `$gte` / `$lte`
- `GET /api/challenges/:id`
- `POST /api/challenges` (protected)
- `PATCH /api/challenges/:id` (owner/admin)
- `DELETE /api/challenges/:id` (owner/admin)
- `POST /api/challenges/join/:id` (protected) — increments `participants` and creates a `userChallenges` record

**UserChallenges**

- Tracks each user’s `status`, `progress`, and `joinDate`

**EcoTips**

- `GET /api/EcoTips` → latest EcoTips for home page

**Events**

- `GET /api/events` → upcoming events for home page

## Database Collections

**challenges**
