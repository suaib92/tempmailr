"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { FaLock, FaCookieBite, FaUserShield, FaUsers, FaShieldAlt } from "react-icons/fa";

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString();

  const policies = [
    {
      id: "data-collection",
      icon: <FaLock aria-label="Data Collection" className="text-4xl text-white" />,
      title: "Data Collection",
      content: "TempMailr does not require user registration. Generated emails are temporary and may be deleted automatically by Mail.tm. We do not store messages permanently.",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      id: "cookies-analytics",
      icon: <FaCookieBite aria-label="Cookies & Analytics" className="text-4xl text-white" />,
      title: "Cookies & Analytics",
      content: "We use Google AdSense and Google Analytics to serve and measure ads. Users can opt out via Ads Settings. Cookies also help us improve performance.",
      gradient: "from-green-400 to-blue-500",
    },
    {
      id: "user-rights",
      icon: <FaUserShield aria-label="User Rights" className="text-4xl text-white" />,
      title: "User Rights",
      content: "You can use TempMailr anonymously without creating an account. Temporary emails are deleted automatically. Data shared with third-party services is subject to their privacy policies.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      id: "third-party-services",
      icon: <FaUsers aria-label="Third Party Services" className="text-4xl text-white" />,
      title: "Third-Party Services",
      content: "We integrate with trusted third-party services like Google Analytics and AdSense. We never sell your messages or personal information.",
      gradient: "from-pink-400 to-red-500",
    },
    {
      id: "security-measures",
      icon: <FaShieldAlt aria-label="Security Measures" className="text-4xl text-white" />,
      title: "Security Measures",
      content: "All communications via TempMailr and Mail.tm are encrypted. We follow industry best practices to safeguard your temporary emails from unauthorized access.",
      gradient: "from-indigo-400 to-blue-600",
    },
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy – TempMailr | Premium Disposable Email</title>
        <meta name="description" content="Learn how TempMailr protects your privacy. Secure, temporary emails with no signup required. Read our full privacy policy." />
        <meta name="keywords" content="TempMailr, privacy policy, temporary email, secure email, disposable email" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy – TempMailr" />
        <meta property="og:description" content="Secure, temporary emails with no signup required. Read our full privacy policy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-16 font-openSans">
        {/* Hero */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-4 font-poppins">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            TempMailr is committed to keeping your data secure and private. Explore how we handle temporary emails, cookies, and third-party integrations.
          </p>
        </motion.div>

        {/* Policy Cards */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {policies.map((p) => (
            <motion.article
              key={p.id}
              className={`bg-gradient-to-tr ${p.gradient} p-6 rounded-3xl shadow-xl backdrop-blur-xl hover:scale-105 transition-transform duration-300`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-4 w-16 h-16 bg-white/20 rounded-full mx-auto">
                {p.icon}
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 font-poppins">{p.title}</h2>
              <p className="text-white/90 text-sm sm:text-base">{p.content}</p>
            </motion.article>
          ))}
        </motion.section>

        {/* Last Updated */}
        <motion.div
          className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Last updated: {lastUpdated}
        </motion.div>
      </main>
    </>
  );
}
