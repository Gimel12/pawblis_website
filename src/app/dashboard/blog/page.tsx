import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PenSquare, Eye, EyeOff, Plus, Calendar } from "lucide-react";

export default async function BlogDashboardPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, published, published_at, created_at, tags")
    .order("created_at", { ascending: false });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Blog Posts</h1>
          <p className="text-muted mt-1">
            Manage your blog posts for SEO and client engagement
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-light border-b border-border/50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary">
                    Title
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary">
                    Tags
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border/30 last:border-0 hover:bg-light/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-secondary">{post.title}</p>
                      <p className="text-xs text-muted mt-0.5">/blog/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                          <Eye className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags &&
                          post.tags.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-sm text-muted">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/blog/${post.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                      >
                        <PenSquare className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border/50 p-16 text-center shadow-sm">
          <PenSquare className="w-12 h-12 text-border mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary mb-2">
            No blog posts yet
          </h3>
          <p className="text-muted mb-6">
            Start writing to boost your SEO and share training tips with your audience.
          </p>
          <Link
            href="/dashboard/blog/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            Write Your First Post
          </Link>
        </div>
      )}
    </div>
  );
}
