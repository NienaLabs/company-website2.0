"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { getStoredConsent, setConsent } from "../../lib/analytics";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if user has not yet decided
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    setConsent("granted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsent("denied");
    setIsVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="cookie-consent-backdrop"
    >
      <div className="cookie-consent-card">
        <div className="cookie-consent-header">
          <div className="cookie-consent-icon">
            <Cookie size={18} strokeWidth={2} />
          </div>
          <span className="cookie-consent-title">Privacy & Cookie Preferences</span>
        </div>

        <p className="cookie-consent-text">
          We use cookies and measurement telemetry to understand traffic and optimize system
          performance. No advertising tracking or cross-site profiling is conducted. Learn more in
          our{" "}
          <Link href="/terms" className="cookie-consent-link">
            Terms & Privacy
          </Link>
          .
        </p>

        <div className="cookie-consent-actions">
          <button
            type="button"
            onClick={handleAccept}
            className="cookie-btn-accept"
          >
            Accept Analytics
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="cookie-btn-decline"
          >
            Decline Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
}

