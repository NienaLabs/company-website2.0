import { useState } from "react";

const spacingTokens = [
  { token: "--space-1", name: "Hairline",   px: 2,   rem: "0.125rem", use: "Divider lines, border offsets, micro-insets",                    role: "structural" },
  { token: "--space-2", name: "Sliver",     px: 4,   rem: "0.25rem",  use: "Icon padding, badge insets, gap between inline elements",         role: "structural" },
  { token: "--space-3", name: "Notch",      px: 8,   rem: "0.5rem",   use: "Tag padding, tight label gaps, overline-to-title margin",          role: "component"  },
  { token: "--space-4", name: "Module",     px: 12,  rem: "0.75rem",  use: "Caption-to-body gap, small card inner padding",                    role: "component"  },
  { token: "--space-5", name: "Column",     px: 16,  rem: "1rem",     use: "Standard bento cell inner padding, body text line gap",            role: "layout"     },
  { token: "--space-6", name: "Pillar",     px: 24,  rem: "1.5rem",   use: "Card content padding, bento gutter (default), section sub-headers",role: "layout"     },
  { token: "--space-7", name: "Arcade",     px: 32,  rem: "2rem",     use: "Large card padding, headline-to-body gap, featured cell inset",    role: "layout"     },
  { token: "--space-8", name: "Portico",    px: 48,  rem: "3rem",     use: "Section-level spacing, hero cell vertical padding",                role: "section"    },
  { token: "--space-9", name: "Atrium",     px: 64,  rem: "4rem",     use: "Page section breaks, top/bottom bento grid margins",               role: "section"    },
  { token: "--space-10",name: "Colonnade",  px: 96,  rem: "6rem",     use: "Major layout divisions, full-bleed hero vertical rhythm",          role: "page"       },
  { token: "--space-11",name: "Forum",      px: 128, rem: "8rem",     use: "Page-level top margin, grand section entrances",                   role: "page"       },
];

const bentoRules = [
  { rule: "Gutter",              value: "--space-6 (24px)",        note: "Fixed. Never deviate." },
  { rule: "Cell inner padding",  value: "--space-5 to --space-7",  note: "Scale with cell size" },
  { rule: "Featured cell pad",   value: "--space-7 (32px)",        note: "Hero / wide cells only" },
  { rule: "Grid outer margin",   value: "--space-9 (64px)",        note: "Desktop. --space-7 on tablet" },
  { rule: "Cell border-radius",  value: "4px",                     note: "Chamfered, not rounded. Consistent everywhere." },
  { rule: "Overline → Title gap",value: "--space-3 (8px)",         note: "Always Cinzel → Cormorant" },
  { rule: "Title → Body gap",    value: "--space-4 (12px)",        note: "Always Cormorant → EB Garamond" },
  { rule: "Body → CTA gap",      value: "--space-6 (24px)",        note: "Breathing room before action" },
];

const roles = ["all","structural","component","layout","section","page"];

export default function SpacingScale() {
  const [copied, setCopied]     = useState(null);
  const [activeRole, setActiveRole] = useState("all");

  const filtered = activeRole === "all" ? spacingTokens : spacingTokens.filter(t => t.role === activeRole);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const cssBlock = `:root {\n${spacingTokens.map(t => `  ${t.token}: ${t.rem};  /* ${t.name} — ${t.px}px */`).join("\n")}\n}`;

  return (
    <div style={{ minHeight:"100vh", background:"#0f1a1c", color:"#e8dfc8", fontFamily:"'EB Garamond', Georgia, serif", padding:"64px 40px", maxWidth:960, margin:"0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');
        * { box-sizing: border-box; }
        .token-row { display:grid; grid-template-columns:170px 90px 72px 1fr 72px; align-items:center; padding:13px 20px; border-bottom:1px solid rgba(255,255,255,0.05); transition:background 0.15s; }
        .token-row:hover { background:rgba(201,168,76,0.05); }
        .token-row:hover .copy-btn { opacity:1; }
        .copy-btn { opacity:0; background:none; border:1px solid #c9a84c; color:#c9a84c; font-family:'Cinzel',serif; font-size:9px; letter-spacing:.12em; padding:4px 8px; cursor:pointer; transition:all .15s; width:64px; }
        .copy-btn:hover { background:rgba(201,168,76,0.15); }
        .filter-btn { background:none; border:1px solid rgba(255,255,255,0.1); color:rgba(232,223,200,0.45); font-family:'Cinzel',serif; font-size:9px; letter-spacing:.14em; padding:6px 14px; cursor:pointer; transition:all .2s; text-transform:uppercase; }
        .filter-btn.active { border-color:#c9a84c; color:#c9a84c; background:rgba(201,168,76,0.08); }
        .bento-row { display:grid; grid-template-columns:200px 200px 1fr; padding:13px 20px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:14px; }
        .th { font-family:'Cinzel',serif; font-size:8px; letter-spacing:.2em; color:rgba(201,168,76,0.65); text-transform:uppercase; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom:64 }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:".28em", color:"#c9a84c", marginBottom:16 }}>DESIGN SYSTEM · SPACING</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:52, margin:0, lineHeight:1.1 }}>Spacing Scale</h1>
        <div style={{ width:48, height:1, background:"#c9a84c", margin:"14px 0 28px" }} />
        <p style={{ fontSize:17, lineHeight:1.8, color:"rgba(232,223,200,0.6)", maxWidth:560, margin:0 }}>
          An 11-step classical scale derived from an 8px base module. Every token carries an architectural name — from hairline structural details to the grand forum of a full-page layout.
        </p>
      </div>

      {/* ── Base module callout ── */}
      <div style={{ border:"1px solid rgba(201,168,76,0.28)", padding:"20px 28px", marginBottom:48, display:"flex", gap:36, alignItems:"center", background:"rgba(201,168,76,0.04)" }}>
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".2em", color:"#c9a84c", marginBottom:6 }}>BASE MODULE</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:300 }}>8 px</div>
        </div>
        <div style={{ width:1, height:52, background:"rgba(201,168,76,0.2)" }} />
        <div style={{ fontSize:14, lineHeight:1.85, color:"rgba(232,223,200,0.55)" }}>
          All values are multiples of <strong style={{ color:"#e8dfc8" }}>4px</strong> (half-module) or <strong style={{ color:"#e8dfc8" }}>8px</strong> (full module).<br />
          This enforces the grid discipline that neoclassical composition demands.<br />
          <span style={{ color:"#c9a84c" }}>No arbitrary values. No exceptions.</span>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div style={{ display:"flex", gap:8, marginBottom:0 }}>
        {roles.map(r => (
          <button key={r} className={`filter-btn${activeRole===r?" active":""}`} onClick={() => setActiveRole(r)}>{r}</button>
        ))}
      </div>

      {/* ── Table header ── */}
      <div style={{ display:"grid", gridTemplateColumns:"170px 90px 72px 1fr 72px", padding:"10px 20px", borderTop:"1px solid rgba(201,168,76,0.28)", borderBottom:"1px solid rgba(201,168,76,0.28)", margin:"0 0 0 0" }}>
        {["Token","Name","Value","Use Case",""].map((h,i) => <div key={i} className="th">{h}</div>)}
      </div>

      {/* ── Token rows ── */}
      <div style={{ marginBottom:64 }}>
        {filtered.map((t, i) => (
          <div key={t.token} className="token-row" style={{ background: i%2===0 ? "rgba(255,255,255,0.015)" : "transparent" }}>

            {/* token + visual bar */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ height:16, width: Math.max(3,(t.px/128)*56), background:"linear-gradient(90deg,#c9a84c,#7a5e24)", borderRadius:1, flexShrink:0 }} />
              <code style={{ fontFamily:"monospace", fontSize:11, color:"#c9a84c", background:"rgba(201,168,76,0.08)", padding:"2px 6px", borderRadius:2, whiteSpace:"nowrap" }}>{t.token}</code>
            </div>

            {/* name */}
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:".08em", color:"rgba(232,223,200,0.65)" }}>{t.name}</div>

            {/* value */}
            <div>
              <span style={{ fontSize:14, fontWeight:500 }}>{t.px}px</span>
              <span style={{ fontSize:11, color:"rgba(232,223,200,0.35)", display:"block" }}>{t.rem}</span>
            </div>

            {/* use */}
            <div style={{ fontSize:13, color:"rgba(232,223,200,0.5)", lineHeight:1.5 }}>{t.use}</div>

            {/* copy */}
            <button className="copy-btn" onClick={() => copy(`var(${t.token})`, t.token)}>
              {copied===t.token ? "✓" : "COPY"}
            </button>
          </div>
        ))}
      </div>

      {/* ── Bento fixed rules ── */}
      <div style={{ marginBottom:64 }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".24em", color:"#c9a84c", marginBottom:10 }}>BENTO GRID · SPACING RULES</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:34, margin:"0 0 4px" }}>Fixed Constraints</h2>
        <div style={{ width:32, height:1, background:"#c9a84c", marginBottom:24 }} />

        <div style={{ display:"grid", gridTemplateColumns:"200px 200px 1fr", padding:"10px 20px", borderTop:"1px solid rgba(201,168,76,0.28)", borderBottom:"1px solid rgba(201,168,76,0.28)" }}>
          {["Property","Value","Note"].map(h => <div key={h} className="th">{h}</div>)}
        </div>

        {bentoRules.map((r,i) => (
          <div key={r.rule} className="bento-row" style={{ background: i%2===0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:".08em", color:"rgba(232,223,200,0.75)" }}>{r.rule}</div>
            <code style={{ fontFamily:"monospace", fontSize:12, color:"#c9a84c" }}>{r.value}</code>
            <div style={{ color:"rgba(232,223,200,0.45)", fontStyle:"italic" }}>{r.note}</div>
          </div>
        ))}
      </div>

      {/* ── CSS export ── */}
      <div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".24em", color:"#c9a84c", marginBottom:10 }}>EXPORT</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:34, margin:"0 0 4px" }}>CSS Custom Properties</h2>
        <div style={{ width:32, height:1, background:"#c9a84c", marginBottom:24 }} />

        <div style={{ background:"#0a1214", border:"1px solid rgba(201,168,76,0.2)", padding:"28px 32px", position:"relative" }}>
          <button
            onClick={() => copy(cssBlock,"cssblock")}
            style={{ position:"absolute", top:16, right:16, background:"none", border:"1px solid rgba(201,168,76,0.4)", color:"#c9a84c", fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".14em", padding:"5px 14px", cursor:"pointer" }}
          >
            {copied==="cssblock" ? "✓ COPIED" : "COPY ALL"}
          </button>
          <pre style={{ fontFamily:"monospace", fontSize:13, color:"rgba(232,223,200,0.65)", margin:0, lineHeight:2 }}>
            <span style={{ color:"#c9a84c" }}>:root</span>{" {\n"}
            {spacingTokens.map(t => (
              <span key={t.token}>
                {"  "}<span style={{ color:"rgba(201,168,76,0.55)" }}>{t.token}</span>{": "}
                <span style={{ color:"#e8dfc8" }}>{t.rem}</span>{";  "}
                <span style={{ color:"rgba(255,255,255,0.18)", fontSize:11 }}>/* {t.name} — {t.px}px */</span>{"\n"}
              </span>
            ))}
            {"}"}
          </pre>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ marginTop:80, paddingTop:24, borderTop:"1px solid rgba(201,168,76,0.15)", fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".2em", color:"rgba(201,168,76,0.35)", textAlign:"center", textTransform:"uppercase" }}>
        No arbitrary spacing values · 8px base module · Classical order
      </div>
    </div>
  );
}
