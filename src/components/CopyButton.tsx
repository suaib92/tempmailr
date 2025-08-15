"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function MyCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`${poppins.className} relative inline-block`}>
      <motion.button
        onClick={handleCopy}
        className={`ml-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
          ${
            copied
              ? "bg-green-500 text-white"
              : "bg-gray-800 text-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-[0_0_10px_rgba(96,165,250,0.8)]"
          }
        `}
        aria-label="Copy email address"
        aria-live="polite"
        whileTap={{ scale: 0.92 }}
      >
        {copied ? "Copied!" : "Copy"}
      </motion.button>

      {/* Tooltip animation */}
      <AnimatePresence>
        {copied && (
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 -top-8 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.25 }}
          >
            Email copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
