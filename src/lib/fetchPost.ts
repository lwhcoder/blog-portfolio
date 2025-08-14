// src/lib/fetchPost.ts
import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"

export async function fetchPost(slug: string) {
  try {
    // Path to the MDX file in your content/blog folder
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`)
    
    // Read the raw file content
    const source = await fs.readFile(filePath, "utf8")

    // Parse frontmatter (YAML) and markdown content
    const { content, data } = matter(source)

    // Compile only the markdown content into MDXSource
    const mdxSource = await compileMDX({
      source: content,
      options: { parseFrontmatter: false }, // We already extracted frontmatter
    })

    return {
      frontMatter: {
        ...data,
        slug,
        // Add any other frontmatter fields you need
        // e.g., date, title, description, tags, coverImage
        // Ensure these fields match your Post interface
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
        coverImage: data.coverImage || "",
        readingTime: data.readingTime || "fda",
      },
      mdxSource,
    }
  } catch (error) {
    console.error("fetchPost error:", error)
    return {
      frontMatter: null,
      mdxSource: null,
    }
  }
}
