"use client"
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { MenuIcon, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog" // Adjust if your dialog path differs
import { DialogTitle } from "@radix-ui/react-dialog"
import { BlogPost } from "@/types/blogpost"
export function Nav(): React.JSX.Element {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  React.useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some((tag: string) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Left side: Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-foreground flex items-center"
        >
          <span className="mr-3 text-green-600">{`>`}</span>
          <span className="text-foreground">lwh.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4 items-center">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="block p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className="block p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/blog"
                    className="block p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/portfolio"
                    className="block p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    Portfolio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className="block p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Button */}
          <button
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-md hover:bg-muted focus:outline-none border border-input bg-background shadow-sm"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />

          {/* Search Button */}
          <button
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-md hover:bg-muted focus:outline-none border border-input bg-background shadow-sm"
          >
            <Search className="h-5 w-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-muted focus:outline-none border border-input bg-background shadow-sm">
                <MenuIcon className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border border-input bg-background shadow-md rounded-md"
            >
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog">Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portfolio">Portfolio</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Dialog */}
        {searchOpen && (
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="sm:max-w-lg w-full p-6 rounded-md bg-background border border-input shadow-lg">
              <div className="flex justify-between items-center ">
                <h2 className="text-lg font-semibold">Search my Blog posts</h2>
              </div>
              <input
                type="search"
                ref={searchInputRef}
                placeholder="Search..."
                className="w-full border border-input rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="mt-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                      <div
                        className="p-4 border-b border-muted last:border-none"
                      >
                        <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {post.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {post.date}
                      </p>
                    </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No posts found.
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}