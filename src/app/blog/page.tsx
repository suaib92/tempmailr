"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "What is Temp Mail and How to Use It Safely",
    description: "Learn how to protect your privacy with temporary emails and avoid spam.",
    image: "/blog/temp-mail.jpg",
    url: "/blog/what-is-temp-mail",
  },
  {
    id: 2,
    title: "Top Privacy Tips for 2025",
    description: "Essential tips to keep your online presence safe and private.",
    image: "/blog/privacy-tips.jpg",
    url: "/blog/privacy-tips-2025",
  },
  {
    id: 3,
    title: "How Temporary Emails Can Boost Security",
    description: "Discover the advantages of using disposable emails for online accounts.",
    image: "/blog/temp-email-security.jpg",
    url: "/blog/temp-email-security",
  },
];

const popularPosts = [
  "What is Temp Mail and How to Use It Safely",
  "Top Privacy Tips for 2025",
  "How Temporary Emails Can Boost Security",
];

export default function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 font-openSans">
      {/* Hero */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-4 font-poppins">
          Blog
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
          Learn more about temporary email, privacy tips, and online security.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Blog Cards */}
        <div className="lg:col-span-2 space-y-6">
          {blogPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              className="flex flex-col sm:flex-row items-start bg-white/10 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="relative w-full sm:w-48 h-36 sm:h-full flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2 font-poppins">
                  {post.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  {post.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Right Column: Most Viewed */}
        <aside className="lg:col-span-1 bg-white/10 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 font-poppins">
            Most Viewed
          </h3>
          <ul className="space-y-3">
            {popularPosts.map((title, idx) => (
              <li key={idx}>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
