# Kushal Shah — Portfolio

A cinematic, live-GitHub portfolio built with Next.js App Router, TypeScript and CSS.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` before deployment.

## Configuration

Editable profile, experience, stack and contact data live in `src/data/profile.ts`. Replace the clearly marked LinkedIn, email and resume placeholders before publishing.

`GITHUB_TOKEN` is optional. Without it, public unauthenticated GitHub access is used. When configured, the token is read only in `src/lib/github.ts` on the server and is never exposed to browser JavaScript.

## Automatic GitHub project sync

Public, owned repositories from `github.com/kushalshah7` are fetched server-side and revalidated every 10 minutes. New or newly pushed public repositories appear without portfolio code changes. Forks, archived repositories and repositories tagged `portfolio-hide` are excluded. Add the `portfolio-featured` topic to promote a repository; if none is tagged, useful recently pushed repositories are chosen automatically.

Supported category topics include `agentic-ai`, `fintech`, `data`, `machine-learning`, `automation`, `web-app` and `developer-tools`.

## Hero video

The polished CSS fallback works without binary assets. To enable video, add optimized licensed files documented in `public/media/README.md`.

## Deploy

Import the repository into Vercel, optionally set `GITHUB_TOKEN` and `NEXT_PUBLIC_SITE_URL`, then deploy. The default canonical domain is `https://kushalr7.tech`.
