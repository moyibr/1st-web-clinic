# Dental Clinic White-Label Template

Config-driven, multi-client-resellable dental clinic website. No client-specific data — name,
doctors, services, brand colors, contact info — ever lives inside a component. It all comes from
a single [`clinic.config.ts`](frontend/src/config/clinic.config.ts), validated against a Zod
schema, so a brand-new client site is a config swap, not a code fork.

One shared backend (Vercel serverless + MongoDB) handles appointment leads for **every** client,
keeping hosting costs low while onboarding is cheap and fast.

## Tech stack

| Layer      | Stack                                                              |
|------------|---------------------------------------------------------------------|
| Frontend   | React 18 · Vite 5 · TypeScript · Tailwind CSS · React Router · Zod  |
| Backend    | Vercel Serverless Functions · TypeScript · MongoDB Atlas · Nodemailer |
| Tooling    | pnpm workspaces · ESLint                                           |

## Monorepo structure

```
.
├── frontend/   React + Vite + Tailwind site (renders whichever client config is configured)
├── backend/    Shared multi-tenant Vercel API — appointment leads, email notifications
├── Admin/      Reserved for a future config/leads dashboard (not built yet)
├── clients/    Per-client config + asset archive — one reference folder per client
└── docs/       Onboarding + config reference (WIP)
```

- **Frontend** reads `frontend/src/config/clinic.config.ts` as the live source of truth for a
  build, validated at runtime by [`clinic.config.schema.ts`](frontend/src/config/clinic.config.schema.ts).
- **`clients/<slug>/`** holds a reference archive copy of that same config plus the client's
  brand assets — kept in sync manually (or generated from it, once onboarding is automated).
- See [`backend/README.md`](backend/README.md) for how the shared API scopes leads per tenant.

## Getting started

Requires Node ≥ 18 and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev:web   # frontend → http://localhost:5173
pnpm dev:api   # backend (vercel dev) → http://localhost:3000
```

Copy the env examples and fill in real values before running the backend:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env.local
```

| File                      | Key vars                                              |
|---------------------------|--------------------------------------------------------|
| `frontend/.env.example`   | `VITE_CLIENT_SLUG`, `VITE_API_URL`, `VITE_GA_ID`       |
| `backend/.env.example`    | `MONGODB_URI`, `MONGODB_DB_NAME`, `SMTP_*`             |

## Available scripts

Run from the repo root (fan out to workspaces via pnpm filters):

| Command            | Description                          |
|---------------------|---------------------------------------|
| `pnpm dev:web`      | Start the frontend dev server         |
| `pnpm dev:api`      | Start the backend locally via `vercel dev` |
| `pnpm build:web`    | Production build of the frontend      |
| `pnpm lint`         | Lint all workspaces                   |
| `pnpm typecheck`    | Type-check all workspaces             |

## Onboarding a new client

1. Duplicate `clients/demo-clinic/` → `clients/<new-slug>/`, updating `clinic.config.json` and
   dropping in brand assets (logo, favicon, OG image, gallery, doctor photos).
2. Mirror those values into `frontend/src/config/clinic.config.ts` and set
   `VITE_CLIENT_SLUG=<new-slug>` for that deployment.
3. Register the tenant on the backend — see the **Onboarding a new client** section in
   [`backend/README.md`](backend/README.md) (adds an entry to `TENANTS` with notification email
   and allowed origins).
4. Deploy the frontend (one Vercel project per client) pointed at the shared backend URL.

## Deployment

- **Frontend** — one Vercel project per client, built from this repo with that client's
  `VITE_CLIENT_SLUG` / `VITE_API_URL` env vars.
- **Backend** — a single shared Vercel deployment serving `/api/appointment` for all tenants;
  see [`backend/README.md`](backend/README.md) for the full request lifecycle (validation,
  honeypot, duplicate guard, per-tenant email/WhatsApp notifications).

## Roadmap

- `Admin/` — a dashboard for clients to edit their config and view leads without a code deploy
  (not started; see [`Admin/README.md`](Admin/README.md)).
- `docs/` — step-by-step onboarding + full config reference (in progress).
