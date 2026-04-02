"use client";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import Image from 'next/image'

export default function LocalBusinessesPage() {
  const [copied, setCopied] = useState(false);

  const handleCallClick = () => {
    navigator.clipboard.writeText("+233556732796");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ background: "var(--color-void)", minHeight: "100vh" }}>
      <Navbar />
      
      <section style={{ paddingTop: "160px", paddingBottom: "var(--space-10)" }}>
        <div className="section-container">
          <div style={{ marginBottom: "var(--space-10)" }}>
            <div className="overline" style={{ marginBottom: "12px" }}>Local Business</div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 64px)", color: "var(--color-text-primary)", lineHeight: 1.1, marginBottom: "24px",
            }}>
              Work for local businesses.
            </h1>
            <div style={{ width: "60px", height: "1px", background: "var(--color-gold)", marginBottom: "24px" }} />
            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: "18px",
              color: "var(--color-text-secondary)", maxWidth: "600px", lineHeight: 1.85,
            }}>
              We believe great engineering isn&apos;t just for global enterprises. We partner with local 
              businesses — from restaurants to fashion brands — to craft premium digital experiences 
              that elevate their brand and drive real growth.
            </p>
          </div>

          <div className="work-grid" style={{
            display: "grid", gap: "4%",
            alignItems: "center",
          }}>
            <div className="work-image-container" style={{ position: "relative", height: "480px", borderRadius: "var(--radius-cell)", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&q=80"
                alt="Ellis Couture Website"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                style={{ objectFit: "cover", filter: "sepia(15%) brightness(0.75)", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(201,168,76,0.06)", mixBlendMode: "multiply" }} />
              <div className="img-scrim" />
            </div>

            <div className="work-text-container" style={{ padding: "0 var(--space-4)" }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.22em",
                color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "16px",
              }}>
                Fashion E-Commerce
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: "clamp(24px, 3vw, 36px)", color: "var(--color-text-primary)", lineHeight: 1.15, marginBottom: "20px",
              }}>
                elliscouture
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif", fontSize: "16px",
                color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: "24px",
              }}>
                A refined, high-performance e-commerce platform built for a premier fashion designing business based locally in Accra. 
                We engineered a seamless, visually stunning shopping experience that allows their customers to browse 
                collections, configure sizes, and purchase securely online.
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                {["Next.js", "TailwindCSS", "Stripe", "Sanity CMS"].map((tech) => (
                  <span key={tech} style={{
                    fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "var(--color-gold)",
                    background: "rgba(201,168,76,0.08)", border: "var(--border-gold)",
                    borderRadius: "var(--radius-tag)", padding: "4px 10px",
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
              
              <div style={{ marginTop: "40px", position: "relative", display: "inline-block" }}>
                <p style={{
                  fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "16px",
                  color: "var(--color-text-primary)", marginBottom: "16px",
                }}>
                  Looking to elevate your business online? Let&apos;s talk.
                </p>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <a 
                    href="tel:+233556732796" 
                    onClick={handleCallClick}
                    className="btn-primary" 
                    style={{ display: "inline-flex" }}
                  >
                    Book a Call
                  </a>
                  {copied && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "8px",
                      background: "var(--color-abyss)",
                      border: "var(--border-gold-faint)",
                      color: "var(--color-gold)",
                      fontSize: "9px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      whiteSpace: "nowrap",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.1em",
                      zIndex: 10,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
                    }}>
                      Number Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      <Footer />
      <style>{`
        .work-grid { grid-template-columns: 58% 38%; }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: 1fr !important; gap: 40px !important; direction: ltr !important; }
          .work-image-container { height: 320px !important; }
          .work-text-container { padding: 0 !important; }
        }
      `}</style>
    </main>
  );
}
