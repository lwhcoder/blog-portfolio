"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lwh&apos;s | About</title>
        <meta name="description" content="Learn more about Lwh and their journey as a developer." />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-[calc(100vh-4rem)] px-0 flex flex-col md:flex-row"
      >
        {/* Image Section - full left half on desktop, top on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full md:w-1/2 h-64 md:h-auto"
        >
          <div className="w-full h-full relative">
            <Image
              src="https://placehold.co/800x1000.png"
              alt="About me"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Text Content - right half on desktop, bottom on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-background"
        >
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-muted-foreground font-mono">lwh.</div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Hi, I&apos;m <span className="text-green-500">Ahmed Nafie</span>
            </h1>
            <h2 className="text-lg uppercase tracking-widest text-muted-foreground">
              CREATIVE FULLSTACK WEB DEVELOPER
            </h2>
            <p className="text-base leading-relaxed">
              Hello! I'm Ahmed, a creative and detail-oriented full-stack
              developer who thrives on building elegant solutions to complex
              problems. I love working with modern technologies and creating
              memorable user experiences.
            </p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <Link
                href="/blog"
                className="group border border-muted px-6 py-3 rounded-md font-semibold transition-all duration-300 bg-background hover:bg-green-400 flex items-center justify-center"
              >
                Read Blog
                <span className="transition-transform ml-1 duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/Contact"
                className="group border border-muted px-6 py-3 rounded-md font-semibold transition-all duration-300 bg-background hover:bg-green-400 flex items-center justify-center"
              >
                Contact Me
                <span className="transition-transform ml-1 duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}