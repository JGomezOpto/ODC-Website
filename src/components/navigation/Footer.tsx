import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";

const footerLinks = {
  products: [
    { label: "Detection", href: "/products/detection" },
    { label: "Emission", href: "/products/emission" },
    { label: "Integration", href: "/products/integration" },
    { label: "All Products", href: "/products" },
  ],
  applications: [
    { label: "Semiconductors", href: "/applications/semiconductor" },
    { label: "Aerospace & Defense", href: "/applications/aerospace-defense" },
    { label: "Medical Diagnostics", href: "/applications/medical" },
    { label: "Fire, Flame & Gas", href: "/applications/fire-flame-gas" },
    { label: "Industrial", href: "/applications/industrial" },
    { label: "Food Analysis", href: "/applications/food-analysis" },
  ],
  resources: [
    { label: "Blog", href: "/resources/blog" },
    { label: "Application Notes", href: "/resources/application-notes" },
    { label: "Whitepapers", href: "/resources/whitepapers" },
    { label: "Glossary", href: "/resources/glossary" },
    { label: "Compliance", href: "/resources/compliance" },
  ],
  company: [
    { label: "About Us", href: "/company" },
    { label: "News & Events", href: "/news-events" },
    { label: "Contact Us", href: "/contact" },
    { label: "Request Quote", href: "/request-quote" },
  ],
};

const certifications = [
  "ISO 9001:2015",
  "ITAR Registered",
  "AS9100 Compliant",
  "RoHS Certified",
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/">
              <Image
                src="/images/branding/logo.png"
                alt="Opto Diode Corporation"
                width={180}
                height={40}
                className="h-9 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              High quality and reliable photonics products for over 40 years.
              Illuminate. Detect. Innovate.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href="tel:+18054658700"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                (805) 465-8700
              </a>
              <a
                href="mailto:sales@optodiode.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                sales@optodiode.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  1260 Calle Suerte
                  <br />
                  Camarillo, CA 93012 USA
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Applications</h3>
            <ul className="space-y-2">
              {footerLinks.applications.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications & Copyright */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
              >
                {cert}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Opto Diode Corporation. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
