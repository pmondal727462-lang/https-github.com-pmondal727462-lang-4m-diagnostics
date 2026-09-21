import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "../../../components/ui/Container";
import { formatDate } from "../../../lib/format";
import { getPublishedPostBySlug } from "../../../lib/data/blog";

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="max-w-3xl py-14">
      <p className="text-xs text-muted">{post.publishedAt ? formatDate(post.publishedAt) : ""}</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">{post.title}</h1>
      <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-muted">
        {post.content}
      </div>
    </Container>
  );
}
