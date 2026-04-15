"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
