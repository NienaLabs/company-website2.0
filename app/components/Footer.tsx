"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMail as Mail, FiLinkedin as Linkedin, FiGithub as Github, FiTwitter as Twitter, FiSun as Sun } from "react-icons/fi";

export default function Footer() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "var(--amber)",
        color: "var(--bg)", // ensures contrast on the amber background
        padding: "clamp(var(--space-5), 5vw, var(--space-8))",
        overflow: "hidden",
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between w-full z-10 gap-6" style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: "clamp(10px, 1.5vw, 12px)", 
        letterSpacing: "0.05em", 
        textTransform: "uppercase",
      }}>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-[var(--space-6)]">
          <Link href="/careers" style={{ fontWeight: 600, textDecoration: "none", color: "inherit", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>Careers</Link>
          <Link href="/terms" style={{ fontWeight: 600, textDecoration: "none", color: "inherit", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>Terms & Conditions</Link>
        </div>
        <div className="text-left sm:text-right">
          <div style={{ opacity: 0.7, marginBottom: "var(--space-1)" }}>CURRENTLY</div>
          <div className="flex items-center gap-2 justify-start sm:justify-end" style={{ fontWeight: 600 }}>
            <Sun size={14} /> Accra, Ghana, {mounted ? time : "11:02 AM"}
          </div>
        </div>
      </div>

      {/* Center Note Card */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(20px, 4vw, 40px) 0 clamp(60px, 12vw, 120px) 0",
        zIndex: 5
      }}>
        <div style={{
          background: "var(--surface)",
          color: "var(--text-primary)",
          padding: "clamp(var(--space-5), 5vw, var(--space-8)) clamp(var(--space-6), 6vw, var(--space-9))",
          borderRadius: "var(--radius-lg)",
          transform: "rotate(-2.5deg)",
          maxWidth: "680px",
          width: "100%",
          boxShadow: "var(--shadow-panel)"
        }}>
          <div style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "clamp(10px, 1.5vw, 11px)", 
            letterSpacing: "0.05em", 
            opacity: 0.6, 
            marginBottom: "var(--space-5)", 
            textTransform: "uppercase" 
          }}>
            NOTE FROM NIENALABS
          </div>
          
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 3vw, 26px)",
            lineHeight: 1.8,
            fontWeight: 500
          }}>
            <div style={{ borderBottom: "1.5px dashed var(--border-strong)", paddingBottom: "12px", marginBottom: "12px" }}>Hi, thank you for being here &lt;3</div>
            <div style={{ borderBottom: "1.5px dashed var(--border-strong)", paddingBottom: "12px", marginBottom: "12px" }}>Software engineering, to me, is care and intentionality.</div>
            <div style={{ borderBottom: "1.5px dashed var(--border-strong)", paddingBottom: "12px", marginBottom: "12px" }}>If something here stayed with you,</div>
            <div style={{ borderBottom: "1.5px dashed var(--border-strong)", paddingBottom: "12px" }}>say hello@nienalabs.com!</div>
          </div>
        </div>
      </div>

      {/* Bottom Social Icons */}
      <div style={{
        position: "absolute",
        bottom: "clamp(-20px, -4vw, -40px)",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20
      }}>
        {[
          { Icon: Mail, rotation: -12, href: "mailto:hello@nienalabs.com" },
          { Icon: Linkedin, rotation: -4, href: "#" },
          { Icon: Github, rotation: 6, href: "#" },
          { Icon: Twitter, rotation: 14, href: "#" }
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            style={{
              width: "clamp(80px, 18vw, 160px)",
              height: "clamp(80px, 18vw, 160px)",
              background: "var(--amber)",
              borderRadius: "clamp(16px, 4vw, 32px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${item.rotation}deg)`,
              marginLeft: i !== 0 ? "clamp(-20px, -4vw, -40px)" : "0",
              border: "clamp(4px, 1vw, 8px) solid var(--bg)",
              color: "var(--bg)",
              transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0s",
              position: "relative",
              zIndex: i + 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `rotate(${item.rotation}deg) translateY(-15px) scale(1.05)`;
              e.currentTarget.style.zIndex = "50";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotate(${item.rotation}deg)`;
              e.currentTarget.style.zIndex = (i + 1).toString();
            }}
          >
            <item.Icon style={{ width: "45%", height: "45%" }} strokeWidth={2.5} />
          </a>
        ))}
      </div>


    </footer>
  );
}
