import type { IndustryPage } from "../products/types";

export const industries: IndustryPage[] = [
  {
    id: "semiconductor",
    slug: "semiconductor",
    name: "Semiconductors",
    tagline: "Precision Photonics for Advanced Lithography",
    description:
      "High-performance photodiodes and detectors for EUV/DUV lithography, wafer inspection, and semiconductor manufacturing. Our SXUV and AXUV series are the industry standard for EUV source monitoring at 13.5 nm.",
    heroImage: "/images/industries/semiconductor.jpg",
    challenges: [
      "EUV source power monitoring requires detectors with absolute calibration",
      "Sub-nm wavelength detection demands extreme UV sensitivity",
      "Harsh plasma environments require radiation-hardened devices",
      "High throughput fabs need reliable, zero-defect components",
    ],
    solutions: [
      "SXUV and AXUV photodiodes with integrated thin film filters for 13.5 nm",
      "100% internal quantum efficiency for absolute power measurements",
      "Radiation-hardened silicon for long-term stability in plasma environments",
      "ISO 9001 certified manufacturing with zero-defect quality program",
    ],
    relevantCategories: ["sxuv", "axuv"],
  },
  {
    id: "aerospace-defense",
    slug: "aerospace-defense",
    name: "Aerospace & Defense",
    tagline: "Reliable Photonics for Extreme Environments",
    description:
      "ITAR-registered manufacturer of space-qualified photodetectors and IR emitters. Our components serve satellite systems, missile warning sensors, and covert illumination for defense applications.",
    heroImage: "/images/industries/aerospace-defense.jpg",
    challenges: [
      "Space-qualified components must survive radiation, thermal cycling, and vacuum",
      "Defense applications require ITAR compliance and secure supply chain",
      "Covert operations need invisible IR illumination at 940 nm",
      "Satellite sensors demand ultra-low noise detectors with long lifetime",
    ],
    solutions: [
      "ITAR-registered with secure, domestic manufacturing in Camarillo, CA",
      "Space-heritage photodiodes with proven performance on multiple missions",
      "940 nm IR LEDs invisible to the naked eye for covert illumination",
      "Avalanche photodiodes with ultra-low dark current for satellite sensors",
    ],
    relevantCategories: ["axuv", "sxuv", "apd", "ir-led"],
  },
  {
    id: "medical",
    slug: "medical",
    name: "Medical Diagnostics",
    tagline: "Precision Detection for Life Sciences",
    description:
      "High-performance photodetectors for fluorescence microscopy, flow cytometry, blood analysis, and diagnostic imaging. UV-enhanced and blue-enhanced photodiodes enable next-generation medical instruments.",
    heroImage: "/images/industries/medical.jpg",
    challenges: [
      "Fluorescence detection requires high sensitivity in the UV-blue range",
      "Flow cytometry demands fast response time and low noise",
      "Diagnostic devices must meet stringent regulatory requirements",
      "Miniaturization requires compact, high-performance detectors",
    ],
    solutions: [
      "Blue-enhanced photodiodes optimized for common fluorophore excitation wavelengths",
      "UVG series detectors for UV-based diagnostic instruments",
      "Compact TO-5 and SMD packages for space-constrained medical devices",
      "RoHS compliant and manufactured under ISO 9001 quality system",
    ],
    relevantCategories: ["uvg", "blue-enhanced", "apd"],
  },
  {
    id: "fire-flame-gas",
    slug: "fire-flame-gas",
    name: "Fire, Flame & Gas Detection",
    tagline: "Infrared Sensing for Safety-Critical Applications",
    description:
      "PbS, PbSe, and IR emitter solutions for NDIR gas analysis, flame detection, and environmental monitoring. Our infrared components are trusted in safety-critical applications worldwide.",
    heroImage: "/images/industries/fire-flame-gas.jpg",
    challenges: [
      "Gas detection requires precise spectral sensitivity in mid-IR bands",
      "Flame detectors must distinguish real flames from false alarm sources",
      "Environmental sensors need long-term stability and reliability",
      "Safety-critical applications demand zero-failure-rate components",
    ],
    solutions: [
      "PbSe detectors with peak sensitivity at 4 \u03BCm for CO2 and hydrocarbon detection",
      "PbS detectors at 2.2 \u03BCm for moisture and flame sensing",
      "Matched IR emitter-detector pairs for NDIR gas sensing modules",
      "Qualified for safety-critical applications with full traceability",
    ],
    relevantCategories: ["pbse", "pbs", "ir-emitter"],
  },
  {
    id: "industrial",
    slug: "industrial",
    name: "Industrial",
    tagline: "Precision Illumination & Detection for Automation",
    description:
      "Photodetectors and LEDs for machine vision, industrial process control, quality inspection, and precision measurement systems.",
    heroImage: "/images/industries/industrial.jpg",
    challenges: [
      "Machine vision requires consistent, calibrated illumination",
      "Process control sensors must operate 24/7 in harsh conditions",
      "Quality inspection demands high-speed, high-accuracy detection",
      "Factory environments require robust, temperature-stable components",
    ],
    solutions: [
      "Matched emitter-detector pairs for consistent optical performance",
      "Temperature-stable photodiodes for process control loops",
      "High-speed detectors with bandwidth to match vision system frame rates",
      "Hermetically sealed packages for dusty and humid environments",
    ],
    relevantCategories: ["blue-enhanced", "red-enhanced", "ir-led", "visible-led"],
  },
  {
    id: "food-analysis",
    slug: "food-analysis",
    name: "Food Analysis",
    tagline: "Spectroscopy Solutions for Food Safety",
    description:
      "Infrared detectors and emitters for food quality analysis, composition measurement, and contaminant detection using NDIR and NIR spectroscopy techniques.",
    heroImage: "/images/industries/food-analysis.jpg",
    challenges: [
      "Food safety requires rapid, non-destructive testing methods",
      "Composition analysis needs precise infrared spectral measurements",
      "Production line speed demands fast-response detectors",
      "Diverse food matrices require broadband spectral coverage",
    ],
    solutions: [
      "PbSe and PbS detectors for fat, moisture, and protein analysis via NIR/MIR",
      "IR emitters with broadband output covering key absorption bands",
      "Fast-response detectors compatible with production line speeds",
      "Compact detector-emitter modules for integration into analyzers",
    ],
    relevantCategories: ["pbse", "pbs", "ir-emitter"],
  },
];
