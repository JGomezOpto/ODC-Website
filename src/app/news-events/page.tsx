import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { getAllNewsEvents } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "News, Events & Trade Shows",
  description:
    "Opto Diode Corporation news, product launches, and upcoming trade shows — SPIE Photonics West, SPIE Defense + Security, and more.",
};

const typeLabels: Record<string, string> = {
  event: "Event",
  news: "News",
  product: "Product Launch",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsEventsPage() {
  const events = await getAllNewsEvents();

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          subtitle="News & Events"
          title="Stay Updated"
          description="Product announcements, trade show appearances, and company news."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {events.map((item, i) => (
            <ScrollReveal key={item.slug} delay={i * 0.05}>
              <Link
                href={`/news-events/${item.slug}`}
                className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px]">
                        {typeLabels[item.type] ?? item.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.date)}
                      </span>
                      {item.location && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      )}
                    </div>
                    <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
