# 🌿 EcoTrack — Sustainable Living Community

**Live Site:** [https://ecotrack-app.netlify.app](https://ecotrack-app.netlify.app)

EcoTrack is a community-driven platform where eco-conscious individuals discover and join sustainability challenges, share practical eco-tips, explore local green events, and track their personal environmental impact — all focused on measurable, community-driven progress toward a greener planet.

---

## ✨ Key Features

- 🏆 **Sustainability Challenges** — Browse, join, and track progress on real-world eco challenges (e.g., Plastic-Free July, 30-Day Cycling Commute). Each challenge shows live participant counts, categories, duration, and impact metrics.

- 📊 **Personal Impact Dashboard** — Authenticated users get a private activity dashboard to monitor joined challenges, update progress percentage, and visualize their environmental contribution over time.

- 💡 **Community Eco-Tips** — Users can browse the latest community-submitted sustainability tips with upvote counts, author info, and categories — dynamically fetched from the database and displayed on the home page.

- 📅 **Local Green Events** — Discover upcoming environmental events (location, date, description, organizer) pulled live from the database, keeping the community connected and engaged.

- 🔍 **Advanced Challenge Filtering** — Filter challenges by category (using MongoDB `$in`), date range (`$gte`/`$lte` on startDate/endDate), and participant count range — enabling precise discovery of relevant challenges.

---

## 🛠️ Tech Stack

| Layer            | Technology                                        |
| ---------------- | ------------------------------------------------- |
| Frontend         | React, React Router, TailwindCSS                  |
| Auth             | Firebase Authentication (Email/Password + Google) |
| Backend          | Node.js, Express.js                               |
| Database         | MongoDB (Atlas)                                   |
| Hosting (Client) | Netlify                                           |
| Hosting (Server) | Vercel                                            |

---

## 📦 NPM Packages Used

- `react-router-dom` — Client-side routing & protected routes
- `firebase` — Authentication (Email/Password + Google OAuth)
- `axios` — HTTP requests to the Express API
- `react-hot-toast` — Styled toast notifications (no `alert()`)
- `react-icons` — Icon library (including X/Twitter logo)
- `swiper` — Hero banner carousel for featured challenges
- `react-loading-skeleton` — Skeleton loaders for card lists

---

## 🔐 Environment Variables

Create a `.env` file in the client root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=https://your-server.vercel.app
```

Create a `.env` file in the server root:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

---

## 🚀 Getting Started (Local Development)

### Client

```bash
git clone https://github.com/yourusername/ecotrack-client.git
cd ecotrack-client
npm install
npm run dev
```

### Server

```bash
git clone https://github.com/yourusername/ecotrack-server.git
cd ecotrack-server
npm install
node index.js
```

---

## 📁 Project Structure (Client)

```
src/
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ChallengeCard.jsx
│   └── SkeletonLoader.jsx
├── contexts/
│   └── AuthContext.jsx
├── hooks/
│   └── useAuth.js
├── layouts/
│   ├── MainLayout.jsx
│   └── DashboardLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Challenges.jsx
│   ├── ChallengeDetail.jsx
│   ├── AddChallenge.jsx
│   ├── MyActivities.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ForgotPassword.jsx
│   └── NotFound.jsx
├── routes/
│   └── PrivateRoute.jsx
└── main.jsx
```

---

## 🔒 Protected Routes

The following routes require authentication. Unauthenticated users are redirected to `/login` and returned to their intended route after successful login:

- `/challenges/add`
- `/challenges/join/:id`
- `/my-activities`
- `/my-activities/:id`

---

## 🌍 API Endpoints (Server)

| Method | Endpoint                   | Description                        |
| ------ | -------------------------- | ---------------------------------- |
| GET    | `/api/challenges`          | List all challenges (with filters) |
| GET    | `/api/challenges/:id`      | Get challenge details              |
| POST   | `/api/challenges`          | Create a new challenge             |
| PATCH  | `/api/challenges/:id`      | Update a challenge                 |
| DELETE | `/api/challenges/:id`      | Delete a challenge                 |
| POST   | `/api/challenges/join/:id` | Join a challenge                   |
| GET    | `/api/tips`                | Get latest community tips          |
| GET    | `/api/events`              | Get upcoming events                |
| GET    | `/api/user-challenges`     | Get user's joined challenges       |
| PATCH  | `/api/user-challenges/:id` | Update progress on a challenge     |

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

---

## 📄 License

© 2025 EcoTrack. All rights reserved.
