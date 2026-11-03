"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Send } from "lucide-react";
import ScrollBlurReveal from "./ui/ScrollBlurReveal";
import { trackEvent } from "../../lib/analytics";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const environmentOptions = [
  "Factory & Industrial",
  "Business & Enterprise",
  "Institution & Healthcare",
  "Home & Living Space",
  "Edge Infrastructure",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const goldRuleRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("Factory & Industrial");
  const [form, setForm] = useState({ name: "", email: "", idea: "" });
  const [copiedPhone, setCopiedPhone] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const st = { trigger: sectionRef.current, start: "top 70%" };

      const timer = setTimeout(() => {
        gsap.fromTo(
          goldRuleRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            transformOrigin: "left",
            scrollTrigger: st,
          }
        );
        gsap.fromTo(
          leftRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: st,
          }
        );
        gsap.fromTo(
          rightRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.15,
            scrollTrigger: st,
          }
        );
      }, 100);
      return () => clearTimeout(timer);
    },
    { scope: sectionRef, dependencies: [] }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const payload = {
        ...form,
        environment: selectedEnvironment,
        idea: `[Environment: ${selectedEnvironment}] ${form.idea}`,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormState("sent");
        setForm({ name: "", email: "", idea: "" });
        trackEvent("generate_lead", {
          environment: selectedEnvironment,
          form_name: "deployment_inquiry",
        });
      } else {
        const data = await response.json();
        console.error("Form Error:", data.error);
        setFormState("idle");
        alert(
          "There was an error sending your message. Please try again or email us directly at hello@nienalabs.com."
        );
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setFormState("idle");
      alert("There was a connection error. Please check your internet and try again.");
    }
  };

  const handlePhoneClick = () => {
    navigator.clipboard.writeText("+233556732796");
    setCopiedPhone(true);
    trackEvent("contact_click", { method: "phone" });
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "clamp(100px, 12vw, 160px) 0",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(36px, 6vw, 72px)",
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div>
            <ScrollBlurReveal
              as="h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(32px, 4.5vw, 48px)",
                color: "var(--text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Deploy intelligence in your environment.
            </ScrollBlurReveal>

            <ScrollBlurReveal
              as="p"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: "460px",
                marginBottom: "36px",
              }}
            >
              Tell us about your operational challenges, factory inspection requirements, or
              institutional infrastructure needs. We build specialized software, infrastructure,
              and hardware to solve real-world problems.
            </ScrollBlurReveal>

            <div ref={leftRef} style={{ opacity: 0 }}>
            {[
              {
                label: "Direct Line",
                value: copiedPhone ? "Number Copied!" : "+233 55 673 2796",
                href: "tel:+233556732796",
                isPhone: true,
              },
              {
                label: "Email Support",
                value: "hello@nienalabs.com",
                href: "mailto:hello@nienalabs.com",
              },
              {
                label: "LinkedIn",
                value: "Niena Labs",
                href: "https://gh.linkedin.com/company/niena-labs",
              },
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
                <div
                  style={{
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--color-brand)",
                      textTransform: "uppercase",
                    }}
                  >
                    {ch.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      color:
                        ch.isPhone && copiedPhone
                          ? "var(--amber)"
                          : "var(--text-secondary)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {ch.value}
                  </span>
                  <span style={{ color: "var(--color-brand)", fontSize: "14px" }}>→</span>
                </div>
              </a>
            ))}
            </div>
          </div>

          {/* Right Column — Form */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              backgroundColor: "var(--md-sys-color-surface-container-low)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-3xl)",
              padding: "clamp(24px, 4vw, 40px)",
            }}
          >
            {formState === "sent" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "360px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(224, 209, 46, 0.15)",
                    border: "1px solid var(--color-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-brand)",
                    marginBottom: "20px",
                  }}
                >
                  <Check size={28} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "26px",
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                  }}
                >
                  Inquiry Received
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    color: "var(--text-secondary)",
                    maxWidth: "360px",
                  }}
                >
                  Our principal systems team will review your environment requirements and reach
                  out within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                {/* Target Environment Chips */}
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--color-brand)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    Target Operating Environment
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {environmentOptions.map((env) => {
                      const isSelected = selectedEnvironment === env;
                      return (
                        <button
                          key={env}
                          type="button"
                          onClick={() => setSelectedEnvironment(env)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "var(--radius-full)",
                            fontSize: "12px",
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                            cursor: "pointer",
                            transition: "all 150ms ease",
                            backgroundColor: isSelected
                              ? "var(--color-brand)"
                              : "var(--md-sys-color-surface-container-highest)",
                            color: isSelected
                              ? "var(--color-brand-fg)"
                              : "var(--text-secondary)",
                            border: isSelected
                              ? "1px solid var(--color-brand)"
                              : "1px solid var(--border)",
                          }}
                        >
                          {env}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--color-brand)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Your Name / Organization
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova / Precision Labs"
                    className="input-field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--color-brand)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Work Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    className="input-field"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-idea"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--color-brand)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Operational Challenge or System Requirements
                  </label>
                  <textarea
                    id="contact-idea"
                    required
                    placeholder="Describe the environment, camera telemetry, edge compute scale, or automated workflow requirements..."
                    className="input-field"
                    value={form.idea}
                    onChange={(e) => setForm({ ...form, idea: e.target.value })}
                    style={{ minHeight: "130px" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formState === "sending"}
                  style={{
                    padding: "16px 32px",
                    fontSize: "13px",
                    fontWeight: 600,
                    borderRadius: "var(--radius-full)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    marginTop: "8px",
                  }}
                >
                  <Send size={15} />
                  <span>
                    {formState === "sending"
                      ? "Transmitting System Inquiry..."
                      : "Submit Deployment Inquiry"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #contact .section-container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
