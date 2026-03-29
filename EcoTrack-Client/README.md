# EcoTrack — Sustainable Living Community (Client)

**Live site:** [https://ecotrack-app.netlify.app](https://ecotrack-app.netlify.app)

EcoTrack is a single-page app where people discover sustainability challenges, share eco-tips, browse green events, and track personal progress. The UI uses React, React Router, Tailwind CSS, Firebase Authentication, and a REST API hosted separately (Express + MongoDB).

## Features

- **Challenges** — Browse challenges, open details, create challenges (authenticated), join a challenge and sync progress.
- **My Activities** — Protected dashboard listing joined challenges with progress sliders and save-to-API flow (with offline-friendly local fallback when needed).
- **Home** — Dynamic sections: community stats, active challenges, recent tips, upcoming events; static “Why go green” and “How it works”.
- **Auth** — Email/password and Google via Firebase; protected routes redirect to `/login` and return to the intended URL after sign-in.
- **Feedback** — Styled toasts (`react-hot-toast`); runtime errors caught by an error boundary; 404 route for unknown paths.
- **Hosting** — Netlify-style SPA fallback via `public/_redirects` (`/* /index.html 200`) so deep links reload correctly.

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 19, Vite 7, Tailwind CSS, DaisyUI |
| Routing | React Router 7 |
| Auth | Firebase Auth |
| HTTP | Axios |
| Notifications | react-hot-toast |

## Environment variables

See [`.env.example`](./.env.example). Copy it to `.env` and set:

- `VITE_API_BASE_URL` — your deployed API base (must end with `/api` if your server is mounted that way), e.g. `https://your-project.vercel.app/api`
- Firebase keys — from the Firebase console (Web app)

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project structure (high level)

- `src/Routes/` — router, legacy URL redirects, private route wrapper
- `src/Pages/` — page components
- `src/Context/` — auth context (Firebase + API token sync)
- `src/api/` — Axios client and API helpers
- `public/_redirects` — SPA rewrite rules for static hosts

## Assignment checklist (maintainer notes)

- **Commits:** Use meaningful commits on both client and server repos (see your course minimums).
- **Firebase authorized domains:** Add your Netlify (or other) hostname under Firebase Authentication → Settings → Authorized domains.
- **Secrets:** Never commit `.env`; use `.env.example` only as a template.
