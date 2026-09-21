import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "../../components/ui/Container";
import { SectionHeading, Card, EmptyState } from "../../components/ui/Card";
import { formatDate } from "../../lib/format";
import { getPublishedPosts } from "../../lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Health and diagnostics articles from 4M Diagnostics.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Insights" title="Blog" />

      <div className="mt-8">
        {posts.length === 0 ? (
          <EmptyState title="Articles will appear here soon" />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full p-6 transition-shadow hover:shadow-md">
                  <p className="text-xs text-muted">
                    {post.publishedAt ? formatDate(post.publishedAt) : ""}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{post.title}</h2>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
