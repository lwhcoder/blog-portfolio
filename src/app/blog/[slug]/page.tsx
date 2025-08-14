/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";

import Image from "next/image";
import Link from "next/link";  // <-- Added import here
import { AdvancedCode } from "@/components/advanced-code";
import path from "path";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/blogpost";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

export default async function Home({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postPath = path.join(
    process.cwd(),
    "src/app/blog-posts",
    `${slug}.mdx`
  );

  if (!fs.existsSync(postPath)) {
    return notFound();
  }
  const components = {
    AdvancedCode,
    h1: (props: any) => (
      <h1 className="text-4xl font-bold mt-6 mb-4" {...props} />
    ),
    h2: (props: any) => (
      <h2 className="text-3xl font-semibold mt-6 mb-4" {...props} />
    ),
    h3: (props: any) => (
      <h3 className="text-2xl font-semibold mt-5 mb-3" {...props} />
    ),
    h4: (props: any) => (
      <h4 className="text-xl font-semibold mt-4 mb-2" {...props} />
    ),
    h5: (props: any) => (
      <h5 className="text-lg font-medium mt-3 mb-2" {...props} />
    ),
    h6: (props: any) => (
      <h6 className="text-base font-medium mt-2 mb-2" {...props} />
    ),
    p: (props: any) => (
      <p className="my-4 leading-relaxed text-base" {...props} />
    ),

    a: (props: any) => (
      <a
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),

    ul: (props: any) => (
      <ul className="list-disc list-inside my-4 ml-6" {...props} />
    ),
    ol: (props: any) => (
      <ol className="list-decimal list-inside my-4 ml-6" {...props} />
    ),
    li: (props: any) => <li className="mb-1" {...props} />,

    blockquote: (props: any) => (
      <blockquote
        className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground my-6"
        {...props}
      />
    ),

    img: (props: any) => (
      <img className="rounded-md mx-auto my-6 shadow-md" {...props} />
    ),

    code: ({ className = "", children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match?.[1] ?? "";

      if (language) {
        return (
          <pre className="my-6 rounded-md overflow-x-auto text-sm bg-zinc-950 p-4 shadow-sm">
            <code className={`language-${language}`} {...props}>
              {children}
            </code>
          </pre>
        );
      }

      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-600"
          {...props}
        >
          {children}
        </code>
      );
    },

    table: (props: any) => (
      <div className="overflow-x-auto my-6">
        <table
          className="w-full border border-border text-sm text-left"
          {...props}
        />
      </div>
    ),

    thead: (props: any) => <thead className="bg-muted" {...props} />,
    tbody: (props: any) => <tbody {...props} />,
    tr: (props: any) => <tr className="border-b border-border" {...props} />,
    th: (props: any) => (
      <th className="p-2 font-semibold text-foreground" {...props} />
    ),
    td: (props: any) => <td className="p-2 text-muted-foreground" {...props} />,

    hr: (props: any) => <hr className="my-8 border-muted" {...props} />,

    em: (props: any) => (
      <em className="italic text-muted-foreground" {...props} />
    ),
    strong: (props: any) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
  };

  const fileContent = fs.readFileSync(postPath, "utf8");
  const { content, data }: any = matter(fileContent);
  const post: BlogPost = {
    title: data.title,
    description: data.description,
    slug,
    date: data.date,
    tags: data.tags || [],
    coverImageSrc: data.coverImageSrc || "",
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <Image
        src={post.coverImageSrc}
        alt={"Cover Image"}
        width={1280}
        height={720}
      />
      <p className="text-muted-foreground mb-4 text-sm">
        {format(new Date(post.date), "PPP")}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags?.map((tag) => (
          <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
            
              <Badge variant="secondary" className="cursor-pointer hover:bg-[#0f0]">
                #{tag}
              </Badge>
            
          </Link>
        ))}
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                    onVisitLine(node: any) {
                      if (node.children.length === 0) {
                        node.children = [{ type: "text", value: " " }];
                      }
                    },
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
