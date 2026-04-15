"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Cpu,
  Lightbulb,
  FileText,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Command,
} from "lucide-react";
import { allProducts } from "@/data/products";
import { blogPosts, appNotes, whitepapers, glossaryTerms } from "@/data/resources";
import { industries } from "@/data/industries";

// ─── Search index types ────────────────────────────────────────────

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: "product" | "blog" | "app-note" | "whitepaper" | "glossary" | "industry" | "page";
}

const categoryMeta: Record<
  SearchResult["category"],
  { label: string; icon: typeof Search }
> = {
  product: { label: "Products", icon: Cpu },
  blog: { label: "Blog", icon: FileText },
  "app-note": { label: "Application Notes", icon: FileText },
  whitepaper: { label: "Whitepapers", icon: BookOpen },
  glossary: { label: "Glossary", icon: GraduationCap },
  industry: { label: "Industries", icon: Lightbulb },
  page: { label: "Pages", icon: ArrowRight },
};

// Static pages always shown when query is empty or matches
const staticPages: SearchResult[] = [
  { id: "p-products", title: "Products", subtitle: "Browse all products", href: "/products", category: "page" },
  { id: "p-detection", title: "Detection Products", subtitle: "Photodiodes & detectors", href: "/products/detection", category: "page" },
  { id: "p-emission", title: "Emission Products", subtitle: "LEDs & emitters", href: "/products/emission", category: "page" },
  { id: "p-integration", title: "Integration", subtitle: "Custom opto-electronic assemblies", href: "/products/integration", category: "page" },
  { id: "p-applications", title: "Applications", subtitle: "Industry solutions", href: "/applications", category: "page" },
  { id: "p-resources", title: "Resources", subtitle: "Blog, app notes, whitepapers", href: "/resources", category: "page" },
  { id: "p-company", title: "Our Company", subtitle: "About Opto Diode Corporation", href: "/company", category: "page" },
  { id: "p-contact", title: "Contact", subtitle: "Get in touch", href: "/contact", category: "page" },
  { id: "p-quote", title: "Request Quote", subtitle: "Get a custom quote", href: "/request-quote", category: "page" },
];

// Build the full search index once
function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const p of allProducts) {
    results.push({
      id: `prod-${p.id}`,
      title: `${p.name} (${p.partNumber})`,
      subtitle: p.description.slice(0, 100),
      href: `/products/${p.category}/${p.slug}`,
      category: "product",
    });
  }

  for (const post of blogPosts) {
    results.push({
      id: `blog-${post._id}`,
      title: post.title,
      subtitle: post.excerpt.slice(0, 100),
      href: `/resources/blog`,
      category: "blog",
    });
  }

  for (const note of appNotes) {
    results.push({
      id: `an-${note._id}`,
      title: note.title,
      subtitle: note.summary.slice(0, 100),
      href: `/resources/application-notes`,
      category: "app-note",
    });
  }

  for (const paper of whitepapers) {
    results.push({
      id: `wp-${paper._id}`,
      title: paper.title,
      subtitle: paper.abstract.slice(0, 100),
      href: `/resources/whitepapers`,
      category: "whitepaper",
    });
  }

  for (const term of glossaryTerms) {
    results.push({
      id: `gl-${term._id}`,
      title: term.term,
      subtitle: term.definition.slice(0, 100),
      href: `/resources/glossary`,
      category: "glossary",
    });
  }

  for (const ind of industries) {
    results.push({
      id: `ind-${ind.id}`,
      title: ind.name,
      subtitle: ind.tagline,
      href: `/applications/${ind.slug}`,
      category: "industry",
    });
  }

  return [...results, ...staticPages];
}

// ─── Component ─────────────────────────────────────────────────────

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) {
      // Show popular pages when empty
      return staticPages;
    }
    const q = query.toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);
    return index.filter((item) => {
      const haystack = `${item.title} ${item.subtitle}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    }).slice(0, 20);
  }, [query, index]);

  // Group results by category
  const grouped = useMemo(() => {
    const map = new Map<SearchResult["category"], SearchResult[]>();
    for (const r of results) {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category)!.push(r);
    }
    return Array.from(map.entries());
  }, [results]);

  // Flatten for keyboard navigation
  const flatResults = useMemo(() => grouped.flatMap(([, items]) => items), [grouped]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Small delay to let the animation start
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    const active = listRef.current?.querySelector("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[activeIndex]) {
            navigate(flatResults[activeIndex].href);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [flatResults, activeIndex, navigate, onClose]
  );

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[15vh] left-1/2 z-[101] w-full max-w-xl -translate-x-1/2"
          >
            <div className="mx-4 rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products, resources, pages..."
                  className="flex-1 bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={onClose}
                  className="text-xs text-muted-foreground bg-muted rounded px-1.5 py-0.5 hover:text-foreground transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[50vh] overflow-y-auto overscroll-contain p-2"
              >
                {flatResults.length > 0 ? (
                  grouped.map(([category, items]) => {
                    const meta = categoryMeta[category];
                    const Icon = meta.icon;
                    return (
                      <div key={category} className="mb-2 last:mb-0">
                        <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {meta.label}
                        </div>
                        {items.map((item) => {
                          const idx = flatResults.indexOf(item);
                          const isActive = idx === activeIndex;
                          return (
                            <button
                              key={item.id}
                              data-active={isActive}
                              onClick={() => navigate(item.href)}
                              onMouseEnter={() => setActiveIndex(idx)}
                              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                isActive
                                  ? "bg-primary/10 text-foreground"
                                  : "text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 shrink-0 ${
                                  isActive ? "text-primary" : "text-muted-foreground"
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-foreground truncate">
                                  {item.title}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {item.subtitle}
                                </div>
                              </div>
                              {isActive && (
                                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="bg-muted rounded px-1 py-0.5 font-mono">↑↓</kbd>
                    navigate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="bg-muted rounded px-1 py-0.5 font-mono">↵</kbd>
                    select
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="bg-muted rounded px-1 py-0.5 font-mono">esc</kbd>
                    close
                  </span>
                </div>
                <span className="inline-flex items-center gap-1">
                  <Command className="w-3 h-3" />K to search
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ─── Hook for Cmd+K ────────────────────────────────────────────────

export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpen();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);
}
