"use client";

import Head from "next/head";
import { motion } from "framer-motion";

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString();

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By using TempMailr, you agree to comply with these Terms of Service. If you do not agree, please do not use our services."
    },
    {
      title: "Use of Service",
      content: "TempMailr provides temporary email services for personal, non-commercial use. Do not use the service for illegal activities, spamming, or for critical accounts that require permanent email access."
    },
    {
      title: "Account and Data",
      content: "No registration is required. Temporary emails are automatically deleted. We do not store your emails permanently. You are responsible for the content you send and receive."
    },
    {
      title: "Modifications to Service",
      content: "We may update, suspend, or discontinue TempMailr at any time without prior notice. Continued use of the service constitutes acceptance of any changes."
    },
    {
      title: "Third-Party Services",
      content: "TempMailr may integrate with third-party services like Google Analytics and AdSense. Their usage is governed by their own privacy policies."
    },
    {
      title: "Limitation of Liability",
      content: "TempMailr is provided 'as is' without warranties. We are not liable for any damages resulting from the use or inability to use our service."
    },
    {
      title: "Governing Law",
      content: "These Terms are governed by the laws of India. Any disputes will be resolved under applicable Indian law."
    },
  ];

  return (
    <>
      <Head>
        <title>Terms of Service – TempMailr | Premium Disposable Email</title>
        <meta name="description" content="Read TempMailr's Terms of Service. Secure, temporary emails with no signup required. Know your rights and responsibilities." />
        <meta name="keywords" content="TempMailr, terms of service, disposable email, temporary email, privacy" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-16 font-openSans">
        {/* Hero */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-4 font-poppins">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            TempMailr provides secure, temporary emails with no signup required. Please read these terms carefully before using our services.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {sections.map((section, idx) => (
            <motion.article
              key={idx}
              className="p-6 rounded-2xl bg-white/10 dark:bg-gray-800 shadow-lg backdrop-blur-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2 font-poppins">
                {section.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {section.content}
              </p>
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
