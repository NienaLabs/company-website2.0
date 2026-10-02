# Natural Design System: Component Specifications

This document defines the strict anatomical constraints, variations, and behavioral rules for all core UI components in the Natural Design System.

## 1. Buttons
Buttons are the primary interactive elements. They must be highly visible, organic in shape, and strictly adhere to the 48px minimum touch target rule.

### Variations
- **Primary (Solid):** Uses `--color-brand` with `--color-brand-fg` text. Used for the single most important action on a screen.
- **Secondary (Subtle/Ghost):** Uses `--color-brand-subtle` or `--color-bg-subtle` with brand text. Used for alternative actions.
- **Outline:** Uses a transparent background with `--color-border-strong` and `--color-fg`. Used for neutral actions.
- **Destructive:** Uses `--color-danger` for irreversible actions (e.g., Delete).

### Anatomy & Spacing
- **Shape:** All buttons MUST be fully rounded (`--radius-full`).
- **Height:** Minimum 48px height.
- **Padding:** `--spacing-container-padding` (horizontal) and `--spacing-element-gap` (vertical).
- **Typography:** `--typography-body1-weight` (Regular or Medium), but sentence-cased (no ALL CAPS).
- **Icons:** Standard system icons should be `--icon-size-20` or `--icon-size-24`.

### Interactive States
- **Hover:** Darken or lighten the background using the respective `-hover` color token.
- **Active (Pressed):** Physically shrink the button slightly (e.g., `scale(0.97)`) using `--motion-micro-feedback` and apply the `-active` color token.
- **Focus:** Apply `--focus-outline-width` (2px) and `--focus-outline-offset` (2px) using `--color-ring`.
- **Disabled:** Use `--color-bg-disabled` and `--color-fg-disabled`. Pointer events must be disabled.

---

## 2. Cards
Cards are the primary structural containers for content. In the Natural design system, they often rotate through the alternating secondary colors.

### Variations
- **Elevated:** Uses `--color-surface` (or `--color-surface-raised` in dark mode) and `--shadow-md`.
- **Glass (Translucent):** Uses `--color-surface-glass-base` and `--backdrop-blur-md`. Used when placed over vibrant or rotating backgrounds.
- **Outlined:** Uses transparent background with `--color-border-strong`.
- **Dynamic (Alternating):** Uses `--color-alt-1` through `alt-4`. Must use the respective `on-color` or `-fg` tokens for text legibility.

### Anatomy & Spacing
- **Shape:** Soft, organic corners. Must use `--radius-2xl` or `--radius-3xl`.
- **Padding:** Internal padding must use `--spacing-container-padding`.
- **Gap:** Spacing between elements inside the card (e.g., Title and Body) must use `--spacing-element-gap`.
- **Content Expansion:** Cards should NOT overflow; they must grow dynamically with the size of their content. Avoid hardcoding fixed heights.
- **Grid Usage constraint:** If the content of cards is going to be numerous in a grid, the grid should be replaced by a Carousel component so that the cards have space to breathe instead of overcrowding the layout.

---

## 3. Inputs & Form Controls
Inputs must be clearly identifiable and provide immediate feedback on focus and validation.

### Anatomy
- **Shape:** Less rounded than buttons to distinguish them. Use `--radius-md` or `--radius-lg`.
- **Height:** Minimum 48px height.
- **Border:** `--stroke-width-thin` using `--color-border-strong`.
- **Background:** `--color-surface` or `--color-bg-subtle`.

### States & Validation
- **Focus:** The border color changes to `--color-ring` and applies the standard focus outline offset.
- **Error (Invalid):** Border changes to `--color-danger`. An accompanying error message MUST appear below the input using `--color-danger-fg` and `--typography-caption1-font`.
- **Disabled:** Uses `--color-bg-disabled` and `--color-fg-disabled`.

---

## 4. Navigation & Headers
Navigation must be omnipresent but unobtrusive.

### Anatomy
- **Navbar/Header:** Must use `--z-index-sticky`. The background should heavily rely on glassmorphism (`--color-surface-glass-base` + `--backdrop-blur-lg`) so the page content scrolls naturally underneath it.
- **Navigation Links:** Must have a 48px minimum touch target. Hover states should use a subtle background (`--color-brand-subtle`) with `--radius-full`.

---

## 5. Dialogs & Modals
Dialogs interrupt the user flow and must command immediate attention.

### Anatomy
- **Backdrop:** A dark or blurred overlay must cover the entire screen (`--z-index-overlay`).
- **Container:** The modal itself sits at `--z-index-modal`. Must use the maximum corner radius (`--radius-3xl`) to feel organic.
- **Elevation:** In Light mode, use `--shadow-2xl`. In Dark mode, use `--color-surface-raised` with a subtle 1px border (`--color-border`).
- **Layout:** 
  - Header: Contains the title (`--typography-title2-font`).
  - Body: Contains the content.
  - Footer: Contains actions. Primary action on the right, dismiss/cancel on the left.

---

## 6. Avatars & User Profiles
Avatars visually represent users or entities.
- **Anatomy:** Must be perfectly circular (`--radius-full`).
- **Fallbacks:** If an image fails to load, fallback to a background of `--color-brand-subtle` with the user's initials in `--color-brand-fg`.
- **Sizes:** Map to standard spacing tokens (e.g., Small: 32px, Medium: 40px, Large: 48px).

## 7. Badges & Tags
Used to display status, categories, or micro-information.
- **Anatomy:** Highly compact. Use `--typography-caption1-font` and `--radius-full` to resemble organic pebbles.
- **Variations:** 
  - Status: Use semantic colors (`--color-success-subtle` background with `--color-success-fg` text).
  - Categorical: Use alternating colors (`--color-alt-1-subtle`, etc.) for differentiating multiple tags.

## 8. Dropdowns & Popovers
Floating context menus triggered by user action.
- **Anatomy:** Sits at `--z-index-popover`. Uses `--radius-xl` to differentiate from the larger Modals.
- **Elevation:** Like modals, use `--shadow-lg` in light mode, and `--color-surface-raised` with a `--color-border-strong` border in dark mode.
- **Interaction:** Menu items must have a hover state of `--color-bg-muted` and maintain a minimum height for usability, even if visually compact.

## 9. Toasts & Snackbars (Notifications)
Temporary feedback messages that slide into view.
- **Anatomy:** Positioned at the bottom or top edge. Sits at `--z-index-overlay`.
- **Contrast:** Must use inverted tokens (`--color-bg-inverted` and `--color-fg-inverted`) to guarantee they stand out against any underlying page content.
- **Motion:** Must slide in smoothly using `--motion-expressive-enter` and slide out with `--motion-expressive-exit`.

## 10. Tabs & segmented Controls
Used for switching between views within the same context.
- **Anatomy:** Horizontal lists of items. The active tab must be clearly indicated by either a solid underline (`--color-brand`) or a pill-shaped background (`--color-bg-muted`).
- **Interaction:** Unselected tabs use `--color-fg-subtle` and transition to `--color-fg` on hover. Focus rings (`--focus-outline-width`) must be preserved for keyboard navigation.

## 11. Toggles (Switches) & Checkboxes
Binary state controls for settings and forms.
- **Toggles:** The track uses `--color-bg-muted` when off, and `--color-brand` when on. The thumb (knob) uses `--shadow-sm`. State changes must use `--motion-micro-feedback` for a snappy, physical feel.
- **Checkboxes:** Unlike buttons, checkboxes must have sharp/slight radiuses (`--radius-sm`) to indicate they are a specific binary control, not a general action.

## 12. Tooltips
Micro-contextual help triggered on hover or focus.
- **Anatomy:** The smallest floating element. Uses `--typography-caption1-font`, `--radius-md`, and tight padding (`--spacing-1` vertical, `--spacing-2` horizontal).
- **Z-Index:** Must sit at the absolute top layer (`--z-index-tooltip`).
- **Contrast:** Like toasts, use `--color-bg-inverted` and `--color-fg-inverted`.

## 13. Accordions (Collapsibles)
Used to organize dense information into expandable sections.
- **Anatomy:** The header acts as a button (requires 48px touch target). The expansion icon (usually a chevron) sits on the far right.
- **Motion:** The chevron must rotate using `--motion-micro-feedback`. The content area must smoothly animate its height from 0 to auto to prevent jagged jumping.

---

## 14. Charts & Data Visualization
Used to represent complex data in dashboards.
- **Color Palettes:** Do not use the brand color for data points. Use a dedicated categorical color scale (e.g., `--color-chart-1` through `--color-chart-5`) that guarantees color-blind safe contrast.
- **Typography:** Axis labels and legends must use `--typography-caption1-font` and `--color-fg-subtle` so they don't overpower the data.
- **Interaction:** Hovering over a data point (bar, pie slice, line node) must trigger a Tooltip (see #12) displaying exact values, and lower the opacity of non-hovered elements to `--alpha-40`.

## 15. Tables & Data Grids
Used for rendering dense tabular data.
- **Anatomy:** 
  - Headers: `--typography-body2-weight` (Medium/Bold) with `--color-fg-muted`. Bottom border uses `--stroke-width-thick`.
  - Cells: `--typography-body2-font`. Padding must be dense (e.g., `--spacing-2` vertical) but remain readable.
- **Interaction:** Rows must have a hover state (`--color-bg-subtle`) so users don't lose their place when reading across wide screens.

## 16. Breadcrumbs
Secondary navigation showing the current location's hierarchy.
- **Anatomy:** Inline list of links separated by an icon (usually a chevron or slash). 
- **States:** Previous pages use `--color-fg-subtle` and transition to `--color-fg` on hover. The current page must be bold (`--font-weight-semibold`) and use `--color-fg`.

## 17. Skeletons (Loading States)
Used instead of spinning circles to reduce perceived loading time.
- **Anatomy:** Grey shapes (`--color-bg-muted`) that exactly mimic the typography and image sizes of the incoming content.
- **Motion:** Must feature a continuous CSS pulse or shimmer animation to indicate active background loading, rather than looking like broken empty boxes.

## 18. Progress Bars & Steppers
Indicates completion of a task or multi-step form.
- **Anatomy (Progress Bar):** The track uses `--color-bg-muted`. The fill uses `--color-brand` or `--color-success`. Both track and fill must be `--radius-full`.
- **Anatomy (Stepper):** Numbered circles (`--radius-full`). Completed steps use `--color-success-subtle` background with a checkmark. Active steps use `--color-brand`. Future steps use `--color-bg-muted`.

## 19. Carousels & Sliders
Crucial for the "Natural" design system's rotating cards feature. Use a Carousel when you have many cards that would otherwise overcrowd a grid.
- **Variants:**
  - **Snap (Self-playing or Manual):** The standard variant. Must calculate the focused card (the one closest to the visual center) and apply a different visual state (e.g. `variant="dynamic"`) to highlight it, while unfocused cards use a muted state (e.g. `variant="elevated"`).
  - **Marquee (Continuous):** Used for long carousels with small cards (like testimonials) that don't pause. Cards in this variant continuously scroll seamlessly without stopping.
- **Anatomy:** 
  - **Cards:** Must follow the Card component specs (#2).
  - **Navigation:** Arrow buttons must sit outside the card content or float above it on glass (`--color-surface-glass-base`).
  - **Pagination:** Dots at the bottom. Active dot uses `--color-fg`, inactive dots use `--color-fg-subtle`.
- **Motion:** Swiping or clicking next must use `--motion-productive-shift` for a smooth, non-jarring transition. As cards cycle in the snap variant, their background colors should alternate seamlessly through `--color-alt-1` to `alt-4`.

## 20. File Uploaders (Dropzones)
Areas for users to drag and drop files.
- **Anatomy:** A large container (`--spacing-container-padding`) with a dashed border. Must use `--stroke-width-thick` and `--color-border-strong`.
- **Interaction:** When a user drags a file over the zone (drag-enter), the background must transition to `--color-brand-subtle` and the border to `--color-brand` to provide a clear physical drop target.
