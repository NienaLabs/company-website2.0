"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMail as Mail, FiLinkedin as Linkedin, FiGithub as Github, FiTwitter as Twitter, FiSun as Sun } from "react-icons/fi";
import { Card } from "./ui/Card";

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
    <footer className="footer-container">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-links">
          <Link href="/careers" className="footer-link">Careers</Link>
          <Link href="/terms" className="footer-link">Terms & Conditions</Link>
        </div>
        <div className="footer-info">
          <div className="footer-info-label">CURRENTLY</div>
          <div className="footer-time">
            <Sun size={14} /> Accra, Ghana, {mounted ? time : "11:02 AM"}
          </div>
        </div>
      </div>

      {/* Center Note Card */}
      <div className="footer-center">
        <Card variant="glass" className="footer-note-card">
          <div className="footer-note-label">
            NOTE FROM NIENALABS
          </div>
          
          <div className="footer-note-text">
            <div className="footer-note-line">Hi, thank you for being here &lt;3</div>
            <div className="footer-note-line">Software engineering, to me, is care and intentionality.</div>
            <div className="footer-note-line">If something here stayed with you,</div>
            <div className="footer-note-line">say hello@nienalabs.com!</div>
          </div>
        </Card>
      </div>

      {/* Bottom Social Icons */}
      <div className="footer-socials">
        {[
          { Icon: Mail, rotation: -12, href: "mailto:hello@nienalabs.com" },
          { Icon: Linkedin, rotation: -4, href: "#" },
          { Icon: Github, rotation: 6, href: "#" },
          { Icon: Twitter, rotation: 14, href: "#" }
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="footer-social-btn"
            style={{
              transform: `rotate(${item.rotation}deg)`,
              marginLeft: i !== 0 ? "clamp(-20px, -4vw, -40px)" : "0",
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
            <item.Icon className="footer-social-icon" strokeWidth={2.5} />
          </a>
        ))}
      </div>
    </footer>
  );
}

