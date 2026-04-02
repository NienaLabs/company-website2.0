"use client";
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-void)",
        borderTop: "var(--border-gold-faint)",
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
             
                <Image src="/logo-white.svg" alt="Logo" width={20} height={20} />
              
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "18px",
                  letterSpacing: "0.28em",
                  color: "var(--color-text-primary)",
                  textTransform: "uppercase",
                }}
              >
                NIENALABS
              </span>
            </div>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontSize: "16px",
                color: "var(--color-text-muted)",
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
                fontFamily: "'Cinzel', serif",
                fontSize: "8px",
                letterSpacing: "0.2em",
                color: "rgba(201,168,76,0.4)",
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
                    fontFamily: "'Cinzel', serif",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: "14px",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
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
                fontFamily: "'Cinzel', serif",
                fontSize: "8px",
                letterSpacing: "0.2em",
                color: "rgba(201,168,76,0.4)",
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
                  fontFamily: "'Cinzel', serif",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "14px",
                  textDecoration: "none",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                {s.label} →
              </a>
            ))}

            <div
              style={{
                marginTop: "48px",
                fontFamily: "'EB Garamond', serif",
                fontSize: "14px",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
              }}
            >
              hello@nienalabs.com
            </div>
          </div>
        </div>

        {/* Copyright line */}
        <div
          style={{
            borderTop: "var(--border-hairline)",
            paddingTop: "24px",
            textAlign: "center",
            fontFamily: "'Cinzel', serif",
            fontSize: "7px",
            letterSpacing: "0.2em",
            color: "rgba(201,168,76,0.4)",
            textTransform: "uppercase",
          }}
        >
          © {new Date().getFullYear()} NIENALABS · ALL RIGHTS RESERVED · BUILT WITH PURPOSE
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
