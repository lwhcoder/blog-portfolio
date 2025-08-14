"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blogpost";
import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  // Read tag from query param on mount and set activeTag
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagParam = params.get("tag");
    if (tagParam) {
      setActiveTag(tagParam);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("/api/blog");
        setPosts(response.data);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    }

    fetchPosts();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  const filteredPosts = posts
    .filter((post) => (activeTag ? post.tags?.includes(activeTag) : true))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

  const toggleTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Blog</h1>

      {(allTags.length > 0 || posts.length > 0) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2 sm:justify-start justify-center">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "cursor-pointer text-sm px-3 py-1 rounded-full transition-all",
                  activeTag === tag
                    ? "bg-[#0f0] text-white hover:bg-[#009400]"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="w-40">
            <Select
              value={sortOrder}
              onValueChange={(val) => setSortOrder(val as "latest" | "oldest")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No posts found{activeTag ? ` for #${activeTag}` : ""}.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              slug={post.slug}
              tags={post.tags}
              imageSrc={post.coverImageSrc}
              imageAlt={post.title}
              className="min-h-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
