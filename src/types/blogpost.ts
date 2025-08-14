/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BlogPost {
  slug: string
  title: string
  coverImageSrc: string
  tags: string[]
  description: string
  date: any
  content?: any | null;
}
