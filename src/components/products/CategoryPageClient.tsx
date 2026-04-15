"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { ProductCard, defaultListColumns, type ListColumn } from "./ProductCard";
import { ProductFilter, FilterChips } from "./ProductFilter";
import type { Product, ProductFamily, TechnologyGroup } from "@/data/products/types";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface CategoryPageClientProps {
  products: Product[];
  families: ProductFamily[];
  initialFilter?: string | null;
  categoryName: string;
  technologyGroups?: TechnologyGroup[];
  listColumns?: ListColumn[];
}

export function CategoryPageClient({
  products,
  families,
  initialFilter = null,
  categoryName,
  technologyGroups,
  listColumns = defaultListColumns,
}: CategoryPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(initialFilter);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const subcategoryOptions = useMemo(
    () =>
      families.map((f) => ({
        value: f.subcategory,
        label: f.name,
        count: products.filter((p) => p.subcategory === f.subcategory).length,
      })),
    [families, products]
  );

  const filteredProducts = useMemo(() => {
    if (!activeFilter) return products;
    // Check if it's a technology group ID
    const group = technologyGroups?.find((g) => g.id === activeFilter);
    if (group) {
      return products.filter((p) => group.subcategories.includes(p.subcategory));
    }
    // Otherwise it's a subcategory
    return products.filter((p) => p.subcategory === activeFilter);
  }, [products, activeFilter, technologyGroups]);

  // Resolve the display label for the active filter
  const activeLabel = useMemo(() => {
    if (!activeFilter) return undefined;
    const group = technologyGroups?.find((g) => g.id === activeFilter);
    if (group) return group.label;
    return subcategoryOptions.find((s) => s.value === activeFilter)?.label;
  }, [activeFilter, technologyGroups, subcategoryOptions]);

  return (
    <Container className="py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h2>
            <ProductFilter
              subcategories={subcategoryOptions}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              technologyGroups={technologyGroups}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Mobile filter trigger */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger
                    render={
                      <Button
                        variant="outline"
                        size="sm"
                      />
                    }
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-1" />
                    Filters
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetTitle>Filter {categoryName}</SheetTitle>
                    <div className="mt-6">
                      <ProductFilter
                        subcategories={subcategoryOptions}
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        technologyGroups={technologyGroups}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          <FilterChips
            activeFilter={activeFilter}
            filterLabel={activeLabel}
            onClear={() => setActiveFilter(null)}
          />

          {/* Column headers for list view */}
          {viewMode === "list" && (
            <div className="hidden sm:flex items-center gap-4 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="w-14 shrink-0" />
              <div className="w-48 shrink-0">Product</div>
              <div className="flex items-center flex-1 min-w-0">
                {listColumns.map((col) => (
                  <div key={col.key} className={`${col.width} shrink-0`}>
                    {col.label}
                  </div>
                ))}
              </div>
              <div className="w-4 shrink-0" />
            </div>
          )}

          {/* Product grid */}
          <div
            className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4"
                : "flex flex-col gap-1.5"
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  viewMode={viewMode}
                  listColumns={listColumns}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No products found matching your filters.
              </p>
              <button
                onClick={() => setActiveFilter(null)}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
