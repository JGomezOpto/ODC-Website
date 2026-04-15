"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // 0.1 = subtle, 0.3 = moderate
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      image,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      <div ref={imageRef} className="relative w-full h-[120%] -mt-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
