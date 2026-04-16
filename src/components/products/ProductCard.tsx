"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products/types";

export interface ListColumn {
  key: keyof Product["keySpecs"];
  label: string;
  width: string; // Tailwind width class e.g. "w-28"
}

export const defaultListColumns: ListColumn[] = [
  { key: "wavelengthRange", label: "Wavelength", width: "w-28" },
  { key: "activeArea", label: "Active Area", width: "w-36" },
  { key: "packageType", label: "Package", width: "w-20" },
];

interface ProductCardProps {
  product: Product;
  index?: number;
  viewMode?: "grid" | "list";
  listColumns?: ListColumn[];
}

export function ProductCard({
  product,
  index = 0,
  viewMode = "list",
  listColumns = defaultListColumns,
}: ProductCardProps) {
  const href = `/products/${product.category}/${product.slug}`;

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, delay: index * 0.02 }}
      >
        <Link href={href} className="group block">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-2.5 overflow-hidden transition-all duration-200 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] hover:border-primary/30">
            {/* Thumbnail */}
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-[10px]">
                  —
                </div>
              )}
            </div>

            {/* Name + Part Number */}
            <div className="min-w-0 w-36 shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {product.name}
                </h3>
                {product.isNew && (
                  <Badge className="bg-primary text-white text-[10px] shrink-0">New</Badge>
                )}
                {product.isFeatured && (
                  <Badge variant="outline" className="text-[10px] border-primary/50 text-primary shrink-0">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {product.partNumber}
              </p>
            </div>

            {/* Key Specs — fixed-width columns for alignment */}
            <div className="hidden sm:flex items-center flex-1 min-w-0">
              {listColumns.map((col) => (
                <div key={col.key} className={`${col.width} shrink-0`}>
                  <span className="text-[10px] text-muted-foreground block">{col.label}</span>
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">
                    {product.keySpecs[col.key] || "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link href={href} className="group block h-full">
        <div className="h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:border-primary/30">
          {/* Image */}
          <div className="relative h-32 overflow-hidden bg-muted">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                No image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-1.5">
              {product.isNew && (
                <Badge className="bg-primary text-white text-[10px]">New</Badge>
              )}
              {product.isFeatured && (
                <Badge variant="outline" className="text-[10px] border-primary/50 text-primary bg-card/80">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-0.5">
              {product.subcategory.replace(/-/g, " ")}
            </p>
            <h3 className="font-bold text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground font-mono mb-1.5">
              {product.partNumber}
            </p>

            {/* Key specs — compact inline */}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {product.keySpecs.wavelengthRange && (
                <div>
                  <span className="text-[10px] text-muted-foreground">Wavelength: </span>
                  <span className="text-[11px] font-medium text-foreground">{product.keySpecs.wavelengthRange}</span>
                </div>
              )}
              {product.keySpecs.packageType && (
                <div>
                  <span className="text-[10px] text-muted-foreground">Pkg: </span>
                  <span className="text-[11px] font-medium text-foreground">{product.keySpecs.packageType}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
