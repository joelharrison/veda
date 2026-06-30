# VEDA OS

VEDA OS is an operating layer for a person or small creative team: a focused place to orient, decide, plan, execute, and reflect without losing the thread.

This repository is starting as a lightweight browser prototype while the product shape hardens. The first milestone is not a full platform. It is a working shell that expresses the core model clearly enough to iterate against.

## Run Locally

```sh
npm run start
```

Then open `http://localhost:4173`.

## Current Surface

- Today: current focus, next actions, active rituals, and a lightweight decision queue.
- Map: the main operating domains VEDA will organize.
- Pulse: simple momentum and system health signals.

## Development Principles

- Build the usable surface first.
- Keep the core model legible.
- Prefer calm defaults over noisy dashboards.
- Treat AI as a collaborator inside workflows, not a novelty layer on top.
- Make every screen answer: what matters now, what is next, and what needs a decision?

## Repository Status

The intended remote is `joelharrison/veda`, but this Codex environment could not access that repository on June 26, 2026. This local repo is remote-ready; once GitHub access is available, add the remote and push:

```sh
git remote add origin https://github.com/joelharrison/veda.git
git push -u origin main
```

## Durable Sharing

Do not rely on a quick Cloudflare tunnel for review links that need to survive overnight. Push this repository to GitHub and use the included GitHub Pages workflow for a stable public URL.

After the repo exists and Pages is enabled, pushes to `main` deploy the static prototype automatically.
