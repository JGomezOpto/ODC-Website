import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { getAllBlogPosts } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on photonics technology, product updates, application tips, and industry news from Opto Diode Corporation.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          subtitle="Blog"
          title="Photonics Insights"
          description="The latest from our engineering and applications teams."
        />

        <nav className="text-xs text-muted-foreground mb-10">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/resources" className="hover:text-primary">
            Resources
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post, i) => (
              <ScrollReveal key={post._id} delay={i * 0.08}>
                <article className="group h-full rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)] transition-all flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center text-sm font-medium text-primary mt-auto">
                    Read more
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No blog posts yet. Check back soon.
          </p>
        )}
      </Container>
    </section>
  );
}
