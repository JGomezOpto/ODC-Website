export type ProductCategory = "detection" | "emission" | "integration";

export type DetectionSubcategory =
  | "sxuv"
  | "axuv"
  | "uvg"
  | "blue-enhanced"
  | "red-enhanced"
  | "pbse"
  | "pbs"
  | "apd";

export type EmissionSubcategory =
  | "uv-led"
  | "visible-led"
  | "ir-led"
  | "ir-emitter";

export type IndustryVertical =
  | "semiconductor"
  | "aerospace-defense"
  | "medical"
  | "fire-flame-gas"
  | "industrial"
  | "food-analysis";

export interface ProductSpec {
  name: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  partNumber: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  shortDescription: string;
  image?: string;
  specs: ProductSpec[];
  keySpecs: {
    wavelengthRange?: string;
    activeArea?: string;
    responsivity?: string;
    packageType?: string;
  };
  features: string[];
  applications: IndustryVertical[];
  relatedProducts: string[];
  datasheetUrl?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ProductFamily {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  image?: string;
  wavelengthRange: string;
  productCount: number;
}

export interface IndustryPage {
  id: IndustryVertical;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  challenges: string[];
  solutions: string[];
  relevantCategories: string[];
}
