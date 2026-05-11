"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Save,
  Eye,
  Trash2,
  Loader2,
  Globe,
  FileText,
  Tag,
  Image as ImageIcon,
  Search,
} from "lucide-react";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
  meta_title: string;
  meta_description: string;
  tags: string[];
}

const defaultPost: BlogPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  published: false,
  meta_title: "",
  meta_description: "",
  tags: [],
};

export default function BlogPostEditor({
  initialPost,
}: {
  initialPost?: BlogPost;
}) {
  const [post, setPost] = useState<BlogPost>(initialPost || defaultPost);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const router = useRouter();
  const supabase = createClient();

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const handleTitleChange = (title: string) => {
    setPost((p) => ({
      ...p,
      title,
      slug: p.id ? p.slug : generateSlug(title),
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !post.tags.includes(tag)) {
      setPost((p) => ({ ...p, tags: [...p.tags, tag] }));
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setPost((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  };

  const handleSave = async (publish?: boolean) => {
    if (!post.title || !post.slug) {
      setError("Title and slug are required.");
      return;
    }

    setSaving(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image,
      published: publish !== undefined ? publish : post.published,
      published_at:
        publish === true ? new Date().toISOString() : post.published ? undefined : null,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      tags: post.tags,
      updated_at: new Date().toISOString(),
      ...(post.id ? {} : { user_id: user?.id }),
    };

    let dbError;

    if (post.id) {
      const result = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", post.id);
      dbError = result.error;
    } else {
      const result = await supabase.from("blog_posts").insert(payload);
      dbError = result.error;
    }

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
    } else {
      router.push("/dashboard/blog");
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!post.id) return;
    setDeleting(true);
    await supabase.from("blog_posts").delete().eq("id", post.id);
    router.push("/dashboard/blog");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-secondary";
  const labelClass = "block text-sm font-medium text-secondary mb-1.5";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      <input
        type="text"
        value={post.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Post title..."
        className="w-full text-3xl font-bold text-secondary placeholder:text-border outline-none bg-transparent"
      />

      {/* Slug */}
      <div className="flex items-center gap-2 text-sm text-muted">
        <Globe className="w-4 h-4" />
        <span>/blog/</span>
        <input
          type="text"
          value={post.slug}
          onChange={(e) => setPost((p) => ({ ...p, slug: e.target.value }))}
          className="border-b border-border bg-transparent outline-none text-secondary font-mono px-1 py-0.5 focus:border-primary transition-colors"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-light rounded-xl p-1">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "content"
              ? "bg-white text-secondary shadow-sm"
              : "text-muted hover:text-secondary"
          }`}
        >
          <FileText className="w-4 h-4" />
          Content
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "seo"
              ? "bg-white text-secondary shadow-sm"
              : "text-muted hover:text-secondary"
          }`}
        >
          <Search className="w-4 h-4" />
          SEO & Meta
        </button>
      </div>

      {activeTab === "content" ? (
        <div className="space-y-5">
          {/* Cover Image */}
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                Cover Image URL
              </span>
            </label>
            <input
              type="text"
              value={post.cover_image}
              onChange={(e) =>
                setPost((p) => ({ ...p, cover_image: e.target.value }))
              }
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className={labelClass}>Excerpt (shown in blog cards)</label>
            <textarea
              value={post.excerpt}
              onChange={(e) =>
                setPost((p) => ({ ...p, excerpt: e.target.value }))
              }
              rows={3}
              className={inputClass + " resize-none"}
              placeholder="A short summary of the post..."
            />
          </div>

          {/* Content */}
          <div>
            <label className={labelClass}>
              Content (use ## for headings, - for lists, blank lines for paragraphs)
            </label>
            <textarea
              value={post.content}
              onChange={(e) =>
                setPost((p) => ({ ...p, content: e.target.value }))
              }
              rows={18}
              className={inputClass + " resize-y font-mono text-sm leading-relaxed"}
              placeholder="Write your blog post content here...

## Section Heading

Paragraph text goes here. Use blank lines to separate paragraphs.

- List item one
- List item two
- List item three

### Sub Heading

More content..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                Tags
              </span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-primary-dark ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className={inputClass}
                placeholder="Add a tag and press Enter..."
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-light hover:bg-border/50 text-secondary rounded-xl font-medium transition-colors shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5 bg-white rounded-2xl border border-border/50 p-6">
          <div>
            <label className={labelClass}>Meta Title (for search engines)</label>
            <input
              type="text"
              value={post.meta_title}
              onChange={(e) =>
                setPost((p) => ({ ...p, meta_title: e.target.value }))
              }
              className={inputClass}
              placeholder={post.title || "SEO title..."}
            />
            <p className="text-xs text-muted mt-1">
              {(post.meta_title || post.title).length}/60 characters
            </p>
          </div>
          <div>
            <label className={labelClass}>
              Meta Description (for search engines)
            </label>
            <textarea
              value={post.meta_description}
              onChange={(e) =>
                setPost((p) => ({ ...p, meta_description: e.target.value }))
              }
              rows={3}
              className={inputClass + " resize-none"}
              placeholder={post.excerpt || "SEO description..."}
            />
            <p className="text-xs text-muted mt-1">
              {(post.meta_description || post.excerpt).length}/160 characters
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          {post.id && (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this post?")) {
                  handleDelete();
                }
              }}
              disabled={deleting}
              className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-secondary font-medium hover:bg-light transition-all"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
