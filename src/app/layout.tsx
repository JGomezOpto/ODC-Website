import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Opto Diode Corporation | Photonics for Demanding Environments",
    template: "%s | Opto Diode Corporation",
  },
  description:
    "High quality and reliable photonics products for over 40 years. Silicon photodiodes, IR detectors, LEDs, and custom integration solutions for semiconductor, aerospace, medical, and industrial applications.",
  keywords: [
    "photodiodes",
    "photodetectors",
    "EUV detectors",
    "infrared detectors",
    "LED emitters",
    "photonics",
    "optoelectronics",
    "silicon detectors",
    "PbSe detectors",
    "PbS detectors",
    "avalanche photodiodes",
    "Opto Diode Corporation",
    "AXUV",
    "SXUV",
  ],
  authors: [{ name: "Opto Diode Corporation" }],
  creator: "Opto Diode Corporation",
  publisher: "Opto Diode Corporation",
  metadataBase: new URL("https://optodiode.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Opto Diode Corporation",
    title: "Opto Diode Corporation | Photonics for Demanding Environments",
    description:
      "High quality and reliable photonics products for over 40 years. Silicon photodiodes, IR detectors, LEDs, and custom solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opto Diode Corporation",
    description:
      "Photonics for demanding environments — photodiodes, LEDs, and custom solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Opto Diode Corporation",
  url: "https://optodiode.com",
  logo: "https://optodiode.com/images/branding/logo.png",
  description:
    "Manufacturer of high-quality photodetectors, LED emitters, and custom photonic solutions for semiconductor, aerospace, medical, and industrial applications.",
  foundingDate: "1984",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1260 Calle Suerte",
    addressLocality: "Camarillo",
    addressRegion: "CA",
    postalCode: "93012",
    addressCountry: "US",
  },
  telephone: "+1-805-465-8700",
  email: "sales@optodiode.com",
  sameAs: ["https://www.linkedin.com/company/opto-diode-corporation"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-805-465-8700",
    contactType: "sales",
    availableLanguage: "English",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Opto Diode Corporation",
  url: "https://optodiode.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://optodiode.com/products?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://optodiode.com/#localbusiness",
  name: "Opto Diode Corporation",
  telephone: "+1-805-465-8700",
  email: "sales@optodiode.com",
  url: "https://optodiode.com",
  image: "https://optodiode.com/images/branding/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1260 Calle Suerte",
    addressLocality: "Camarillo",
    addressRegion: "CA",
    postalCode: "93012",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.2164,
    longitude: -119.0376,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  hasMap:
    "https://maps.google.com/?q=1260+Calle+Suerte+Camarillo+CA+93012",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
