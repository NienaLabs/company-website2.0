import type { Metadata } from "next";
import Link from "next/link";
import "./terms.css";

export const metadata: Metadata = {
  title: "Terms & Privacy Policy",
  description:
    "Terms of service, privacy policy, GDPR compliance, and edge data processing standards for Niena Labs.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Privacy Policy | Niena Labs",
    description:
      "Terms of service, privacy policy, GDPR compliance, and edge data processing standards for Niena Labs.",
    url: "https://www.nienalabs.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="terms-page">
      <header className="terms-hero">
        <div className="terms-container">
          <span className="terms-tag">Governance & Privacy</span>
          <h1 className="terms-title">Terms of Service & Privacy Policy</h1>
          <p className="terms-updated">Last revised: November 2026</p>
        </div>
      </header>

      <main className="terms-container terms-content">
        {/* Section 1 */}
        <section className="terms-section">
          <h2 className="terms-section-title">1. Introduction & Overview</h2>
          <p className="terms-paragraph">
            Niena Labs (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) builds specialized software,
            edge infrastructure, and connected hardware engineered for physical reality and the real
            economy. This document governs your use of our public website (www.nienalabs.com), our
            developer tooling, case study portals, and client inquiry channels.
          </p>
        </section>

        {/* Section 2 */}
        <section className="terms-section">
          <h2 className="terms-section-title">2. Real-Economy & Edge Computing Privacy Principles</h2>
          <p className="terms-paragraph">
            Our physical systems—including Compound-V and our industrial defect detection vision
            pipelines—are architected on strict zero-cloud-exposure and privacy-preserving principles:
          </p>
          <ul className="terms-list">
            <li>
              <strong>On-Premises Edge Processing:</strong> Optical data is processed locally on
              dedicated edge silicon without raw video feeds ever streaming to or being stored on
              external public cloud servers.
            </li>
            <li>
              <strong>Zero Biometric Facial Profiling:</strong> Our behavioral perception models track
              anonymous spatial evidence, object bounding boxes, and velocity vectors rather than
              facial recognition databases or cross-facility consumer profiles.
            </li>
            <li>
              <strong>Immediate Frame Discard:</strong> Once optical frames are evaluated by local
              inference loops for conveyor defects or shelf occupancy, raw pixel frames are discarded
              from RAM in accordance with real-time memory recycling.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="terms-section">
          <h2 className="terms-section-title">3. Web Analytics, Cookies & GDPR Compliance</h2>
          <p className="terms-paragraph">
            We use privacy-compliant web measurement tools (Google Analytics 4 and Google Tag Manager)
            strictly to evaluate aggregate site traffic, understand visitor engagement across our
            product documentation, and diagnose application performance.
          </p>

          <div className="terms-card-box">
            <h3 className="terms-card-heading">Google Consent Mode v2</h3>
            <p className="terms-paragraph">
              In strict adherence to GDPR and ePrivacy directives, all analytics storage and advertising
              cookies are set to <code>&apos;denied&apos;</code> by default until a visitor grants explicit consent
              via our consent prompt. If you decline non-essential cookies, Google Analytics operates
              in a cookieless, non-identifying ping mode without persistent identifiers.
            </p>
            <p className="terms-paragraph">
              You may reset or update your cookie preferences at any time by clearing your browser&apos;s
              stored data for this domain or contacting us at{" "}
              <a href="mailto:hello@nienalabs.com" style={{ color: "var(--color-brand)" }}>
                hello@nienalabs.com
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="terms-section">
          <h2 className="terms-section-title">4. Information Collected via Inquiry Channels</h2>
          <p className="terms-paragraph">
            When you submit a deployment inquiry through our contact form or send a speculative engineering
            profile to our careers email, we collect only the information you voluntarily supply:
          </p>
          <ul className="terms-list">
            <li>Name and organization name</li>
            <li>Work email address and optional direct telephone / WhatsApp number</li>
            <li>Operational requirements, facility parameters, or engineering portfolios</li>
          </ul>
          <p className="terms-paragraph">
            We never sell, rent, or monetize your contact information with advertising brokers. Inquiry
            data is used exclusively by our engineering team to evaluate technical feasibility and respond
            to your request.
          </p>
        </section>

        {/* Section 5 */}
        <section className="terms-section">
          <h2 className="terms-section-title">5. Data Subject Rights (GDPR / UK DPA)</h2>
          <p className="terms-paragraph">
            Under applicable data protection laws, you retain the right to:
          </p>
          <ul className="terms-list">
            <li>Request a copy of any personal inquiry information we hold about you.</li>
            <li>Request immediate deletion or correction of your information.</li>
            <li>Withdraw previously granted cookie or communication consent without penalty.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="terms-section">
          <h2 className="terms-section-title">6. Contact & Legal Inquiries</h2>
          <p className="terms-paragraph">
            For questions regarding these terms, data privacy, or enterprise compliance audits, please
            reach our legal and governance team at:
          </p>
          <p className="terms-paragraph" style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            Niena Labs Ltd.<br />
            Email: <a href="mailto:hello@nienalabs.com" style={{ color: "var(--color-brand)" }}>hello@nienalabs.com</a><br />
            Telephone: +233 55 673 2796<br />
            Accra, Ghana
          </p>
        </section>
      </main>
    </div>
  );
}

