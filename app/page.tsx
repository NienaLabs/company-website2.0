import HeroSection from "./components/HeroSection";
import PhilosophySection from "./components/PhilosophySection";
import VisionSection from "./components/VisionSection";
import OpenSourceSection from "./components/OpenSourceSection";
import ManifestoSection from "./components/ManifestoSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingWidget from "./components/FloatingWidget";
import CapabilitiesSection from "./components/CapabilitiesSection";
export default function Home() {
  return (
    <main>
      {/* Section 01 — Hero: The Manifesto */}
      <HeroSection />

        {/* Section 02 — Philosophy: A Scroll-Driven Reveal */}
        <PhilosophySection />

        {/* Section 03 — Capabilities: The Bento Grid */}
        <CapabilitiesSection />

     

        
        {/* Section 06 — Vision & Testimonials (Perspective Transition) */}
        <VisionSection />

        {/* Section 08 — Open Source */}
        <OpenSourceSection />

        {/* Section 09 — Manifesto Interlude */}
        <ManifestoSection />

        {/* Section 09 — Contact: The Closing Invitation */}
        <ContactSection />

      {/* Floating Social Widget (Bottom Right) */}
      <FloatingWidget />
    </main>
  );
}
