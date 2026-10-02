"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, ShoppingCart, Download, Network, Heart, ArrowUpRight, Layers, Terminal } from "lucide-react";
import { Card, DynamicColor } from "../components/ui/Card";
import { Typography } from "../components/ui/Typography";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projectsData = [
  {
    id: 1,
    name: "Niena",
    category: "AI Career Platform",
    description: "An AI-powered platform that helps people look and apply for jobs, optimize their resumes, and take interviews with real-time avatars.",
    color: "4" as DynamicColor,
    colSpan: 2,
    icon: Bot,
    link: "#",
  },
  {
    id: 2,
    name: "Konura",
    category: "AI E-Commerce",
    description: "An AI-powered e-commerce platform designed to personalize shopping experiences and optimize conversions.",
    color: "2" as DynamicColor,
    colSpan: 1,
    icon: ShoppingCart,
    link: "#",
  },
  {
    id: 3,
    name: "Replay",
    category: "Desktop Utility",
    description: "A high-performance desktop app for downloading videos from over 1200+ websites, including YouTube.",
    color: "1" as DynamicColor,
    colSpan: 1,
    icon: Download,
    link: "#",
    logoImage: "/images/projects/replay.png",
  },
  {
    id: 4,
    name: "Katana",
    category: "P2P Mobile & Desktop",
    description: "A cross-platform app for file sharing, voice calls, and video calls entirely on the local network without internet access.",
    color: "3" as DynamicColor,
    colSpan: 1,
    icon: Network,
    link: "#",
    logoImage: "/images/projects/katana.png",
  },
  {
    id: 5,
    name: "Famlink",
    category: "Social Media",
    description: "A private social media platform designed specifically to allow family members and loved ones to stay closely in touch.",
    color: "2" as DynamicColor,
    colSpan: 1,
    icon: Heart,
    link: "#",
  },
  {
    id: 6,
    name: "alugard-drop",
    category: "Open Source Library",
    description: "A zero-dependency, framework-agnostic drag-and-drop library built for precision and performance. Works in React, Vue, Svelte, or Vanilla JS.",
    color: "4" as DynamicColor,
    colSpan: 2,
    icon: Layers,
    link: "https://github.com/orgs/Nienalabs-community/repositories",
    logoImage: "/images/projects/alugard.png",
  },
  {
    id: 7,
    name: "niena-starter-kit",
    category: "Open Source CLI",
    description: "An opinionated CLI scaffolder for Next.js projects. Ships with enterprise-grade authentication and a menu-driven stack selection.",
    color: "1" as DynamicColor,
    colSpan: 1,
    icon: Terminal,
    link: "https://github.com/orgs/Nienalabs-community/repositories",
  }
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP((_context, contextSafe) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    if (!contextSafe) return;

    gsap.fromTo(
      ".project-card",
      { y: 40, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section with Custom Pattern */}
      <section 
        className="relative overflow-hidden flex flex-col justify-center border-b border-[var(--color-border)]"
        style={{
          backgroundColor: '#0a0a0c',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' opacity='.5'%3E%3C/path%3E%3Cpath d='M15 15h50l-5 5H20v40l-5 5V15zm0 50h50V15L80 0v80H0l15-15zm32.07-32.07l3.54-3.54A15 15 0 0 1 29.4 50.6l3.53-3.53a10 10 0 1 0 14.14-14.14zM32.93 47.07a10 10 0 1 1 14.14-14.14L32.93 47.07z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
          color: '#f5f3ee',
          minHeight: '85vh',
          paddingTop: 'calc(var(--space-9) + 80px)',
          paddingBottom: 'var(--space-9)',
        }}
      >
        
        <div className="section-container relative z-10 w-full">
          <div className="max-w-4xl flex flex-col" style={{ gap: 'var(--space-5)' }}>
            <div>
              <Typography variant="caption1" color="brand" className="uppercase tracking-widest font-bold" style={{ marginBottom: 'var(--space-3)' }}>
                Products
              </Typography>
              <Typography variant="display" className="leading-tight tracking-tight" style={{ color: '#f5f3ee' }}>
                Products built with <br />
                <span className="opacity-75">uncompromising precision.</span>
              </Typography>
            </div>
            
            <div className="flex flex-col max-w-2xl" style={{ gap: 'var(--space-4)' }}>
              <Typography variant="body1" className="text-xl md:text-2xl leading-relaxed opacity-90 font-medium" style={{ color: '#d4d4d8' }}>
                We believe the best tools are born from conversation. By staying connected with the community and our enterprise partners, we deeply understand their unique operational challenges.
              </Typography>
              
              <Typography variant="body1" className="text-xl md:text-2xl leading-relaxed opacity-90 font-medium" style={{ color: '#d4d4d8' }}>
                With a dedicated team of elite engineers on board, we know how to build secure, scalable platforms that actually make people's work easier, faster, and more beautiful.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section style={{ paddingTop: 'calc(var(--spacing-section-gap) * 1.5)', paddingBottom: 'var(--spacing-section-gap)' }}>
        <div className="section-container">
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectsData.map((project) => (
              <div 
                key={project.id} 
                className={`project-card ${project.colSpan === 2 ? 'lg:col-span-2' : 'col-span-1'} flex group`}
              >
                <Card 
                  variant="dynamic" 
                  dynamicColor={project.color} 
                  interactive={true}
                  className="w-full flex-1 relative overflow-hidden"
                  style={{ minHeight: '340px' }}
                >
                  <div className="flex flex-col h-full justify-between z-10 relative">
                    <div>
                      <Typography 
                        variant="caption1" 
                        style={{ color: `var(--color-alt-${project.color}-fg)` }} 
                        className="uppercase tracking-widest opacity-80 mb-4"
                      >
                        {project.category}
                      </Typography>
                      <div className="flex items-center gap-3 mb-4">
                        {/* Logo */}
                        {project.logoImage ? (
                          <img 
                            src={project.logoImage} 
                            alt={`${project.name} logo`} 
                            className="w-10 h-10 object-contain drop-shadow-md"
                          />
                        ) : (
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                            style={{ 
                              backgroundColor: `var(--color-alt-${project.color}-active)`,
                              color: `var(--color-alt-${project.color}-fg)`
                            }}
                          >
                            {project.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <Typography 
                          variant="title3" 
                          style={{ color: `var(--color-alt-${project.color}-fg)` }} 
                          className="m-0"
                        >
                          {project.name}
                        </Typography>
                      </div>
                    </div>
                    
                    <div className="pr-12">
                      <Typography 
                        variant="body2" 
                        style={{ color: `var(--color-alt-${project.color}-fg)` }} 
                        className="opacity-90 max-w-sm mb-6"
                      >
                        {project.description}
                      </Typography>
                      
                      {project.link && project.link !== "#" && (
                        <a 
                          href={project.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold opacity-80 hover:opacity-100 transition-opacity"
                          style={{ color: `var(--color-alt-${project.color}-fg)` }}
                        >
                          View on GitHub <ArrowUpRight size={16} strokeWidth={2.5} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom Right Icon */}
                  <div 
                    className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none"
                    style={{ color: `var(--color-alt-${project.color}-fg)` }}
                  >
                    <project.icon size={64} strokeWidth={1.5} />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
