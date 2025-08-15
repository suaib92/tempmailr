"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

// Initialize premium font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`${poppins.className} bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-lg text-gray-200 shadow-2xl fixed w-full top-0 z-50 border-b border-white/10 transition-all duration-300`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with premium effects */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            aria-label="Home"
          >
            {pathname === "/" ? (
              <motion.h1 
                className="text-3xl font-bold tracking-tight relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">
                  Temp<span className="text-blue-400">Mailr</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.h1>
            ) : (
              <motion.span 
                className="text-3xl font-bold tracking-tight relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">
                  Temp<span className="text-blue-400">Mailr</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.span>
            )}
          </Link>

          {/* Desktop Nav with premium effects */}
          <nav className="hidden md:block" aria-label="Main Navigation">
            <ul className="flex space-x-10">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative group text-lg font-medium transition-all duration-300 ${
                      pathname === href ? "text-blue-400" : "hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{label}</span>
                    {pathname === href ? (
                      <motion.span 
                        className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        layoutId="underline"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    ) : (
                      <span className="absolute left-1/2 -bottom-1 h-[3px] w-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                    )}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Premium Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300 relative overflow-hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <motion.svg
              className="w-8 h-8 text-gray-300 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <motion.path
                  key="close"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.path
                  key="menu"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Premium Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden backdrop-blur-xl bg-gradient-to-b from-gray-900/95 to-gray-800/95 border-t border-gray-700/50 shadow-2xl"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col space-y-6 p-6">
              {navLinks.map(({ href, label }) => (
                <motion.li 
                  key={href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`relative group text-xl font-medium transition-all duration-300 px-4 py-2 rounded-lg ${
                      pathname === href
                        ? "text-blue-400 bg-gray-800/50"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                    }`}
                  >
                    <span className="relative z-10">{label}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}