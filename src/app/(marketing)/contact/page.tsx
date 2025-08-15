"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us – TempMailr</title>
        <meta
          name="description"
          content="Get in touch with TempMailr for inquiries, support, or partnerships. Secure, fast, and disposable email solutions for everyone."
        />
        <meta
          name="keywords"
          content="contact, temp mail, temporary email, support, email service, TempMailr"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 dark:text-blue-300 mb-4 font-poppins mt-10">
            Get in Touch with TempMailr
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-openSans">
            Whether you have questions, need support, or want to partner with us, we’re here to help. Connect with our team and let’s keep your digital life secure.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-tr from-blue-400/40 to-purple-400/30 dark:from-blue-800/40 dark:to-purple-800/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaEnvelope className="text-3xl text-white mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-white dark:text-gray-100 mb-1">Email</h3>
            <p className="text-white/80 dark:text-gray-300 font-openSans">hello@tempmailr.com</p>
          </div>
          <div className="bg-gradient-to-tr from-blue-400/40 to-purple-400/30 dark:from-blue-800/40 dark:to-purple-800/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaPhone className="text-3xl text-white mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-white dark:text-gray-100 mb-1">Phone</h3>
            <p className="text-white/80 dark:text-gray-300 font-openSans">+91 70787 19621</p>
          </div>
          <div className="bg-gradient-to-tr from-blue-400/40 to-purple-400/30 dark:from-blue-800/40 dark:to-purple-800/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaMapMarkerAlt className="text-3xl text-white mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-white dark:text-gray-100 mb-1">Office</h3>
            <p className="text-white/80 dark:text-gray-300 font-openSans">Moradabad, India</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-poppins text-center">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold p-3 rounded-xl transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* FAQ Section */}
        <motion.section
          className="mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-poppins text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 shadow-lg">
              <summary className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">How can I create a temporary email?</summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Simply visit our homepage and generate a disposable inbox in seconds, no signup required.</p>
            </details>
            <details className="bg-white dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 shadow-lg">
              <summary className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">Is my data safe with TempMailr?</summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Absolutely! We prioritize privacy and do not store your emails permanently.</p>
            </details>
          </div>
        </motion.section>

        {/* Map Placeholder */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 text-center font-poppins">Our Location</h2>
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl shadow-lg flex items-center justify-center text-gray-500 dark:text-gray-300 font-openSans">
            Map Placeholder (Embed Google Maps here)
          </div>
        </motion.div>
      </main>
    </>
  );
}
