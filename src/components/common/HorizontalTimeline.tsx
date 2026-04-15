"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  year: string;
  event: string;
}

interface HorizontalTimelineProps {
  items: TimelineItem[];
}

export function HorizontalTimeline({ items }: HorizontalTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Wait a tick for layout to settle
    const raf = requestAnimationFrame(() => {
      const scrollWidth = track.scrollWidth - container.offsetWidth;
      if (scrollWidth <= 0) return;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 25%",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isReady, items]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 lg:gap-8 py-8"
        style={{ width: "max-content" }}
      >
        {items.map((item, i) => (
          <div
            key={item.year}
            className="w-[280px] lg:w-[320px] shrink-0 relative"
          >
            {/* Connector */}
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0 relative z-10">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              {i < items.length - 1 && (
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-primary/10 ml-3" />
              )}
            </div>

            {/* Card — always visible */}
            <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-5 lg:p-6 hover:border-primary/30 transition-colors">
              <span className="text-xl lg:text-2xl font-bold text-primary block mb-2">
                {item.year}
              </span>
              <p className="text-sm lg:text-base text-foreground leading-relaxed">
                {item.event}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
