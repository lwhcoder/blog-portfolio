"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
import { Suspense } from "react";

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  initialActiveTag: string | null;
}

function BlogPageClientContent({ initialPosts, initialActiveTag }: BlogPageClientProps) {
  const [posts] = useState<BlogPost[]>(initialPosts); // Use server-provided data
  const [activeTag, setActiveTag] = useState<string | null>(initialActiveTag);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [isPending, startTransition] = useTransition();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Update URL when filters change using modern Next.js patterns
  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (activeTag) {
        params.set("tag", activeTag);
      } else {
        params.delete("tag");
      }
      
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      
      router.replace(url, { scroll: false });
    });
  }, [activeTag, router, searchParams, pathname]);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  const filteredPosts = posts
    .filter((post) => (activeTag ? post.tags?.includes(activeTag) : true))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

  const toggleTag = (tag: string) => {
    startTransition(() => {
      setActiveTag((prev) => (prev === tag ? null : tag));
    });
  };

  return (
    <>
      {(allTags.length > 0 || posts.length > 0) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2 sm:justify-start justify-center">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "cursor-pointer text-sm px-3 py-1 rounded-full transition-all duration-200",
                  "hover:scale-105 active:scale-95",
                  activeTag === tag
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary/20"
                    : "bg-muted hover:bg-muted/80 hover:shadow-sm"
                )}
                style={{ 
                  opacity: isPending ? 0.7 : 1,
                  transition: "all 0.2s ease-in-out"
                }}
              >
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="w-40">
            <Select
              value={sortOrder}
              onValueChange={(val) => {
                startTransition(() => {
                  setSortOrder(val as "latest" | "oldest");
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No posts found{activeTag ? ` for #${activeTag}` : ""}.
          </p>
          {activeTag && (
            <button
              onClick={() => toggleTag("")}
              className="mt-4 text-primary hover:text-primary/80 underline"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div 
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300",
            isPending && "opacity-50"
          )}
        >
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
              className="min-h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function BlogPageClient(props: BlogPageClientProps) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <BlogPageClientContent {...props} />
    </Suspense>
  );
}
