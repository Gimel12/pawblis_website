import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, PawPrint, BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog | Pawblis Dog Training",
  description:
    "Expert dog training tips, behavioral advice, and insights from Pawblis. Learn how to build a stronger bond with your furry companion.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, published_at, tags")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const estimateReadTime = (excerpt: string) =>
    Math.max(2, Math.ceil(excerpt.length / 200));

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

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-light via-white to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            Our Blog
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Dog Training <span className="text-primary">Tips & Insights</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Expert advice on dog behavior, training techniques, and building a
            stronger bond with your furry companion.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {post.cover_image ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                      <PawPrint className="w-16 h-16 text-primary/30" />
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-muted">
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.published_at)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {estimateReadTime(post.excerpt)} min read
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <PawPrint className="w-16 h-16 text-border mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">
                No posts yet
              </h3>
              <p className="text-muted">
                Check back soon for expert dog training tips and insights!
              </p>
            </div>
          )}
        </div>
      </section>

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
