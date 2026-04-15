export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
  image?: string;
}

export const mainNavigation: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Detection",
        href: "/products/detection",
        description: "Photodiodes & APDs from EUV to NIR",
        image: "/images/products/silicon-detectors.jpg",
        children: [
          {
            label: "Silicon Photodiodes",
            href: "/products/detection?tech=silicon-photodiodes",
            description: "EUV to NIR silicon detectors",
            children: [
              { label: "SXUV Series", href: "/products/detection?sub=sxuv", description: "EUV-optimized (1\u2013190 nm)" },
              { label: "AXUV Series", href: "/products/detection?sub=axuv", description: "100% IQE (0.01\u2013190 nm)" },
              { label: "UVG Series", href: "/products/detection?sub=uvg", description: "UV detectors (190\u2013400 nm)" },
              { label: "Blue Enhanced", href: "/products/detection?sub=blue-enhanced", description: "Visible (400\u20131000 nm)" },
              { label: "Red Enhanced", href: "/products/detection?sub=red-enhanced", description: "NIR (400\u20131100 nm)" },
              { label: "Preamp Modules", href: "/products/detection?sub=preamp-modules", description: "Photodiode + TIA" },
            ],
          },
          {
            label: "Avalanche Photodiodes",
            href: "/products/detection?tech=avalanche-photodiodes",
            description: "High-gain APDs for low-light detection",
            children: [
              { label: "Avalanche PDs", href: "/products/detection?sub=apd", description: "Si and InGaAs (400\u20131700 nm)" },
            ],
          },
          {
            label: "PbS/PbSe Detectors",
            href: "/products/detection?tech=ir-detectors",
            description: "Mid-IR and SWIR lead-salt detectors",
            children: [
              { label: "PbSe Detectors", href: "/products/detection?sub=pbse", description: "Mid-IR (1\u20135 \u03BCm)" },
              { label: "PbS Detectors", href: "/products/detection?sub=pbs", description: "SWIR (1\u20133 \u03BCm)" },
            ],
          },
        ],
      },
      {
        label: "Emission",
        href: "/products/emission",
        description: "LEDs & IR emitters from UV to MIR",
        image: "/images/products/emission-banner.jpg",
        children: [
          { label: "IR LEDs", href: "/products/emission?sub=ir-led", description: "810\u2013880 nm" },
          { label: "Visible LEDs", href: "/products/emission?sub=visible-led", description: "469\u2013685 nm" },
          { label: "IR Emitters", href: "/products/emission?sub=ir-emitter", description: "Broadband 2\u201312 \u03BCm" },
        ],
      },
      {
        label: "Integration",
        href: "/products/integration",
        description: "Custom photonic solutions & assemblies",
        image: "/images/products/integration-banner.jpg",
      },
    ],
  },
  {
    label: "Applications",
    href: "/applications",
    children: [
      { label: "Semiconductors", href: "/applications/semiconductor", description: "EUV/DUV lithography & fab", image: "/images/industries/semiconductor.jpg" },
      { label: "Aerospace & Defense", href: "/applications/aerospace-defense", description: "Satellite, space & defense", image: "/images/industries/aerospace-defense.jpg" },
      { label: "Medical Diagnostics", href: "/applications/medical", description: "Microscopy & diagnostics", image: "/images/industries/medical.jpg" },
      { label: "Fire, Flame & Gas", href: "/applications/fire-flame-gas", description: "Detection & monitoring", image: "/images/industries/fire-flame-gas.jpg" },
      { label: "Industrial", href: "/applications/industrial", description: "Machine vision & sensing", image: "/images/industries/industrial.jpg" },
      { label: "Food Analysis", href: "/applications/food-analysis", description: "Spectroscopy & QC", image: "/images/industries/food-analysis.jpg" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog", description: "Latest insights & updates" },
      { label: "Application Notes", href: "/resources/application-notes", description: "Technical guides" },
      { label: "Whitepapers", href: "/resources/whitepapers", description: "Research publications" },
      { label: "Glossary", href: "/resources/glossary", description: "Photonics terminology" },
      { label: "Compliance", href: "/resources/compliance", description: "Certifications & regulatory" },
    ],
  },
  {
    label: "News & Events",
    href: "/news-events",
  },
  {
    label: "Our Company",
    href: "/company",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
