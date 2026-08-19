Drop this client's real images/videos here, matching the paths referenced in
`src/config/clinic.config.ts` (e.g. `logo.png`, `favicon.png`, `og-image.jpg`,
`doctors/*.jpg`, `gallery/*.jpg|mp4`, `testimonials/*.jpg`).

Files under `public/` are served as-is at `/assets/clients/<slug>/...` — no import needed,
so string paths in the config resolve directly as `<img src="...">` values.
