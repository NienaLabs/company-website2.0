"use client";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CareersPage() {
  return (
    <main style={{ background: "var(--color-void)", minHeight: "100vh" }}>
      <Navbar />
      
      <section style={{ paddingTop: "160px", paddingBottom: "var(--space-10)" }}>
        <div className="section-container">
          <div style={{ marginBottom: "var(--space-10)" }}>
            <div className="overline" style={{ marginBottom: "12px" }}>Careers</div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 64px)", color: "var(--color-text-primary)", lineHeight: 1.1, marginBottom: "24px",
            }}>
              Join the collective.
            </h1>
            <div style={{ width: "60px", height: "1px", background: "var(--color-gold)", marginBottom: "24px" }} />
            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: "18px",
              color: "var(--color-text-secondary)", maxWidth: "600px", lineHeight: 1.85,
            }}>
              We build scalable, AI-driven enterprise applications for businesses ready to scale. 
              We&apos;re looking for individuals who believe in building with unprecedented purpose.
            </p>
          </div>

          <div style={{
            background: "linear-gradient(to bottom, rgba(201,168,76,0.02), transparent)",
            borderTop: "1px solid rgba(201,168,76,0.1)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
            padding: "64px 32px",
            textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "12px",
              letterSpacing: "0.2em",
              color: "var(--color-gold)",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>
              No Current Openings
            </h3>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}>
              Our engineering team is currently at full capacity. We aren&apos;t actively 
              recruiting for new roles today, but we&apos;re always looking out for exceptional 
              talent. We will update this space when new roles open.
            </p>
          </div>
          
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
