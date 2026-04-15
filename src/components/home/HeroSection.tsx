"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Lazy-load R3F particles — falls back to CSS particles if WebGL unavailable
const PhotonParticles = dynamic(
  () =>
    import("@/components/three/PhotonParticles").then(
      (mod) => mod.PhotonParticles
    ),
  { ssr: false }
);

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(false);

  useEffect(() => {
    setWebGLSupported(hasWebGL());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Parallax: content moves up slower than scroll for depth
    gsap.to(content, {
      yPercent: 30,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-surface-dark"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />

      {/* 3D Particles (WebGL) or CSS Fallback */}
      {webGLSupported ? (
        <PhotonParticles />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Content — GSAP parallax on scroll */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            Photonics for Demanding Environments
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
        >
          Illuminate.{" "}
          <span className="text-gradient-red">Detect.</span>{" "}
          <br className="hidden sm:block" />
          Innovate.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Over 40 years of high-quality photodetectors, LED emitters, and custom
          photonic solutions — from EUV to mid-infrared.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white px-8 text-base h-12")}
          >
            Explore Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            href="/request-quote"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/20 text-white hover:bg-white/10 px-8 text-base h-12")}
          >
            Request a Quote
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </section>
  );
}
