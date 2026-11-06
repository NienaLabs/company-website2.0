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
- Vercel AI SDK (`ai`, `@ai-sdk/react`) for chat; Resend for email
- Package manager is **bun** — never run `npm install` or `npm run`

## Architecture

- `app/page.tsx` — landing page, composed of section components in `app/components/`
- `app/products/` — specialized software products & vision engines showcase
- `app/case-studies/compound-v/` — dedicated Compound-V perception engine case study
- `app/blog/` — research & engineering blog
- `app/careers/` — engineering collective & discipline tracks
- `app/terms/` — terms of service & GDPR privacy policy
- `app/api/` — API routes: `chat/`, `contact/`
- All section components are `"use client"` (GSAP needs browser APIs)

## Design system (strict — do not deviate)

- **Source of truth:** `design system/design.md`. Foundation is Google Material 3 (Material You) with custom Gold/Amber palette (`#e0d12e`).
- **Concept & Architecture:** "Natural Design System" (organic, nature-based). **NO INLINE STYLES OR INLINE UTILITIES** (e.g. `style={{}}` or `text-[14px]`). Use strict predefined CSS custom properties or reusable components.
- **Colors:** Primary is Golden-yellow/Amber (`#e0d12e`). 4 alternating secondary colors (Warm Green, Blue-Violet, Teal, Purple) rotate in UI patterns. Never hardcode hex. Theme toggle is `data-theme="dark|light"`.
- **Dark Mode:** Shadows are invisible in dark mode; communicate elevation using tonal surface container colors (`--md-sys-color-surface-container-*` / `--color-surface-raised`).
- **Typography:** Space Grotesk (headings), Inter (body), IBM Plex Mono (data/code) loaded via Google Fonts. Use semantic tokens.
- **Shape & Radius:** Organic geometry. Interactive elements (Buttons, Pills, Badges) must be fully rounded (`--radius-full`). Containers are soft (`--radius-2xl` or `3xl`).
- **Spacing:** Scale uses an 8px base (`--spacing-1` = 8px, `--spacing-2` = 16px, etc.). Avoid raw numbers; use semantic tokens (`--spacing-container-padding`, etc.).
- **Materials:** Use glassmorphism (`--color-surface-glass-base`) with backdrop blur for foreground surfaces over dynamic backgrounds.
- **Iconography:** System icons use `react-icons`. Product/file icons are 3D (ask user if needed). Minimum touch target for interactive elements is 48x48px.
- **UX Patterns:** Use skeleton loaders instead of full-page spinners. Provide abstract 3D icons and CTAs for empty states.
- **Signature Interaction:** Amber glow on hover/focus (`box-shadow: 0 0 0 4px var(--amber-glow)`). All focusable elements MUST use standardized focus outline tokens.

## Agent Skills (Project Root `.agents/skills/`)

Always activate and follow our project agent skills in `.agents/skills/` (tracked in `skills-lock.json`) for frontend, UX, design, and review tasks:

1. **`impeccable` (`.agents/skills/impeccable/SKILL.md`)**
   - **Role:** Design director & craft floor governor. Mandatory for designing, shaping, polishing, critiquing, hardening, accessibility review, responsive layout, and typography refinement.
   - **Modes:**
     - `Persuade`: Landing pages (`app/page.tsx`), marketing sections, pricing, hero showcases. High craft, bold point of view, distinct visual hierarchy.
     - `Operate`: Admin, employee dashboards, forms, and tools (`app/employees/*`). Prioritize scanability, efficiency, and clarity.
     - `Read`: Blog and long-form articles (`app/blog/*`). Emphasize reading rhythm, type hierarchy, and content clarity.
     - `Experience`: Portfolios and visual showcases. Interface recedes, artifacts lead.
   - **Workflow:**
     - On Windows, invoke via `.agents/skills/impeccable/scripts/impeccable.cmd` or read the skill and reference files directly.
     - Always read `.agents/skills/impeccable/reference/craft-floor.md` before applying UI edits to avoid banned anti-patterns.
     - Verify visual truth across mobile, tablet, and desktop breakpoints.

2. **`design-taste-frontend` (`.agents/skills/design-taste-frontend/SKILL.md`)**
   - **Role:** Anti-slop art direction. Use whenever designing, building, or reviewing marketing pages, landing pages, heroes, or public-facing screens.
   - **Workflow:**
     - Replaces generic AI defaults (monotonous icon cards, thin lines, centered 3-line headers) with researched compositions, intentional typography, bold color fields, and real content.
     - Enforces the no-slop house style and runs real-browser inspection (`scripts/draw.mjs`, `scripts/inspect.mjs`) when evaluating visual composition.

### Harmonizing Skills with Material 3 & Design Tokens
- Skills must enforce the tokens defined in `design system/design.md` and `app/globals.css`.
- All primary actions, CTAs, and active indicators use Gold (`--color-brand: #e0d12e`).
- Dark mode must rely on tonal surface elevation (`--md-sys-color-surface-container-*`), with the signature amber glow (`--shadow-glow`) on hover and focus.
- Interactive controls must be fully rounded (`--radius-full`), and containers must use organic soft curves (`12px` to `28px`).

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
