"use client";
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "var(--space-9) 0 var(--space-7)",
      }}
    >
      <div className="section-container">
        {/* Three-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "64px",
            marginBottom: "var(--space-8)",
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "20px" }}>

              <Image src="/logo-black.svg" alt="Logo" width={20} height={20} />

              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  letterSpacing: "0.06em",
                  color: "var(--text-primary)",
                  textTransform: "uppercase",
                }}
              >
                Niena Labs
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "16px",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: "300px",
              }}
            >
              Building the software that pushes humanity forward.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "8px",
                letterSpacing: "0.06em",
                color: "rgba(255,176,32,0.4)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Company
            </div>
            {["Services", "Work", "About", "Philosophy", "Careers", "Contact"].map((link) => {
              const isPage = link === "Careers";
              const content = (
                <div
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "11px", fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "14px",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {link}
                </div>
              );

              return isPage ? (
                <Link key={link} href="/careers" style={{ textDecoration: "none" }}>
                  {content}
                </Link>
              ) : (
                <a key={link} href={`#${link.toLowerCase()}`} style={{ textDecoration: "none" }}>
                  {content}
                </a>
              );
            })}
          </div>

          {/* Social & Legal Column */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "8px",
                letterSpacing: "0.06em",
                color: "rgba(255,176,32,0.4)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Connect
            </div>
            {[
              { label: "LinkedIn", href: "#" },
              { label: "Twitter / X", href: "#" },
              { label: "GitHub", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "11px", fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                  textDecoration: "none",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--amber)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {s.label} →
              </a>
            ))}

            <div
              style={{
                marginTop: "48px",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              hello@Niena Labs.com
            </div>
          </div>
        </div>

        {/* Copyright line */}
        <div
          style={{
            borderTop: "var(--border-hairline)",
            paddingTop: "24px",
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: "7px",
            letterSpacing: "0.06em",
            color: "rgba(255,176,32,0.4)",
            textTransform: "uppercase",
          }}
        >
          © {new Date().getFullYear()} Niena Labs · ALL RIGHTS RESERVED · BUILT WITH PURPOSE
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .section-container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 480px) {
          footer .section-container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
