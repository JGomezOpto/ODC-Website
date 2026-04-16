import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Opto Diode Corporation privacy policy — how we collect, use, and protect your information in accordance with CCPA and GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="py-12 lg:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: April 2025
        </p>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>
              Opto Diode Corporation (&ldquo;ODC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects the following categories of information
              when you visit optodiode.com or contact us:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>
                <strong className="text-foreground">Contact form data</strong> — name, company, email address, phone number,
                and any message or specifications you submit through our quote request or contact forms.
              </li>
              <li>
                <strong className="text-foreground">Server logs</strong> — IP address, browser type, referring URL, pages visited,
                and timestamp, collected automatically by our hosting infrastructure.
              </li>
              <li>
                <strong className="text-foreground">Cookies</strong> — small text files stored on your device to remember
                preferences and support analytics. See Section 4 for details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>To respond to quote requests, product inquiries, and customer support questions.</li>
              <li>To send technical resources or product updates you have explicitly requested.</li>
              <li>To analyze aggregate website traffic and improve our site content and performance.</li>
              <li>To comply with legal obligations, including export control (ITAR/EAR) regulations.</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-foreground">not</strong> sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Share Your Information</h2>
            <p>
              ODC does not share personal information with third parties except in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>
                <strong className="text-foreground">Analytics providers</strong> — aggregated, anonymized data may be processed
                by analytics tools to help us understand site usage. No personally identifiable information is shared.
              </li>
              <li>
                <strong className="text-foreground">Legal requirements</strong> — we may disclose information when required by law,
                court order, or government authority, including export-control compliance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Cookies</h2>
            <p>
              We use strictly necessary cookies to operate the site (e.g., security tokens) and optional analytics
              cookies to understand how visitors interact with our content. When you first visit the site, a cookie
              consent banner gives you the choice to accept or decline optional cookies.
            </p>
            <p className="mt-2">
              You can withdraw consent at any time by clearing your browser cookies or adjusting your browser settings.
              Strictly necessary cookies cannot be disabled as they are required for the site to function.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Data Retention</h2>
            <p>
              Contact form submissions and quote requests are retained for up to three years to support ongoing
              business relationships and regulatory compliance. Server logs are retained for 90 days. Cookie data
              is held for the duration specified by each cookie, typically 12 months or less.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Your Rights (CCPA / GDPR)</h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>Know what personal data we hold about you.</li>
              <li>Request deletion of your personal data.</li>
              <li>Opt out of any sale of personal data (we do not sell data).</li>
              <li>Request correction of inaccurate personal data.</li>
              <li>Lodge a complaint with a supervisory authority (EU residents).</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:sales@optodiode.com" className="text-primary hover:underline">
                sales@optodiode.com
              </a>{" "}
              with the subject line &ldquo;Privacy Request&rdquo;. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Security</h2>
            <p>
              We implement industry-standard security measures including HTTPS encryption, access controls,
              and regular security reviews to protect your information. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our data practices, please contact:
            </p>
            <address className="not-italic mt-3 space-y-1">
              <p className="text-foreground font-medium">Opto Diode Corporation</p>
              <p>1260 Calle Suerte, Camarillo, CA 93012</p>
              <p>
                Email:{" "}
                <a href="mailto:sales@optodiode.com" className="text-primary hover:underline">
                  sales@optodiode.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+18054658700" className="text-primary hover:underline">
                  +1 (805) 465-8700
                </a>
              </p>
            </address>
          </section>

          <div className="pt-6 border-t border-border">
            <Link href="/" className="text-primary hover:underline text-sm">
              ← Return to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
