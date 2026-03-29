# EcoTrack API (Server)

Express + MongoDB (native driver) backend for **EcoTrack — Sustainable Living Community**.

## Features

- REST API for **challenges**, **user challenges** (progress), **tips**, **events**, and **community stats**
- **Advanced filtering** on `GET /api/challenges` using MongoDB operators (`$in`, `$gte`, `$lte`)
- **JWT-protected** mutating routes where required
- **Token issuance** for the SPA after Firebase login (see Auth below)
- Centralized error handling

## Environment variables

Copy [`.env.example`](./.env.example) to `.env` and set:

| Variable | Purpose |
|----------|---------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs (use a long random value in production) |
| `CLIENT_URL` | Comma-separated allowed CORS origins (your Netlify URL + local dev) |
| `PORT` | Listen port (default `5000`) |

## Run locally

```bash
npm install
npm run dev
```

Or:

```bash
npm start
```

## Deploy (Vercel)

`vercel.json` routes all traffic to `server.js`. Set environment variables in the Vercel project dashboard.

## API overview

### Auth

| Method | Path | Auth | Description |
|--------|------|------|---------------|
| `POST` | `/api/auth/token` | No | Issues a short-lived JWT for the SPA. Body: `{ "email", "userId", "name" }`. The client calls this after Firebase sign-in so `Authorization: Bearer …` works on protected routes. |

**Production hardening:** For a real production system you would verify a Firebase ID token (or session) on this endpoint instead of trusting the request body. The assignment allows a simpler flow; keep secrets in `.env` only.

### Challenges

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/api/challenges` | No |
| `GET` | `/api/challenges/:id` | No |
| `POST` | `/api/challenges` | Yes |
| `PATCH` | `/api/challenges/:id` | Yes (owner) |
| `PUT` | `/api/challenges/:id` | Yes (owner) — alias of PATCH |
| `DELETE` | `/api/challenges/:id` | Yes (owner) |
| `POST` | `/api/challenges/join/:id` | Yes |

### User challenges

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/api/user-challenges` | Yes |
| `GET` | `/api/user-challenges/stats` | Yes |
| `PATCH` | `/api/user-challenges/:challengeId/progress` | Yes |

### Tips & events & stats

See route files under `routes/` for full list (`tips.js`, `events.js`, `stats.js`).

## Filtering examples (`GET /api/challenges`)

- `?category=Waste Reduction,Energy Conservation` — category `$in`
- `?startDate=2024-01-01` — `startDate >=`
- `?endDate=2024-12-31` — `endDate <=`
- `?minParticipants=10&maxParticipants=1000` — participant range

Query parameters are documented in `controllers/challengeController.js`.
