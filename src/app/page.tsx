"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const features = [
    {
      icon: "⚡",
      title: "Fast",
      description: "Minimal dependencies, maximum performance. No bloat, just content.",
      color: "text-orange-400"
    },
    {
      icon: "🍥",
      title: "Minimalistic",
      description: "Pure black/white design with terminal fonts. Focus on what matters.",
      color: "text-pink-300"
    },
    {
      icon: "📄",
      title: "MDX",
      description: "Write content with React components. Interactive and flexible.",
      color: "text-pink-200"
    }
  ];

  return (
    <>
      <Head>
        <title>Lwh&apos;s | Home</title>
        <meta name="description" content="Welcome to Lwh's personal website." />
      </Head>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen font-mono flex flex-col items-center justify-center px-6 py-16 space-y-12"
      >
        {/* Terminal icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-[#0f0] p-4 rounded-md shadow-md animate-pulse"
        >
          <span className="text-black text-4xl font-bold">{">_"}</span>
        </motion.div>

        {/* Heading & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold">
            <span className="text-green-500">{">"}</span> Lwh&rsquo;s website
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Welcome to my fullstack personal website. <br />
            I am a developer who loves developing fullstack <br /> web apps, making api&apos;s and connecting them.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <Link href="/blog" className="border px-6 py-3 rounded-md font-semibold hover:bg-muted transition">
            Read Blog →
          </Link>
          <Link href="/projects" className="border px-6 py-3 rounded-md font-semibold hover:bg-muted transition">
            View Projects
          </Link>
        </motion.div>

        {/* Features - now with proper animations */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-12 max-w-4xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className={`${feature.color} text-xl`}>{feature.icon} {feature.title}</div>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </>
  );
}