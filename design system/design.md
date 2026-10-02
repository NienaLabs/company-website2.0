# Natural Design System

**Concept:** Based around nature. Nature photos look good because different colors are at play.

## Color System
- **Primary Color:** Golden-yellow (`#e0d12e`, HSL ~54°). Sourced directly from our design tokens (`tokens.css` / `tokens.json`).
- **Alternating Secondary Colors:** We use 4 secondary colors derived from color harmony relationships with the primary:
  1. **Alt-1 — Analogous (Warm Green, ~84°):** `--color-alt-1` / `--color-secondary-a-*`
  2. **Alt-2 — Complementary (Blue-Violet, ~234°):** `--color-alt-2` / `--color-secondary-b-*`
  3. **Alt-3 — Triadic (Teal, ~174°):** `--color-alt-3` / `--color-secondary-c-*`
  4. **Alt-4 — Split-Complementary (Purple, ~264°):** `--color-alt-4` / `--color-secondary-d-*`
- **Usage:** These 4 colors alternate in rotating UI patterns. For example, in a carousel, the focused card cycles through `--color-alt-1` → `--color-alt-2` → `--color-alt-3` → `--color-alt-4` → repeat.
- Each alternating color has `-hover`, `-subtle`, and `-fg` semantic variants for both light and dark themes.

## Component-Based Architecture
- **Strict Reusability:** Everything must be a reusable component to keep the UI consistent.
- **NO INLINE STYLES OR INLINE UTILITIES:** Styles and colors not defined in the design system under no circumstance should ever be injected directly as inline CSS (`style={{}}`) or as arbitrary inline Tailwind utilities (e.g., `text-[14px]`, `bg-[#123456]`). 
- **Abstraction:** If an element requires specific styling or layout, it MUST be built as a reusable React component (e.g. `<Typography variant="display">`, `<GridOverlay>`). You don't style components directly in pages.
- **Creation Rules:** Components are only created if they don't already exist.

## Iconography
- **System Icons:** We use `react-icons` for standard system icons.
- **Product Icons:** Do not use system icons as an alternative for product icons. Product icons are explicitly 3D icons (usually available as pictures in `assets` or `public` folder). If a product icon is necessary, you must ask the user for it.
- **File Format Icons:** Similar to product icons, file format icons are 3D. They won't usually be necessary, but if they are, ask for them.
- *Reference:* Follow Microsoft's Fluent 2 Design Iconography principles (https://fluent2.microsoft.design/iconography).

## Typography, Icons & Borders
- **Semantic Typography Ramp:** Follows Fluent 2 structures with semantic tokens (e.g. `--typography-display-font`, `--typography-body1-size`, `--typography-caption1-line-height`).
- **Font Weights:** `--font-weight-regular` (400), `--font-weight-medium` (500), `--font-weight-semibold` (600), `--font-weight-bold` (700).
- **Icon Sizes:** Ramps from 12px to 48px (`--icon-size-12` through `--icon-size-48`).
- **Stroke Widths:** `--stroke-width-thin` (1px), `--stroke-width-thick` (2px), `--stroke-width-thicker` (4px), `--stroke-width-thickest` (6px).

## Elevation, Materials & Z-Index
- **Elevation:** Make things look real using shadows, depth, and light. Uses shadows (`--shadow-sm` through `--shadow-2xl`).
- **Surface Materials (Glassmorphism):** Foreground surfaces placed over dynamic/rotating backgrounds must use translucent materials (e.g. `--color-surface-glass-base`) and backdrop blur tokens (`--backdrop-blur-sm` through `-xl`) so the vibrant background colors naturally bleed through.
- **Z-Index Ramp:** Uses a fixed ramp for stacking (`--z-index-base`, `--z-index-elevated`, `--z-index-sticky`, `--z-index-overlay`, `--z-index-drawer`, `--z-index-modal`, `--z-index-popover`, `--z-index-tooltip`).
- **Opacity (Alpha):** Transparent alphas follow `--alpha-transparent` (0) through `--alpha-90` (0.9), and `--alpha-opaque` (1).

## Interactive States & Accessibility
- **Semantic Component States:** Use strict tokens for specific UI conditions rather than manual shades:
  - **Hover/Active:** `alt` colors use explicitly mapped hover (`-hover`) and pressed/active (`-active`) variants.
  - **Focus-Visible:** All focusable elements MUST use the standardized `--focus-outline-width` (2px) and `--focus-outline-offset` (2px) with `--focus-outline-color`.
  - **Disabled & Inverted:** Use dedicated semantic tokens for disabled surfaces/text (`--color-bg-disabled`) and inverted contexts where high-contrast is required (`--color-bg-inverted`).

## Motion Choreography
- **Semantic Motion:** Animations must use intent-based semantic motion tokens mapped to the `prefers-reduced-motion` utility:
  - `--motion-expressive-enter` / `-exit` for large layout shifts or hero animations.
  - `--motion-productive-shift` for cards rotating through the alternating colors.
  - `--motion-micro-feedback` for fast, snappy interactions like button clicks or hovers.

## Layout & Semantic Spacing
- Follow Fluent 2 Design Layout guidelines (https://fluent2.microsoft.design/layout).
- **Breakpoints:** Responsive grids map to standard Fluent web breakpoints: Mobile (0px), Tablet (768px), Desktop (1024px), Large (1366px), XLarge (1920px).
- **Base Scale:** We use an **8px base spacing scale** (`--spacing-1` = 8px, `--spacing-2` = 16px, etc.).
- **Semantic Density:** Avoid raw spacing numbers when possible; use anatomical tokens like `--spacing-container-padding`, `--spacing-element-gap`, and `--spacing-section-gap`.

## Semantic Shape & Corner Radius
- **Organic Geometry:** The Natural Design System favors organic, rounded shapes over harsh right angles.
- **Component Shape Mapping:**
  - **Interactive Elements (Buttons, Pills, Badges):** Must be fully rounded (`--radius-full`) to invite interaction.
  - **Containers (Cards, Dialogs, Flyouts):** Use larger, softer radiuses (`--radius-2xl` or `--radius-3xl`) for large structural boundaries.
  - **Inner Elements (Images within cards, small inputs):** Use medium radiuses (`--radius-md` or `--radius-lg`) depending on nested constraints.

## Voice and Tone (Content Guidelines)
- **Calm, Human, and Clear:** Content should sound like a helpful human, never a robot.
- **No Jargon:** Avoid overly technical terms in user-facing UI (e.g., say "We couldn't find that page" instead of "404 Error: Not Found").
- **Action-Oriented:** Button labels and prompts should start with strong, clear verbs (e.g., "Save changes" instead of "Submit").

## Touch Targets & Usability
- **Minimum Interactive Size:** Following Material 3 standards, all interactive elements (buttons, links, icons) MUST have a minimum touch target area of **48x48px**. Even if the visual icon is 16x16px, the invisible clickable padding must extend to 48px to prevent frustrating mis-taps on mobile devices.

## Dark Mode Elevation
- **Color Over Shadow:** Shadows are virtually invisible on dark backgrounds. In Dark Mode, elevation is communicated by making the surface color *lighter*.
- **Implementation:** Elevated components (like modals or dropdowns) must use `--color-surface-raised` instead of `--color-surface` in dark mode to physically separate them from the background canvas.

## Component Anatomy Patterns
- **Primary Actions:** Always positioned consistently (e.g., primary confirmation buttons go on the right, destructive/cancel actions on the left).
- **Z-Pattern Scanning:** Layouts should anticipate the user's natural F-pattern or Z-pattern reading behavior, placing high-importance information on the top-left and actions on the bottom-right.
- *Note:* For detailed structural anatomy of individual components (Buttons, Cards, Inputs, etc.), refer to the separate `components.md` specification.

## Grid & Layout Systems
- **12-Column Grid:** Desktop layouts must align to a standard 12-column grid. Tablet layouts use an 8-column grid, and Mobile uses a 4-column grid.
- **Max Widths:** Content should rarely stretch infinitely. Use a standard `max-w-7xl` (1280px) or `max-w-screen-2xl` container to ensure line-lengths for reading stay within the optimal 60-80 character limit.
- **Fluid Scaling:** Spacing and typography should scale smoothly between breakpoints to prevent jarring jumps on resize.
- **Grid vs Carousel:** If the content of cards is going to be numerous in a grid layout, a Carousel component should be used instead. This ensures cards have space to breathe and prevents the UI from feeling overcrowded or overflowing.

## UX Patterns (Loading, Errors, Empty States)
- **Loading States:** Avoid full-page blocking spinners. Prefer Skeleton Loaders that mimic the shape and rhythm of the incoming content using `--color-bg-muted`. 
- **Empty States:** A page with no data should never just be blank. Always include an abstract 3D icon, a short, calm explanation, and a primary CTA guiding the user on what to do next.
- **Validation & Errors:** Inline validation is preferred over global toast errors for forms. Errors must explicitly state *how* to fix the issue, not just that an error occurred.

## Data Visualization
- **Categorical Palettes:** When rendering charts, do not rely solely on the 4 alternating secondary colors if there are more than 4 data points. Use explicitly defined, color-blind safe palettes.
- **Tooltips:** Hovering over data points must reveal exact values using a tooltip (`--z-index-tooltip`) with inverted colors (`--color-bg-inverted` and `--color-fg-inverted`) for maximum contrast against the charts.

## Micro-interactions & Staggered Animations
- **Staggering:** When lists or grid items enter the screen, they should not appear all at once. Use GSAP's stagger feature (e.g., `stagger: 0.05`) to create a cascading, fluid entrance that mimics natural movement.
- **Feedback:** Every interaction (click, toggle, drag) must provide immediate micro-feedback using `--motion-micro-feedback`.

## Image Style
- **Realistic Images:** Images are meant to be realistic.
- **Abstract Fallback:** Unless real images are present, 3D abstract images with variations of colors will be used.
- **Brand Identity:** Immediately when someone sees the images, it should tell what we're talking about and clearly show it's from Niena Labs.

## Foundation
This design system is built on top of the Microsoft Fluent Design System V2 and incorporates core UX principles from Material Design 3. Anything not explicitly available in these guidelines should be researched from these two sources.
