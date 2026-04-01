import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id:"overview",    label:"Overview"       },
  { id:"philosophy",  label:"Philosophy"     },
  { id:"colors",      label:"Colors"         },
  { id:"typography",  label:"Typography"     },
  { id:"spacing",     label:"Spacing"        },
  { id:"grid",        label:"Grid & Layout"  },
  { id:"borders",     label:"Borders"        },
  { id:"shadows",     label:"Shadows"        },
  { id:"images",      label:"Imagery"        },
  { id:"components",  label:"Components"     },
  { id:"tokens",      label:"All Tokens"     },
];

const COLORS = {
  primary: [
    { name:"Void",         hex:"#0a1214", token:"--color-void",         use:"Page background. The darkest layer. Used only for canvas." },
    { name:"Abyss",        hex:"#0f1a1c", token:"--color-abyss",        use:"Primary dark background. Default background for all containers." },
    { name:"Slate Deep",   hex:"#1c2b2e", token:"--color-slate-deep",   use:"Elevated surface. Cards, sidebar, modals sit on this." },
    { name:"Slate Mid",    hex:"#243438", token:"--color-slate-mid",     use:"Hover states, active cells, selected rows." },
    { name:"Slate Light",  hex:"#2e4248", token:"--color-slate-light",   use:"Borders on dark surfaces, dividers, input outlines." },
  ],
  gold: [
    { name:"Gold True",    hex:"#c9a84c", token:"--color-gold",         use:"PRIMARY ACCENT. Overlines, active indicators, icon accents, focus rings. Max 5% visual area." },
    { name:"Gold Warm",    hex:"#b8943a", token:"--color-gold-warm",     use:"Gold on hover. Slightly deeper — signals interactivity." },
    { name:"Gold Muted",   hex:"#8a7040", token:"--color-gold-muted",    use:"Disabled gold elements, decorative borders, secondary accent." },
    { name:"Gold Faint",   hex:"#c9a84c1a",token:"--color-gold-faint",   use:"Gold tint backgrounds. rgba(201,168,76,0.10). Use for highlighted rows, callouts." },
  ],
  text: [
    { name:"Parchment",    hex:"#e8dfc8", token:"--color-text-primary",  use:"Primary text. All headings and body content." },
    { name:"Vellum",       hex:"#c4b898", token:"--color-text-secondary", use:"Secondary text. Captions, metadata, supporting copy." },
    { name:"Stone",        hex:"#7a8e92", token:"--color-text-muted",     use:"Placeholder text, disabled labels, helper text." },
    { name:"Whisper",      hex:"#ffffff14",token:"--color-text-ghost",    use:"Subtle text on dark surfaces. rgba(255,255,255,0.08)." },
  ],
  semantic: [
    { name:"Success",      hex:"#4a7c5a", token:"--color-success",       use:"Positive states. Success toasts, valid inputs, completed steps." },
    { name:"Warning",      hex:"#8a6a28", token:"--color-warning",       use:"Warning states. Stays close to gold family to remain on-brand." },
    { name:"Error",        hex:"#7a3030", token:"--color-error",         use:"Destructive states. Error toasts, invalid inputs, delete actions." },
    { name:"Info",         hex:"#2e5a6a", token:"--color-info",          use:"Neutral info states. Informational toasts, help callouts." },
  ],
};

const SPACING = [
  { token:"--space-1",  name:"Hairline",  px:2,   rem:"0.125rem", use:"Divider lines, border offsets, micro-insets",                     role:"structural" },
  { token:"--space-2",  name:"Sliver",    px:4,   rem:"0.25rem",  use:"Icon padding, badge insets, gap between inline elements",          role:"structural" },
  { token:"--space-3",  name:"Notch",     px:8,   rem:"0.5rem",   use:"Tag padding, tight label gaps, overline-to-title margin",           role:"component"  },
  { token:"--space-4",  name:"Module",    px:12,  rem:"0.75rem",  use:"Caption-to-body gap, small card inner padding",                     role:"component"  },
  { token:"--space-5",  name:"Column",    px:16,  rem:"1rem",     use:"Standard bento cell inner padding, body text line gap",             role:"layout"     },
  { token:"--space-6",  name:"Pillar",    px:24,  rem:"1.5rem",   use:"Card content padding, bento gutter (default), section sub-headers", role:"layout"     },
  { token:"--space-7",  name:"Arcade",    px:32,  rem:"2rem",     use:"Large card padding, headline-to-body gap, featured cell inset",     role:"layout"     },
  { token:"--space-8",  name:"Portico",   px:48,  rem:"3rem",     use:"Section-level spacing, hero cell vertical padding",                 role:"section"    },
  { token:"--space-9",  name:"Atrium",    px:64,  rem:"4rem",     use:"Page section breaks, top/bottom bento grid margins",                role:"section"    },
  { token:"--space-10", name:"Colonnade", px:96,  rem:"6rem",     use:"Major layout divisions, full-bleed hero vertical rhythm",           role:"page"       },
  { token:"--space-11", name:"Forum",     px:128, rem:"8rem",     use:"Page-level top margin, grand section entrances",                    role:"page"       },
];

const SHADOWS = [
  { name:"Elevation 0",   token:"--shadow-0",  value:"none",                                                                                      use:"Flat elements. Default card state. No depth." },
  { name:"Elevation 1",   token:"--shadow-1",  value:"0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",                                    use:"Raised inputs, tags, small interactive chips." },
  { name:"Elevation 2",   token:"--shadow-2",  value:"0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",                                   use:"Cards, bento cells, dropdowns at rest." },
  { name:"Elevation 3",   token:"--shadow-3",  value:"0 8px 24px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.35)",                                  use:"Hovered cards, active dropdowns, context menus." },
  { name:"Elevation 4",   token:"--shadow-4",  value:"0 16px 40px rgba(0,0,0,0.65), 0 8px 16px rgba(0,0,0,0.4)",                                use:"Modals, side sheets, floating panels." },
  { name:"Elevation 5",   token:"--shadow-5",  value:"0 24px 64px rgba(0,0,0,0.75), 0 12px 24px rgba(0,0,0,0.45)",                              use:"Full-screen overlays, drawer backgrounds." },
  { name:"Gold Glow",     token:"--shadow-gold",value:"0 0 0 1px rgba(201,168,76,0.4), 0 4px 16px rgba(201,168,76,0.15)",                       use:"Focus rings, active/selected bento cells, primary CTA hover." },
  { name:"Gold Focus",    token:"--shadow-focus",value:"0 0 0 2px #0f1a1c, 0 0 0 4px rgba(201,168,76,0.6)",                                     use:"Keyboard focus indicator. Accessibility-compliant. Use on ALL focusable elements." },
  { name:"Inset",         token:"--shadow-inset",value:"inset 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 1px rgba(0,0,0,0.3)",                      use:"Depressed states, pressed buttons, active inputs." },
];

const BORDERS = [
  { name:"Hairline",      token:"--border-hairline",  value:"1px solid rgba(255,255,255,0.06)",  use:"Subtlest divider. Row separators, internal card dividers." },
  { name:"Subtle",        token:"--border-subtle",    value:"1px solid rgba(255,255,255,0.10)",  use:"Default card borders, bento cell edges." },
  { name:"Default",       token:"--border-default",   value:"1px solid #2e4248",                 use:"Input fields, form elements, standard component outlines." },
  { name:"Emphasis",      token:"--border-emphasis",  value:"1px solid #4a5e62",                 use:"Focused containers, hovered cards, active sidebar items." },
  { name:"Gold",          token:"--border-gold",      value:"1px solid rgba(201,168,76,0.4)",    use:"Active cell border, selected state, primary CTA outline." },
  { name:"Gold Strong",   token:"--border-gold-strong",value:"1px solid #c9a84c",               use:"Single decorative accent line. Use at most once per component." },
  { name:"Gold Faint",    token:"--border-gold-faint", value:"1px solid rgba(201,168,76,0.15)",  use:"Section-level dividers that carry gold brand identity subtly." },
  { name:"Destructive",   token:"--border-error",     value:"1px solid rgba(122,48,48,0.6)",     use:"Error state input borders, destructive confirmation dialogs." },
  { name:"Radius — Cell", token:"--radius-cell",      value:"4px",                              use:"ALL bento cells. ALL cards. ALL modals. Chamfered, never rounded." },
  { name:"Radius — Tag",  token:"--radius-tag",       value:"2px",                              use:"Tags, badges, chips. Tighter chamfer." },
  { name:"Radius — Button",token:"--radius-btn",      value:"3px",                              use:"Buttons. Between tag and cell tightness." },
  { name:"Radius — Input",token:"--radius-input",     value:"3px",                              use:"All form inputs, selects, textareas." },
];

const COMPONENTS = [
  {
    name: "Cards",
    icon: "▣",
    rules: [
      "Background: --color-slate-deep (#1c2b2e). Never white or transparent.",
      "Border: --border-subtle as default. Upgrades to --border-gold on hover or selected state.",
      "Border-radius: exactly 4px (--radius-cell). Non-negotiable.",
      "Inner padding: --space-6 (24px) for standard cards. --space-7 (32px) for featured or hero cards.",
      "Shadow: --shadow-2 at rest. --shadow-3 on hover. Never use drop shadows with warm/golden color.",
      "Card header uses Cinzel for overline, Cormorant Garamond for title. Never plain text headers.",
      "Dividers inside cards: --border-hairline only. Never a full --border-default inside a card.",
      "If a card has an image, image always bleeds to all three top edges with object-fit:cover. Never float an image inside padded content.",
      "Gold accent within a card: one instance only. Either a top border line (border-top: --border-gold-strong) OR a gold overline text. Never both.",
    ]
  },
  {
    name: "Bento Grid",
    icon: "⊞",
    rules: [
      "Gutter between all cells: --space-6 (24px). Fixed. Never change this value.",
      "Outer grid margin: --space-9 (64px) on desktop, --space-7 (32px) on tablet, --space-6 (24px) on mobile.",
      "All cells use border-radius: 4px. Even image-only cells.",
      "Featured/wide cells get --space-7 (32px) inner padding. Standard cells get --space-6 (24px).",
      "A maximum of one chamfered cell per grid (using clip-path polygon) to echo the logo mark. Use on the hero cell only.",
      "Cell aspect ratios: wide cells 16:9 or 3:2. Tall cells 2:3 or 3:4. Square cells 1:1.",
      "Never nest a bento grid inside a bento cell.",
      "Text over image cells: bottom-anchored gradient scrim only. No solid bars, no frosted glass.",
      "Scrim formula: linear-gradient(to top, rgba(10,18,20,0.92) 0%, rgba(10,18,20,0.5) 50%, transparent 100%).",
    ]
  },
  {
    name: "Buttons",
    icon: "⬡",
    rules: [
      "PRIMARY: background --color-gold, color --color-void, font Cinzel 10px tracking 0.18em. Hover: --color-gold-warm. Never use gold background for anything else.",
      "SECONDARY: background transparent, border --border-gold, color --color-gold, font Cinzel 10px. Hover: gold-faint background.",
      "GHOST: background transparent, border --border-subtle, color --color-text-secondary. Hover: --border-emphasis.",
      "DESTRUCTIVE: background transparent, border --border-error, color --color-error. Never use red background.",
      "Border-radius: 3px on all buttons (--radius-btn).",
      "Padding: --space-3 vertical (8px), --space-6 horizontal (24px) for standard. --space-2 / --space-4 for compact.",
      "All button text in Cinzel, uppercase, letter-spacing 0.16em minimum. Never EB Garamond or Cormorant for button labels.",
      "Focus state: --shadow-focus on all buttons. Non-negotiable for accessibility.",
      "Loading state: replace text with a thin animated gold line (width oscillating). Never use spinners.",
      "Icon buttons: 36x36px minimum touch target. Icon centered. Border --border-subtle.",
    ]
  },
  {
    name: "Inputs & Forms",
    icon: "▭",
    rules: [
      "Background: --color-void (#0a1214) — darker than the card it sits in, creating a recessed feel.",
      "Border: --border-default at rest. --border-gold on focus. --border-error on invalid.",
      "Border-radius: 3px (--radius-input).",
      "Label: Cinzel, 9px, tracking 0.2em, color --color-gold, uppercase. Always above the input, never floating/inside.",
      "Placeholder text: --color-text-muted. Font: EB Garamond italic.",
      "Input text: EB Garamond, 16px, color --color-text-primary.",
      "Helper/error text: EB Garamond italic, 13px, appears below input. Error text uses --color-error.",
      "Focus ring: --shadow-focus. The gold double-ring is the brand's interaction signature.",
      "Padding: --space-3 vertical (8px), --space-4 horizontal (12px).",
      "Select dropdowns: same styling as inputs. Custom arrow icon in --color-gold.",
      "Textarea: min-height 120px. Same rules as input. resize: vertical only.",
      "Form section headers: Cormorant Garamond Light italic, with a --border-gold-faint rule below.",
    ]
  },
  {
    name: "Sidebar / Navigation",
    icon: "▤",
    rules: [
      "Background: --color-slate-deep (#1c2b2e). Right edge: 1px solid rgba(255,255,255,0.06).",
      "Width: 240px collapsed label sidebar. 280px with descriptions. 72px icon-only collapsed state.",
      "Logo area: --space-7 (32px) padding all sides. Gold mark at top left, logotype in Cormorant Garamond.",
      "Nav item: Cinzel 10px, tracking 0.14em, uppercase. Color --color-text-secondary at rest.",
      "Nav item hover: background rgba(201,168,76,0.06), color --color-text-primary, left border 2px solid --color-gold.",
      "Nav item active: background rgba(201,168,76,0.10), color --color-gold, left border 2px solid --color-gold.",
      "Section dividers in nav: --border-hairline with Cinzel 8px gold label above each section.",
      "Bottom of sidebar (user profile area): separated by --border-hairline. Avatar 32px, name in EB Garamond, role in Cinzel 9px.",
      "Sidebar transition: 200ms ease. Never bounce or spring animations on sidebar.",
      "Mobile: sidebar becomes a bottom sheet or full overlay. Same background, slides in from left.",
    ]
  },
  {
    name: "Toasts / Notifications",
    icon: "◫",
    rules: [
      "Position: bottom-right, --space-6 (24px) from screen edges. Stack vertically with --space-3 (8px) gap.",
      "Width: 320px fixed. Never wider.",
      "Background: --color-slate-deep. Border: left 3px solid (semantic color) + --border-subtle on other 3 sides.",
      "SUCCESS: left border #4a7c5a. Icon: a thin checkmark in success color.",
      "WARNING: left border #8a6a28 (gold-warm). Keeps brand alignment.",
      "ERROR: left border #7a3030.",
      "INFO: left border #2e5a6a.",
      "Toast title: Cinzel 10px tracking 0.14em uppercase, --color-text-primary.",
      "Toast body: EB Garamond 14px, --color-text-secondary.",
      "Dismiss: X icon top-right, --color-text-muted. Hover: --color-gold.",
      "Auto-dismiss: 4000ms for info/success. 6000ms for warning. Error never auto-dismisses.",
      "Animation: slides in from right (translateX 110% → 0), fade in. Exits reverse. Duration 240ms ease-out.",
      "Shadow: --shadow-4. Toasts must feel elevated above all content.",
    ]
  },
  {
    name: "Modals & Dialogs",
    icon: "⬜",
    rules: [
      "Backdrop: rgba(10,18,20,0.85). backdrop-filter: blur(4px). Never a flat dark overlay.",
      "Modal surface: --color-slate-deep. Border: --border-subtle. Border-radius: 4px.",
      "Max-width: 560px (standard). 720px (large). 420px (confirmation/compact).",
      "Header: Cormorant Garamond Light 28px title + optional Cinzel 9px overline above it. Separated from body by --border-hairline.",
      "Body padding: --space-7 (32px).",
      "Footer: --border-hairline above, --space-6 (24px) padding. Buttons right-aligned. Destructive action left-aligned.",
      "Shadow: --shadow-5.",
      "Close button: top-right corner. X icon, --color-text-muted. 36x36px target. Hover: --color-gold.",
      "Entry animation: scale 0.96 → 1 + fade in. 200ms ease-out. Never slide from top/bottom.",
      "Confirmation dialogs (destructive): add --border-error as top border of modal header.",
    ]
  },
  {
    name: "Tables & Data",
    icon: "⊟",
    rules: [
      "Table background: --color-abyss (#0f1a1c).",
      "Table header: background --color-slate-deep. Cinzel 9px, tracking 0.2em, uppercase, --color-gold.",
      "Header border-bottom: --border-gold-faint.",
      "Row: border-bottom --border-hairline. Even rows: rgba(255,255,255,0.015) background tint.",
      "Row hover: background rgba(201,168,76,0.04). Transition 120ms.",
      "Row selected: background rgba(201,168,76,0.08). Left border 2px solid --color-gold.",
      "Cell text: EB Garamond 14px --color-text-primary. Numeric data: monospace, right-aligned.",
      "Cell padding: --space-4 vertical (12px), --space-5 horizontal (16px).",
      "Pagination: Cinzel 10px. Active page: --color-gold. Prev/Next: ghost button style.",
      "Empty state: Cormorant Garamond italic 20px, centered, --color-text-muted. Icon in --color-gold-muted above.",
      "Sort indicators: thin gold caret. Only visible on hovered or active column.",
    ]
  },
  {
    name: "Tags & Badges",
    icon: "⬡",
    rules: [
      "Border-radius: 2px (--radius-tag). Never pill/rounded.",
      "Padding: --space-2 vertical (4px), --space-3 horizontal (8px).",
      "Font: Cinzel, 9px, tracking 0.14em, uppercase.",
      "DEFAULT tag: background rgba(255,255,255,0.06), border --border-subtle, color --color-text-secondary.",
      "GOLD/featured tag: background rgba(201,168,76,0.12), border --border-gold, color --color-gold.",
      "SUCCESS tag: background rgba(74,124,90,0.15), border 1px solid rgba(74,124,90,0.4), color #6aad84.",
      "ERROR tag: background rgba(122,48,48,0.15), border 1px solid rgba(122,48,48,0.4), color #c47070.",
      "WARNING tag: same as gold tag — stays on-brand.",
      "Numeric badge (notification dot): 18px circle, background --color-gold, color --color-void, font Cinzel 9px.",
      "Tags never use border-radius above 2px. Rounded badges break the architectural language.",
    ]
  },
  {
    name: "Dropdowns & Menus",
    icon: "≡",
    rules: [
      "Background: --color-slate-deep. Border: --border-subtle. Border-radius: 4px. Shadow: --shadow-3.",
      "Min-width: 180px. Max-width: 320px. Never wider than the trigger element by more than 100px.",
      "Menu item: EB Garamond 15px, --color-text-secondary, padding --space-3 vertical / --space-5 horizontal.",
      "Menu item hover: background rgba(201,168,76,0.06), color --color-text-primary.",
      "Menu item active/selected: background rgba(201,168,76,0.10), color --color-gold. Checkmark icon in gold.",
      "Destructive item: color --color-error. Hover background rgba(122,48,48,0.10).",
      "Dividers: --border-hairline. Section labels above divider: Cinzel 8px gold uppercase.",
      "Entry animation: scale-y 0.95 → 1 + fade in from origin point. 160ms ease-out.",
      "Keyboard navigation: focus ring --shadow-focus on each item.",
    ]
  },
  {
    name: "Progress & Loading",
    icon: "◌",
    rules: [
      "Progress bar track: --color-slate-mid height 2px. Fill: linear-gradient(90deg, --color-gold-warm, --color-gold).",
      "Never use circular spinners. Use horizontal progress bars or skeleton screens.",
      "Skeleton screens: --color-slate-mid background. Shimmer animation using a gold-tinted gradient sweep: background-size 200%, keyframe shifting from left to right. Duration 1.6s ease infinite.",
      "Loading state text: Cinzel 9px tracking 0.2em uppercase, --color-text-muted, animated ellipsis.",
      "Step indicators: Cinzel numbers in --color-slate-light circles. Completed: filled --color-gold circle. Active: --border-gold ring.",
      "Indeterminate bar: same 2px track, fill animates from left edge and exits right. Duration 1.4s infinite.",
    ]
  },
  {
    name: "Tooltips",
    icon: "◉",
    rules: [
      "Background: --color-slate-mid (#243438). Border: --border-subtle. Border-radius: 3px.",
      "Font: EB Garamond 13px italic, --color-text-secondary. Max-width: 220px.",
      "Padding: --space-2 vertical (4px), --space-3 horizontal (8px).",
      "Shadow: --shadow-2.",
      "Arrow: 4px CSS triangle matching background color. Never a border on the arrow.",
      "Delay: 300ms before showing. 0ms on hide.",
      "Animation: fade in 160ms. No slide or scale — tooltips appear, they don't fly.",
      "Never use tooltips on mobile. Convert to a bottom sheet or helper text instead.",
    ]
  },
  {
    name: "Avatars",
    icon: "◎",
    rules: [
      "Shape: square with border-radius 3px. Never circular. Circular avatars conflict with the architectural brand.",
      "Sizes: 24px (xs), 32px (sm), 40px (md), 48px (lg), 64px (xl).",
      "Border: --border-subtle by default. --border-gold on active/selected user.",
      "Fallback (no image): background --color-slate-mid, initials in Cinzel font, color --color-gold.",
      "Avatar group (stacked): 4px overlap, each bordered by --color-abyss 2px to create separation.",
      "Status dot: 8px circle, bottom-right of avatar. Online: --color-success. Away: --color-warning. Offline: --color-slate-light.",
    ]
  },
];

const IMAGE_RULES = [
  { rule:"Subject Matter",     detail:"Architecture, still life, landscape, and portrait only. All subjects must carry inherent stillness — composed and intentional, never candid or spontaneous. Avoid sports, crowds, technology/screens, or anything lifestyle-casual." },
  { rule:"Tonal Palette",      detail:"Warm and desaturated. Target colors: parchment, stone, umber, aged bronze, deep shadow. Avoid cool greys, clinical whites, oversaturated editorial tones, or any color that reads as modern or digital. A global sepia wash at 15–20% opacity unifies mixed image libraries." },
  { rule:"Aspect Ratios",      detail:"Wide bento cells: 16:9 or 3:2 (panoramic). Tall cells: 2:3 or 3:4 (portrait). Square cells: 1:1 (object study, tight crop). Images always bleed to the cell edge with object-fit:cover. The cell's 4px border-radius clips the image — never apply a separate image border-radius." },
  { rule:"Finish & Treatment", detail:"Fine art print quality: light grain overlay (3–5% noise), lifted shadows (black point no lower than 15), reduced saturation (−15 to −25), soft highlight roll-off. No HDR sharpening, no heavy vignettes, no social-media clarity boosts, no AI-upscaling artifacts." },
  { rule:"Lighting",           detail:"Raking or diagonal light that reveals surface texture. Avoid flat frontal lighting. Golden hour tones preferred over midday white light. Chiaroscuro (dramatic light/shadow contrast) is appropriate for editorial cells." },
  { rule:"Composition",        detail:"Subjects occupy no more than 60% of the frame. Remaining space is intentional negative space. Axial or symmetrical compositions preferred. Rule-of-thirds is acceptable. Random or snapshot framing is never acceptable." },
  { rule:"Text Overlay",       detail:"Bottom-anchored gradient scrim: linear-gradient(to top, rgba(10,18,20,0.92) 0%, rgba(10,18,20,0.5) 50%, transparent 100%). Cormorant Garamond Light for the headline. Cinzel for the overline label above it. Never a solid bar, frosted panel, or semi-opaque rectangle." },
  { rule:"AI-Generated Images",detail:"If generating imagery with AI: prompt must include 'fine art photography', 'warm tones', 'muted palette', 'architectural composition', 'soft grain', 'classical still life' or equivalent. Never use AI prompts that produce sharp digital aesthetics, neon, or high-saturation outputs." },
  { rule:"Forbidden",          detail:"No stock photography clichés (handshakes, laptops in coffee shops, diverse-team-smiling). No screenshots. No illustrations unless commissioned in a line-engraving style consistent with the neoclassical brand. No flat icons used as images in bento cells." },
];

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

const GoldLine = ({ width = 48, mb = 28 }) => (
  <div style={{ width, height: 1, background: "#c9a84c", marginBottom: mb }} />
);

const Overline = ({ children }) => (
  <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".28em", color: "#c9a84c", marginBottom: 12, textTransform: "uppercase" }}>
    {children}
  </div>
);

const SectionTitle = ({ children, size = 42 }) => (
  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: size, margin: "0 0 4px", lineHeight: 1.1, color: "#e8dfc8" }}>
    {children}
  </h2>
);

const Rule = ({ label, children }) => (
  <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
    <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".18em", color: "rgba(201,168,76,0.7)", marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(232,223,200,0.6)" }}>{children}</div>
  </div>
);

const Code = ({ children }) => (
  <code style={{ fontFamily: "monospace", fontSize: 12, color: "#c9a84c", background: "rgba(201,168,76,0.08)", padding: "2px 7px", borderRadius: 2 }}>
    {children}
  </code>
);

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <section id="overview" style={{ marginBottom: 96 }}>
      <Overline>Brand Design System · v1.0</Overline>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 64, margin: "0 0 4px", lineHeight: 1.0, color: "#e8dfc8" }}>
        Design System
      </h1>
      <GoldLine width={64} mb={32} />
      <p style={{ fontSize: 18, lineHeight: 1.85, color: "rgba(232,223,200,0.6)", maxWidth: 620, marginBottom: 40 }}>
        This document is the single source of truth for all visual decisions. Every developer, designer, and AI agent building on this system must follow these guidelines without exception. No arbitrary values. No unapproved deviations.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 8 }}>
        {[
          { label: "Design Style", value: "Neoclassical", note: "Architectural precision, historical gravitas, composed stillness" },
          { label: "Layout System", value: "Bento Grid", note: "Strict gutters, chamfered cells, proportional aspect ratios" },
          { label: "Color Mode", value: "Dark Native", note: "Dark slate as primary. Light mode is secondary/functional only." },
        ].map(c => (
          <div key={c.label} style={{ background: "#1c2b2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "24px 24px 20px" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".18em", color: "rgba(201,168,76,0.65)", marginBottom: 8, textTransform: "uppercase" }}>{c.label}</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: "#e8dfc8", marginBottom: 8 }}>{c.value}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(232,223,200,0.45)" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" style={{ marginBottom: 96 }}>
      <Overline>Foundation</Overline>
      <SectionTitle>Design Philosophy</SectionTitle>
      <GoldLine />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { title: "Neoclassical First", body: "Every decision must be defensible in classical architectural terms. If a Roman architect or 18th-century engraver would find it chaotic or frivolous, it doesn't belong in this system. Proportion, symmetry, and restraint are non-negotiable virtues." },
          { title: "Dark Is Native", body: "This brand lives on dark surfaces. The logo was designed for black. All component defaults are dark. Light mode is a functional accommodation, not the intended expression. Never treat dark mode as a variant — it is the source." },
          { title: "Gold Is a Signal", body: "Gold (#c9a84c) occupies a maximum of 5% of any visual composition. It punctuates, it does not fill. One gold overline, one gold border, one gold accent per component. The moment gold becomes a background or dominant color, the brand collapses into decoration." },
          { title: "Geometry Over Organic", body: "Border-radius is 4px maximum. No pill shapes, no circles on non-circular elements, no soft blobs. The chamfer in the logo mark is the geometric signature of this brand — it implies precision, cut stone, and craft." },
          { title: "Cinzel for Authority, Garamond for Voice", body: "Cinzel speaks in the brand's institutional voice: labels, navigation, overlines, tags. Cormorant Garamond carries expressive weight: titles, headlines, editorial moments. EB Garamond serves the reader: body text, descriptions, captions. Never mix these roles." },
          { title: "Negative Space Is Expensive", body: "Empty space is not a failure of content. In this system, generous negative space is a luxury signal — it says this brand can afford restraint. Do not fill every cell. Do not crowd every component. Let the grid breathe." },
        ].map(p => (
          <div key={p.title} style={{ background: "#1c2b2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "28px 28px 24px" }}>
            <div style={{ borderTop: "2px solid #c9a84c", paddingTop: 16, marginBottom: 12 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: ".12em", color: "#e8dfc8", textTransform: "uppercase" }}>{p.title}</div>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(232,223,200,0.55)" }}>{p.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Colors() {
  const [copied, setCopied] = useState(null);
  const copy = (hex, key) => { navigator.clipboard.writeText(hex); setCopied(key); setTimeout(() => setCopied(null), 1400); };

  return (
    <section id="colors" style={{ marginBottom: 96 }}>
      <Overline>Visual Foundation</Overline>
      <SectionTitle>Color System</SectionTitle>
      <GoldLine />
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(232,223,200,0.55)", maxWidth: 560, marginBottom: 40 }}>
        Two primary families — slate and gold — with semantic extensions. Gold is a punctuation color, not a fill. Slate is the material of the brand. All colors have tokens; use tokens, never raw hex values in components.
      </p>

      {Object.entries(COLORS).map(([group, swatches]) => (
        <div key={group} style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".2em", color: "rgba(201,168,76,0.55)", marginBottom: 12, textTransform: "uppercase" }}>
            {group === "primary" ? "Slate Family" : group === "gold" ? "Gold Family" : group === "text" ? "Text Palette" : "Semantic Colors"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {swatches.map(s => {
              const k = group + s.name;
              const isDark = !s.hex.includes("14") && !s.hex.includes("1a") && group !== "text";
              return (
                <div key={s.name} onClick={() => copy(s.hex, k)} style={{ background: "#1c2b2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: 52, background: s.hex, borderBottom: "1px solid rgba(255,255,255,0.07)" }} />
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: ".1em", color: "#e8dfc8", marginBottom: 4 }}>{s.name}</div>
                    <Code>{s.token}</Code>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(232,223,200,0.4)", marginTop: 4 }}>{s.hex}</div>
                    <div style={{ fontSize: 11, color: "rgba(232,223,200,0.4)", marginTop: 6, lineHeight: 1.5 }}>{s.use}</div>
                    {copied === k && <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#c9a84c", marginTop: 6, letterSpacing: ".1em" }}>COPIED</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function Typography() {
  return (
    <section id="typography" style={{ marginBottom: 96 }}>
      <Overline>Type System</Overline>
      <SectionTitle>Typography</SectionTitle>
      <GoldLine />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 48 }}>
        {[
          { role:"Display / Headings", face:"Cormorant Garamond", weights:"300, 400, 600 + Italic", sizes:"28–64px", use:"Hero text, section titles, editorial pull quotes, modal titles, card headlines.", sample:"The Form of Things Eternal", sampleSize: 36 },
          { role:"Body / Reading",     face:"EB Garamond",         weights:"400, 500 + Italic", sizes:"14–18px", use:"Body copy, descriptions, captions, form labels (content), table cell text.", sample:"Measured by the beauty of proportion, every classical form earns its space.", sampleSize: 16 },
          { role:"Accent / UI Labels", face:"Cinzel",              weights:"400, 600",           sizes:"8–13px",  use:"Navigation, overlines, tags, button labels, table headers, section dividers. Uppercase only.", sample:"DESIGN SYSTEM · COMPONENTS", sampleSize: 13 },
        ].map(t => (
          <div key={t.face} style={{ background: "#1c2b2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "28px 24px" }}>
            <div style={{ borderTop: "1px solid #c9a84c", paddingTop: 16, marginBottom: 16 }}>
              <Overline>{t.role}</Overline>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, letterSpacing: ".06em", color: "#e8dfc8" }}>{t.face}</div>
            </div>
            <div style={{ fontFamily: t.face === "Cinzel" ? "'Cinzel',serif" : t.face === "EB Garamond" ? "'EB Garamond',serif" : "'Cormorant Garamond',serif", fontSize: t.sampleSize, fontWeight: 300, color: "rgba(232,223,200,0.8)", lineHeight: 1.4, marginBottom: 20, minHeight: 56 }}>
              {t.sample}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(232,223,200,0.4)" }}>
              <div><strong style={{ color: "rgba(232,223,200,0.6)" }}>Weights:</strong> {t.weights}</div>
              <div><strong style={{ color: "rgba(232,223,200,0.6)" }}>Sizes:</strong> {t.sizes}</div>
              <div style={{ marginTop: 8 }}>{t.use}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Type scale */}
      <div style={{ background: "#0a1214", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "32px 32px 24px" }}>
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".2em", color: "rgba(201,168,76,0.6)", marginBottom: 20, textTransform: "uppercase" }}>Type Scale</div>
        {[
          { label:"Display",   size:"64px / 4rem",  lh:"1.0", weight:"300", font:"Cormorant Garamond", tracking:"-0.01em" },
          { label:"H1",        size:"48px / 3rem",  lh:"1.1", weight:"300", font:"Cormorant Garamond", tracking:"-0.01em" },
          { label:"H2",        size:"36px / 2.25rem",lh:"1.15",weight:"300",font:"Cormorant Garamond", tracking:"0"       },
          { label:"H3",        size:"28px / 1.75rem",lh:"1.2", weight:"400", font:"Cormorant Garamond", tracking:"0"      },
          { label:"H4",        size:"22px / 1.375rem",lh:"1.3",weight:"400",font:"Cormorant Garamond", tracking:"0"       },
          { label:"Body Lg",   size:"18px / 1.125rem",lh:"1.8",weight:"400",font:"EB Garamond",        tracking:"0"       },
          { label:"Body",      size:"16px / 1rem",  lh:"1.75",weight:"400", font:"EB Garamond",        tracking:"0"       },
          { label:"Body Sm",   size:"14px / 0.875rem",lh:"1.7",weight:"400",font:"EB Garamond",        tracking:"0"       },
          { label:"Caption",   size:"13px / 0.8125rem",lh:"1.6",weight:"400",font:"EB Garamond italic",tracking:"0"      },
          { label:"Overline",  size:"9px / 0.5625rem",lh:"1",  weight:"400", font:"Cinzel",            tracking:"0.24em"  },
          { label:"Label",     size:"10px / 0.625rem",lh:"1",  weight:"400", font:"Cinzel",            tracking:"0.18em"  },
          { label:"UI Sm",     size:"9px / 0.5625rem",lh:"1",  weight:"400", font:"Cinzel",            tracking:"0.14em"  },
        ].map((s, i) => (
          <div key={s.label} style={{ display: "grid", gridTemplateColumns: "80px 160px 1fr 80px 80px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".14em", color: "rgba(201,168,76,0.55)", textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(232,223,200,0.4)" }}>{s.size}</div>
            <div style={{ fontFamily: s.font.includes("Cinzel") ? "'Cinzel',serif" : s.font.includes("EB") ? "'EB Garamond',serif" : "'Cormorant Garamond',serif", fontSize: Math.min(parseInt(s.size),22), fontStyle: s.font.includes("italic") ? "italic" : "normal", color: "rgba(232,223,200,0.75)", letterSpacing: s.tracking }}>
              {s.label} — {s.font}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(232,223,200,0.3)" }}>lh {s.lh}</div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(232,223,200,0.3)" }}>{s.tracking || "—"}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "16px 20px" }}>
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".18em", color: "#c9a84c", marginBottom: 6, textTransform: "uppercase" }}>Critical Rule</div>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(232,223,200,0.6)" }}>
          Cinzel must never be used at body sizes or for extended reading. Its all-caps architecture causes fatigue above 13px when used for paragraphs. Keep Cinzel strictly for UI strings under 14px and treat every Cinzel instance as precious.
        </div>
      </div>
    </section>
  );
}

function Spacing() {
  const [copied, setCopied] = useState(null);
  const copy = (v, k) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(null), 1400); };

  return (
    <section id="spacing" style={{ marginBottom: 96 }}>
      <Overline>Spatial System</Overline>
      <SectionTitle>Spacing Scale</SectionTitle>
      <GoldLine />
      <div style={{ display: "flex", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
        <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 4, padding: "20px 28px" }}>
          <Overline>Base Module</Overline>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, color: "#e8dfc8" }}>8 px</div>
        </div>
        <div style={{ flex: 1, fontSize: 14, lineHeight: 1.85, color: "rgba(232,223,200,0.55)", paddingTop: 4 }}>
          All 11 spacing tokens are strict multiples of 4px or 8px. No arbitrary values exist in this system. If a desired gap is not in this scale, you must use the nearest token — never invent a value. This discipline is what gives bento grids their classical precision.
        </div>
      </div>

      <div style={{ background: "#0a1214", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "160px 90px 70px 1fr 72px", padding: "10px 20px", borderBottom: "1px solid rgba(201,168,76,0.25)", background: "#1c2b2e" }}>
          {["Token","Name","Value","Use Case",""].map((h,i) => (
            <div key={i} style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {SPACING.map((t, i) => (
          <div key={t.token} style={{ display: "grid", gridTemplateColumns: "160px 90px 70px 1fr 72px", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: i%2===0 ? "rgba(255,255,255,0.012)" : "transparent" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.04)"}
            onMouseLeave={e => e.currentTarget.style.background = i%2===0 ? "rgba(255,255,255,0.012)" : "transparent"}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ height: 14, width: Math.max(3,(t.px/128)*50), background: "linear-gradient(90deg,#c9a84c,#7a5e24)", borderRadius: 1 }} />
              <Code>{t.token}</Code>
            </div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".08em", color: "rgba(232,223,200,0.55)", textTransform: "uppercase" }}>{t.name}</div>
            <div>
              <span style={{ fontSize: 14, color: "#e8dfc8" }}>{t.px}px</span>
              <span style={{ fontSize: 10, color: "rgba(232,223,200,0.3)", display: "block" }}>{t.rem}</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(232,223,200,0.45)", lineHeight: 1.5 }}>{t.use}</div>
            <button onClick={() => copy(`var(${t.token})`, t.token)} style={{ opacity: 0.6, background: "none", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".1em", padding: "3px 8px", cursor: "pointer" }}>
              {copied===t.token ? "✓" : "COPY"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Grid() {
  return (
    <section id="grid" style={{ marginBottom: 96 }}>
      <Overline>Layout System</Overline>
      <SectionTitle>Grid & Layout</SectionTitle>
      <GoldLine />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {[
          { title:"Bento Grid Rules", items:[
            "Gutter: --space-6 (24px) — fixed, never change.",
            "Outer margin desktop: --space-9 (64px).",
            "Outer margin tablet: --space-7 (32px).",
            "Outer margin mobile: --space-6 (24px).",
            "Cell border-radius: 4px on all cells, always.",
            "Maximum 1 chamfered cell (clip-path) per grid — hero cell only.",
            "Never nest a bento grid inside a bento cell.",
          ]},
          { title:"Cell Proportions", items:[
            "Wide cell: 16:9 or 3:2 (panoramic landscape).",
            "Tall cell: 2:3 or 3:4 (portrait orientation).",
            "Square cell: 1:1 (object study, icon, stat).",
            "Hero cell: full-width, 16:9 minimum height.",
            "Images: object-fit:cover always. Never stretch.",
            "Text cells: min-height 120px to prevent collapse.",
          ]},
          { title:"Responsive Behavior", items:[
            "Desktop (1200px+): full multi-column bento grid.",
            "Tablet (768–1199px): reduce to 2-column. Tall cells become standard.",
            "Mobile (<768px): single column. All cells stack. Gutters reduce to --space-5 (16px).",
            "Never show a half-cut cell on mobile — always full width.",
          ]},
          { title:"Typography in Grid Cells", items:[
            "Overline (Cinzel) → Title (Cormorant) gap: --space-3 (8px).",
            "Title → Body (EB Garamond) gap: --space-4 (12px).",
            "Body → CTA gap: --space-6 (24px).",
            "Max 3 type levels per cell. Overline + Title + Body or Title + Body + CTA.",
          ]},
        ].map(g => (
          <div key={g.title} style={{ background: "#1c2b2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "24px 24px 20px" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: ".14em", color: "#c9a84c", marginBottom: 14, textTransform: "uppercase", borderTop: "1px solid #c9a84c", paddingTop: 14 }}>{g.title}</div>
            {g.items.map((item, i) => (
              <div key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(232,223,200,0.55)", marginBottom: 6, paddingLeft: 12, borderLeft: "1px solid rgba(255,255,255,0.07)" }}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Borders() {
  return (
    <section id="borders" style={{ marginBottom: 96 }}>
      <Overline>Structural Detail</Overline>
      <SectionTitle>Borders & Radius</SectionTitle>
      <GoldLine />
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(232,223,200,0.55)", maxWidth: 560, marginBottom: 32 }}>
        Borders define architectural planes, not decorative outlines. Gold borders are used exactly once per component as a signal of selection or emphasis. The 4px chamfer is the brand's geometric signature — it must be consistent everywhere.
      </p>
      <div style={{ background: "#0a1214", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "160px 280px 1fr", padding: "10px 20px", borderBottom: "1px solid rgba(201,168,76,0.25)", background: "#1c2b2e" }}>
          {["Token","Value","Use Case"].map(h => (
            <div key={h} style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {BORDERS.map((b, i) => (
          <div key={b.token} style={{ display: "grid", gridTemplateColumns: "160px 280px 1fr", alignItems: "center", padding: "13px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: i%2===0 ? "rgba(255,255,255,0.012)" : "transparent" }}>
            <Code>{b.token}</Code>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(232,223,200,0.5)" }}>{b.value}</div>
            <div style={{ fontSize: 13, color: "rgba(232,223,200,0.45)", lineHeight: 1.5 }}>{b.use}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Shadows() {
  return (
    <section id="shadows" style={{ marginBottom: 96 }}>
      <Overline>Depth System</Overline>
      <SectionTitle>Shadows & Elevation</SectionTitle>
      <GoldLine />
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(232,223,200,0.55)", maxWidth: 560, marginBottom: 32 }}>
        Shadows use only cool-dark tones — never warm or golden drop shadows, as these would compete with the brand's gold accent language. Elevation is communicated through deepening dark shadows, not lightening surfaces.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {SHADOWS.map(s => (
          <div key={s.token} style={{ background: "#1c2b2e", borderRadius: 4, padding: "20px 20px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <Code>{s.token}</Code>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".14em", color: "rgba(201,168,76,0.5)", textTransform: "uppercase" }}>{s.name}</div>
            </div>
            <div style={{ background: "#0f1a1c", borderRadius: 3, padding: "16px", boxShadow: s.value, marginBottom: 12, minHeight: 40 }} />
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(232,223,200,0.3)", marginBottom: 8, wordBreak: "break-all" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "rgba(232,223,200,0.45)", lineHeight: 1.6 }}>{s.use}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Imagery() {
  return (
    <section id="images" style={{ marginBottom: 96 }}>
      <Overline>Visual Language</Overline>
      <SectionTitle>Imagery Guidelines</SectionTitle>
      <GoldLine />
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(232,223,200,0.55)", maxWidth: 600, marginBottom: 40 }}>
        Images are not decoration — they are architectural panels in the bento grid. Every image must feel like it could hang in a gallery or appear in a fine art publication. These rules apply to all imagery: photography, AI-generated, or curated.
      </p>
      <div style={{ display: "grid", gap: 2 }}>
        {IMAGE_RULES.map((r, i) => (
          <div key={r.rule} style={{ display: "grid", gridTemplateColumns: "180px 1fr", background: i%2===0 ? "rgba(255,255,255,0.015)" : "transparent", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".14em", color: "#c9a84c", textTransform: "uppercase", paddingTop: 2 }}>{r.rule}</div>
            <div style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(232,223,200,0.55)" }}>{r.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Components() {
  const [open, setOpen] = useState(null);
  return (
    <section id="components" style={{ marginBottom: 96 }}>
      <Overline>UI Library</Overline>
      <SectionTitle>Component Guidelines</SectionTitle>
      <GoldLine />
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(232,223,200,0.55)", maxWidth: 560, marginBottom: 40 }}>
        Every component has strict rules. There are no optional guidelines here — all of the following are required specifications. Click any component to expand its full rule set.
      </p>
      <div style={{ display: "grid", gap: 8 }}>
        {COMPONENTS.map(c => (
          <div key={c.name} style={{ background: "#1c2b2e", border: open===c.name ? "1px solid rgba(201,168,76,0.35)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", transition: "border 0.2s" }}>
            <button
              onClick={() => setOpen(open===c.name ? null : c.name)}
              style={{ width: "100%", background: "none", border: "none", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left" }}
            >
              <span style={{ fontSize: 18, color: "#c9a84c", width: 24 }}>{c.icon}</span>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: ".14em", color: "#e8dfc8", textTransform: "uppercase", flex: 1 }}>{c.name}</span>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "rgba(201,168,76,0.5)", letterSpacing: ".1em" }}>{open===c.name ? "▲ COLLAPSE" : "▼ EXPAND"}</span>
            </button>
            {open===c.name && (
              <div style={{ padding: "0 20px 20px 58px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {c.rules.map((rule, i) => (
                  <div key={i} style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(232,223,200,0.55)", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 12 }}>
                    <span style={{ color: "rgba(201,168,76,0.4)", fontFamily: "'Cinzel',serif", fontSize: 9, paddingTop: 3, flexShrink: 0 }}>{String(i+1).padStart(2,"0")}</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Tokens() {
  const [copied, setCopied] = useState(null);
  const copy = (v, k) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(null), 1400); };

  const allTokens = [
    ...Object.values(COLORS).flat().map(c => ({ token: c.token, value: c.hex, group: "Color" })),
    ...SPACING.map(s => ({ token: s.token, value: s.rem, group: "Spacing" })),
    ...BORDERS.map(b => ({ token: b.token, value: b.value, group: "Border" })),
    ...SHADOWS.map(s => ({ token: s.token, value: s.value, group: "Shadow" })),
  ];

  const cssVars = `:root {\n\n  /* ── Colors ── */\n${Object.values(COLORS).flat().map(c => `  ${c.token}: ${c.hex};`).join("\n")}\n\n  /* ── Spacing ── */\n${SPACING.map(s => `  ${s.token}: ${s.rem};  /* ${s.name} ${s.px}px */`).join("\n")}\n\n  /* ── Borders ── */\n${BORDERS.filter(b=>!b.token.includes("radius")).map(b => `  ${b.token}: ${b.value};`).join("\n")}\n\n  /* ── Radius ── */\n${BORDERS.filter(b=>b.token.includes("radius")).map(b => `  ${b.token}: ${b.value};`).join("\n")}\n\n  /* ── Shadows ── */\n${SHADOWS.map(s => `  ${s.token}: ${s.value};`).join("\n")}\n\n}`;

  return (
    <section id="tokens" style={{ marginBottom: 96 }}>
      <Overline>Complete Reference</Overline>
      <SectionTitle>All Design Tokens</SectionTitle>
      <GoldLine />

      <div style={{ background: "#0a1214", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "28px 32px", position: "relative", marginBottom: 40 }}>
        <button onClick={() => copy(cssVars, "all")} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c", fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".14em", padding: "5px 14px", cursor: "pointer" }}>
          {copied==="all" ? "✓ COPIED" : "COPY ALL CSS"}
        </button>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(232,223,200,0.55)", margin: 0, lineHeight: 1.8, maxHeight: 400, overflow: "auto" }}>
          {cssVars}
        </pre>
      </div>
    </section>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [active, setActive] = useState("overview");

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1a1c", color: "#e8dfc8", fontFamily: "'EB Garamond', Georgia, serif", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0a1214; }
        ::-webkit-scrollbar-thumb { background: #2e4248; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
        button { font-family: inherit; }
      `}</style>

      {/* Sidebar */}
      <nav style={{ width: 220, background: "#1c2b2e", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "40px 0 40px", position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 32, height: 32, background: "#1c2b2e", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <div style={{ width: 16, height: 16, background: "linear-gradient(135deg,#c9a84c 0%,#c9a84c 50%,transparent 50%)", borderRadius: 1 }} />
          </div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }}>Design System</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#e8dfc8", fontWeight: 300 }}>v1.0</div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "20px 0" }}>
          {NAV_SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 24px", background: "none", border: "none", borderLeft: active===s.id ? "2px solid #c9a84c" : "2px solid transparent", fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".14em", color: active===s.id ? "#c9a84c" : "rgba(232,223,200,0.45)", textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "20px 24px 0", borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".16em", color: "rgba(201,168,76,0.3)", textTransform: "uppercase", lineHeight: 1.8 }}>
          No arbitrary values<br />Classical order
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, padding: "64px 56px 120px", maxWidth: 900, overflow: "auto" }}>
        <Overview />
        <Philosophy />
        <Colors />
        <Typography />
        <Spacing />
        <Grid />
        <Borders />
        <Shadows />
        <Imagery />
        <Components />
        <Tokens />

        <div style={{ paddingTop: 40, borderTop: "1px solid rgba(201,168,76,0.15)", fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".2em", color: "rgba(201,168,76,0.3)", textAlign: "center", textTransform: "uppercase" }}>
          No arbitrary values · 8px base module · Neoclassical order · Dark native
        </div>
      </main>
    </div>
  );
}
