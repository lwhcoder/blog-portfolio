"use client"

import Link from "next/link"
import { useState } from "react"
import { toast, Toaster } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Youtube, LucideDisc } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Thanks for subscribing!")
    setEmail("")
  }

  return (
    <footer
      className="max-w-screen-xl border-t px-4 pt-12 pb-8 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8"
      id="footer"
    >
      {/* Ensure the toast notification is mounted */}
      <Toaster position="bottom-right" />

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-4 w-full">
        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase font">Pages</h3>
          <nav className="mt-4 space-y-2">
            <Link className="block hover:underline" href="/">Home</Link>
            <Link className="block hover:underline" href="/about">About</Link>
            <Link className="block hover:underline" href="/contact">Contact</Link>
            <Link className="block hover:underline" href="/portfolio">Portfolio</Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase">Dev Stuff</h3>
          <nav className="mt-4 space-y-2">
            <Link className="block hover:underline" href="https://guns.lol/lwh">Bio</Link>
            <Link className="block hover:underline" href="/tools">Tools</Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase">Legal</h3>
          <nav className="mt-4 space-y-2">
            <Link className="block hover:underline" href="/tos">Terms of service</Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase">Newsletter</h3>
          <form className="mt-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="rounded-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="hover:bg-[#0f0] w-full mt-4 rounded-none hover:cursor-pointer">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-6">
        <a
          href="https://github.com/lwh-coder"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5 hover:text-primary transition-colors" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCJnZ1219D_VSZp1k-Vh7a4A"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5 hover:text-primary transition-colors" />
        </a>
        <a
          href="https://discord.com/users/104954177547553281"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
        >
          <LucideDisc className="w-5 h-5 hover:text-primary transition-colors" />
        </a>
      </div>

      <p className="mt-8 text-base leading-6 text-center text-muted-foreground">
        © {new Date().getFullYear()} Lwh. All rights reserved.
      </p>
    </footer>
  )
}
