import SmoothScrollProvider from "./components/SmoothScrollProvider";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import RecentNewsSection from "./components/RecentNewsSection";
import PhilosophySection from "./components/PhilosophySection";
import VisionSection from "./components/VisionSection";
import OpenSourceSection from "./components/OpenSourceSection";
import ManifestoSection from "./components/ManifestoSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingWidget from "./components/FloatingWidget";
import CapabilitiesSection from "./components/CapabilitiesSection";
import LoadingScreen from "./components/LoadingScreen";
import BootcampPopup from "./components/BootcampPopup";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <BootcampPopup />
      <Navbar />
      <main>
        {/* Section 01 — Hero: The Manifesto */}
        <HeroSection />

        {/* Section 01.5 — Recent News */}
        <RecentNewsSection />

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

        {/* Section 10 — Footer */}
        <Footer />

        {/* Floating Social Widget (Bottom Right) */}
        <FloatingWidget />
      </main>
    </SmoothScrollProvider>
  );
}
