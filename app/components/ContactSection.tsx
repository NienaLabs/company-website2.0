"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const goldRuleRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", idea: "" });

  const [copiedPhone, setCopiedPhone] = useState(false);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const st = { trigger: sectionRef.current, start: "top 70%" };

    gsap.fromTo(goldRuleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "left", scrollTrigger: st }
    );
    gsap.fromTo(leftRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: st }
    );
    gsap.fromTo(rightRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.15, scrollTrigger: st }
    );
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("sent");
  };

  const handlePhoneClick = () => {
    navigator.clipboard.writeText("+233556732796");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ background: "var(--color-abyss)", padding: "var(--space-10) 0" }}
    >
      <div className="section-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          {/* Left */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <div className="overline" style={{ marginBottom: "16px" }}>Start the conversation</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 42px)", color: "var(--color-text-primary)", lineHeight: 1.1, marginBottom: "16px",
            }}>
              Tell us what you&apos;re building.
            </h2>
            <div
              ref={goldRuleRef}
              style={{
                width: "48px", height: "1px", background: "var(--color-gold)",
                marginBottom: "24px", transform: "scaleX(0)", transformOrigin: "left",
              }}
            />
            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: "17px",
              color: "var(--color-text-secondary)", lineHeight: 1.85, maxWidth: "400px", marginBottom: "40px",
            }}>
              We don&apos;t need a full brief. We need to know what you believe is possible. Every great product started with a conversation.
            </p>
            {[
              { label: "Book a call", value: copiedPhone ? "Number Copied!" : "+233 55 673 2796", href: "tel:+233556732796", isPhone: true },
              { label: "Email", value: "hello@nienalabs.com", href: "mailto:hello@nienalabs.com" },
              { label: "LinkedIn", value: "Nienalabs", href: "https://www.linkedin.com/company/nienalabs" },
            ].map((ch) => (
              <a 
                key={ch.label} 
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={ch.isPhone ? handlePhoneClick : undefined}
                style={{
                  display: "block",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  padding: "16px 0", borderBottom: "var(--border-hairline)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.18em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }}>{ch.label}</span>
                  <span style={{ fontFamily: "'EB Garamond', serif", fontSize: "15px", color: ch.isPhone && copiedPhone ? "var(--color-gold)" : "var(--color-text-secondary)", transition: "color 0.2s ease" }}>{ch.value}</span>
                  <span style={{ color: "rgba(201,168,76,0.4)", fontSize: "14px" }}>→</span>
                </div>
              </a>
            ))}
          </div>

          {/* Right — Form */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            {formState === "sent" ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "320px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "28px", color: "var(--color-text-primary)", textAlign: "center", lineHeight: 1.4 }}>
                  We&apos;ll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {[
                  { id: "name", label: "Name", type: "input", placeholder: "Your name", inputType: "text" },
                  { id: "email", label: "Email", type: "input", placeholder: "your@email.com", inputType: "email" },
                  { id: "idea", label: "Your idea, in one sentence", type: "textarea", placeholder: "We're building..." },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} style={{
                      fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "0.2em",
                      color: "var(--color-gold)", textTransform: "uppercase", display: "block", marginBottom: "8px",
                    }}>
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        required
                        placeholder={field.placeholder}
                        className="input-field"
                        value={form.idea}
                        onChange={(e) => setForm({ ...form, idea: e.target.value })}
                        style={{ minHeight: "120px" }}
                      />
                    ) : (
                      <input
                        id={field.id}
                        type={field.inputType}
                        required
                        placeholder={field.placeholder}
                        className="input-field"
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formState === "sending"}
                >
                  {formState === "sending" ? "Sending..." : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #contact .section-container > div:last-child { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
