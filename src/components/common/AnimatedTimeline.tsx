"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  year: string;
  event: string;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
}

export function AnimatedTimeline({ items }: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      line.style.height = "100%";
      container.querySelectorAll(".tl-item").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      container.querySelectorAll(".tl-dot").forEach((el) => {
        (el as HTMLElement).style.transform = "scale(1)";
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    // Animate the vertical line drawing
    gsap.fromTo(
      line,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.3,
        },
      }
    );

    // Animate each milestone
    const items = container.querySelectorAll(".tl-item");
    const dots = container.querySelectorAll(".tl-dot");

    items.forEach((item, i) => {
      const isLeft = i % 2 === 0;

      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: isLeft ? -60 : 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    dots.forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Center line track (background) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" />

      {/* Animated line (foreground, draws as you scroll) */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-primary/50"
        style={{ height: "0%" }}
      />

      <div className="relative space-y-16 lg:space-y-20 py-4">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div key={item.year} className="relative flex items-center">
              {/* Dot on the line */}
              <div className="tl-dot absolute left-1/2 -translate-x-1/2 z-10">
                <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_12px_rgba(239,68,68,0.5)] border-2 border-primary" />
              </div>

              {/* Content card — alternating sides */}
              <div
                className={`tl-item w-[calc(50%-2rem)] ${
                  isLeft ? "mr-auto pr-4 text-right" : "ml-auto pl-4 text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-xl border border-border bg-card p-5 lg:p-6 hover:border-primary/30 transition-colors ${
                    isLeft ? "text-right" : "text-left"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {item.year}
                  </span>
                  <p className="text-foreground mt-1.5 leading-relaxed text-sm lg:text-base">
                    {item.event}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
