import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
import PartnerWithUsSection from "./components/PartnerWithUsSection";
import VisionSection from "./components/VisionSection";
import OpenSourceSection from "./components/OpenSourceSection";
import ManifestoSection from "./components/ManifestoSection";
import ContactSection from "./components/ContactSection";
import FloatingWidget from "./components/FloatingWidget";

export default function Home() {
  return (
    <main>
      {/* 01: Hero — Intelligence for the Real Economy */}
      <HeroSection />

      {/* 02: Introduction & Vision — Intelligence in the Real Economy */}
      <IntroSection />

      {/* 03: Capabilities — How We Integrate Intelligence Into Your Environment */}
      <CapabilitiesSection />

      {/* 03: Physical-World Intelligence — Kinetic perspective & deployments */}
      <VisionSection />

      {/* 04: Manifesto Interlude — Built for operators & industrial reality */}
      <ManifestoSection />

      {/* 05: Deployment Engagement & Intake */}
      <ContactSection />

      {/* Floating Concierge & Community Access */}
      <FloatingWidget />
    </main>
  );
}
