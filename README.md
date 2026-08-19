# Dental Clinic White-Label Template

Config-driven, multi-client-resellable dental clinic website. No client-specific data (name, doctors, services, colors, contact info) ever lives inside a component — it all comes from `frontend/src/config/clinic.config.ts`, validated against `clinic.config.schema.ts` (Zod).

## Structure
- `frontend/` — React + Vite + Tailwind site
- `backend/` — shared multi-tenant Vercel serverless API (appointment leads, email notifications)
- `Admin/` — reserved for a future config/leads dashboard (not built yet)
- `clients/` — per-client config + asset archive (reference copies, one folder per client)
- `docs/` — onboarding + config reference

## Getting started
```bash
pnpm install
pnpm dev:web   # frontend on http://localhost:5173
pnpm dev:api   # backend (vercel dev) on http://localhost:3000
```

See [docs/ONBOARDING.md](docs/ONBOARDING.md) for how to spin up a new client site.
