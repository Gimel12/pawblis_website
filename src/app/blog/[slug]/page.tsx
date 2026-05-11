import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, PawPrint } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, meta_title, meta_description, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.meta_title || `${post.title} | Pawblis Blog`,
    description: post.meta_description || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !post) notFound();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const estimateReadTime = (content: string) =>
    Math.max(2, Math.ceil(content.split(/\s+/).length / 200));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.jpeg"
                alt="Pawblis Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-secondary">Pawblis</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#about" className="text-muted hover:text-primary transition-colors font-medium">About</Link>
              <Link href="/#services" className="text-muted hover:text-primary transition-colors font-medium">Services</Link>
              <Link href="/blog" className="text-primary font-semibold">Blog</Link>
              <Link href="/#contact" className="text-muted hover:text-primary transition-colors font-medium">Contact</Link>
            </div>
            <Link
              href="/#contact"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-24 pb-16 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted mb-8 pb-8 border-b border-border">
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {estimateReadTime(post.content)} min read
            </span>
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                preload
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground prose-headings:text-secondary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary prose-blockquote:border-primary prose-blockquote:text-muted">
            {post.content.split("\n\n").map((paragraph: string, i: number) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-bold text-secondary mt-8 mb-3">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-secondary mt-10 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc list-inside space-y-2 my-4 text-muted">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-muted leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/10 rounded-2xl border border-primary/10 text-center">
            <PawPrint className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold text-secondary mb-2">
              Need help with your dog?
            </h3>
            <p className="text-muted mb-4">
              Book a consultation and let&apos;s create a personalized training plan.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Pawblis Dog Training. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
