import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Award, Globe } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { StatCounter } from "@/components/common/StatCounter";
import { AnimatedTimeline } from "@/components/common/AnimatedTimeline";

export const metadata: Metadata = {
  title: "About Opto Diode — Photodiode Manufacturer Since 1984",
  description:
    "Opto Diode Corporation: US silicon photodiode and LED manufacturer since 1984. ISO 9001:2015 certified, ITAR registered. Camarillo, CA. Custom photonics for defense, semiconductor, and medical.",
};

const teamMembers = [
  { name: "Shalmalee Vaiyda", title: "Business Unit Manager", photo: "/images/team/shalmalee-vaiyda.jpg" },
  { name: "Rachel Guthrie", title: "Controller", photo: "/images/team/rachel-guthrie.jpg" },
  { name: "Sujeet Sudhir", title: "Strategic Sales & Marketing Manager", photo: "/images/team/sujeet-sudhir.png" },
  { name: "Stanley Duda", title: "Sales Manager", photo: "/images/team/stanley-duda.jpg" },
  { name: "Stewart Miller", title: "Engineering Manager", photo: "/images/team/stewart-miller.jpg" },
  { name: "Ernie Escobar", title: "Operations Manager", photo: "/images/team/ernie-escobar.jpg" },
  { name: "Shahar Kalev", title: "Business Development Manager", photo: "/images/team/shahar-kalev.jpg" },
  { name: "Regina Flury", title: "Production Manager", photo: "/images/team/regina-flury.jpg" },
  { name: "Jezdan Gomez", title: "Senior Application Engineer", photo: "/images/team/jezdan-gomez.png" },
];

const certifications = [
  { icon: Shield, name: "ISO 9001:2015", description: "Quality Management System certified for design, development, and manufacture of photonic devices." },
  { icon: Award, name: "ITAR Registered", description: "International Traffic in Arms Regulations compliant for defense and aerospace applications." },
  { icon: Globe, name: "AS9100 Compliant", description: "Meeting aerospace quality management system requirements for mission-critical components." },
  { icon: Shield, name: "RoHS Certified", description: "All applicable products meet Restriction of Hazardous Substances compliance." },
];

const timeline = [
  { year: "1984", event: "Founded in Camarillo, California" },
  { year: "1990s", event: "Pioneer AXUV silicon photodiodes with 100% IQE" },
  { year: "2000s", event: "Expand into PbSe/PbS infrared detectors and LED emitters" },
  { year: "2010s", event: "SXUV series adopted as EUV lithography industry standard" },
  { year: "2020s", event: "Next-gen APDs, expanded aerospace qualification, cybersecurity compliance" },
  { year: "Today", event: "40+ years serving 6 industries with zero-defect quality" },
];

export default function CompanyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero/company-building.jpg" alt="Opto Diode Corporation" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Company</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Photonics for Demanding Environments
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Over 40 years of designing and manufacturing high-quality photodetectors, LED emitters, and custom photonic solutions from our facility in Camarillo, California.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 bg-surface-dark relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <Container className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={40} suffix="+" label="Years of Excellence" />
            <StatCounter value={1000} suffix="+" label="Products Available" />
            <StatCounter value={6} label="Industries Served" />
            <StatCounter value={100} suffix="%" label="Quality Commitment" />
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <Image src="/images/manufacturing/wafer-fabrication.jpg" alt="Wafer fabrication" width={600} height={400} className="rounded-2xl w-full" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                To deliver photonic solutions of uncompromising quality for the world&apos;s most demanding applications — from EUV lithography to deep space.
              </p>
              <p className="text-muted-foreground mb-4">
                Founded in 1984, Opto Diode Corporation has grown from a small photodiode manufacturer into a comprehensive photonics solutions provider serving semiconductor, aerospace, medical, and industrial markets worldwide.
              </p>
              <p className="text-muted-foreground">
                Our vertically integrated facility in Camarillo, California encompasses wafer fabrication, device packaging, testing, and final assembly — giving us complete control over quality from raw material to shipped product.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Timeline — Animated Vertical */}
      <section className="py-16 lg:py-24 bg-card">
        <Container>
          <SectionHeading subtitle="Our History" title="40+ Years of Innovation" />
          <AnimatedTimeline items={timeline} />
        </Container>
      </section>

      {/* Corporate Video */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading subtitle="Who We Are" title="We Are Opto Diode" description="A long history of delivering industry-leading silicon, PbS, and PbSe detectors and MIR emitters." />
          <ScrollReveal>
            <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden border border-border group">
              <video
                controls
                poster="/images/hero/video-thumbnail.png"
                className="w-full aspect-video bg-black"
                preload="none"
              >
                <source src="https://optodiode.com/wp-content/uploads/2025/02/Corporate-Video-V1.1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-16 lg:py-24 bg-card">
        <Container>
          <SectionHeading subtitle="Leadership" title="Our Team" description="The people behind four decades of photonics innovation." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-background p-6 text-center hover:border-primary/30 transition-colors">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/20">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{member.title}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading subtitle="Quality" title="Certifications & Compliance" description="Meeting the most stringent standards across regulated industries." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Manufacturing */}
      <section className="py-16 lg:py-24 bg-card">
        <Container>
          <SectionHeading subtitle="Facilities" title="Manufacturing Excellence" description="Vertically integrated photonic device manufacturing in Camarillo, CA." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { image: "/images/manufacturing/wafer-fabrication.jpg", title: "Wafer Fabrication" },
              { image: "/images/manufacturing/clean-room.jpg", title: "Clean Room Facilities" },
              { image: "/images/manufacturing/assembly.jpg", title: "Device Assembly" },
            ].map((facility, i) => (
              <ScrollReveal key={facility.title} delay={i * 0.1}>
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src={facility.image} alt={facility.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white">{facility.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
