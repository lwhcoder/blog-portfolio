"use client"; // Add this for client-side animations
import { motion } from "framer-motion";
import BlogPageClient from "./blog-component";
import Head from "next/head";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Lwh&apos;s | Blog</title>
        <meta name="description" content="Read the latest articles and insights from Lwh." />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.7
        }}
        className="min-h-screen"
      >
        <BlogPageClient />
      </motion.div>
    </>
  );
}