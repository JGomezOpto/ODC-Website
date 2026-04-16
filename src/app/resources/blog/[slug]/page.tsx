import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/sanity/data";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schemas";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/resources/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `https://optodiode.com/resources/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://optodiode.com" },
    { name: "Resources", item: "https://optodiode.com/resources" },
    { name: "Blog", item: "https://optodiode.com/resources/blog" },
    { name: post.title },
  ]);
  const articleSchema = buildArticleSchema(post);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <Container className="py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/resources" className="hover:text-primary">Resources</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/resources/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>
        </Container>
      </div>

      <article className="py-12 lg:py-20">
        <Container className="max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            {post.author && (
              <span>By {post.author}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="w-3.5 h-3.5 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed">
            <p>{post.excerpt}</p>
          </div>
        </Container>
      </article>

      {/* Back link */}
      <div className="border-t border-border py-8">
        <Container className="max-w-3xl">
          <Link
            href="/resources/blog"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            Back to Blog
          </Link>
        </Container>
      </div>
    </>
  );
}
