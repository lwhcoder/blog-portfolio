"use client"; // Add this since we're using animations
import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Lwh&apos;s | Contact</title>
                <meta name="description" content="Get in touch with Lwh." />
            </Head>
            
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.5
                }}
                className="min-h-screen"
            >
                <ContactForm />
            </motion.div>
        </>
    );
}

// Remove the static metadata export since we're using client-side Head