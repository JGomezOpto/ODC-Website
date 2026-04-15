import { product } from "./product";
import { productCategory } from "./productCategory";
import { productSubcategory } from "./productSubcategory";
import { industry } from "./industry";
import { blogPost } from "./blogPost";
import { applicationNote } from "./applicationNote";
import { whitepaper } from "./whitepaper";
import { glossaryTerm } from "./glossaryTerm";
import { companyInfo } from "./companyInfo";
import { certification } from "./certification";
import { teamMember } from "./teamMember";
import { newsEvent } from "./newsEvent";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // Products
  product,
  productCategory,
  productSubcategory,

  // Industries
  industry,

  // Content
  blogPost,
  applicationNote,
  whitepaper,
  glossaryTerm,
  newsEvent,

  // Company
  companyInfo,
  certification,
  teamMember,

  // Settings
  siteSettings,
];
