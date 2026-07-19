<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Quick commands

- `bun dev` — dev server (uses bun, not npm — bun.lock is the lockfile)
- `bun run build` — production build
- `bun run lint` — ESLint (flat config, eslint v9)
- No test suite exists — do not assume one

## Stack

- Next.js 16.2.2 (App Router), React 19.2.4
- Tailwind CSS v4 via `@tailwindcss/postcss` (not the old `tailwindcss` PostCSS plugin)
- GSAP + ScrollTrigger for scroll-driven animations; Lenis for smooth scroll
- `next-themes` with `data-theme` attribute (not `class`) for dark/light
- Vercel AI SDK (`ai`, `@ai-sdk/react`) for chat; Resend for email; Paystack for payments
- Package manager is **bun** — never run `npm install` or `npm run`

## Architecture

- `app/page.tsx` — landing page, composed of ~12 section components in `app/components/`
- `app/api/` — API routes: `chat/`, `contact/`, `paystack/`
- `app/bootcamp/` — bootcamp checkout + courses
- `app/careers/`, `app/local-businesses/` — separate pages
- `lib/` — shared data (`courses.ts`, `email-templates.ts`)
- All section components are `"use client"` (GSAP needs browser APIs)

## Design system (strict — do not deviate)

- Source of truth: `design system/design-system-v2.jsx` and `design system/design.md`
- Design style: **"Confident Minimal"** (neoclassical + bento grid). Amber is the primary accent, used generously — not capped at 5%.
- Fonts: Space Grotesk (headings), Inter (body), IBM Plex Mono (data/code) — loaded via Google Fonts in `globals.css`
- Colors, spacing, and radius are all CSS custom properties in `globals.css` — never hardcode hex. Theme toggle is `data-theme="dark|light"`.
- Signature interaction: amber glow on hover/focus (`box-shadow: 0 0 0 4px var(--amber-glow)`)
- Spacing scale: 4px base (`--space-1` through `--space-9`)
- Radius: cards/buttons stay crisp (8–12px). Pills (999px) reserved for badges/avatars/toggles only.

## Animation conventions

- Use the **emil-design-eng** and **gsap-scrolltrigger** skills for scroll-driven animations
- All animations must respect `prefers-reduced-motion` (see `HeroSection.tsx` for the pattern)
- GSAP plugins are registered once in `SmoothScrollProvider.tsx` — do not re-register
- ScrollTrigger config: `ignoreMobileResize: true` is set globally
- Lenis is disabled on touch-only devices (native momentum scroll)
- Use `useGSAP` hook with `scope` ref for component-scoped animations (cleanup is automatic)
- GPU layer promotions: `will-change: transform` is already applied to fixed nav and images in `globals.css`

## Gotchas

- `next.config.ts` has `typescript.ignoreBuildErrors: true` — type errors won't block builds
- Image domains: only `images.unsplash.com` is allowed in `next.config.ts`
- Hero section uses a local video (`/hero.mp4`) with fallback poster — placeholder pattern for other media
- `@/*` path alias maps to project root (configured in `tsconfig.json`)
- The landing page images in `public/images/` are placeholders — replace with real assets later
- `CLAUDE.md` just references `AGENTS.md` — keep both in sync if instructions change