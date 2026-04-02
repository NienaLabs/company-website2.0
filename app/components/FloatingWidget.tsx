"use client";

import { useState } from "react";

// Social Icons as inline SVGs
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.32-.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 0H12C5.373 0 0 5.373 0 12c0 2.623.839 5.048 2.253 7.034L.49 23.49l4.636-1.71c1.93 1.233 4.238 1.95 6.705 1.95 6.627 0 12-5.373 12-12S18.658 0 12.031 0zm0 21.57c-2.181 0-4.2-.62-5.918-1.68l-.424-.265-3.355 1.237 1.257-3.226-.291-.462C2.19 15.632 1.5 13.921 1.5 12c0-5.799 4.717-10.516 10.516-10.516S22.532 6.201 22.532 12 17.83 21.57 12.031 21.57zm5.774-7.882c-.316-.158-1.874-.925-2.164-1.031-.29-.105-.502-.158-.713.158-.211.316-.818 1.031-1.002 1.242-.185.211-.37.237-.686.079-1.921-.951-3.327-2.029-4.394-3.831-.185-.316.185-.29.496-.911.106-.211.053-.4-.026-.558-.079-.158-.713-1.714-.977-2.348-.258-.621-.52-.537-.713-.547-.184-.009-.395-.01-.606-.01-.211 0-.554.079-.844.395-.29.316-1.108 1.082-1.108 2.639 0 1.558 1.134 3.064 1.293 3.275.158.211 2.234 3.411 5.412 4.783 2.148.927 2.923.791 3.45.659.887-.221 1.874-.766 2.138-1.507.264-.74.264-1.374.185-1.507-.079-.132-.29-.211-.606-.37z" />
  </svg>
);

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const ChatBubbleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);


export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration for radial position
  const RADIUS = 96; // Distance of icons from center

  const options = [
    { id: "ai", icon: <BotIcon />, tooltip: "AI Chat", angle: 90, href: "#ai" },
    { id: "telegram", icon: <TelegramIcon />, tooltip: "Telegram", angle: 120, href: "https://t.me/nienalabs", target: "_blank" },
    { id: "linkedin", icon: <LinkedInIcon />, tooltip: "LinkedIn", angle: 150, href: "https://gh.linkedin.com/company/niena-labs", target: "_blank" },
    { id: "whatsapp", icon: <WhatsAppIcon />, tooltip: "WhatsApp", angle: 180, href: "https://wa.me/233556732796", target: "_blank" },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: "32px",
      right: "32px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Container holding everything relative to the center origin */}
      <div style={{ position: "relative", width: "56px", height: "56px" }}>
        
        {/* Sub-buttons cluster */}
        {options.map((opt) => {
          // Convert angle from degrees to radians, where 0 is right, 90 is up.
          const rad = (opt.angle * Math.PI) / 180;
          // Calculate x,y targeting offset (left is negative X, up is negative Y in CSS)
          const tx = Math.cos(rad) * RADIUS;
          const ty = -Math.sin(rad) * RADIUS;

          return (
            <a
              key={opt.id}
              href={opt.href}
              target={opt.target}
              rel={opt.target === "_blank" ? "noopener noreferrer" : undefined}
              className="social-sub-btn"
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--color-slate-elevated)",
                border: "var(--border-gold-faint)",
                color: "var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                // Transition mechanics: if open, translate to calculated position + scale up
                transform: isOpen ? `translate(${tx}px, ${ty}px) scale(1)` : `translate(0px, 0px) scale(0)`,
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
                boxShadow: "0 4px 12px rgba(10,18,20,0.6)",
              }}
              title={opt.tooltip}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-void)";
                e.currentTarget.style.borderColor = "var(--color-gold)";
                e.currentTarget.style.transform = `translate(${tx}px, ${ty}px) scale(1.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-slate-elevated)";
                e.currentTarget.style.borderColor = "var(--color-gold-faint)";
                e.currentTarget.style.transform = `translate(${tx}px, ${ty}px) scale(1)`;
              }}
            >
              {opt.icon}
            </a>
          );
        })}

        {/* Main interactive button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: isOpen ? "rgba(201,168,76,0.15)" : "var(--color-gold)",
            color: isOpen ? "var(--color-gold)" : "var(--color-void)",
            border: isOpen ? "1px solid var(--color-gold)" : "1px solid transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: isOpen ? "none" : "0 8px 24px rgba(201,168,76,0.25)",
            transition: "all 0.3s ease",
            outline: "none",
          }}
        >
          {/* Inner wrapper for rotational icon transition */}
          <div style={{
            position: "relative",
            width: "24px",
            height: "24px",
            transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            {/* The Plus/X icon (visible when open, forms the X via 135deg rotation) */}
            <div style={{
              position: "absolute", inset: 0,
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}>
              <PlusIcon />
            </div>

            {/* The Chat bubble icon (visible when closed) */}
            <div style={{
              position: "absolute", inset: 0,
              opacity: isOpen ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}>
              <ChatBubbleIcon />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
