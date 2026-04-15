// Static resource data — fallback when Sanity is not configured.

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  author?: string;
  featuredImage?: string;
}

export interface AppNote {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  pdfUrl?: string;
  publishedAt: string;
  relatedProducts?: string[];
}

export interface Whitepaper {
  _id: string;
  title: string;
  slug: string;
  abstract: string;
  authors: string[];
  pdfUrl?: string;
  publishedAt: string;
}

export interface GlossaryTerm {
  _id: string;
  term: string;
  definition: string;
  category: string;
}

export interface Certification {
  _id: string;
  name: string;
  slug: string;
  description: string;
  certificateUrl?: string;
  validUntil?: string;
}

// ─── Blog Posts ─────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    _id: "blog-1",
    title: "Understanding SXUV Photodiodes for EUV Lithography",
    slug: "sxuv-euv-lithography",
    excerpt:
      "A deep dive into how SXUV photodiodes enable precise EUV source monitoring at 13.5 nm, the critical wavelength for next-generation semiconductor lithography.",
    publishedAt: "2025-03-15",
    tags: ["EUV", "SXUV", "Semiconductor"],
    author: "Stewart Miller",
  },
  {
    _id: "blog-2",
    title: "PbSe vs PbS Detectors: Choosing the Right IR Sensor",
    slug: "pbse-vs-pbs-detectors",
    excerpt:
      "Comparing lead selenide and lead sulfide infrared detectors for mid-infrared applications including flame detection, gas analysis, and industrial monitoring.",
    publishedAt: "2025-02-28",
    tags: ["Infrared", "PbSe", "PbS", "Detection"],
    author: "Jezdan Gomez",
  },
  {
    _id: "blog-3",
    title: "MIR LED Emitters for NDIR Gas Sensing",
    slug: "mir-led-ndir-gas-sensing",
    excerpt:
      "How mid-infrared LED emitters paired with PbSe detectors create highly effective NDIR gas sensing systems for CO2, methane, and other target gases.",
    publishedAt: "2025-02-10",
    tags: ["Emission", "MIR LED", "NDIR", "Gas Sensing"],
    author: "Sujeet Sudhir",
  },
  {
    _id: "blog-4",
    title: "Radiation Hardness in Silicon Photodiodes",
    slug: "radiation-hardness-silicon",
    excerpt:
      "Why radiation-hardened photodiodes are essential for space, nuclear, and high-energy physics applications — and how ODC achieves industry-leading radiation tolerance.",
    publishedAt: "2025-01-22",
    tags: ["Aerospace", "Radiation", "AXUV"],
    author: "Stewart Miller",
  },
  {
    _id: "blog-5",
    title: "100% Internal Quantum Efficiency: What It Means",
    slug: "100-percent-iqe",
    excerpt:
      "Explaining the physics behind 100% internal quantum efficiency in AXUV photodiodes and why it matters for absolute optical power measurement.",
    publishedAt: "2024-12-18",
    tags: ["AXUV", "Quantum Efficiency", "Measurement"],
    author: "Jezdan Gomez",
  },
  {
    _id: "blog-6",
    title: "Custom Opto-Electronic Assemblies: From Concept to Production",
    slug: "custom-assemblies",
    excerpt:
      "A look at ODC's integration capabilities — designing and manufacturing custom detector and emitter assemblies for OEM applications.",
    publishedAt: "2024-11-30",
    tags: ["Integration", "Custom", "OEM"],
    author: "Shalmalee Vaiyda",
  },
  {
    _id: "blog-7",
    title: "Flame Detection with IR Sensors: A Technical Overview",
    slug: "flame-detection-ir-sensors",
    excerpt:
      "How infrared emitters and detectors work together in flame detection systems, covering spectral response, response time, and environmental considerations.",
    publishedAt: "2024-11-05",
    tags: ["Fire Detection", "Infrared", "Safety"],
    author: "Shahar Kalev",
  },
  {
    _id: "blog-8",
    title: "ODC Achieves ISO 9001:2015 Recertification",
    slug: "iso-9001-recertification",
    excerpt:
      "Opto Diode Corporation completes ISO 9001:2015 quality management system recertification, reinforcing our commitment to zero-defect manufacturing.",
    publishedAt: "2024-10-15",
    tags: ["Quality", "ISO 9001", "Company News"],
    author: "Rachel Guthrie",
  },
];

// ─── Application Notes ──────────────────────────────────────────────

export const appNotes: AppNote[] = [
  {
    _id: "an-1",
    title: "AN-001: Selecting Photodiodes for EUV Source Monitoring",
    slug: "an-001-euv-source-monitoring",
    summary:
      "Guide to selecting SXUV and AXUV photodiodes for EUV lithography source power monitoring, including spectral considerations, calibration, and environmental requirements.",
    publishedAt: "2025-01-15",
    relatedProducts: ["sxuv5", "sxuv20hs1"],
  },
  {
    _id: "an-2",
    title: "AN-002: PbSe Detector Biasing and Signal Conditioning",
    slug: "an-002-pbse-biasing",
    summary:
      "Practical guide to biasing PbSe photoconductors, including recommended circuit topologies, noise considerations, and temperature compensation techniques.",
    publishedAt: "2024-12-01",
    relatedProducts: ["bxp-25m"],
  },
  {
    _id: "an-3",
    title: "AN-003: MIR LED Drive Circuits for NDIR Applications",
    slug: "an-003-mir-led-drive-circuits",
    summary:
      "Design considerations for driving mid-infrared LED emitters in NDIR gas sensing systems, including pulsed operation, thermal management, and lifetime optimization.",
    publishedAt: "2024-11-01",
  },
  {
    _id: "an-4",
    title: "AN-004: Thin Film Filters for Wavelength Selection",
    slug: "an-004-thin-film-filters",
    summary:
      "Overview of integrated thin film filters on SXUV photodiodes for EUV/soft X-ray wavelength selection, including filter design, transmission profiles, and spectral purity.",
    publishedAt: "2024-09-15",
  },
  {
    _id: "an-5",
    title: "AN-005: Photodiode Responsivity and Calibration",
    slug: "an-005-responsivity-calibration",
    summary:
      "Understanding photodiode responsivity specifications, NIST-traceable calibration procedures, and measurement uncertainty for quantitative optical measurements.",
    publishedAt: "2024-08-01",
  },
  {
    _id: "an-6",
    title: "AN-006: Detector Selection for Flame Detection Systems",
    slug: "an-006-flame-detection",
    summary:
      "Guide to selecting infrared detectors and emitters for commercial and industrial flame detection, covering spectral bands, response time, and false alarm mitigation.",
    publishedAt: "2024-06-15",
  },
  {
    _id: "an-7",
    title: "AN-007: Space-Qualified Photodiodes for Satellite Instruments",
    slug: "an-007-space-photodiodes",
    summary:
      "Requirements and test protocols for qualifying silicon photodiodes for space applications, including total dose testing, thermal cycling, and outgassing compliance.",
    publishedAt: "2024-05-01",
  },
  {
    _id: "an-8",
    title: "AN-008: UV-Enhanced Silicon Detectors for Medical Diagnostics",
    slug: "an-008-uv-medical-diagnostics",
    summary:
      "Application of UVG-series photodiodes in medical diagnostic instruments, including fluorescence spectroscopy, blood gas analysis, and UV sterilization monitoring.",
    publishedAt: "2024-03-15",
  },
];

// ─── Whitepapers ────────────────────────────────────────────────────

export const whitepapers: Whitepaper[] = [
  {
    _id: "wp-1",
    title: "Absolute EUV Power Measurement Using AXUV Photodiodes",
    slug: "absolute-euv-power-measurement",
    abstract:
      "This paper presents methods for absolute optical power measurement at EUV wavelengths using AXUV silicon photodiodes with 100% internal quantum efficiency. We demonstrate measurement uncertainties below 1% for 13.5 nm source monitoring.",
    authors: ["S. Miller", "J. Gomez"],
    publishedAt: "2025-02-01",
  },
  {
    _id: "wp-2",
    title: "Radiation Hardness of SXUV Photodiodes in Plasma Environments",
    slug: "radiation-hardness-sxuv",
    abstract:
      "Characterization of SXUV photodiode performance under high-fluence EUV and soft X-ray radiation exposure. Results show less than 2% degradation after 10^15 photons/cm^2 cumulative exposure.",
    authors: ["S. Miller"],
    publishedAt: "2024-11-15",
  },
  {
    _id: "wp-3",
    title: "Temperature Dependence of PbSe Photoconductor Detectivity",
    slug: "temperature-dependence-pbse",
    abstract:
      "Systematic study of D* (detectivity) as a function of operating temperature for PbSe photoconductors from -40C to +85C. Includes empirical models for thermal design of IR detector assemblies.",
    authors: ["J. Gomez", "S. Kalev"],
    publishedAt: "2024-09-01",
  },
  {
    _id: "wp-4",
    title: "Spectral Response Characterization of MIR LED Emitters",
    slug: "spectral-response-mir-led",
    abstract:
      "Detailed spectral characterization of mid-infrared LED emitters from 2.5 to 5.0 microns, including peak wavelength stability, spectral width, and output power as a function of drive current and temperature.",
    authors: ["S. Sudhir"],
    publishedAt: "2024-07-01",
  },
  {
    _id: "wp-5",
    title: "Thin Film Filter Design for 13.5 nm EUV Applications",
    slug: "thin-film-filter-design",
    abstract:
      "Design methodology for integrated thin film filters on silicon photodiodes for EUV wavelength isolation. Covers material selection, deposition processes, and spectral transmission optimization at 13.5 nm.",
    authors: ["J. Gomez"],
    publishedAt: "2024-05-15",
  },
  {
    _id: "wp-6",
    title: "Long-Term Stability of Silicon Photodiodes Under UV Exposure",
    slug: "long-term-stability-uv",
    abstract:
      "Five-year degradation study of UVG and SXUV photodiodes under continuous UV exposure at 200-400 nm wavelengths. Demonstrates superior stability compared to conventional silicon detectors.",
    authors: ["S. Miller", "R. Flury"],
    publishedAt: "2024-03-01",
  },
  {
    _id: "wp-7",
    title: "Noise Analysis of Transimpedance Amplifier Circuits for Photodiode Readout",
    slug: "noise-analysis-tia",
    abstract:
      "Comprehensive noise analysis framework for photodiode transimpedance amplifier circuits, with specific focus on low-noise design for AXUV and PbSe detectors.",
    authors: ["J. Gomez", "S. Miller"],
    publishedAt: "2024-01-15",
  },
  {
    _id: "wp-8",
    title: "Qualification Testing of Photonic Devices for Space Applications",
    slug: "space-qualification-testing",
    abstract:
      "Overview of MIL-STD and ECSS test methodologies used to qualify ODC photodiodes for LEO, GEO, and deep-space missions. Includes total ionizing dose, displacement damage, and single-event effects testing.",
    authors: ["S. Duda", "S. Miller"],
    publishedAt: "2023-11-01",
  },
  {
    _id: "wp-9",
    title: "NDIR Gas Sensing System Design with Matched Emitter-Detector Pairs",
    slug: "ndir-matched-pairs",
    abstract:
      "System-level design guide for NDIR gas sensing using spectrally matched MIR LED emitters and PbSe detectors. Covers optical path design, modulation schemes, and minimum detectable concentration calculations.",
    authors: ["S. Sudhir", "S. Kalev"],
    publishedAt: "2023-09-01",
  },
];

// ─── Glossary ───────────────────────────────────────────────────────

export const glossaryTerms: GlossaryTerm[] = [
  { _id: "g-1", term: "Active Area", definition: "The photosensitive region of a photodetector that converts incident photons into electrical current. Typically specified in mm^2.", category: "Detectors" },
  { _id: "g-2", term: "AXUV", definition: "Absolute eXtreme UltraViolet — ODC's line of silicon photodiodes with 100% internal quantum efficiency from UV through soft X-ray wavelengths.", category: "Products" },
  { _id: "g-3", term: "Bandwidth", definition: "The range of frequencies or wavelengths over which a detector or emitter operates effectively. Also refers to the electrical bandwidth (-3dB frequency) of a detector.", category: "General" },
  { _id: "g-4", term: "Dark Current", definition: "The residual electrical current that flows through a photodetector in the absence of light. A key noise parameter, typically specified in nA or pA.", category: "Detectors" },
  { _id: "g-5", term: "Detectivity (D*)", definition: "A figure of merit for infrared detectors, normalized for active area and bandwidth. Units: cm*Hz^(1/2)/W (Jones). Higher D* means better sensitivity.", category: "Detectors" },
  { _id: "g-6", term: "EUV", definition: "Extreme Ultraviolet — electromagnetic radiation with wavelengths from ~10 nm to ~121 nm. Critical for next-generation semiconductor lithography at 13.5 nm.", category: "Wavelengths" },
  { _id: "g-7", term: "Internal Quantum Efficiency (IQE)", definition: "The ratio of collected charge carriers to absorbed photons. AXUV photodiodes achieve 100% IQE, meaning every absorbed photon generates one electron-hole pair.", category: "Detectors" },
  { _id: "g-8", term: "ITAR", definition: "International Traffic in Arms Regulations — U.S. government regulations controlling the export of defense-related articles and services. ODC is ITAR registered.", category: "Compliance" },
  { _id: "g-9", term: "Junction Capacitance", definition: "The capacitance at the p-n junction of a photodiode. Lower capacitance enables faster response time but typically trades off with active area.", category: "Detectors" },
  { _id: "g-10", term: "MIR", definition: "Mid-Infrared — the portion of the infrared spectrum from approximately 2 to 5 microns. Key region for gas sensing, flame detection, and thermal imaging.", category: "Wavelengths" },
  { _id: "g-11", term: "NDIR", definition: "Non-Dispersive Infrared — a gas sensing technique using broadband IR sources and narrow bandpass filters to measure specific gas concentrations by absorption.", category: "Applications" },
  { _id: "g-12", term: "NEP", definition: "Noise Equivalent Power — the optical power that produces a signal-to-noise ratio of 1. Lower NEP indicates a more sensitive detector. Units: W/Hz^(1/2).", category: "Detectors" },
  { _id: "g-13", term: "PbS", definition: "Lead Sulfide — a photoconductor material sensitive in the 1-3 micron range. Used in near-infrared and short-wave infrared detection applications.", category: "Materials" },
  { _id: "g-14", term: "PbSe", definition: "Lead Selenide — a photoconductor material sensitive in the 1-5 micron range. Widely used for mid-infrared detection, gas sensing, and flame detection.", category: "Materials" },
  { _id: "g-15", term: "Photoconductive Mode", definition: "Operating a photodetector with reverse bias applied. Increases speed and linear range but also increases dark current and noise.", category: "Detectors" },
  { _id: "g-16", term: "Photovoltaic Mode", definition: "Operating a photodetector with zero bias (short-circuit current). Minimizes dark current and noise, ideal for low-light measurements.", category: "Detectors" },
  { _id: "g-17", term: "Responsivity", definition: "The ratio of output electrical signal (current or voltage) to input optical power. Units: A/W or V/W. Varies with wavelength.", category: "Detectors" },
  { _id: "g-18", term: "Rise Time", definition: "The time for a detector's output to rise from 10% to 90% of its final value in response to a step-function optical input. Related to bandwidth by BW ≈ 0.35/t_r.", category: "Detectors" },
  { _id: "g-19", term: "SXUV", definition: "Soft X-ray to UltraViolet — ODC's radiation-hardened photodiode series designed for EUV lithography and plasma diagnostics.", category: "Products" },
  { _id: "g-20", term: "Thin Film Filter", definition: "A multi-layer optical coating deposited directly on a photodiode to provide wavelength selectivity. Used on SXUV detectors for EUV spectral purity.", category: "Optics" },
  { _id: "g-21", term: "TO Can", definition: "Transistor Outline package — a standard metal can package (TO-5, TO-8, TO-39, etc.) commonly used for photodiodes and LED emitters.", category: "Packaging" },
  { _id: "g-22", term: "UVG", definition: "UV-Grade — ODC's UV-enhanced silicon photodiode series with extended sensitivity from 200-1100 nm.", category: "Products" },
  { _id: "g-23", term: "Wavelength Range", definition: "The spectral region over which a detector or emitter operates. For silicon: ~1 nm to 1100 nm. For PbSe: ~1 to 5 microns. For PbS: ~1 to 3 microns.", category: "General" },
  { _id: "g-24", term: "ISO 9001:2015", definition: "International standard for quality management systems. ODC maintains ISO 9001:2015 certification for the design, development, and manufacture of photonic devices.", category: "Compliance" },
  { _id: "g-25", term: "AS9100", definition: "Quality management standard for the aerospace industry, built on ISO 9001 with additional aerospace-specific requirements.", category: "Compliance" },
  { _id: "g-26", term: "RoHS", definition: "Restriction of Hazardous Substances — EU directive restricting use of specific hazardous materials in electrical and electronic equipment.", category: "Compliance" },
  { _id: "g-27", term: "Shunt Resistance", definition: "The resistance across the photodiode junction at zero bias. Higher shunt resistance means lower thermal noise, critical for low-light applications.", category: "Detectors" },
  { _id: "g-28", term: "Spectral Response", definition: "The variation of a detector's responsivity as a function of wavelength. Typically plotted as R(lambda) in A/W vs. wavelength.", category: "Detectors" },
  { _id: "g-29", term: "Avalanche Photodiode (APD)", definition: "A photodiode operated at high reverse bias to achieve internal gain through impact ionization. Provides higher sensitivity than standard photodiodes at the cost of higher noise.", category: "Detectors" },
  { _id: "g-30", term: "Photoconductor", definition: "A detector whose electrical resistance decreases when exposed to light. PbSe and PbS are common photoconductor materials for infrared detection.", category: "Detectors" },
];

// ─── Certifications & Compliance ────────────────────────────────────

export const certifications: Certification[] = [
  {
    _id: "cert-1",
    name: "ISO 9001:2015",
    slug: "iso-9001",
    description:
      "Quality Management System certified for the design, development, and manufacture of photonic devices including photodetectors, LED emitters, and custom assemblies.",
    validUntil: "2027-06-30",
  },
  {
    _id: "cert-2",
    name: "ITAR Registered",
    slug: "itar",
    description:
      "Registered with the U.S. Directorate of Defense Trade Controls (DDTC) for International Traffic in Arms Regulations compliance. Enables ODC to supply photonic components for defense and aerospace programs.",
  },
  {
    _id: "cert-3",
    name: "AS9100 Compliant",
    slug: "as9100",
    description:
      "Aerospace quality management system compliance for mission-critical photonic components used in satellite, UAV, and aircraft instrumentation.",
  },
  {
    _id: "cert-4",
    name: "RoHS Certified",
    slug: "rohs",
    description:
      "All applicable products meet the European Union Restriction of Hazardous Substances directive, limiting use of lead, mercury, cadmium, and other restricted materials.",
  },
  {
    _id: "cert-5",
    name: "REACH Compliant",
    slug: "reach",
    description:
      "Compliant with the EU Registration, Evaluation, Authorisation and Restriction of Chemicals regulation for all applicable products shipped to European markets.",
  },
  {
    _id: "cert-6",
    name: "EAR Compliant",
    slug: "ear",
    description:
      "Export Administration Regulations compliance for commercial photonic devices. Proper ECCN classification maintained for all products subject to export controls.",
  },
];
