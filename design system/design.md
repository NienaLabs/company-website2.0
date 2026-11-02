# Material 3 — Design System Specification (Gold Theme)

```yaml
# Material 3 Design System Specification & Token Reference
# Standardized for Niena Labs web platform based on Google Material 3 (Material You)
specification: Material Design 3 (M3)
seed_color: "#e0d12e" # Golden-yellow / Amber (sourced from globals.css)
version: "3.0"
updated_at: "2026-11-02"
sources:
  - https://m3.material.io/
  - https://m3.material.io/styles/color/the-color-system/tokens
  - https://m3.material.io/styles/typography/type-scale-tokens
  - https://m3.material.io/styles/elevation/tokens
  - https://m3.material.io/styles/shape/shape-scale-tokens
  - https://m3.material.io/styles/motion/easing-and-duration/tokens
  - https://github.com/material-components/material-web
  - https://material-foundation.github.io/material-theme-builder/
```

---

## 1. Executive Summary & Design Principles

Google **Material 3 (M3)**—also known as *Material You*—is Google's design system built around dynamic color, tonal palettes, generous organic shapes, expressive typography, physical motion, and a strict token-first architecture.

For this website, **the Material 3 color system is generated around our signature Gold / Amber primary key (`#e0d12e`)** from `app/globals.css`. All purple default baseline tokens from raw Material 3 are replaced with a warm, accessible gold tonal palette, balanced with dark obsidian backgrounds and warm tonal containers.

### Core Principles
1. **Token-First Architecture:** Every design attribute (color, type, elevation, shape, motion, state) is governed by canonical design tokens (`--md-sys-*`). No hardcoded pixel styles or arbitrary color values are allowed in component files.
2. **Tonal Elevation over Harsh Drop Shadows:** In M3 (especially in dark mode), elevation is primarily communicated by **tonal surface containers** (`surfaceContainerLowest` through `surfaceContainerHighest`), creating rich, organic depth.
3. **Signature Gold Brand Character:** Primary brand actions, active navigation states, interactive highlights, and focused outlines utilize the warm gold glow (`#e0d12e` with `--amber-glow`).
4. **Adaptive & Accessible:** Built from the ground up for WCAG 2.1 AA/AAA compliance. High contrast ratios (minimum 4.5:1 for body text, 3:1 for large text and container boundaries) are mathematically enforced across light and dark themes.
5. **Fluid Motion & Physics:** Motion uses standardized easing curves (Emphasized and Standard) and duration scales, with full support for `prefers-reduced-motion`.

---

## 2. Color System (Gold / Amber Theme)

Material 3 replaces static single-shade colors with **tonal palettes** derived algorithmically from HCT (Hue, Chroma, Tone). 
* **Hue:** ~55° (Gold / Amber)
* **Seed Color:** `#e0d12e` (Gold / Amber)
* **Primary Key:** `#e0d12e` (Tone 80 in dark mode; primary CTA fill with `#0a0a0a` text) / `#6c5e00` (Tone 40 in light mode for accessible high-contrast text and link color).

### 2.1 Complete Color Roles — Light Theme

| Token Name | CSS Custom Property | Light Mode Hex | Role & Description |
| :--- | :--- | :--- | :--- |
| **Primary** | `--md-sys-color-primary` | `#6c5e00` | High-contrast key action color for light surfaces; accessible links & headers |
| **Primary Brand Key** | `--color-brand` / `--amber` | `#e0d12e` | Signature vibrant gold button fill (paired with `--color-brand-fg: #0a0a0a`) |
| **On Primary** | `--md-sys-color-on-primary` | `#ffffff` | Text and icons placed on `--md-sys-color-primary` (`#0a0a0a` when placed on `#e0d12e`) |
| **Primary Container** | `--md-sys-color-primary-container` | `#fbee67` | Tonal fill for prominent containers, highlight pills, active state cards |
| **On Primary Container** | `--md-sys-color-on-primary-container` | `#221b00` | Text and icons on primary container (high contrast 11:1) |
| **Inverse Primary** | `--md-sys-color-inverse-primary` | `#e0d12e` | Vibrant gold accent used when contrasting against inverted surfaces |
| **Secondary** | `--md-sys-color-secondary` | `#665e40` | Lower-emphasis components, filter chips, secondary badges |
| **On Secondary** | `--md-sys-color-on-secondary` | `#ffffff` | Content on secondary surfaces |
| **Secondary Container** | `--md-sys-color-secondary-container` | `#ede2bc` | Muted warm container fill for subtle grouping |
| **On Secondary Container** | `--md-sys-color-on-secondary-container` | `#211b04` | Content placed on secondary containers |
| **Tertiary** | `--md-sys-color-tertiary` | `#43664e` | Complementary botanical accent (Sage green, harmonizing with Alt-1) |
| **On Tertiary** | `--md-sys-color-on-tertiary` | `#ffffff` | Text and icons on tertiary surfaces |
| **Tertiary Container** | `--md-sys-color-tertiary-container` | `#c5eccd` | Soft green accent container fill |
| **On Tertiary Container** | `--md-sys-color-on-tertiary-container` | `#00210f` | Text on tertiary container |
| **Error** | `--md-sys-color-error` | `#ba1a1a` | Form validation errors, destructive actions |
| **On Error** | `--md-sys-color-on-error` | `#ffffff` | Text/icons on error color |
| **Error Container** | `--md-sys-color-error-container` | `#ffdad6` | Error alerts, failure notification containers |
| **On Error Container** | `--md-sys-color-on-error-container` | `#410002` | Text on error container |
| **Background** | `--md-sys-color-background` | `#fef9ed` | Page canvas background (Warm ivory) |
| **On Background** | `--md-sys-color-on-background` | `#1d1c16` | Main body typography and icons |
| **Surface** | `--md-sys-color-surface` | `#fef9ed` | Default surface color for base components |
| **On Surface** | `--md-sys-color-on-surface` | `#1d1c16` | Standard primary typography and graphics |
| **Surface Variant** | `--md-sys-color-surface-variant` | `#e8e2d0` | Low-emphasis cards, divider backgrounds |
| **On Surface Variant** | `--md-sys-color-on-surface-variant` | `#4a4739` | Secondary captions, placeholder text, quiet icons |
| **Outline** | `--md-sys-color-outline` | `#7b7768` | Prominent component borders, active text input outlines |
| **Outline Variant** | `--md-sys-color-outline-variant` | `#ccc6b5` | Soft structural borders, card strokes, dividers |
| **Surface Dim** | `--md-sys-color-surface-dim` | `#ded9cd` | Recessed surface or background behind modals |
| **Surface Bright** | `--md-sys-color-surface-bright` | `#fef9ed` | Raised or highlighted surface |
| **Surface Container Lowest** | `--md-sys-color-surface-container-lowest` | `#ffffff` | Pure white card/sheet background |
| **Surface Container Low** | `--md-sys-color-surface-container-low` | `#f8f3e7` | Level 1 elevated surfaces (cards, bottom sheets) |
| **Surface Container** | `--md-sys-color-surface-container` | `#f2ede1` | Level 2 elevated surfaces (app bars, menus) |
| **Surface Container High** | `--md-sys-color-surface-container-high` | `#ece8dc` | Level 3 elevated surfaces (dialogs, date pickers) |
| **Surface Container Highest** | `--md-sys-color-surface-container-highest` | `#e6e2d6` | Level 4/5 interactive surfaces, input background |
| **Inverse Surface** | `--md-sys-color-inverse-surface` | `#32302a` | High-contrast inverted surfaces (Snackbars, dark tooltips) |
| **Inverse On Surface** | `--md-sys-color-inverse-on-surface` | `#f5f0e4` | Text inside inverted surfaces |
| **Surface Tint** | `--md-sys-color-surface-tint` | `#6c5e00` | Tint layer applied for elevation |
| **Shadow** | `--md-sys-color-shadow` | `#000000` | Shadow ambient and key color |
| **Scrim** | `--md-sys-color-scrim` | `#000000` | Backdrop overlay behind modal dialogs and drawers |

---

### 2.2 Complete Color Roles — Dark Theme

In Dark Mode, the gold `#e0d12e` is the primary luminous beacon. Elevation is communicated through increasing brightness in `surface-container` tokens rather than drop shadows.

| Token Name | CSS Custom Property | Dark Mode Hex | Role & Description |
| :--- | :--- | :--- | :--- |
| **Primary** | `--md-sys-color-primary` | `#e0d12e` | Signature vibrant gold: FABs, key actions, active tabs |
| **Primary Brand Key** | `--color-brand` / `--amber` | `#e0d12e` | Primary brand key token |
| **On Primary** | `--md-sys-color-on-primary` | `#383000` | High-contrast dark amber text on gold buttons (`#0a0a0a` for max contrast) |
| **Primary Container** | `--md-sys-color-primary-container` | `#534800` | Deep gold container fill for active items and highlighted chips |
| **On Primary Container** | `--md-sys-color-on-primary-container` | `#fbee67` | Bright gold text and icons on primary container |
| **Inverse Primary** | `--md-sys-color-inverse-primary` | `#6c5e00` | Deep gold for high-contrast inverted elements |
| **Secondary** | `--md-sys-color-secondary` | `#d0c6a1` | Muted golden-sand for secondary buttons and chips |
| **On Secondary** | `--md-sys-color-on-secondary` | `#363016` | Text on secondary elements |
| **Secondary Container** | `--md-sys-color-secondary-container` | `#4d472a` | Container fill for secondary components |
| **On Secondary Container** | `--md-sys-color-on-secondary-container` | `#ede2bc` | Text on secondary container |
| **Tertiary** | `--md-sys-color-tertiary` | `#a9d0b2` | Soft botanical sage green for contrasting accents |
| **On Tertiary** | `--md-sys-color-on-tertiary` | `#143722` | Text on tertiary elements |
| **Tertiary Container** | `--md-sys-color-tertiary-container` | `#2c4e37` | Container fill for tertiary components |
| **On Tertiary Container** | `--md-sys-color-on-tertiary-container` | `#c5eccd` | Text on tertiary container |
| **Error** | `--md-sys-color-error` | `#ffb4ab` | Error icons, validation text |
| **On Error** | `--md-sys-color-on-error` | `#690005` | Text on error container |
| **Error Container** | `--md-sys-color-error-container` | `#93000a` | Background for error banners |
| **On Error Container** | `--md-sys-color-on-error-container` | `#ffdad6` | Text on error container |
| **Background** | `--md-sys-color-background` | `#15140f` | Main page canvas background (Obsidian with warm gold undertone) |
| **On Background** | `--md-sys-color-on-background` | `#e6e2d6` | Primary body typography (Warm off-white) |
| **Surface** | `--md-sys-color-surface` | `#15140f` | Base canvas surface |
| **On Surface** | `--md-sys-color-on-surface` | `#e6e2d6` | High-emphasis text and icons |
| **Surface Variant** | `--md-sys-color-surface-variant` | `#4a4739` | Subtle cards and borders |
| **On Surface Variant** | `--md-sys-color-on-surface-variant` | `#ccc6b5` | Secondary text, placeholder text, subdued icons |
| **Outline** | `--md-sys-color-outline` | `#959181` | Focused border outlines, input outlines |
| **Outline Variant** | `--md-sys-color-outline-variant` | `#4a4739` | Subtle dividers, card borders |
| **Surface Dim** | `--md-sys-color-surface-dim` | `#15140f` | Dimmed backdrop behind modals |
| **Surface Bright** | `--md-sys-color-surface-bright` | `#3c3933` | Elevated illuminated surface |
| **Surface Container Lowest** | `--md-sys-color-surface-container-lowest` | `#0f0e0a` | Deepest recessed region / sunken area |
| **Surface Container Low** | `--md-sys-color-surface-container-low` | `#1d1c16` | Level 1 elevation (elevated cards, bottom sheets) |
| **Surface Container** | `--md-sys-color-surface-container` | `#21201a` | Level 2 elevation (navigation bars, menus) |
| **Surface Container High** | `--md-sys-color-surface-container-high` | `#2c2a24` | Level 3 elevation (modal dialogs, FABs) |
| **Surface Container Highest** | `--md-sys-color-surface-container-highest` | `#37352e` | Level 4/5 interactive elevation, text fields |
| **Inverse Surface** | `--md-sys-color-inverse-surface` | `#e6e2d6` | Inverted surface (light snackbars in dark mode) |
| **Inverse On Surface** | `--md-sys-color-inverse-on-surface` | `#32302a` | Dark text on light inverted surface |
| **Surface Tint** | `--md-sys-color-surface-tint` | `#e0d12e` | Luminous gold tint overlay |
| **Shadow** | `--md-sys-color-shadow` | `#000000` | Drop shadow color |
| **Scrim** | `--md-sys-color-scrim` | `#000000` | Modal scrim overlay (`rgba(0, 0, 0, 0.6)`) |

---

### 2.3 Gold Tonal Palette (0–100 Scale)

The canonical HCT tones for the `#e0d12e` Primary Palette:

```
Tone 100: #ffffff (Pure White)
Tone 99:  #fffbf0 (Warm White)
Tone 95:  #fff099 (Soft Butter)
Tone 90:  #fbee67 (Gold Container Light)
Tone 80:  #e0d12e (Primary Key / Gold Dark Mode)
Tone 70:  #c3b51d (Muted Gold)
Tone 60:  #a69a08 (Deep Amber)
Tone 50:  #897e00 (Antique Ochre)
Tone 40:  #6c5e00 (Primary Key Light Mode / High Contrast)
Tone 30:  #534800 (Primary Container Dark Mode)
Tone 20:  #383000 (On Primary Dark Mode)
Tone 10:  #221b00 (On Primary Container Light Mode)
Tone 0:   #000000 (Pure Black)
```

### 2.4 Alternating Secondary Accents (Extended M3 Roles)

To preserve the multi-colored nature aesthetic from our website architecture, we map the four alternating accents into M3 secondary/tertiary container patterns:
* **Alt-1 (Warm Green):** Light `#97e029` / Dark `#addd65` (Analogous harmony, ~84°)
* **Alt-2 (Blue-Violet):** Light `#3545d4` / Dark `#6d77d5` (Complementary harmony, ~234°)
* **Alt-3 (Teal):** Light `#2fdac9` / Dark `#69d9ce` (Triadic harmony, ~174°)
* **Alt-4 (Purple):** Light `#763bce` / Dark `#9771d1` (Split-complementary harmony, ~264°)

---

## 3. Typography & Type Scale (Full 15-Scale System)

Material 3 defines **5 typographic roles** (Display, Headline, Title, Body, Label), each containing **3 sizes** (Large, Medium, Small), creating 15 baseline styles.

### 3.1 Font Families
* **Display & Heading:** `Space Grotesk, Roboto, 'Helvetica Neue', sans-serif` (`--font-display` / `--font-family-heading`)
* **Body & UI Labels:** `Inter, Roboto, -apple-system, sans-serif` (`--font-body` / `--font-family-body`)
* **Monospace / Code:** `'IBM Plex Mono', 'Roboto Mono', monospace` (`--font-mono` / `--font-family-monospace`)

### 3.2 The Complete 15 Material 3 Type Styles

| Token Name | Size (px / rem) | Line Height (px / rem) | Font Weight | Letter Spacing (Tracking) | Usage & Primary Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`display-large`** | `57px` / `3.5625rem` | `64px` / `4.0rem` | Regular (400) | `-0.25px` (`-0.015em`) | Hero headlines, large landing page statements |
| **`display-medium`** | `45px` / `2.8125rem` | `52px` / `3.25rem` | Regular (400) | `0px` (`0em`) | Prominent section hero headlines, major stats |
| **`display-small`** | `36px` / `2.25rem` | `44px` / `2.75rem` | Regular (400) | `0px` (`0em`) | Secondary hero headers, impact metrics |
| **`headline-large`** | `32px` / `2.0rem` | `40px` / `2.5rem` | Regular (400) | `0px` (`0em`) | Page titles, primary section headers |
| **`headline-medium`** | `28px` / `1.75rem` | `36px` / `2.25rem` | Regular (400) | `0px` (`0em`) | Subsection headers, modal headers |
| **`headline-small`** | `24px` / `1.5rem` | `32px` / `2.0rem` | Regular (400) | `0px` (`0em`) | Card headers, compact section titles |
| **`title-large`** | `22px` / `1.375rem` | `28px` / `1.75rem` | Regular (400) | `0px` (`0em`) | Top app bar titles, dialog titles |
| **`title-medium`** | `16px` / `1.0rem` | `24px` / `1.5rem` | Medium (500) | `+0.15px` (`+0.01em`) | Card subtitles, list item group headers |
| **`title-small`** | `14px` / `0.875rem` | `20px` / `1.25rem` | Medium (500) | `+0.1px` (`+0.007em`) | High-emphasis subheadings, table headers |
| **`body-large`** | `16px` / `1.0rem` | `24px` / `1.5rem` | Regular (400) | `+0.5px` (`+0.03em`) | Default long-form reading copy, blog paragraphs |
| **`body-medium`** | `14px` / `0.875rem` | `20px` / `1.25rem` | Regular (400) | `+0.25px` (`+0.018em`) | Secondary paragraphs, form helper copy |
| **`body-small`** | `12px` / `0.75rem` | `16px` / `1.0rem` | Regular (400) | `+0.4px` (`+0.033em`) | Captions, metadata, timestamps, footnotes |
| **`label-large`** | `14px` / `0.875rem` | `20px` / `1.25rem` | Medium (500) | `+0.1px` (`+0.007em`) | Button labels, active tab indicators, chips |
| **`label-medium`** | `12px` / `0.75rem` | `16px` / `1.0rem` | Medium (500) | `+0.5px` (`+0.04em`) | Compact badges, overlines, small button labels |
| **`label-small`** | `11px` / `0.6875rem` | `16px` / `1.0rem` | Medium (500) | `+0.5px` (`+0.045em`) | Micro-tags, indicator text, navigation bar labels |

### 3.3 Emphasized Typography (M3 Expressive)
For high-impact statements and interactive call-to-actions, M3 Expressive promotes the font weight of any scale step:
* **Display / Headline Emphasized:** Font weight `600` (SemiBold)
* **Title Emphasized:** Font weight `600` (SemiBold)
* **Body Emphasized:** Font weight `500` (Medium)
* **Label Emphasized:** Font weight `600` (SemiBold)

---

## 4. Elevation & Surface Hierarchy (Levels 0–5)

In Material 3, elevation represents relative distance along the z-axis. Elevation is communicated through **both tonal surface color** (via `surface-container-*`) and **box shadows**.

```
Level 0: Flat canvas (0dp)
Level 1: Resting elevated elements (1dp / surface-container-low)
Level 2: Scrolled elements & menus (3dp / surface-container)
Level 3: Floating dialogs & FABs (6dp / surface-container-high)
Level 4: Dragged/active states (8dp / surface-container-highest)
Level 5: Maximum interaction states (12dp)
```

### 4.1 Elevation Levels Specification

| Elevation Level | Distance | Tonal Surface Container | Box Shadow CSS Value | Component Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Level 0** | `0dp` / `0px` | `surface` / `surface-container-lowest` | `none` | Background, filled card, outlined button, flat tabs |
| **Level 1** | `1dp` / `1px` | `surface-container-low` | `0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)` | Elevated card, elevated chips, modal bottom sheet |
| **Level 2** | `3dp` / `3px` | `surface-container` | `0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)` | Scrolled top app bar, navigation bar, menus |
| **Level 3** | `6dp` / `6px` | `surface-container-high` | `0 1px 3px rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)` | Floating Action Button (FAB), modal dialogs, date pickers |
| **Level 4** | `8dp` / `8px` | `surface-container-highest` | `0 2px 3px rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)` | Hovered/pressed FAB, dragged cards |
| **Level 5** | `12dp` / `12px` | `surface-container-highest` | `0 4px 4px rgba(0,0,0,0.3), 0 8px 12px 6px rgba(0,0,0,0.15)` | Modal drawer, active drag state, spotlight cards |

> **Dark Mode Elevation Note:** Drop shadows are naturally invisible against dark obsidian backgrounds. Therefore, elevation in dark mode is communicated 100% reliably using the brighter `surface-container-*` tones, augmented by our signature `--shadow-glow` (`0 0 0 4px var(--amber-glow)`).

---

## 5. Shape System & Corner Radius

Material 3 uses an organic corner radius scale to establish recognizable hierarchy and tactile softness.

### 5.1 Corner Radius Scale

| Token Name | Value | CSS Token | Component Mapping |
| :--- | :--- | :--- | :--- |
| **None** | `0px` | `--md-sys-shape-corner-none` | Full-bleed sheets, rectangular tables, banners |
| **Extra Small** | `4px` | `--md-sys-shape-corner-extra-small` | Autocomplete menus, snackbars, code blocks |
| **Small** | `8px` | `--md-sys-shape-corner-small` | Tooltips, filter chips, input fields |
| **Medium** | `12px` | `--md-sys-shape-corner-medium` | Small dialogs, standard cards, menu popovers |
| **Large** | `16px` | `--md-sys-shape-corner-large` | Standard Floating Action Button (FAB), navigation drawer |
| **Large Increased** | `20px` | `--md-sys-shape-corner-large-increased` | Emphasized feature cards |
| **Extra Large** | `28px` | `--md-sys-shape-corner-extra-large` | Large FAB, modal dialogs, time pickers, bottom sheets |
| **Extra Large Increased**| `32px` | `--md-sys-shape-corner-extra-large-increased`| Large hero modals, interactive banners |
| **Extra Extra Large**| `48px` | `--md-sys-shape-corner-extra-extra-large`| Giant interactive cards, onboarding sheets |
| **Full** | `9999px` | `--md-sys-shape-corner-full` | Filled buttons, pill badges, search bars, circular avatars |

---

## 6. State Layer & Interactive Feedback

A **state layer** is a semi-transparent overlay positioned directly over a component's surface container to convey user interaction. The overlay takes the color of the component's foreground ("On Color") and varies only by opacity.

```
┌──────────────────────────────────────┐
│  Content (Label / Icon)              │  ◄── 100% Opacity
├──────────────────────────────────────┤
│  State Layer Overlay                 │  ◄── Semi-transparent (% based on state)
├──────────────────────────────────────┤
│  Container Surface                   │  ◄── Background color
└──────────────────────────────────────┘
```

### 6.1 State Layer Opacities

| Interaction State | State Layer Opacity | CSS Token | Behavioral Description |
| :--- | :--- | :--- | :--- |
| **Hover** | `8%` (`0.08`) | `--md-sys-state-hover-state-layer-opacity` | Mouse pointer rests over interactive element |
| **Focus** | `10%` (`0.10`) | `--md-sys-state-focus-state-layer-opacity` | Element has keyboard or programmatic focus |
| **Pressed** | `10%` (`0.10`) | `--md-sys-state-pressed-state-layer-opacity` | User clicks or touches the element (initiates ripple) |
| **Dragged** | `16%` (`0.16`) | `--md-sys-state-dragged-state-layer-opacity` | Element is actively dragged across screen |
| **Disabled Container** | `12%` (`0.12`) | `--md-sys-state-disabled-container-opacity`| Container alpha when component is inoperable |
| **Disabled Content** | `38%` (`0.38`) | `--md-sys-state-disabled-content-opacity` | Text/icon alpha when component is inoperable |

### 6.2 Signature Focus Outline & Amber Glow
All interactive elements MUST satisfy keyboard accessibility:
* **Focus Outline Width:** `2px` (`--focus-outline-width`)
* **Focus Outline Offset:** `2px` (`--focus-outline-offset`)
* **Focus Outline Color:** `var(--md-sys-color-primary)` (or `#e0d12e`)
* **Signature Glow:** `box-shadow: 0 0 0 4px var(--amber-glow);`

---

## 7. Motion & Choreography

Material 3 divides motion into **Durations** and **Easing curves** to provide fluid, intentional physics.

### 7.1 Easing Curves

| Easing Token | Cubic-Bezier Value | Purpose & Direction |
| :--- | :--- | :--- |
| **Emphasized** | `cubic-bezier(0.2, 0.0, 0.0, 1.0)` | Standard expressive transition for elements moving on-screen |
| **Emphasized Decelerate** | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` | Elements **entering** the viewport (snappy start, soft landing) |
| **Emphasized Accelerate** | `cubic-bezier(0.3, 0.0, 0.8, 0.15)` | Elements **exiting** the viewport (rapid departure) |
| **Standard** | `cubic-bezier(0.2, 0.0, 0.0, 1.0)` | Functional utility motions (color fades, opacity shifts) |
| **Standard Decelerate** | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Small incoming UI elements |
| **Standard Accelerate** | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` | Small outgoing UI elements |
| **Expressive Spatial Spring**| `cubic-bezier(0.38, 1.21, 0.22, 1.00)`| Playful physics springs for scale and expansion |

### 7.2 Durations Scale

| Token Name | Milliseconds | Application |
| :--- | :--- | :--- |
| **`short-1`** | `50ms` | Micro-feedback, instant color switches |
| **`short-2`** | `100ms` | Simple toggles, checkboxes, radio buttons |
| **`short-3`** | `150ms` | Small tooltip popups, badge fades |
| **`short-4`** | `200ms` | Standard hover transitions, chip selections |
| **`medium-1`** | `250ms` | Dropdown menus opening, accordion shifts |
| **`medium-2`** | `300ms` | Cards expanding, tabs switching |
| **`medium-3`** | `350ms` | Bottom sheets sliding into view |
| **`medium-4`** | `400ms` | Modal dialogs entering screen |
| **`long-1`** | `450ms` | Full-screen page transitions |
| **`long-2`** | `500ms` | Hero section reveals, large component choreography |
| **`extra-long-1`** | `700ms` | Complex sequence choreographies |

### 7.3 Reduced Motion Standard
When `prefers-reduced-motion: reduce` is enabled:
* Spatial movements (`transform: translateX/Y`) MUST be clamped to 0 or replaced with pure opacity fades (`opacity: 0` to `1`).
* All duration values should be collapsed to `<= 150ms`.

---

## 8. Layout, Window Size Classes & Grid

Material 3 defines **Window Size Classes** to adapt interfaces across phones, foldables, tablets, and desktops:

| Size Class | Breakpoint Width | Columns | Margins | Gutters | Recommended Navigation Pattern |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Compact** | `< 600px` | 4 | `16px` | `16px` | Bottom Navigation Bar |
| **Medium** | `600px – 839px` | 8 | `24px` | `24px` | Navigation Rail (compact side bar) |
| **Expanded** | `840px – 1199px` | 12 | `24px` | `24px` | Navigation Rail or Standard Drawer |
| **Large** | `1200px – 1599px` | 12 | `24px` | `24px` | Persistent Navigation Drawer |
| **Extra Large** | `1600px+` | 12 | `32px` | `24px` | Persistent Navigation Drawer + Side Sheet |

---

## 9. Component Specifications & Tokens (Gold Theme)

### 9.1 Buttons
* **Filled Button (Primary):**
  * Background: `var(--color-brand)` (`#e0d12e`)
  * Color: `var(--color-brand-fg)` (`#0a0a0a`)
  * Radius: `--radius-full` (`9999px`)
  * Height: `40px`, Padding: `0 24px`
  * Typography: `label-large` (14px, weight 600)
  * Hover: Box shadow `var(--shadow-glow)` + brightness boost.
* **Filled Tonal Button:**
  * Background: `var(--md-sys-color-primary-container)`
  * Color: `var(--md-sys-color-on-primary-container)`
  * Radius: `--radius-full`
* **Elevated Button:**
  * Background: `var(--md-sys-color-surface-container-low)`
  * Color: `var(--md-sys-color-primary)`
  * Elevation: Level 1 (`--shadow-elevation-1`)
  * Radius: `--radius-full`
* **Outlined Button:**
  * Background: `transparent`
  * Border: `1px solid var(--md-sys-color-outline)`
  * Color: `var(--md-sys-color-primary)`
  * Radius: `--radius-full`
* **Text Button:**
  * Background: `transparent`
  * Color: `var(--md-sys-color-primary)`
  * Padding: `0 12px`

### 9.2 Floating Action Button (FAB)
* **Standard FAB:** `56x56px`, Container: `var(--color-brand)` (`#e0d12e`), Radius: `16px` (`--md-sys-shape-corner-large`), Elevation: Level 3.
* **Small FAB:** `40x40px`, Radius: `12px` (`--md-sys-shape-corner-medium`).
* **Large FAB:** `96x96px`, Radius: `28px` (`--md-sys-shape-corner-extra-large`).
* **Extended FAB:** Height `56px`, Pill radius `9999px`, Icon + Label (`label-large`).

### 9.3 Cards
* **Elevated Card:**
  * Container: `var(--md-sys-color-surface-container-low)`
  * Elevation: Level 1 at rest; Level 2 on hover.
  * Radius: `12px` (`--md-sys-shape-corner-medium`)
* **Filled Card:**
  * Container: `var(--md-sys-color-surface-container-highest)`
  * Elevation: Level 0 (no shadow)
  * Radius: `12px`
* **Outlined Card:**
  * Container: `var(--md-sys-color-surface)`
  * Border: `1px solid var(--md-sys-color-outline-variant)`
  * Elevation: Level 0
  * Radius: `12px`

### 9.4 Text Fields
* **Outlined Text Field:**
  * Container: `transparent`
  * Border: `1px solid var(--md-sys-color-outline)` (idle), `2px solid var(--color-brand)` (focused)
  * Radius: `8px` (`--md-sys-shape-corner-small`)
  * Label: Floating `body-large` transition to `label-small`
* **Filled Text Field:**
  * Container: `var(--md-sys-color-surface-container-highest)`
  * Bottom Indicator Line: `1px solid var(--md-sys-color-on-surface-variant)` (idle), `2px solid var(--color-brand)` (focused)
  * Top radius: `8px`, Bottom radius: `0px`

### 9.5 Top App Bar & Navigation
* **Top App Bar:**
  * Resting: Level 0, `background: var(--md-sys-color-surface)`
  * Scrolled State: Level 2, `background: var(--md-sys-color-surface-container)` with `backdrop-filter: blur(16px)`
  * Title: `title-large` (22px)
* **Bottom Navigation Bar:**
  * Container: `var(--md-sys-color-surface-container)`
  * Height: `80px`
  * Active Indicator: Pill container (`32x64px`, radius 9999px) with `var(--md-sys-color-primary-container)`

---

## 10. Production CSS Tokens Implementation

Paste this directly into `design system/tokens.css` or load via `@theme` in `globals.css`:

```css
/* ═══════════════════════════════════════════════════════════════════════════
   MATERIAL 3 DESIGN TOKENS — GOLD / AMBER THEME (Niena Labs)
   Canonical reference: https://m3.material.io/
   ═══════════════════════════════════════════════════════════════════════════ */

:root, :root[data-theme="light"] {
  /* ── M3 Light Color Roles (Gold Seed: #e0d12e) ─────────────────────────── */
  --md-sys-color-primary: #6c5e00;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #fbee67;
  --md-sys-color-on-primary-container: #221b00;
  --md-sys-color-inverse-primary: #e0d12e;

  --md-sys-color-secondary: #665e40;
  --md-sys-color-on-secondary: #ffffff;
  --md-sys-color-secondary-container: #ede2bc;
  --md-sys-color-on-secondary-container: #211b04;

  --md-sys-color-tertiary: #43664e;
  --md-sys-color-on-tertiary: #ffffff;
  --md-sys-color-tertiary-container: #c5eccd;
  --md-sys-color-on-tertiary-container: #00210f;

  --md-sys-color-error: #ba1a1a;
  --md-sys-color-on-error: #ffffff;
  --md-sys-color-error-container: #ffdad6;
  --md-sys-color-on-error-container: #410002;

  --md-sys-color-background: #fef9ed;
  --md-sys-color-on-background: #1d1c16;
  --md-sys-color-surface: #fef9ed;
  --md-sys-color-on-surface: #1d1c16;
  --md-sys-color-surface-variant: #e8e2d0;
  --md-sys-color-on-surface-variant: #4a4739;
  
  --md-sys-color-outline: #7b7768;
  --md-sys-color-outline-variant: #ccc6b5;

  --md-sys-color-surface-dim: #ded9cd;
  --md-sys-color-surface-bright: #fef9ed;
  --md-sys-color-surface-container-lowest: #ffffff;
  --md-sys-color-surface-container-low: #f8f3e7;
  --md-sys-color-surface-container: #f2ede1;
  --md-sys-color-surface-container-high: #ece8dc;
  --md-sys-color-surface-container-highest: #e6e2d6;

  --md-sys-color-inverse-surface: #32302a;
  --md-sys-color-inverse-on-surface: #f5f0e4;
  --md-sys-color-surface-tint: #6c5e00;
  --md-sys-color-shadow: #000000;
  --md-sys-color-scrim: #000000;

  /* ── Backward Compatibility Brand Aliases ─────────────────────────────── */
  --color-brand: #e0d12e;
  --color-brand-hover: #c3b51d;
  --color-brand-active: #a09418;
  --color-brand-subtle: #f8f7e7;
  --color-brand-fg: #0a0a0a;

  --color-bg: var(--md-sys-color-background);
  --color-surface: var(--md-sys-color-surface);
  --color-surface-raised: var(--md-sys-color-surface-container-low);
  --color-border: var(--md-sys-color-outline-variant);
  --color-border-strong: var(--md-sys-color-outline);
  --color-fg: var(--md-sys-color-on-surface);
  --color-fg-muted: var(--md-sys-color-on-surface-variant);
  --color-fg-subtle: #7b7768;

  --amber: var(--color-brand);
  --amber-strong: var(--color-brand-hover);
  --amber-deep: var(--color-brand-active);
  --amber-glow: color-mix(in srgb, var(--color-brand) 30%, transparent);
  --amber-wash: var(--color-brand-subtle);
  --on-amber: var(--color-brand-fg);

  /* ── Typography Scale Tokens ───────────────────────────────────────────── */
  --font-display: 'Space Grotesk', Roboto, sans-serif;
  --font-body: 'Inter', Roboto, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  --md-sys-typescale-display-large-size: 3.5625rem; /* 57px */
  --md-sys-typescale-display-large-line-height: 4rem; /* 64px */
  --md-sys-typescale-display-large-weight: 400;
  --md-sys-typescale-display-large-tracking: -0.015em;

  --md-sys-typescale-display-medium-size: 2.8125rem; /* 45px */
  --md-sys-typescale-display-medium-line-height: 3.25rem; /* 52px */
  --md-sys-typescale-display-medium-weight: 400;
  --md-sys-typescale-display-medium-tracking: 0em;

  --md-sys-typescale-display-small-size: 2.25rem; /* 36px */
  --md-sys-typescale-display-small-line-height: 2.75rem; /* 44px */
  --md-sys-typescale-display-small-weight: 400;
  --md-sys-typescale-display-small-tracking: 0em;

  --md-sys-typescale-headline-large-size: 2rem; /* 32px */
  --md-sys-typescale-headline-large-line-height: 2.5rem; /* 40px */
  --md-sys-typescale-headline-large-weight: 400;
  --md-sys-typescale-headline-large-tracking: 0em;

  --md-sys-typescale-headline-medium-size: 1.75rem; /* 28px */
  --md-sys-typescale-headline-medium-line-height: 2.25rem; /* 36px */
  --md-sys-typescale-headline-medium-weight: 400;
  --md-sys-typescale-headline-medium-tracking: 0em;

  --md-sys-typescale-headline-small-size: 1.5rem; /* 24px */
  --md-sys-typescale-headline-small-line-height: 2rem; /* 32px */
  --md-sys-typescale-headline-small-weight: 400;
  --md-sys-typescale-headline-small-tracking: 0em;

  --md-sys-typescale-title-large-size: 1.375rem; /* 22px */
  --md-sys-typescale-title-large-line-height: 1.75rem; /* 28px */
  --md-sys-typescale-title-large-weight: 400;
  --md-sys-typescale-title-large-tracking: 0em;

  --md-sys-typescale-title-medium-size: 1rem; /* 16px */
  --md-sys-typescale-title-medium-line-height: 1.5rem; /* 24px */
  --md-sys-typescale-title-medium-weight: 500;
  --md-sys-typescale-title-medium-tracking: 0.01em;

  --md-sys-typescale-title-small-size: 0.875rem; /* 14px */
  --md-sys-typescale-title-small-line-height: 1.25rem; /* 20px */
  --md-sys-typescale-title-small-weight: 500;
  --md-sys-typescale-title-small-tracking: 0.007em;

  --md-sys-typescale-body-large-size: 1rem; /* 16px */
  --md-sys-typescale-body-large-line-height: 1.5rem; /* 24px */
  --md-sys-typescale-body-large-weight: 400;
  --md-sys-typescale-body-large-tracking: 0.03em;

  --md-sys-typescale-body-medium-size: 0.875rem; /* 14px */
  --md-sys-typescale-body-medium-line-height: 1.25rem; /* 20px */
  --md-sys-typescale-body-medium-weight: 400;
  --md-sys-typescale-body-medium-tracking: 0.018em;

  --md-sys-typescale-body-small-size: 0.75rem; /* 12px */
  --md-sys-typescale-body-small-line-height: 1rem; /* 16px */
  --md-sys-typescale-body-small-weight: 400;
  --md-sys-typescale-body-small-tracking: 0.033em;

  --md-sys-typescale-label-large-size: 0.875rem; /* 14px */
  --md-sys-typescale-label-large-line-height: 1.25rem; /* 20px */
  --md-sys-typescale-label-large-weight: 500;
  --md-sys-typescale-label-large-tracking: 0.007em;

  --md-sys-typescale-label-medium-size: 0.75rem; /* 12px */
  --md-sys-typescale-label-medium-line-height: 1rem; /* 16px */
  --md-sys-typescale-label-medium-weight: 500;
  --md-sys-typescale-label-medium-tracking: 0.04em;

  --md-sys-typescale-label-small-size: 0.6875rem; /* 11px */
  --md-sys-typescale-label-small-line-height: 1rem; /* 16px */
  --md-sys-typescale-label-small-weight: 500;
  --md-sys-typescale-label-small-tracking: 0.045em;

  /* ── Shape Corner Tokens ───────────────────────────────────────────────── */
  --md-sys-shape-corner-none: 0px;
  --md-sys-shape-corner-extra-small: 4px;
  --md-sys-shape-corner-small: 8px;
  --md-sys-shape-corner-medium: 12px;
  --md-sys-shape-corner-large: 16px;
  --md-sys-shape-corner-large-increased: 20px;
  --md-sys-shape-corner-extra-large: 28px;
  --md-sys-shape-corner-extra-large-increased: 32px;
  --md-sys-shape-corner-extra-extra-large: 48px;
  --md-sys-shape-corner-full: 9999px;

  /* ── Elevation Shadows ─────────────────────────────────────────────────── */
  --md-sys-elevation-level-0: none;
  --md-sys-elevation-level-1: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
  --md-sys-elevation-level-2: 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15);
  --md-sys-elevation-level-3: 0 1px 3px rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15);
  --md-sys-elevation-level-4: 0 2px 3px rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15);
  --md-sys-elevation-level-5: 0 4px 4px rgba(0,0,0,0.3), 0 8px 12px 6px rgba(0,0,0,0.15);

  /* ── Motion Tokens ─────────────────────────────────────────────────────── */
  --md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0.0, 0.0, 1.0);
  --md-sys-motion-easing-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1.0);
  --md-sys-motion-easing-emphasized-accelerate: cubic-bezier(0.3, 0.0, 0.8, 0.15);
  --md-sys-motion-easing-standard: cubic-bezier(0.2, 0.0, 0.0, 1.0);
  --md-sys-motion-easing-standard-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --md-sys-motion-easing-standard-accelerate: cubic-bezier(0.4, 0.0, 1.0, 1.0);

  --md-sys-motion-duration-short-1: 50ms;
  --md-sys-motion-duration-short-2: 100ms;
  --md-sys-motion-duration-short-3: 150ms;
  --md-sys-motion-duration-short-4: 200ms;
  --md-sys-motion-duration-medium-1: 250ms;
  --md-sys-motion-duration-medium-2: 300ms;
  --md-sys-motion-duration-medium-3: 350ms;
  --md-sys-motion-duration-medium-4: 400ms;
  --md-sys-motion-duration-long-1: 450ms;
  --md-sys-motion-duration-long-2: 500ms;

  /* ── State Layer Opacity Tokens ────────────────────────────────────────── */
  --md-sys-state-hover-state-layer-opacity: 0.08;
  --md-sys-state-focus-state-layer-opacity: 0.10;
  --md-sys-state-pressed-state-layer-opacity: 0.10;
  --md-sys-state-dragged-state-layer-opacity: 0.16;
  --md-sys-state-disabled-container-opacity: 0.12;
  --md-sys-state-disabled-content-opacity: 0.38;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DARK MODE OVERRIDES ([data-theme="dark"] / .dark)
   ═══════════════════════════════════════════════════════════════════════════ */
:root[data-theme="dark"], .dark {
  --md-sys-color-primary: #e0d12e;
  --md-sys-color-on-primary: #383000;
  --md-sys-color-primary-container: #534800;
  --md-sys-color-on-primary-container: #fbee67;
  --md-sys-color-inverse-primary: #6c5e00;

  --md-sys-color-secondary: #d0c6a1;
  --md-sys-color-on-secondary: #363016;
  --md-sys-color-secondary-container: #4d472a;
  --md-sys-color-on-secondary-container: #ede2bc;

  --md-sys-color-tertiary: #a9d0b2;
  --md-sys-color-on-tertiary: #143722;
  --md-sys-color-tertiary-container: #2c4e37;
  --md-sys-color-on-tertiary-container: #c5eccd;

  --md-sys-color-error: #ffb4ab;
  --md-sys-color-on-error: #690005;
  --md-sys-color-error-container: #93000a;
  --md-sys-color-on-error-container: #ffdad6;

  --md-sys-color-background: #15140f;
  --md-sys-color-on-background: #e6e2d6;
  --md-sys-color-surface: #15140f;
  --md-sys-color-on-surface: #e6e2d6;
  --md-sys-color-surface-variant: #4a4739;
  --md-sys-color-on-surface-variant: #ccc6b5;

  --md-sys-color-outline: #959181;
  --md-sys-color-outline-variant: #4a4739;

  --md-sys-color-surface-dim: #15140f;
  --md-sys-color-surface-bright: #3c3933;
  --md-sys-color-surface-container-lowest: #0f0e0a;
  --md-sys-color-surface-container-low: #1d1c16;
  --md-sys-color-surface-container: #21201a;
  --md-sys-color-surface-container-high: #2c2a24;
  --md-sys-color-surface-container-highest: #37352e;

  --md-sys-color-inverse-surface: #e6e2d6;
  --md-sys-color-inverse-on-surface: #32302a;
  --md-sys-color-surface-tint: #e0d12e;
  --md-sys-color-shadow: #000000;
  --md-sys-color-scrim: #000000;

  /* Dark Mode Brand Aliases */
  --color-brand: #e0d12e;
  --color-brand-hover: #f3efc4;
  --color-brand-active: #f8f7e7;
  --color-brand-subtle: #2f2c0e;
  --color-brand-fg: #0a0a0a;

  --color-bg: var(--md-sys-color-background);
  --color-surface: var(--md-sys-color-surface);
  --color-surface-raised: var(--md-sys-color-surface-container-low);
  --color-border: var(--md-sys-color-outline-variant);
  --color-border-strong: var(--md-sys-color-outline);
  --color-fg: var(--md-sys-color-on-surface);
  --color-fg-muted: var(--md-sys-color-on-surface-variant);
  --color-fg-subtle: #959181;
}
```

---

## 11. AI Coding Directive (Prompt Injection)

When instructing an AI agent or pair programmer to write components under this design system, provide this directive:

> "Design and build components using Google Material 3 (Material You) with our custom Gold/Amber theme (`#e0d12e`). Use the strict token definitions in `design system/design.md`. All primary buttons and high-emphasis controls must use `--color-brand` (`#e0d12e`) with `--color-brand-fg` (`#0a0a0a`). In dark mode, rely on tonal surface elevation (`surface-container-low` through `surface-container-highest`) rather than drop shadows. Keep corners organic (`--radius-full` for buttons and chips; `12px` for cards; `28px` for dialogs). Focus states must always feature the signature amber glow (`0 0 0 4px var(--amber-glow)`). All animations must respect `prefers-reduced-motion`."

---

## 12. Official References & Documentation

* **Material 3 Official Site:** [https://m3.material.io/](https://m3.material.io/)
* **M3 Color Tokens & Roles:** [https://m3.material.io/styles/color/the-color-system/tokens](https://m3.material.io/styles/color/the-color-system/tokens)
* **M3 Typography System:** [https://m3.material.io/styles/typography/type-scale-tokens](https://m3.material.io/styles/typography/type-scale-tokens)
* **M3 Elevation Tokens:** [https://m3.material.io/styles/elevation/tokens](https://m3.material.io/styles/elevation/tokens)
* **M3 Shape System:** [https://m3.material.io/styles/shape/shape-scale-tokens](https://m3.material.io/styles/shape/shape-scale-tokens)
* **M3 Motion & Physics:** [https://m3.material.io/styles/motion/overview](https://m3.material.io/styles/motion/overview)
* **Material Web Components (`@material/web`):** [https://github.com/material-components/material-web](https://github.com/material-components/material-web)
* **Material Theme Builder:** [https://material-foundation.github.io/material-theme-builder/](https://material-foundation.github.io/material-theme-builder/)
