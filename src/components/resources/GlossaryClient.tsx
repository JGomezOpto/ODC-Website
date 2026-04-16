"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { glossaryTerms } from "@/data/resources";

const categories = [
  "All",
  ...Array.from(new Set(glossaryTerms.map((t) => t.category))).sort(),
];

export function GlossaryClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let terms = glossaryTerms;
    if (activeCategory !== "All") {
      terms = terms.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
      );
    }
    return terms;
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(term);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <nav className="text-xs text-muted-foreground mb-10">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/resources" className="hover:text-primary">Resources</Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Glossary</span>
        </nav>

        {/* Search + Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="max-w-4xl mx-auto space-y-8">
          {grouped.length > 0 ? (
            grouped.map(([letter, terms]) => (
              <div key={letter}>
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2">
                  {letter}
                </h2>
                <div className="space-y-3">
                  {terms.map((term, i) => (
                    <ScrollReveal key={term._id} delay={i * 0.03}>
                      <div className="rounded-lg border border-border bg-card p-4 hover:border-primary/20 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-foreground">{term.term}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{term.definition}</p>
                          </div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5 shrink-0">
                            {term.category}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No terms match your search.
            </p>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-12">
          {filtered.length} term{filtered.length !== 1 ? "s" : ""} shown
        </div>
      </Container>
    </section>
  );
}
