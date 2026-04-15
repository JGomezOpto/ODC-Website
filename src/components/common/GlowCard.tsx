"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className,
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative rounded-xl border border-border bg-card overflow-hidden",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] hover:border-primary/30",
        className
      )}
    >
      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}
