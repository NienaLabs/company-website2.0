# Design System v2.0 — Confident Minimalism

A replacement for the previous neoclassical system, built for product/SaaS UI. Bold amber used generously instead of rationed, high-contrast text instead of muted opacity, and one repeated signature — the amber glow — instead of static ornament. Both dark and light themes are first-class.

---

## Philosophy

**Confidence Over Restraint**
Neoclassical treated color as a rare resource. This system spends it. Amber isn't a punctuation mark capped at 5% — it's the primary signal for anything interactive. If it does something, it can glow.

**Warm, Not Loud**
Engaging doesn't mean noisy. The palette stays to one accent family (amber) plus functional semantic color. Energy comes from contrast and motion, not from adding more hues.

**Type With a Pulse**
Space Grotesk carries personality in headlines without becoming decorative. Inter does the quiet, dense work of a real product UI. Nothing is italic-serif-for-elegance; every face earns its place at product scale.

**Glow Is the Signature**
Every interactive element responds with a soft amber glow on hover, focus, or active state. It's the one motif repeated everywhere — buttons, cards, nav, inputs — so the whole product feels alive, not just the marketing page.

**Density Is Allowed**
SaaS UIs hold tables, forms, and dashboards, not empty stone plazas. Spacing is generous where it aids scanning, tight where density helps — not expensive for its own sake.

**One Soft Shape**
Cards and buttons stay crisp (8–12px radius). Pills are reserved for badges, avatars, and toggles — a single deliberate soft accent against an otherwise precise geometry.

---

## Color

Amber is the workhorse of this system — it marks anything the user can act on. Unlike the old 5% ceiling, there's no cap: primary buttons, active nav, focus rings, and glows all draw from the same family.

### Dark theme

| Token | Hex / Value | Use |
|---|---|---|
| `--bg` | `#0c0d10` | Page background |
| `--surface` | `#16181d` | Cards, panels, sidebar |
| `--surface-2` | `#1e2128` | Nested surfaces, hover backgrounds |
| `--surface-3` | `#262a33` | Deepest nested surface |
| `--border` | `rgba(255,255,255,0.08)` | Default dividers, card edges |
| `--border-strong` | `rgba(255,255,255,0.16)` | Emphasized borders |
| `--text-primary` | `#f5f3ee` | Headings, primary body text |
| `--text-secondary` | `rgba(245,243,238,0.68)` | Supporting copy |
| `--text-muted` | `rgba(245,243,238,0.42)` | Captions, disabled, helper text |
| `--amber` | `#ffb020` | Primary accent — buttons, active states, links |
| `--amber-strong` | `#ffc65c` | Amber on hover / brighter emphasis |
| `--amber-deep` | `#d98c0f` | Amber pressed state |
| `--amber-glow` | `rgba(255,176,32,0.35)` | Interaction glow (box-shadow) |
| `--amber-wash` | `rgba(255,176,32,0.14)` | Amber-tinted backgrounds |
| `--success` | `#34d399` | Positive states |
| `--error` | `#fb7185` | Destructive / invalid states |
| `--info` | `#38bdf8` | Neutral informational states |
| `--on-amber` | `#1a1204` | Text/icon color on solid amber fills |

### Light theme

| Token | Hex / Value | Use |
|---|---|---|
| `--bg` | `#faf8f4` | Page background (warm off-white, not stark white) |
| `--surface` | `#ffffff` | Cards, panels, sidebar |
| `--surface-2` | `#f2efe8` | Nested surfaces, hover backgrounds |
| `--surface-3` | `#e9e4d9` | Deepest nested surface |
| `--border` | `rgba(20,16,8,0.10)` | Default dividers, card edges |
| `--border-strong` | `rgba(20,16,8,0.20)` | Emphasized borders |
| `--text-primary` | `#18140d` | Headings, primary body text |
| `--text-secondary` | `rgba(24,20,13,0.68)` | Supporting copy |
| `--text-muted` | `rgba(24,20,13,0.44)` | Captions, disabled, helper text |
| `--amber` | `#d97706` | Primary accent — buttons, active states, links |
| `--amber-strong` | `#b45309` | Amber on hover / brighter emphasis |
| `--amber-deep` | `#92400e` | Amber pressed state |
| `--amber-glow` | `rgba(217,119,6,0.28)` | Interaction glow (box-shadow) |
| `--amber-wash` | `rgba(217,119,6,0.10)` | Amber-tinted backgrounds |
| `--success` | `#059669` | Positive states |
| `--error` | `#e11d48` | Destructive / invalid states |
| `--info` | `#0284c7` | Neutral informational states |
| `--on-amber` | `#1a1204` | Text/icon color on solid amber fills |

**Rule:** never hardcode hex values in components — always reference the token, so a theme switch is a single attribute change (`data-theme="dark"` / `"light"`), not a re-implementation.

---

## Typography

Three faces, three jobs. Never mix roles.

| Role | Face | Weights | Use |
|---|---|---|---|
| Display / Headings | **Space Grotesk** | 500, 600 | Hero text, page titles, section headers, card titles |
| Body / UI | **Inter** | 400, 500, 600 | Body copy, form labels, buttons, nav, dense UI text |
| Data / Code | **IBM Plex Mono** | 400, 500 | Token values, numeric data, code snippets |

### Type scale

| Label | Size | Weight | Font | Use |
|---|---|---|---|---|
| Display | 56px | 600 | Space Grotesk | Hero, marketing headlines |
| H1 | 38px | 600 | Space Grotesk | Page titles |
| H2 | 26px | 600 | Space Grotesk | Section titles |
| H3 | 19px | 500 | Space Grotesk | Card headers, modal titles |
| Body Lg | 17px | 400 | Inter | Intro paragraphs |
| Body | 15px | 400 | Inter | Default reading text |
| Body Sm | 13px | 400 | Inter | Secondary copy, descriptions |
| Label | 11px | 600 | Inter | UI labels, nav, buttons — uppercase, tracking 0.06em |
| Data | 13px | 500 | IBM Plex Mono | Numeric values, tokens, code |

**Note:** Label tracking is intentionally restrained (0.06em) compared to the old system's 0.14–0.28em Cinzel tracking — loud letter-spacing reads as ornamental, not confident, at UI scale.

---

## Spacing

4px base unit.

| Token | Name | Value | Use |
|---|---|---|---|
| `--space-1` | xs | 4px | Icon padding, tight inline gaps |
| `--space-2` | sm | 8px | Tag padding, label-to-value gaps |
| `--space-3` | md | 12px | Compact card padding, form field gaps |
| `--space-4` | lg | 16px | Standard inner padding, list item spacing |
| `--space-5` | xl | 24px | Card padding, grid gutters |
| `--space-6` | 2xl | 32px | Section sub-header spacing, hero padding |
| `--space-7` | 3xl | 48px | Section-level breaks |
| `--space-8` | 4xl | 64px | Page section margins |
| `--space-9` | 5xl | 96px | Major layout divisions |

## Radius

| Name | Value | Use |
|---|---|---|
| sm | 6px | Inputs, tags, small chips |
| md | 8px | Buttons, dropdowns |
| lg | 12px | Cards, modals, panels |
| full | 999px | Badges, avatars, toggle pills — the one deliberate soft shape |

---

## Components

### Buttons
- **Primary** — solid `--amber` background, `--on-amber` text, 8px radius. Hover/focus: 4px amber glow ring + 1px lift.
- **Secondary** — transparent background, 1px `--amber` border, `--amber` text. Hover: `--amber-wash` fill + glow ring.
- **Ghost** — transparent, `--border` outline, `--text-secondary`. No glow — reserved for low-emphasis actions.

### Inputs
- Background `--bg` (recessed relative to surrounding card), 1px `--border` at rest.
- Focus: border becomes `--amber`, plus a 4px amber glow ring — same visual language as button hover.
- Label above field, uppercase, 11px, `--text-secondary`.

### Cards
- Background `--surface`, 1px `--border`, 12px radius.
- Hover (when interactive): amber glow shadow — `0 0 0 1px var(--amber-glow), 0 8px 28px var(--amber-glow)`.
- Numeric/data content uses IBM Plex Mono for scannability.

### Badges / Status
- Full pill radius (999px) — the system's one deliberate soft shape.
- Background is the semantic color at ~13% opacity, 1px border at ~27% opacity, text at full semantic color.
- Reserved strictly for status/state — never used for buttons or cards.

---

## Signature Interaction: The Amber Glow

Every interactive element — button, input, card, nav item — responds to hover/focus/active with the same soft amber halo:

```css
box-shadow: 0 0 0 4px var(--amber-glow);
```

This single repeated motif is what makes the system read as *alive* rather than decorated: one idea, applied consistently, instead of many small ornamental flourishes.

---

## Full Token Reference (CSS)

```css
:root[data-theme="dark"] {
  --bg: #0c0d10;
  --surface: #16181d;
  --surface-2: #1e2128;
  --surface-3: #262a33;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.16);
  --text-primary: #f5f3ee;
  --text-secondary: rgba(245,243,238,0.68);
  --text-muted: rgba(245,243,238,0.42);
  --amber: #ffb020;
  --amber-strong: #ffc65c;
  --amber-deep: #d98c0f;
  --amber-glow: rgba(255,176,32,0.35);
  --amber-wash: rgba(255,176,32,0.14);
  --success: #34d399;
  --error: #fb7185;
  --info: #38bdf8;
  --on-amber: #1a1204;

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px; --space-9: 96px;

  --radius-sm: 6px; --radius-md: 8px; --radius-lg: 12px; --radius-full: 999px;
}

:root[data-theme="light"] {
  --bg: #faf8f4;
  --surface: #ffffff;
  --surface-2: #f2efe8;
  --surface-3: #e9e4d9;
  --border: rgba(20,16,8,0.10);
  --border-strong: rgba(20,16,8,0.20);
  --text-primary: #18140d;
  --text-secondary: rgba(24,20,13,0.68);
  --text-muted: rgba(24,20,13,0.44);
  --amber: #d97706;
  --amber-strong: #b45309;
  --amber-deep: #92400e;
  --amber-glow: rgba(217,119,6,0.28);
  --amber-wash: rgba(217,119,6,0.10);
  --success: #059669;
  --error: #e11d48;
  --info: #0284c7;
  --on-amber: #1a1204;

  /* spacing and radius tokens are identical across themes */
}
```

---

## Fonts (import)

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
```
