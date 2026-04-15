export interface NewsEvent {
  id: string;
  slug: string;
  title: string;
  type: "event" | "news" | "product";
  date: string;
  location?: string;
  excerpt: string;
  body: string;
  featuredImage?: string;
}

export const newsEvents: NewsEvent[] = [
  {
    id: "spie-defense-2026",
    slug: "spie-defense-security-2026",
    title: "Opto Diode to Exhibit at SPIE Defense + Security 2026",
    type: "event",
    date: "2026-03-15",
    location: "Orlando, FL",
    excerpt:
      "Visit us at SPIE Defense + Commercial Sensing 2026 to see our latest silicon photodiodes, IR detectors, and APD modules for defense and aerospace applications.",
    body: `Opto Diode Corporation will be exhibiting at SPIE Defense + Commercial Sensing 2026 in Orlando, Florida. This premier event brings together professionals from the defense, aerospace, and security industries to explore the latest advances in photonic technologies.

## What to Expect at Our Booth

Our applications engineers will be on hand to discuss your specific detection and emission requirements. We will be showcasing:

- **SXUV and AXUV Series** — EUV-optimized photodiodes for next-generation lithography and plasma diagnostics
- **PbSe and PbS IR Detectors** — High-sensitivity mid-infrared detectors for threat detection and countermeasure systems
- **ODA Preamp Modules** — Integrated photodiode + transimpedance amplifier modules for high-speed detection
- **High-Power NIR LEDs** — TO-66 packaged LED arrays delivering up to 1250 mW for active IR illumination
- **PIRE PLUS Emitters** — Next-generation high-speed pulsable IR emitters for advanced NDIR gas sensing

## Conference Details

- **Date:** March 15–19, 2026
- **Location:** Orange County Convention Center, Orlando, FL
- **Event:** SPIE Defense + Commercial Sensing

Contact us at sales@optodiode.com to schedule a meeting at the show.`,
    featuredImage: "/images/hero/products-banner.jpg",
  },
  {
    id: "photonics-west-2026",
    slug: "spie-photonics-west-2026",
    title: "SPIE Photonics West 2026 — Visit Booth #139",
    type: "event",
    date: "2026-01-25",
    location: "San Francisco, CA",
    excerpt:
      "Opto Diode will exhibit at Photonics West 2026. Visit Booth #139 to discuss your photonic detection and emission needs with our engineers.",
    body: `Opto Diode Corporation is exhibiting at SPIE Photonics West 2026, the world's largest photonics technologies event. Visit us at **Booth #139** in the South Hall of the Moscone Center.

## Products on Display

We will be demonstrating our complete portfolio of photonic components:

- **Silicon Photodiodes** — SXUV, AXUV, UVG, Blue Enhanced, and Red Enhanced series covering 0.01 nm to 1100 nm
- **Infrared Detectors** — PbSe (1–5 µm) and PbS (1–3 µm) detectors in uncooled and TE-cooled configurations
- **Avalanche Photodiodes** — Si and InGaAs APDs for low-light-level detection
- **NIR LEDs** — Standard and high-power emitters from 810 to 880 nm
- **IR Emitters** — SA, SHA, SVF, and PIRE PLUS series for NDIR gas sensing

## Schedule a Meeting

Our applications engineers are available for in-depth technical discussions. Contact us at sales@optodiode.com to reserve a time slot.

- **Dates:** January 25–30, 2026
- **Location:** Moscone Center, San Francisco, CA
- **Booth:** #139, South Hall`,
    featuredImage: "/images/hero/products-banner.jpg",
  },
  {
    id: "axuv100g-release",
    slug: "axuv100g-electron-detection-device",
    title: "New AXUV100G Electron Detection Device Released",
    type: "product",
    date: "2025-12-10",
    excerpt:
      "Introducing the AXUV100G — a new large-area electron detection photodiode optimized for electron beam characterization and dosimetry applications.",
    body: `Opto Diode Corporation announces the release of the **AXUV100G**, a large-area silicon photodiode specifically designed for electron detection and dosimetry applications.

## Key Features

The AXUV100G builds on our proven AXUV platform with enhancements targeted at electron beam applications:

- **Large 100 mm² active area** for capturing wide electron beams without scanning
- **100% internal quantum efficiency** across the detection range
- **Thin entrance window** minimizes electron energy loss before reaching the active region
- **Low dark current** enables detection of weak electron signals
- **Hermetically sealed ceramic package** for vacuum compatibility

## Applications

The AXUV100G is ideal for:

- Electron beam characterization in semiconductor fabrication
- Radiation dosimetry in medical and industrial settings
- Electron microscopy detector systems
- Particle physics instrumentation

## Availability

The AXUV100G is available now. Contact sales@optodiode.com for pricing and lead time information, or visit our product page for full specifications.`,
  },
  {
    id: "meetoptics-partnership",
    slug: "products-available-on-meetoptics",
    title: "Opto Diode Products Now Available on MEETOPTICS",
    type: "news",
    date: "2025-11-15",
    excerpt:
      "Our full catalog of photodiodes, IR detectors, LEDs, and emitters is now available through MEETOPTICS, making it easier to compare and source photonic components.",
    body: `Opto Diode Corporation is pleased to announce that our complete product portfolio is now listed on **MEETOPTICS**, the photonics component comparison platform.

## What This Means for You

Engineers and procurement teams can now:

- **Browse our full catalog** alongside competing products for easy comparison
- **Filter by specifications** including wavelength range, active area, package type, and more
- **Request quotes directly** through the MEETOPTICS platform
- **Access datasheets** and technical documentation in one place

## Products Available

All product families are represented:

- Silicon photodiodes (SXUV, AXUV, UVG, Blue Enhanced, Red Enhanced)
- Infrared detectors (PbSe and PbS)
- Avalanche photodiodes (Si and InGaAs)
- Preamp modules (ODA series)
- NIR and visible LEDs
- Broadband IR emitters (SA, SHA, SVF, PIRE PLUS)

Visit MEETOPTICS to explore our products, or contact us directly at sales@optodiode.com.`,
  },
  {
    id: "ir-led-illuminator",
    slug: "gaalas-ir-led-illuminator-aerospace",
    title: "GaAlAs IR LED Illuminator for Aerospace Applications",
    type: "product",
    date: "2025-10-05",
    excerpt:
      "New custom GaAlAs IR LED illuminator assembly qualified for aerospace environments, delivering high-intensity 850 nm illumination in a ruggedized package.",
    body: `Opto Diode Corporation has developed a custom **GaAlAs IR LED illuminator assembly** for aerospace and defense applications. This new assembly combines multiple high-power OD-669-850 LED arrays in a ruggedized enclosure designed to meet MIL-STD environmental requirements.

## Design Highlights

- **Multi-chip array** using OD-669-850 emitters delivering over 5W total radiant power at 850 nm
- **Custom optics** for tailored beam patterns — narrow, medium, or wide angle configurations
- **Ruggedized enclosure** designed for aerospace vibration, shock, and thermal cycling
- **Hermetically sealed** for operation in harsh environments including high altitude and humidity
- **Radiation tolerance** verified through testing to aerospace standards

## Target Applications

- Night vision illumination systems
- Active IR imaging for surveillance and reconnaissance
- Target designation and tracking
- UAV-mounted sensor illumination
- Perimeter security systems

## Custom Integration

This illuminator demonstrates our Integration division's capability to design and manufacture complete opto-electronic assemblies to customer specifications. From prototype through high-volume production, our engineers work with you to develop solutions that meet your exact requirements.

Contact our engineering team at sales@optodiode.com to discuss your illumination requirements.`,
  },
  {
    id: "cybersecurity-certification",
    slug: "cybersecurity-compliance-certification",
    title: "Cybersecurity Compliance Certification Achieved",
    type: "news",
    date: "2025-09-20",
    excerpt:
      "Opto Diode Corporation has achieved cybersecurity compliance certification, reinforcing our commitment to secure operations and data protection for defense customers.",
    body: `Opto Diode Corporation is proud to announce that we have achieved **cybersecurity compliance certification**, meeting the requirements set forth by the Department of Defense for contractors handling controlled unclassified information (CUI).

## What This Means

This certification demonstrates that Opto Diode has implemented comprehensive cybersecurity practices across our organization, including:

- **Access controls** for sensitive technical data and customer information
- **Incident response procedures** for identifying and responding to security events
- **Network security** measures including encryption, monitoring, and segmentation
- **Employee training** on cybersecurity awareness and best practices
- **Supply chain security** protocols for managing third-party risks

## Why It Matters

As a supplier to defense and aerospace programs, protecting sensitive technical data is a core responsibility. This certification gives our customers confidence that:

- Their proprietary designs and specifications are protected
- Export-controlled technical data is handled in compliance with ITAR/EAR requirements
- Our digital infrastructure meets or exceeds DoD cybersecurity standards

## Ongoing Commitment

Cybersecurity is not a one-time achievement. We maintain continuous monitoring, regular audits, and ongoing training to ensure our practices remain current with evolving threats and regulatory requirements.

For questions about our compliance posture, contact us at sales@optodiode.com.`,
  },
];
