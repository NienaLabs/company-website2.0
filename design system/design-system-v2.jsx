import { useState, createContext, useContext } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────

const ThemeCtx = createContext(null);
const useTheme = () => useContext(ThemeCtx);

const THEMES = {
  dark: {
    bg: "#0c0d10", surface: "#16181d", surface2: "#1e2128", surface3: "#262a33",
    border: "rgba(255,255,255,0.08)", borderStrong: "rgba(255,255,255,0.16)",
    textPrimary: "#f5f3ee", textSecondary: "rgba(245,243,238,0.68)", textMuted: "rgba(245,243,238,0.42)",
    amber: "#ffb020", amberStrong: "#ffc65c", amberDeep: "#d98c0f",
    amberGlow: "rgba(255,176,32,0.35)", amberWash: "rgba(255,176,32,0.14)",
    success: "#34d399", error: "#fb7185", info: "#38bdf8",
    onAmber: "#1a1204",
  },
  light: {
    bg: "#faf8f4", surface: "#ffffff", surface2: "#f2efe8", surface3: "#e9e4d9",
    border: "rgba(20,16,8,0.10)", borderStrong: "rgba(20,16,8,0.20)",
    textPrimary: "#18140d", textSecondary: "rgba(24,20,13,0.68)", textMuted: "rgba(24,20,13,0.44)",
    amber: "#d97706", amberStrong: "#b45309", amberDeep: "#92400e",
    amberGlow: "rgba(217,119,6,0.28)", amberWash: "rgba(217,119,6,0.10)",
    success: "#059669", error: "#e11d48", info: "#0284c7",
    onAmber: "#1a1204",
  },
};

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "philosophy", label: "Philosophy" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "components", label: "Components" },
  { id: "tokens", label: "All Tokens" },
];

const SPACING = [
  { token: "--space-1", name: "xs", px: 4, use: "Icon padding, tight inline gaps" },
  { token: "--space-2", name: "sm", px: 8, use: "Tag padding, label-to-value gaps" },
  { token: "--space-3", name: "md", px: 12, use: "Compact card padding, form field gaps" },
  { token: "--space-4", name: "lg", px: 16, use: "Standard inner padding, list item spacing" },
  { token: "--space-5", name: "xl", px: 24, use: "Card padding, grid gutters" },
  { token: "--space-6", name: "2xl", px: 32, use: "Section sub-header spacing, hero padding" },
  { token: "--space-7", name: "3xl", px: 48, use: "Section-level breaks" },
  { token: "--space-8", name: "4xl", px: 64, use: "Page section margins" },
  { token: "--space-9", name: "5xl", px: 96, use: "Major layout divisions" },
];

const RADIUS = [
  { name: "sm", value: "6px", use: "Inputs, tags, small chips" },
  { name: "md", value: "8px", use: "Buttons, dropdowns" },
  { name: "lg", value: "12px", use: "Cards, modals, panels" },
  { name: "full", value: "999px", use: "Badges, avatars, toggle pills — the one deliberate soft shape" },
];

const TYPE_SCALE = [
  { label: "Display", size: 56, lh: 1.05, weight: 600, font: FONT_DISPLAY, tag: "Hero, marketing headlines" },
  { label: "H1", size: 38, lh: 1.1, weight: 600, font: FONT_DISPLAY, tag: "Page titles" },
  { label: "H2", size: 26, lh: 1.2, weight: 600, font: FONT_DISPLAY, tag: "Section titles" },
  { label: "H3", size: 19, lh: 1.3, weight: 500, font: FONT_DISPLAY, tag: "Card headers, modal titles" },
  { label: "Body Lg", size: 17, lh: 1.6, weight: 400, font: FONT_BODY, tag: "Intro paragraphs" },
  { label: "Body", size: 15, lh: 1.6, weight: 400, font: FONT_BODY, tag: "Default reading text" },
  { label: "Body Sm", size: 13, lh: 1.55, weight: 400, font: FONT_BODY, tag: "Secondary copy, descriptions" },
  { label: "Label", size: 11, lh: 1, weight: 600, font: FONT_BODY, tag: "UI labels, nav, buttons — uppercase, tracking .06em" },
  { label: "Data", size: 13, lh: 1.4, weight: 500, font: FONT_MONO, tag: "Numeric values, tokens, code" },
];

const PHILOSOPHY = [
  { title: "Confidence Over Restraint", body: "Neoclassical treated color as a rare resource. This system spends it. Amber isn't a punctuation mark capped at 5% — it's the primary signal for anything interactive. If it does something, it can glow." },
  { title: "Warm, Not Loud", body: "Engaging doesn't mean noisy. The palette stays to one accent family (amber) plus functional semantic color. Energy comes from contrast and motion, not from adding more hues." },
  { title: "Type With a Pulse", body: "Space Grotesk carries personality in headlines without becoming decorative. Inter does the quiet, dense work of a real product UI. Nothing is italic-serif-for-elegance; every face earns its place at product scale." },
  { title: "Glow Is the Signature", body: "Every interactive element responds with a soft amber glow on hover, focus, or active state. It's the one motif repeated everywhere — buttons, cards, nav, inputs — so the whole product feels alive, not just the marketing page." },
  { title: "Density Is Allowed", body: "SaaS UIs hold tables, forms, and dashboards, not empty stone plazas. Spacing is generous where it aids scanning, tight where density helps — not expensive for its own sake." },
  { title: "One Soft Shape", body: "Cards and buttons stay crisp (8–12px radius). Pills are reserved for badges, avatars, and toggles — a single deliberate soft accent against an otherwise precise geometry." },
];

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

const Overline = ({ children }) => {
  const c = useTheme();
  return (
    <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: c.amber, marginBottom: 12, textTransform: "uppercase" }}>
      {children}
    </div>
  );
};

const SectionTitle = ({ children, size = 32 }) => {
  const c = useTheme();
  return (
    <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: size, margin: "0 0 4px", lineHeight: 1.15, color: c.textPrimary }}>
      {children}
    </h2>
  );
};

const GlowLine = ({ width = 48, mb = 28 }) => {
  const c = useTheme();
  return <div style={{ width, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${c.amber}, transparent)`, marginBottom: mb }} />;
};

const Code = ({ children }) => {
  const c = useTheme();
  return (
    <code style={{ fontFamily: FONT_MONO, fontSize: 12, color: c.amber, background: c.amberWash, padding: "2px 7px", borderRadius: 4 }}>
      {children}
    </code>
  );
};

const Panel = ({ children, style = {}, glow = false }) => {
  const c = useTheme();
  return (
    <div style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12,
      transition: "box-shadow 180ms ease, border-color 180ms ease",
      boxShadow: glow ? `0 0 0 1px ${c.amberGlow}, 0 8px 28px ${c.amberGlow}` : "none",
      ...style,
    }}>
      {children}
    </div>
  );
};

const ThemeToggle = () => {
  const c = useTheme();
  const { theme, setTheme } = c;
  const isDark = theme === "dark";
  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        display: "flex", alignItems: "center", gap: 8, background: c.surface2, border: `1px solid ${c.border}`,
        borderRadius: 999, padding: "6px 6px 6px 12px", cursor: "pointer", fontFamily: FONT_BODY,
        fontSize: 11, fontWeight: 600, letterSpacing: ".04em", color: c.textSecondary, textTransform: "uppercase",
      }}>
      {isDark ? "Dark" : "Light"}
      <span style={{
        width: 34, height: 18, borderRadius: 999, background: isDark ? c.amberWash : c.amberWash,
        border: `1px solid ${c.amber}`, position: "relative", flexShrink: 0,
      }}>
        <span style={{
          position: "absolute", top: 1, left: isDark ? 17 : 1, width: 14, height: 14, borderRadius: "50%",
          background: c.amber, boxShadow: `0 0 8px ${c.amberGlow}`, transition: "left 160ms ease",
        }} />
      </span>
    </button>
  );
};

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Overview() {
  const c = useTheme();
  return (
    <section id="overview" style={{ marginBottom: 88 }}>
      <Overline>Design System · v2.0</Overline>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 52, margin: "0 0 4px", lineHeight: 1.05, color: c.textPrimary }}>
        Confident Minimalism
      </h1>
      <GlowLine width={64} mb={28} />
      <p style={{ fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.7, color: c.textSecondary, maxWidth: 620, marginBottom: 36 }}>
        A replacement for the neoclassical system, built for product UI: bold amber used generously instead of rationed, high-contrast text instead of muted opacity, and a single repeated signature — the amber glow — instead of static ornament.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {[
          { label: "Design Style", value: "Confident Minimal", note: "Bold color, high contrast, built for density" },
          { label: "Accent Usage", value: "Generous", note: "Amber drives every interactive state, not just 5%" },
          { label: "Color Mode", value: "Dark + Light", note: "Both are first-class — toggle top right" },
        ].map(item => (
          <Panel key={item.label} style={{ padding: "22px 22px 18px" }}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.amber, marginBottom: 8, textTransform: "uppercase" }}>{item.label}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 23, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>{item.value}</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.55, color: c.textMuted }}>{item.note}</div>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  const c = useTheme();
  return (
    <section id="philosophy" style={{ marginBottom: 88 }}>
      <Overline>Foundation</Overline>
      <SectionTitle>Design Philosophy</SectionTitle>
      <GlowLine />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {PHILOSOPHY.map(p => (
          <Panel key={p.title} style={{ padding: "24px 24px 22px" }}>
            <div style={{ width: 28, height: 3, borderRadius: 2, background: c.amber, marginBottom: 14 }} />
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 600, color: c.textPrimary, marginBottom: 10 }}>{p.title}</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.7, color: c.textSecondary }}>{p.body}</div>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function Colors() {
  const c = useTheme();
  const [copied, setCopied] = useState(null);
  const copy = (hex, k) => { navigator.clipboard.writeText(hex); setCopied(k); setTimeout(() => setCopied(null), 1300); };

  const groups = {
    "Surface": [
      { name: "Background", hex: c.bg, token: "--bg" },
      { name: "Surface", hex: c.surface, token: "--surface" },
      { name: "Surface 2", hex: c.surface2, token: "--surface-2" },
      { name: "Surface 3", hex: c.surface3, token: "--surface-3" },
    ],
    "Amber (Primary Accent)": [
      { name: "Amber", hex: c.amber, token: "--amber" },
      { name: "Amber Strong", hex: c.amberStrong, token: "--amber-strong" },
      { name: "Amber Deep", hex: c.amberDeep, token: "--amber-deep" },
    ],
    "Text": [
      { name: "Primary", hex: c.textPrimary, token: "--text-primary" },
      { name: "Secondary", hex: c.textSecondary, token: "--text-secondary" },
      { name: "Muted", hex: c.textMuted, token: "--text-muted" },
    ],
    "Semantic": [
      { name: "Success", hex: c.success, token: "--success" },
      { name: "Error", hex: c.error, token: "--error" },
      { name: "Info", hex: c.info, token: "--info" },
    ],
  };

  return (
    <section id="colors" style={{ marginBottom: 88 }}>
      <Overline>Visual Foundation</Overline>
      <SectionTitle>Color System</SectionTitle>
      <GlowLine />
      <p style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.7, color: c.textSecondary, maxWidth: 560, marginBottom: 36 }}>
        Amber is the workhorse of this system — it marks anything the user can act on. Unlike the old 5% ceiling, there's no cap: primary buttons, active nav, focus rings, and glows all draw from the same family.
      </p>
      {Object.entries(groups).map(([group, swatches]) => (
        <div key={group} style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, marginBottom: 10, textTransform: "uppercase" }}>{group}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {swatches.map(s => {
              const k = group + s.name;
              return (
                <div key={s.name} onClick={() => copy(s.hex, k)} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: 44, background: s.hex, borderBottom: `1px solid ${c.border}` }} />
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, color: c.textPrimary, marginBottom: 4 }}>{s.name}</div>
                    <Code>{copied === k ? "copied!" : s.hex}</Code>
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
  const c = useTheme();
  return (
    <section id="typography" style={{ marginBottom: 88 }}>
      <Overline>Type System</Overline>
      <SectionTitle>Typography</SectionTitle>
      <GlowLine />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 40 }}>
        {[
          { role: "Display / Headings", face: "Space Grotesk", weights: "500, 600", use: "Hero text, page titles, section headers, card titles.", sample: "Built for Product, Not Print", sampleSize: 26 },
          { role: "Body / UI", face: "Inter", weights: "400, 500, 600", use: "Body copy, form labels, buttons, nav, dense UI text.", sample: "Legible at 13px across hundreds of components.", sampleSize: 15 },
          { role: "Data / Code", face: "IBM Plex Mono", weights: "400, 500", use: "Token values, numeric data, code snippets.", sample: "amber.500 → #ffb020", sampleSize: 13 },
        ].map(t => (
          <Panel key={t.face} style={{ padding: "24px 20px" }}>
            <div style={{ borderTop: `2px solid ${c.amber}`, paddingTop: 14, marginBottom: 14 }}>
              <Overline>{t.role}</Overline>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{t.face}</div>
            </div>
            <div style={{ fontFamily: t.face === "Space Grotesk" ? FONT_DISPLAY : t.face === "IBM Plex Mono" ? FONT_MONO : FONT_BODY, fontSize: t.sampleSize, fontWeight: 500, color: c.textPrimary, lineHeight: 1.4, marginBottom: 18, minHeight: 48 }}>
              {t.sample}
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 12, lineHeight: 1.6, color: c.textMuted }}>
              <div><strong style={{ color: c.textSecondary }}>Weights:</strong> {t.weights}</div>
              <div style={{ marginTop: 6 }}>{t.use}</div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel style={{ padding: "28px 28px 18px" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, marginBottom: 18, textTransform: "uppercase" }}>Type Scale</div>
        {TYPE_SCALE.map(s => (
          <div key={s.label} style={{ display: "grid", gridTemplateColumns: "90px 70px 1fr", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${c.border}` }}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: ".04em" }}>{s.label}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.textMuted }}>{s.size}px</div>
            <div style={{ fontFamily: s.font, fontSize: Math.min(s.size, 22), fontWeight: s.weight, color: c.textPrimary, textTransform: s.label === "Label" ? "uppercase" : "none", letterSpacing: s.label === "Label" ? ".06em" : "0" }}>
              {s.tag}
            </div>
          </div>
        ))}
      </Panel>
    </section>
  );
}

function Spacing() {
  const c = useTheme();
  return (
    <section id="spacing" style={{ marginBottom: 88 }}>
      <Overline>Spatial System</Overline>
      <SectionTitle>Spacing & Radius</SectionTitle>
      <GlowLine />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Panel style={{ padding: "24px 24px 8px" }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, marginBottom: 16, textTransform: "uppercase" }}>Scale (4px base)</div>
          {SPACING.map(s => (
            <div key={s.token} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 0", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ width: 44, fontFamily: FONT_MONO, fontSize: 11, color: c.amber }}>{s.name}</div>
              <div style={{ height: 10, width: s.px, background: c.amberWash, border: `1px solid ${c.amber}`, borderRadius: 3, flexShrink: 0 }} />
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.textMuted, flex: 1 }}>{s.use}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.textSecondary }}>{s.px}px</div>
            </div>
          ))}
        </Panel>
        <Panel style={{ padding: "24px 24px 8px" }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, marginBottom: 16, textTransform: "uppercase" }}>Radius</div>
          {RADIUS.map(r => (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 0", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ width: 44, fontFamily: FONT_MONO, fontSize: 11, color: c.amber }}>{r.name}</div>
              <div style={{ height: 24, width: 24, background: c.amberWash, border: `1px solid ${c.amber}`, borderRadius: r.value, flexShrink: 0 }} />
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.textMuted, flex: 1 }}>{r.use}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.textSecondary }}>{r.value}</div>
            </div>
          ))}
          <div style={{ marginTop: 16, marginBottom: 20, background: c.amberWash, border: `1px solid ${c.amber}`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 12, lineHeight: 1.6, color: c.textSecondary }}>
              Pills (999px) are reserved for badges, avatars, and toggles only — the one deliberate soft shape against an otherwise crisp geometry.
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}

function Components() {
  const c = useTheme();
  const [hoverBtn, setHoverBtn] = useState(null);
  const [focusInput, setFocusInput] = useState(false);
  const [hoverCard, setHoverCard] = useState(false);

  return (
    <section id="components" style={{ marginBottom: 88 }}>
      <Overline>In Practice</Overline>
      <SectionTitle>Components</SectionTitle>
      <GlowLine />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Buttons */}
        <Panel style={{ padding: 24 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, marginBottom: 16, textTransform: "uppercase" }}>Buttons</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onMouseEnter={() => setHoverBtn("p")} onMouseLeave={() => setHoverBtn(null)}
              style={{
                background: c.amber, color: c.onAmber, border: "none", borderRadius: 8,
                padding: "10px 20px", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, letterSpacing: ".02em",
                cursor: "pointer", boxShadow: hoverBtn === "p" ? `0 0 0 4px ${c.amberGlow}` : "none",
                transform: hoverBtn === "p" ? "translateY(-1px)" : "none", transition: "all 150ms ease",
              }}>Primary Action</button>
            <button
              onMouseEnter={() => setHoverBtn("s")} onMouseLeave={() => setHoverBtn(null)}
              style={{
                background: "transparent", color: c.amber, border: `1px solid ${c.amber}`, borderRadius: 8,
                padding: "10px 20px", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600,
                cursor: "pointer", boxShadow: hoverBtn === "s" ? `0 0 0 4px ${c.amberGlow}` : "none",
                background: hoverBtn === "s" ? c.amberWash : "transparent", transition: "all 150ms ease",
              }}>Secondary</button>
            <button
              style={{
                background: "transparent", color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 8,
                padding: "10px 20px", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Ghost</button>
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.textMuted, marginTop: 16, lineHeight: 1.6 }}>
            Hover any button — the amber glow is the signature interaction, repeated everywhere.
          </div>
        </Panel>

        {/* Input */}
        <Panel style={{ padding: 24 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, marginBottom: 16, textTransform: "uppercase" }}>Inputs</div>
          <label style={{ display: "block", fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, color: c.textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".04em" }}>Workspace name</label>
          <input
            onFocus={() => setFocusInput(true)} onBlur={() => setFocusInput(false)}
            placeholder="Acme Inc."
            style={{
              width: "100%", background: c.bg, border: `1px solid ${focusInput ? c.amber : c.border}`,
              borderRadius: 8, padding: "10px 14px", fontFamily: FONT_BODY, fontSize: 14, color: c.textPrimary,
              outline: "none", boxShadow: focusInput ? `0 0 0 4px ${c.amberGlow}` : "none", transition: "all 150ms ease",
            }} />
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.textMuted, marginTop: 16, lineHeight: 1.6 }}>
            Click the input — focus state uses the same amber glow language as buttons.
          </div>
        </Panel>

        {/* Card */}
        <Panel
          glow={hoverCard}
          style={{ padding: 24, cursor: "pointer" }}
        >
          <div onMouseEnter={() => setHoverCard(true)} onMouseLeave={() => setHoverCard(false)}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 600, color: c.textPrimary }}>Monthly Revenue</div>
              <span style={{ background: c.amberWash, color: c.amber, fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>+12.4%</span>
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 32, fontWeight: 500, color: c.textPrimary, marginBottom: 4 }}>$84,210</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.textMuted }}>Hover this card to see the glow elevation.</div>
          </div>
        </Panel>

        {/* Badges / Tags */}
        <Panel style={{ padding: 24 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, marginBottom: 16, textTransform: "uppercase" }}>Badges & Status</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Active", color: c.amber, bg: c.amberWash },
              { label: "Success", color: c.success, bg: `${c.success}22` },
              { label: "Error", color: c.error, bg: `${c.error}22` },
              { label: "Info", color: c.info, bg: `${c.info}22` },
            ].map(b => (
              <span key={b.label} style={{ background: b.bg, color: b.color, fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 999, border: `1px solid ${b.color}44` }}>
                {b.label}
              </span>
            ))}
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.textMuted, marginTop: 16, lineHeight: 1.6 }}>
            Full pill radius — the one soft shape in the system, used for status only.
          </div>
        </Panel>
      </div>
    </section>
  );
}

function Tokens() {
  const c = useTheme();
  const [copied, setCopied] = useState(false);

  const cssVars = `:root[data-theme="${c.theme}"] {\n  --bg: ${c.bg};\n  --surface: ${c.surface};\n  --surface-2: ${c.surface2};\n  --surface-3: ${c.surface3};\n  --border: ${c.border};\n  --text-primary: ${c.textPrimary};\n  --text-secondary: ${c.textSecondary};\n  --text-muted: ${c.textMuted};\n  --amber: ${c.amber};\n  --amber-strong: ${c.amberStrong};\n  --amber-deep: ${c.amberDeep};\n  --amber-glow: ${c.amberGlow};\n  --amber-wash: ${c.amberWash};\n  --success: ${c.success};\n  --error: ${c.error};\n  --info: ${c.info};\n\n  /* Spacing */\n${SPACING.map(s => `  ${s.token}: ${s.px}px;`).join("\n")}\n\n  /* Radius */\n${RADIUS.map(r => `  --radius-${r.name}: ${r.value};`).join("\n")}\n}`;

  const copy = () => { navigator.clipboard.writeText(cssVars); setCopied(true); setTimeout(() => setCopied(false), 1300); };

  return (
    <section id="tokens" style={{ marginBottom: 40 }}>
      <Overline>Complete Reference</Overline>
      <SectionTitle>All Design Tokens</SectionTitle>
      <GlowLine />
      <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: "26px 28px", position: "relative" }}>
        <button onClick={copy} style={{
          position: "absolute", top: 16, right: 16, background: c.amberWash, border: `1px solid ${c.amber}`,
          color: c.amber, fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".04em",
          padding: "6px 14px", borderRadius: 999, cursor: "pointer",
        }}>{copied ? "✓ Copied" : "Copy CSS"}</button>
        <pre style={{ fontFamily: FONT_MONO, fontSize: 12, color: c.textSecondary, margin: 0, lineHeight: 1.8, maxHeight: 380, overflow: "auto" }}>
          {cssVars}
        </pre>
      </div>
    </section>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [active, setActive] = useState("overview");
  const [theme, setTheme] = useState("dark");
  const c = { ...THEMES[theme], theme, setTheme };

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ThemeCtx.Provider value={c}>
      <div style={{ minHeight: "100vh", background: c.bg, color: c.textPrimary, fontFamily: FONT_BODY, display: "flex", transition: "background 200ms ease" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; margin: 0; }
          ::-webkit-scrollbar { width: 4px; height: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 2px; }
          ::-webkit-scrollbar-thumb:hover { background: ${c.amber}; }
          button { font-family: inherit; }
          input::placeholder { color: ${c.textMuted}; }
        `}</style>

        {/* Sidebar */}
        <nav style={{ width: 220, background: c.surface, borderRight: `1px solid ${c.border}`, padding: "32px 0", position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "0 22px 24px", borderBottom: `1px solid ${c.border}` }}>
            <div style={{ width: 30, height: 30, background: c.amber, borderRadius: 8, marginBottom: 12, boxShadow: `0 0 16px ${c.amberGlow}` }} />
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: c.amber, textTransform: "uppercase", marginBottom: 2 }}>Design System</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 600, color: c.textPrimary }}>v2.0 — Confident Minimal</div>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "16px 0" }}>
            {NAV_SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                style={{
                  display: "block", width: "100%", textAlign: "left", padding: "9px 22px",
                  background: active === s.id ? c.amberWash : "none",
                  borderLeft: active === s.id ? `2px solid ${c.amber}` : "2px solid transparent",
                  fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500,
                  color: active === s.id ? c.amber : c.textSecondary, cursor: "pointer", transition: "all 150ms",
                }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "16px 22px 0", borderTop: `1px solid ${c.border}` }}>
            <ThemeToggle />
          </div>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: "56px 52px 100px", maxWidth: 880, overflow: "auto" }}>
          <Overview />
          <Philosophy />
          <Colors />
          <Typography />
          <Spacing />
          <Components />
          <Tokens />
          <div style={{ paddingTop: 32, borderTop: `1px solid ${c.border}`, fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: c.textMuted, textAlign: "center", textTransform: "uppercase" }}>
            Amber is the signal · Glow is the signature · Both themes are native
          </div>
        </main>
      </div>
    </ThemeCtx.Provider>
  );
}
