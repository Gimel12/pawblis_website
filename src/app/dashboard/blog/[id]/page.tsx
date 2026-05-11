import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BlogPostEditor from "@/components/dashboard/BlogPostEditor";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary">Edit Post</h1>
        <p className="text-muted mt-1">Update your blog post</p>
      </div>
      <BlogPostEditor
        initialPost={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          content: post.content || "",
          cover_image: post.cover_image || "",
          published: post.published,
          meta_title: post.meta_title || "",
          meta_description: post.meta_description || "",
          tags: post.tags || [],
        }}
      />
    </div>
  );
}
