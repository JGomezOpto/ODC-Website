"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "odc-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so the banner doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and understand where our visitors come from. By
                  clicking &ldquo;Accept&rdquo;, you consent to our use of
                  cookies.{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Learn more
                  </Link>
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={handleAccept}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDecline}
                  >
                    Decline
                  </Button>
                </div>
              </div>

              <button
                onClick={handleDecline}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
