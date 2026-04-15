"use client";

import { motion } from "framer-motion";

const certifications = [
  "ISO 9001:2015 Certified",
  "ITAR Registered",
  "AS9100 Compliant",
  "RoHS Certified",
  "REACH Compliant",
  "Cybersecurity Compliant",
  "40+ Years in Photonics",
  "Made in Camarillo, CA, USA",
];

export function TrustBar() {
  return (
    <section className="py-6 bg-card border-y border-border overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {/* Duplicate for seamless loop */}
          {[...certifications, ...certifications].map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="font-medium">{cert}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
