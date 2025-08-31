import { Metadata } from "next";
import BlogPageClient from "./blog-component";
import { BlogPost } from "@/types/blogpost";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Blog | Lwh's Portfolio",
  description: "Read the latest articles and insights from Lwh about web development, programming, and technology.",
  keywords: ["blog", "web development", "programming", "JavaScript", "React", "Next.js"],
};

// Server-side data fetching
async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), "src/app/blog-posts/");
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts: BlogPost[] = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
          slug: data.slug || filename.replace(/\.(mdx|md)$/, ""),
          title: data.title || "Untitled",
          coverImageSrc: data.coverImageSrc || "",
          tags: data.tags || [],
          description: data.description || "",
          date: data.date || new Date().toISOString(),
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Server Component with initial data
export default async function BlogPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const posts = await getBlogPosts();
  const activeTag = searchParams.tag || null;

  return (
    <div className="min-h-screen">
      {/* SEO-optimized title - rendered on server */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Insights, tutorials, and thoughts about modern web development
          </p>
        </div>
        
        {/* Pass initial data to client component */}
        <BlogPageClient 
          initialPosts={posts} 
          initialActiveTag={activeTag}
        />
      </div>
    </div>
  );
}