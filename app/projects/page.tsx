"use client";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

const allProjects = [
  {
    id: "atlas",
    category: "High-Velocity Event Ticketing",
    title: "Atlas — The Sovereign Exchange",
    body: "A high-velocity ticketing platform engineered for the modern event landscape. Atlas serves as a primary gateway for thousands of users, facilitating seamless access to premier entertainment experiences through mission-critical infrastructure that handles high-demand releases with absolute precision.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    link: "#",
    imageLeft: true,
  },
  {
    id: "niena",
    category: "AI-Driven Career Integration",
    title: "Niena — The Professional Catalyst",
    body: "An intelligent ecosystem redefining the professional journey. Niena leverages advanced AI to harmonize resume synthesis with real-time, high-fidelity interview simulations. By bridging the gap between talent and opportunity, it provides a sophisticated matching engine that aligns aspirations with the market's most compelling roles.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    link: "#",
    imageLeft: false,
  },
  {
    id: "famlink",
    category: "Family Connection Platform",
    title: "Famlink — Bridging the Gap",
    body: "A dedicated platform designed to bring families closer together. Famlink provides a secure, intuitive environment for sharing memories, coordinating events, and staying connected across generations. Built with a focus on privacy and ease of use, it ensures that distance never gets in the way of family bonds.",
    image: "/images/projects/icon-512.png",
    link: "https://famlink-e2lfb9vmd-evans-projects-67622ddd.vercel.app/",
    imageLeft: true,
  }
];

export default function ProjectsPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      
      <section style={{ paddingTop: "160px", paddingBottom: "var(--space-10)" }}>
        <div className="section-container">
          <div style={{ marginBottom: "var(--space-10)" }}>
            <div className="overline" style={{ marginBottom: "12px" }}>Our Work</div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 600,
              fontSize: "clamp(40px, 6vw, 64px)", color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "24px",
            }}>
              Projects we&apos;ve built.
            </h1>
            <div style={{ width: "60px", height: "1px", background: "var(--amber)", marginBottom: "24px" }} />
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "18px",
              color: "var(--text-secondary)", maxWidth: "600px", lineHeight: 1.85,
            }}>
              A selection of products and platforms we are proud to have engineered. From high-velocity ticketing systems to intelligent AI ecosystems, each project represents our commitment to exceptional design and robust architecture.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
            {allProjects.map((project, i) => (
              <div key={project.id} className="work-grid" style={{
                display: "grid", gap: "4%",
                alignItems: "center",
                ...(project.imageLeft ? {} : { direction: "rtl" }),
              }}>
                <div className="work-image-container" style={{ position: "relative", height: "480px", borderRadius: "var(--radius-cell)", overflow: "hidden", direction: "ltr" }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized={project.image.startsWith('/')}
                    sizes="(max-width: 900px) 100vw, 58vw"
                    style={{ objectFit: "cover", filter: "sepia(15%) brightness(0.75)", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(255,176,32,0.06)", mixBlendMode: "multiply" }} />
                  <div className="img-scrim" />
                </div>

                <div className="work-text-container" style={{ direction: "ltr", padding: "0 var(--space-4)" }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
                    color: "rgba(255,176,32,0.6)", textTransform: "uppercase", marginBottom: "16px",
                  }}>
                    {project.category}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontWeight: 600,
                    fontSize: "clamp(24px, 3vw, 36px)", color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "20px",
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "16px",
                    color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: "24px",
                  }}>
                    {project.body}
                  </p>
                  
                  {project.link !== "#" ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: "8px", display: "inline-block" }}>
                      Check it out
                    </a>
                  ) : (
                    <a href="#contact" className="btn-ghost" style={{ marginTop: "8px", display: "inline-block" }}>
                      Start a similar project →
                    </a>
                  )}
                </div>
              </div>
            ))}
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
