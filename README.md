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

Public, owned repositories from `github.com/kushalshah7` are fetched server-side with pagination and a 10-minute revalidation interval. New or newly pushed public repositories appear without portfolio code changes. Forks, archived repositories and repositories tagged `portfolio-hide` are excluded.

Three featured projects are curated in `src/lib/project-catalog.ts`. Add the `portfolio-featured` topic to override that ordering. The searchable collection includes featured projects and sorts all results by latest push. Editorial summaries and project details live in `src/data/project-stories.ts`; review these against repository documentation when capabilities change.

When GitHub fails, saved highlights remain available with an explicit fallback notice. The page never labels them as live activity. Successful feed timestamps come from GitHub response dates, including cached responses; a missing date is not replaced with the current time.

Supported category topics include `agentic-ai`, `fintech`, `data`, `machine-learning`, `automation`, `web-app` and `developer-tools`.

## Design and motion

Shared black-and-lime tokens live in `src/app/base.css`. The hero combines a lightweight canvas field with ambient CSS gradients. Its motion toggle pauses both; reduced-motion preferences disable animation, and background tabs pause rendering. Mobile devices use fewer particles and a lower frame rate.

Project highlights use typography and documented capabilities. Replace these with authentic interface screenshots if suitable assets become available.

## Checks

```bash
npm run lint
node --test tests/projects.test.mjs
npm run build
```

Regression tests cover curation, search, category precedence, demo URL validation, pagination, empty results and GitHub failure states. Browser QA should cover 360, 390, 768, 1024 and 1440px widths, landscape, 200% zoom, keyboard navigation, project dialogs and reduced motion.

## Deploy

Import the repository into Vercel, optionally set `GITHUB_TOKEN` and `NEXT_PUBLIC_SITE_URL`, then deploy. The default canonical domain is `https://kushalr7.tech`.
