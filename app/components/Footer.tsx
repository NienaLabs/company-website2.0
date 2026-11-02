"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiMail as Mail,
  FiLinkedin as Linkedin,
  FiGithub as Github,
  FiTwitter as Twitter,
  FiSun as Sun,
} from "react-icons/fi";
import { Card } from "./ui/Card";

export default function Footer() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-container" style={{ borderTop: "1px solid var(--border)" }}>
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-links">
          <Link href="/#environments" className="footer-link">
            Industries
          </Link>
        
          <Link href="/products" className="footer-link">
            Products
          </Link>
          <a
            href="https://github.com/orgs/Nienalabs-community/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Open Source
          </a>
          <Link href="/blog" className="footer-link">
            Research & Blog
          </Link>
          <Link href="/careers" className="footer-link">
            Careers
          </Link>
          <Link href="/terms" className="footer-link">
            Terms & Privacy
          </Link>
        </div>
        <div className="footer-info">
          <div className="footer-info-label">HEADQUARTERS & TIME</div>
          <div className="footer-time">
            <Sun size={14} /> Accra, Ghana, {mounted ? time : "12:00 PM"}
          </div>
        </div>
      </div>

      {/* Center Note Card */}
      <div className="footer-center">
        <Card variant="glass" className="footer-note-card">
          <div className="footer-note-label">
            NIENA LABS // MISSION STATEMENT
          </div>

          <div className="footer-note-text">
            <div className="footer-note-line">
              Dedicated to building specialized software, infrastructure, and hardware
            </div>
            <div className="footer-note-line">
              that bring intelligence into the real economy and improve people&apos;s lives.
            </div>
            <div className="footer-note-line" style={{ marginTop: "8px", opacity: 0.8 }}>
              From factories and institutions to enterprise and personal spaces.
            </div>
            <div
              className="footer-note-line"
              style={{ marginTop: "8px", color: "var(--color-brand)", fontWeight: 600 }}
            >
              hello@nienalabs.com
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Social Icons */}
      <div className="footer-socials">
        {[
          { Icon: Mail, rotation: -12, href: "mailto:hello@nienalabs.com" },
          {
            Icon: Linkedin,
            rotation: -4,
            href: "https://gh.linkedin.com/company/niena-labs",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          {
            Icon: Github,
            rotation: 6,
            href: "https://github.com/orgs/Nienalabs-community/repositories",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          {
            Icon: Twitter,
            rotation: 14,
            href: "https://x.com/LabsNiena86233",
            target: "_blank",
            rel: "noopener noreferrer",
          },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            target={item.target}
            rel={item.rel}
            aria-label="Social Link"
            className="footer-social-btn"
            style={{
              transform: `rotate(${item.rotation}deg)`,
              marginLeft: i !== 0 ? "clamp(-20px, -4vw, -40px)" : "0",
              zIndex: i + 1,
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
            <item.Icon className="footer-social-icon" strokeWidth={2.5} />
          </a>
        ))}
      </div>
    </footer>
  );
}
