"use client";
import { motion, stagger, useAnimate } from "framer-motion";
import { PortfolioCard } from "@/components/portfolio-card";
import { useEffect } from "react";
import Head from "next/head";

export default function PortfolioPage() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".portfolio-card",
      { opacity: 1, y: 0 },
      { delay: stagger(0.1), duration: 0.5 }
    );
  }, [animate]);

  return (
    <>
      <Head>
        <title>Lwh&apos;s | Portfolio</title>
        <meta name="description" content="Explore projects crafted by Lwh using Next.js, Tailwind, and more." />
      </Head>

      <motion.main
        ref={scope}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen px-6 py-10 sm:py-20 jetbrains-mono"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Page Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              My Projects
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              A curated selection of projects I've built using modern web technologies.
            </p>
          </motion.div>
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                className="portfolio-card"
                initial={{ opacity: 0, y: 20 }}
              >
                <PortfolioCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
    </>
  );
}

const portfolioItems = [
  {
    title: "Developer Portfolio",
    description: "A fully responsive portfolio site with dark mode and theme toggles.",
    date: "2025",
    tech: ["Next.js", "Tailwind", "shadcn/ui"],
    liveLink: "https://example.com",
    githubLink: "https://github.com/username/portfolio",
    imageSrc: "https://placehold.co/640x360.png?text=Portfolio",
    imageAlt: "Portfolio Screenshot"
  },
  // ... rest of your portfolio items
];