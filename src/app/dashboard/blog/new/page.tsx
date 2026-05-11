import BlogPostEditor from "@/components/dashboard/BlogPostEditor";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary">New Blog Post</h1>
        <p className="text-muted mt-1">
          Write a new post to share training tips and boost your SEO
        </p>
      </div>
      <BlogPostEditor />
    </div>
  );
}
