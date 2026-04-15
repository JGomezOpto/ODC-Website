"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const step = end / (duration * 60);
    let raf: number;

    function animate() {
      start += step;
      if (start >= end) {
        setCount(end);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
        {label}
      </div>
    </motion.div>
  );
}
