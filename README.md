# EcoTrack — Sustainable Living Community

**Live site:** [https://neon-zabaione-e08eb0.netlify.app/](https://neon-zabaione-e08eb0.netlify.app/)

EcoTrack is a community platform where people discover sustainability challenges, share eco-tips, browse green events, and track personal environmental impact. This repository is a **monorepo-style workspace** with separate client and server folders (submit each to GitHub separately if your course requires two repos).

| Folder | Role |
|--------|------|
| `EcoTrack-Client/` | React (Vite) SPA — Netlify-friendly with `public/_redirects` |
| `EcoTrack-Server/` | Express API — MongoDB native driver, deployable on Vercel |

---

## Key features

- **Challenges** — List, filter, detail, create (auth), join (auth), progress in **user challenges**
- **Home** — Stats, challenges, tips, events; static “Why go green” / “How it works”
- **Auth** — Firebase Email/Password + Google; JWT from `/api/auth/token` for protected API calls
- **UX** — Toasts, skeletons, error boundary, 404 page

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Client | React 19, Vite, React Router 7, Tailwind, Firebase Auth, Axios, react-hot-toast |
| Server | Node.js, Express, MongoDB driver, JWT, CORS |
| DB | MongoDB Atlas (or compatible) |

---

## Environment variables

- **Client:** copy `EcoTrack-Client/.env.example` → `.env` (see file for `VITE_*` keys).
- **Server:** copy `EcoTrack-Server/.env.example` → `.env` — use `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.

Never commit real `.env` files. Use `.env.example` only as a template.

---

## Local development

### Client

```bash
cd EcoTrack-Client
npm install
npm run dev
```

### Server

```bash
cd EcoTrack-Server
npm install
npm run dev
```

Default API: `http://localhost:5000` — set `VITE_API_BASE_URL=http://localhost:5000/api` in the client `.env` for local testing.

---

## Protected client routes

Unauthenticated users are sent to `/login` and return to the intended URL after sign-in:

- `/challenges/add`, `/challenges/join/:id`
- `/my-activities`, `/my-activities/:id`
- `/profile`, `/update-profile`

Legacy paths (e.g. `/Leaderboard`, `/EcoTips`) redirect to **kebab-case** canonical URLs.

---

## API (summary)

| Area | Base path |
|------|-----------|
| Challenges | `/api/challenges` |
| User progress | `/api/user-challenges` |
| Tips | `/api/tips` |
| Events | `/api/events` |
| Stats | `/api/stats` |
| Auth token | `POST /api/auth/token` |

Details: `EcoTrack-Server/README.md`.

---

## License

© 2025 EcoTrack.
