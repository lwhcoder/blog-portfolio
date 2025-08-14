import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { NextResponse } from "next/server"
import { BlogPost } from "@/types/blogpost"

export async function GET() {
  const postsDirectory = path.join(process.cwd(), "src/app/blog-posts/")
  const filenames = fs.readdirSync(postsDirectory)

  const posts: BlogPost[] = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContent = fs.readFileSync(filePath, "utf-8")

        const { data } = matter(fileContent)

        const post: BlogPost = {
          slug: data.slug,
          title: data.title,
          coverImageSrc: data.coverImageSrc,
          tags: data.tags || [],
          description: data.description,
          date: data.date,
        }

        return post
      })
  )

  return NextResponse.json(posts, {
    status: 200,
    headers: { "Cache-Control": "public, max-age=3600" },
  })
}
