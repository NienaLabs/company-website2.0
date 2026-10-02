"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isFocused: boolean) => React.ReactNode;
  autoPlay?: boolean;
  interval?: number; // ms
  className?: string;
  style?: React.CSSProperties;
  variant?: 'snap' | 'marquee';
  marqueeSpeed?: string; // e.g. "40s"
}

export function Carousel<T>({
  items,
  renderItem,
  autoPlay = false,
  interval = 3000,
  className = '',
  style = {},
  variant = 'snap',
  marqueeSpeed = '40s',
}: CarouselProps<T>) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  // Handle scroll snapping detection to accurately update focused index
  const handleScroll = () => {
    if (variant !== 'snap') return;
    if (!scrollRef.current) return;
    
    const containerRect = scrollRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = focusedIndex;
    let minDistance = Infinity;

    // Filter to only actual item elements (ignoring any style tags or text nodes)
    const children = Array.from(scrollRef.current.children).filter(
      (child) => child instanceof HTMLElement && child.tagName !== 'STYLE'
    ) as HTMLElement[];

    children.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== focusedIndex) {
      setFocusedIndex(closestIndex);
    }
  };

  // AutoPlay logic
  useEffect(() => {
    if (variant !== 'snap') return;
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      if (isHovered.current) return; // Pause on hover
      
      setFocusedIndex((prev) => {
        const next = (prev + 1) % items.length;
        
        // Scroll to the exact center offset of the target element
        if (scrollRef.current) {
          const children = Array.from(scrollRef.current.children).filter(
            (child) => child instanceof HTMLElement && child.tagName !== 'STYLE'
          ) as HTMLElement[];
          
          const target = children[next];
          if (target) {
            const scrollLeftPos = target.offsetLeft - (scrollRef.current.offsetWidth / 2) + (target.offsetWidth / 2);
            scrollRef.current.scrollTo({
              left: scrollLeftPos,
              behavior: 'smooth'
            });
          }
        }
        
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length, variant]);

  if (variant === 'marquee') {
    return (
      <div 
        className={`natural-marquee-container ${className}`} 
        style={{ ...style, overflow: 'hidden', position: 'relative', width: '100%', padding: 'var(--spacing-4) 0' }}
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <div className="natural-marquee-track" style={{ 
          display: 'flex', 
          width: 'max-content',
          animation: `scrollLeftMarquee ${marqueeSpeed} linear infinite`,
        }}>
          {/* Render two identical groups for seamless infinite looping */}
          <div style={{ display: 'flex', gap: 'var(--spacing-6)', paddingRight: 'var(--spacing-6)' }}>
            {items.map((item, i) => (
              <div key={`g1-${i}`} style={{ display: 'flex' }}>
                {renderItem(item, i, false)}
              </div>
            ))}
          </div>
          <div aria-hidden="true" style={{ display: 'flex', gap: 'var(--spacing-6)', paddingRight: 'var(--spacing-6)' }}>
            {items.map((item, i) => (
              <div key={`g2-${i}`} style={{ display: 'flex' }}>
                {renderItem(item, i, false)}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .natural-marquee-container:hover .natural-marquee-track {
            animation-play-state: paused !important;
          }
          @keyframes scrollLeftMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      className={`natural-carousel ${className}`}
      style={{
        display: "flex",
        gap: "var(--spacing-6)",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        paddingBottom: "var(--spacing-8)",
        paddingTop: "var(--spacing-4)",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none", // Hide scrollbar for a cleaner look
        ...style
      }}
    >
      {items.map((item, i) => (
        <div 
          key={i} 
          style={{ 
            flex: "0 0 calc(85vw)", 
            maxWidth: "380px",
            scrollSnapAlign: "center",
            display: "flex"
          }}
        >
          {renderItem(item, i, i === focusedIndex)}
        </div>
      ))}
    </div>
  );
}
