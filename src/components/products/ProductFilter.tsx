"use client";

import { cn } from "@/lib/utils";
import type { TechnologyGroup } from "@/data/products/types";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface ProductFilterProps {
  subcategories: FilterOption[];
  activeFilter: string | null;
  onFilterChange: (value: string | null) => void;
  technologyGroups?: TechnologyGroup[];
}

export function ProductFilter({
  subcategories,
  activeFilter,
  onFilterChange,
  technologyGroups,
}: ProductFilterProps) {
  const totalCount = subcategories.reduce((sum, s) => sum + (s.count ?? 0), 0);

  // Grouped rendering for detection-style pages
  if (technologyGroups && technologyGroups.length > 0) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => onFilterChange(null)}
          className={cn(
            "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between",
            !activeFilter
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          All Products
          <span className="text-xs text-muted-foreground">{totalCount}</span>
        </button>

        {technologyGroups.map((group) => {
          const groupSubs = subcategories.filter((s) =>
            group.subcategories.includes(s.value)
          );
          const groupCount = groupSubs.reduce(
            (sum, s) => sum + (s.count ?? 0),
            0
          );

          return (
            <div key={group.id} className="pt-3">
              {/* Group header — clickable to filter all in this technology */}
              <button
                onClick={() => onFilterChange(group.id)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-between",
                  activeFilter === group.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {group.label}
                <span className="text-[10px] font-normal normal-case tracking-normal">
                  {groupCount}
                </span>
              </button>

              {/* Individual subcategory buttons */}
              <div className="mt-1 space-y-0.5">
                {groupSubs.map((sub) => (
                  <button
                    key={sub.value}
                    onClick={() => onFilterChange(sub.value)}
                    className={cn(
                      "w-full text-left pl-5 pr-3 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-between",
                      activeFilter === sub.value
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {sub.label}
                    {sub.count !== undefined && (
                      <span className="text-xs text-muted-foreground">
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Flat rendering (emission, etc.)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Subcategory
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange(null)}
            className={cn(
              "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
              !activeFilter
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            All Products
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.value}
              onClick={() => onFilterChange(sub.value)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between",
                activeFilter === sub.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {sub.label}
              {sub.count !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {sub.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FilterChipsProps {
  activeFilter: string | null;
  filterLabel?: string;
  onClear: () => void;
}

export function FilterChips({
  activeFilter,
  filterLabel,
  onClear,
}: FilterChipsProps) {
  if (!activeFilter) return null;

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">Filtered by:</span>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
      >
        {filterLabel || activeFilter}
        <span className="ml-1">&times;</span>
      </button>
    </div>
  );
}
