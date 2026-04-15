"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextStaggerProps {
  children: React.ReactNode;
  className?: string;
  /** "words" splits by whitespace, "lines" animates children as blocks */
  mode?: "words" | "lines";
  stagger?: number;
  delay?: number;
}

export function TextStagger({
  children,
  className = "",
  mode = "lines",
  stagger = 0.08,
  delay = 0,
}: TextStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const elements =
      mode === "words"
        ? container.querySelectorAll(".stagger-word")
        : container.children;

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [mode, stagger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
