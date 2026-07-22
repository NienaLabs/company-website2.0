"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";

export default function BootcampPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show after a slight delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    setIsMounted(true);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (isVisible && popupRef.current && overlayRef.current) {
        // Animate overlay
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Animate popup with a pop effect
        gsap.fromTo(
          popupRef.current,
          { scale: 0.8, opacity: 0, y: 20 },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "back.out(1.5)",
            delay: 0.1 
          }
        );
      }
    },
    { dependencies: [isVisible], scope: overlayRef }
  );

  const handleClose = () => {
    if (popupRef.current && overlayRef.current) {
      gsap.to(popupRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsVisible(false)
      });
    } else {
      setIsVisible(false);
    }
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-6 opacity-0"
    >
      <div 
        ref={popupRef}
        className="relative w-full max-w-65 md:max-w-160 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row opacity-0"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset"
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm md:bg-neutral-100 md:hover:bg-neutral-200 md:text-neutral-500 md:dark:bg-white/10 md:dark:hover:bg-white/15 md:dark:text-neutral-300 transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X size={14} />
        </button>

        {/* Image Section — capped height on mobile so it never dominates */}
        <div className="relative w-full max-h-60 md:max-h-none md:w-65 aspect-804/1080 bg-neutral-100 dark:bg-neutral-950 shrink-0 overflow-hidden">
          <Image 
            src="/images/advertisement/bootcamp.jpg" 
            alt="Bootcamp Flyer" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 260px, 260px"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="px-5 py-5 md:px-8 md:py-7 flex flex-col justify-center items-center text-center gap-3 md:gap-4 w-full md:flex-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] md:text-[11px] font-bold uppercase tracking-wider w-fit">
            <span className="text-amber-500 text-xs">✦</span>
            Early Bird Offer
          </div>
          
          <h2 className="font-heading text-lg md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white leading-snug">
            Join our upcoming Bootcamp{" "}
            <span className="text-amber-500"> 20% Off</span>
          </h2>
          
          <div className="flex flex-col gap-1.5">
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Level up with Africa&apos;s best online Software Engineering Bootcamp. Discount valid until{" "}
              <strong className="text-neutral-800 dark:text-white font-semibold">August 22</strong>.
            </p>
            <p className="text-xs md:text-sm text-amber-600 dark:text-amber-400 font-medium">
              Registration closes with limited slots!
            </p>
          </div>

          <div className="mt-1 md:mt-2 flex flex-col gap-2.5 w-full">
            <Link 
              href="/bootcamp/courses" 
              onClick={handleClose}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-400/30 hover:shadow-[0_0_0_4px_var(--amber-glow)] transition-all text-xs md:text-sm w-full cursor-pointer"
            >
              Register Now
            </Link>
            <button 
              onClick={handleClose}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-transparent border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 font-medium rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white focus:outline-none transition-all text-xs md:text-sm w-full cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
