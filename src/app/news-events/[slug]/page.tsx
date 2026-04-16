import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ChevronRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { getNewsEventBySlug, getNewsEventSlugs } from "@/lib/sanity/data";
import { buildNewsEventSchema } from "@/lib/seo/schemas";

export async function generateStaticParams() {
  const slugs = await getNewsEventSlugs();
  return slugs.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getNewsEventBySlug(slug);
  if (!event) return { title: "Not Found" };
  return {
    title: event.title,
    description: event.excerpt,
    alternates: { canonical: `/news-events/${slug}` },
    openGraph: { url: `https://optodiode.com/news-events/${slug}` },
  };
}

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

export default async function NewsEventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getNewsEventBySlug(slug);
  if (!event) notFound();

  const newsEventSchema = buildNewsEventSchema(event);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsEventSchema) }}
      />
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <Container className="py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/news-events" className="hover:text-primary">
              News & Events
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {event.title}
            </span>
          </nav>
        </Container>
      </div>

      <article className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/news-events"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All News & Events
            </Link>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-xs"
                >
                  {typeLabels[event.type] ?? event.type}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(event.date)}
                </span>
                {event.location && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                {event.title}
              </h1>
            </div>

            {/* Featured Image */}
            {event.featuredImage && (
              <div className="relative aspect-[2/1] rounded-xl overflow-hidden bg-muted mb-10">
                <Image
                  src={event.featuredImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Body — rendered from markdown-style static text */}
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary">
              {event.body.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i}>{block.replace("## ", "")}</h2>
                  );
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i}>
                      {items.map((item, j) => (
                        <li
                          key={j}
                          dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^- /, "")
                              .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                          }}
                        />
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: block.replace(
                        /\*\*(.+?)\*\*/g,
                        "<strong>$1</strong>"
                      ),
                    }}
                  />
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground mb-2">
                Interested in learning more?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Contact our team
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
