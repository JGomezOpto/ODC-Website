import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Globe, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Opto Diode Corporation. Phone: (805) 465-8700, Email: sales@optodiode.com. Located in Camarillo, California.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(805) 465-8700",
    href: "tel:+18054658700",
  },
  {
    icon: Phone,
    label: "Customer Service",
    value: "(805) 499-8108",
    href: "tel:+18054998108",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@optodiode.com",
    href: "mailto:sales@optodiode.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "1260 Calle Suerte\nCamarillo, CA 93012 USA",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "1\u20132 business days",
    href: undefined,
  },
];

const usRepresentatives = [
  {
    company: "Conti-Younger Associates, Inc.",
    territory: "ME, VT, NH, MA, CT, RI",
    contact: "Michael Conti",
    phone: "(508) 485-7204",
    email: "mconti@conti-younger.com",
  },
];

const internationalDistributors = [
  {
    company: "AP Technologies Limited",
    territory: "UK / Ireland",
    contact: "Martin Sharratt",
    phone: "+44 7789 656856",
    email: "mjs@aptechnologies.co.uk",
  },
  {
    company: "MeetOptics",
    territory: "Spain",
    contact: "Christina Graham",
    phone: null,
    email: "christina.graham@meetoptics.com",
  },
  {
    company: "SYSCOM-PROREP",
    territory: "France",
    contact: "Thibaut Gillet",
    phone: "+33 1 60 86 80 04",
    email: "tgillet@syscom-prorep.com",
  },
  {
    company: "EQ Photonics GmbH",
    territory: "Germany / Switzerland / Austria",
    contact: "Harald Sittenauer",
    phone: "+49 811 998707-49",
    email: "info@eqphotonics.de",
  },
  {
    company: "SCHURTER Electronics S.p.A",
    territory: "Italy",
    contact: "Ricardo Paleari",
    phone: "+39 02 33200917",
    email: "info.it@schurter.com",
  },
  {
    company: "Tillquist Group AB",
    territory: "Nordic (Sweden, Norway, Denmark, Finland)",
    contact: "Konrad Wozniak",
    phone: "+46 8 594 632 00",
    email: "konrad.wozniak@tillquist.com",
  },
  {
    company: "RAD Device Co., Ltd",
    territory: "Japan",
    contact: "Yuko Kyozawa",
    phone: "+81 42 642 0896",
    email: "info@rad-dvc.co.jp",
  },
  {
    company: "Nanjing Mcsensors Electronics Ltd",
    territory: "China",
    contact: null,
    phone: null,
    email: null,
  },
  {
    company: "Digi-Key Electronics",
    territory: "Worldwide",
    contact: null,
    phone: "1-800-344-4539",
    email: "sales@digikey.com",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero + Form ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Get in Touch With Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Please complete the form and we will be happy to contact you with a
              response. Our standard response time for an online request is within
              1-2 business days. For a faster response, please call us at the
              number below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <ContactForm />
              </ScrollReveal>
            </div>

            {/* Contact Info Sidebar */}
            <div>
              <ScrollReveal direction="right">
                <div className="rounded-xl border border-border bg-card p-6 space-y-6">
                  <h2 className="font-bold text-foreground">
                    Contact Information
                  </h2>
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block">
                          {info.label}
                        </span>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-foreground hover:text-primary transition-colors whitespace-pre-line"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-sm text-foreground whitespace-pre-line">
                            {info.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Please note: Direct orders must meet a $3,000 minimum. For
                  smaller quantities, please contact one of our authorized
                  distributors below.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Representatives & Distributors ───────────────────────────── */}
      <section className="py-16 lg:py-24 bg-card border-t border-border">
        <Container>
          <SectionHeading
            subtitle="Sales Network"
            title="Representatives & Distributors"
            description="Find a local representative or authorized distributor in your region."
          />

          {/* US Representatives */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              US Representatives
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {usRepresentatives.map((rep) => (
                <div
                  key={rep.company}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {rep.company}
                  </h4>
                  <p className="text-xs text-primary font-medium mb-2">
                    {rep.territory}
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{rep.contact}</p>
                    <p>
                      <a
                        href={`tel:${rep.phone.replace(/[^+\d]/g, "")}`}
                        className="hover:text-primary transition-colors"
                      >
                        {rep.phone}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`mailto:${rep.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {rep.email}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* International Distributors */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              International Distributors
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {internationalDistributors.map((dist) => (
                <div
                  key={dist.company}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {dist.company}
                  </h4>
                  <p className="text-xs text-primary font-medium mb-2">
                    {dist.territory}
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {dist.contact && <p>{dist.contact}</p>}
                    {dist.phone && (
                      <p>
                        <a
                          href={`tel:${dist.phone.replace(/[^+\d]/g, "")}`}
                          className="hover:text-primary transition-colors"
                        >
                          {dist.phone}
                        </a>
                      </p>
                    )}
                    {dist.email && (
                      <p>
                        <a
                          href={`mailto:${dist.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {dist.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Google Map ───────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="relative w-full h-[400px] lg:h-[480px]">
          <iframe
            title="Opto Diode Corporation Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3293.7844!2d-119.0107!3d34.2222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e83a5d0b7f1d2f%3A0x1234567890abcdef!2s1260+Calle+Suerte%2C+Camarillo%2C+CA+93012!5e0!3m2!1sen!2sus!4v1700000000000"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Overlay card */}
          <div className="absolute top-6 left-6 z-10 rounded-xl border border-border bg-card/95 backdrop-blur-sm p-5 shadow-lg max-w-xs hidden sm:block">
            <h3 className="font-bold text-foreground mb-1">
              Opto Diode Corporation
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              1260 Calle Suerte
              <br />
              Camarillo, CA 93012 USA
            </p>
            <a
              href="https://www.google.com/maps/dir//1260+Calle+Suerte,+Camarillo,+CA+93012"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
