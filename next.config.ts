import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

 
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/tools/user',
        destination: '/api/tools/user',
      },
    ]
  },
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    domains: ["placehold.co", "via.placeholder.com"],
    
  },
}
 
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  extension: /\.(md|mdx)$/, 
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)