"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiRefreshCw,
  FiMail,
  FiInbox,
  FiClock,
  FiShield,
  FiSmartphone,
  FiPaperclip,
  FiGlobe,
  FiMoon,
  FiCode,

} from "react-icons/fi";
import MyCopyButton from "../components/CopyButton";
// -----------------------------
// Types
type Msg = {
  id: string;
  from: { address: string; name?: string };
  subject: string;
  intro?: string;
  seen?: boolean;
  createdAt?: string;
  html?: string[];
  text?: string;
};

// -----------------------------
// UI helpers
function srOnly(label: string) {
  return (
    <span className="sr-only" aria-hidden>
      {label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 rounded-xl p-5">
      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="mt-3 h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="mt-2 h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}

// -----------------------------
// Page
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [selected, setSelected] = useState<Msg | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/generate", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Generate failed ${res.status}`);
      }
      const data = await res.json();
      setEmail(data.address);
      setToken(data.token);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

const fetchMessages = useCallback(async () => {
  if (!token) return;
  try {
    setFetching(true);
    const res = await fetch(
      `/api/messages?token=${encodeURIComponent(token)}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Fetch messages failed:", err);
      return;
    }
    const data = await res.json();
    setMessages(data["hydra:member"] || []);
  } catch (e) {
    console.error(e);
  } finally {
    setFetching(false);
  }
}, [token]);

  const openMessage = async (id: string) => {
    try {
      const res = await fetch(
        `/api/message?token=${encodeURIComponent(
          token
        )}&id=${encodeURIComponent(id)}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Fetch message failed:", err);
        return;
      }
      const data = (await res.json()) as Msg;
      setSelected(data);

      // Mark as read
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, seen: true } : m))
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchMessages();
    const t = setInterval(fetchMessages, 10000);
    return () => clearInterval(t);
  }, [token,fetchMessages]);

  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta;
    });
  }, [messages]);

  return (
    <main className="font-poppins text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* JSON-LD for FAQPage */}
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is TempMailr?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "TempMailr is a free disposable email service that lets you create instant inboxes for signups and verification without exposing your personal email address.",
              },
            },
            {
              "@type": "Question",
              name: "Is it safe?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, your temporary email is isolated and automatically expires after 24 hours. Do not use it for sensitive accounts or password recovery.",
              },
            },
            {
              "@type": "Question",
              name: "How long do emails stay?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Emails are automatically deleted after 24 hours.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need to register?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No registration is required. Just click 'Generate' and start using your email immediately.",
              },
            },
          ],
        })}
      </Script>

      {/* PREMIUM HEADER / HERO */}
      <header className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 py-20 sm:py-28 px-6 text-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-20 right-32 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
          <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-25 animate-float-delay-2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium badge */}
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 text-sm font-bold mb-6 shadow-lg">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clipRule="evenodd"
                />
              </svg>
              PREMIUM TEMPORARY EMAIL SERVICE
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-7xl font-extrabold text-white drop-shadow-2xl mb-4"
            >
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-transparent bg-clip-text">
                TempMailr
              </span>{" "}
              Pro
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Secure, private disposable emails with{" "}
              <span className="text-yellow-300">extended lifetime</span>,{" "}
              <span className="text-purple-300">custom domains</span>, and{" "}
              <span className="text-blue-300">enterprise-grade encryption</span>
              .
            </motion.p>

            {!email && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateEmail}
                  disabled={loading}
                  aria-label="Generate a temporary email address"
                  className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-5 rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 font-bold text-lg"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      "Generate Secure Email"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
                </motion.button>
              </motion.div>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                role="alert"
                className="mt-6 px-4 py-3 bg-red-500/20 text-red-100 rounded-lg inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {error}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Floating email illustration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#6366F1"
              d="M45.7,-65.1C59.1,-58.7,70.1,-46.9,75.2,-32.4C80.3,-17.9,79.5,-0.7,74.9,14.4C70.3,29.5,61.9,42.5,50.2,53.1C38.5,63.7,23.5,71.9,6.3,74.4C-10.9,76.9,-30.3,73.8,-45.8,64.6C-61.3,55.4,-72.9,40.2,-77.1,23.1C-81.3,6,-78.1,-13,-68.4,-28.4C-58.8,-43.8,-42.7,-55.6,-27.1,-60.9C-11.5,-66.2,3.6,-65,18.3,-59.9C33,-54.8,47.3,-45.8,45.7,-65.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Feature trio when no email yet */}
        {!email ? (
        
<section aria-labelledby="features" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-full mb-4 shadow-md">
        WHY CHOOSE US
      </span>
      <h2 id="features" className="text-3xl sm:text-4xl font-bold mb-4">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Powerful Features
        </span> For Your Privacy
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Everything you need for secure, temporary communications
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Instant Setup",
          desc: "Generate disposable emails instantly with one click, no registration required.",
          icon: <FiMail className="w-8 h-8 text-blue-500" />,
          highlight: "0-second setup"
        },
        {
          title: "Complete Privacy",
          desc: "Protect your personal email from spam and tracking with our secure temporary addresses.",
          icon: <FiShield className="w-8 h-8 text-purple-500" />,
          highlight: "No personal data"
        },
        {
          title: "Real-Time Updates",
          desc: "Automatic inbox refresh every 10 seconds so you never miss important messages.",
          icon: <FiRefreshCw className="w-8 h-8 text-green-500" />,
          highlight: "10-second refresh"
        },
        {
          title: "Multi-Device Sync",
          desc: "Access your temporary inbox from any device with full synchronization.",
          icon: <FiSmartphone className="w-8 h-8 text-yellow-500" />,
          highlight: "Cross-platform"
        },
        {
          title: "Secure Attachments",
          desc: "View and download attachments safely with virus scanning protection.",
          icon: <FiPaperclip className="w-8 h-8 text-red-500" />,
          highlight: "5MB limit"
        },
        {
          title: "Multiple Domains",
          desc: "Choose from various domain options for different use cases.",
          icon: <FiGlobe className="w-8 h-8 text-indigo-500" />,
          highlight: "10+ domains"
        },
        {
          title: "Dark Mode",
          desc: "Eye-friendly interface with automatic dark mode support.",
          icon: <FiMoon className="w-8 h-8 text-gray-500" />,
          highlight: "Low-light optimized"
        },
        {
          title: "API Access",
          desc: "Developer-friendly API for programmatic email generation (Pro feature).",
          icon: <FiCode className="w-8 h-8 text-pink-500" />,
          highlight: "Developer tools"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {feature.desc}
            </p>
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
              {feature.highlight}
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-16 text-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all"
      >
        Explore All Features
      </motion.button>
    </div>
  </div>
</section>
        ) : (
          <>
            {/* Email bar */}
            <section
              aria-label="Your temporary email and controls"
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center min-w-0">
                    <FiMail className="flex-shrink-0 mr-2 text-blue-600 dark:text-blue-400" />
                    <strong
                      className="text-blue-700 dark:text-blue-300 truncate text-lg"
                      title={email} // Add tooltip with full email
                    >
                      {email}
                    </strong>
                  </div>
                  <div className="flex-shrink-0">
                    <MyCopyButton text={email} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <FiClock className="inline mr-1" />
                  Emails automatically delete after 24 hours
                </p>
              </div>
              <button
                onClick={fetchMessages}
                disabled={fetching}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-5 py-2 rounded-full shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 flex items-center"
              >
                <FiRefreshCw
                  className={`mr-2 ${fetching ? "animate-spin" : ""}`}
                />
                {fetching ? "Refreshing..." : "Refresh"}
              </button>
            </section>

            {/* Inbox */}
            <section className="mt-6" aria-labelledby="inbox-heading">
              <h2 id="inbox-heading" className="sr-only">
                Inbox
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fetching && !sortedMessages.length && (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                )}

                {sortedMessages.map((m) => (
                  <motion.button
                    key={m.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openMessage(m.id)}
                    className={`border rounded-xl p-5 shadow-sm hover:shadow-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-all ${
                      m.seen
                        ? "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
                        : "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20"
                    }`}
                    aria-label={`Open message ${
                      m.subject || "(no subject)"
                    } from ${m.from?.address || "Unknown sender"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`font-semibold truncate ${
                          m.seen
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {m.from?.name || m.from?.address || "Unknown sender"}
                      </div>
                      {!m.seen && (
                        <span className="shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-600 text-white">
                          NEW
                        </span>
                      )}
                    </div>
                    <div
                      className={`mt-1 text-sm truncate ${
                        m.seen
                          ? "text-gray-700 dark:text-gray-300"
                          : "font-medium"
                      }`}
                    >
                      {m.subject || "(no subject)"}
                    </div>
                    {m.intro && (
                      <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">
                        {m.intro}
                      </div>
                    )}
                    <div className="mt-2 flex justify-between items-center">
                      <time
                        dateTime={m.createdAt}
                        className="block text-xs text-gray-400"
                        suppressHydrationWarning
                      >
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleString()
                          : ""}
                      </time>
                    </div>
                  </motion.button>
                ))}

                {!fetching && sortedMessages.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <FiInbox className="mx-auto text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Your inbox is empty. Emails will appear here automatically
                      when received.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                  aria-modal="true"
                  role="dialog"
                  aria-labelledby="message-title"
                >
                  <motion.div
                    initial={{ scale: 0.96 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.96 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full p-6 shadow-xl overflow-y-auto max-h-[90vh] flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3
                        id="message-title"
                        className="font-bold text-xl text-blue-700 dark:text-blue-300"
                      >
                        {selected.subject || "(no subject)"}
                      </h3>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-full p-1"
                        aria-label="Close message"
                      >
                        <FiX size={20} />
                        {srOnly("Close")}
                      </button>
                    </div>

                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      <span className="font-medium">From:</span>{" "}
                      {selected.from?.name
                        ? `${selected.from.name} <${selected.from.address}>`
                        : selected.from?.address}
                    </div>

                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      <span className="font-medium">Date:</span>{" "}
                      {selected.createdAt
                        ? new Date(selected.createdAt).toLocaleString()
                        : "Unknown"}
                    </div>

                    <div className="flex-1 overflow-auto border-t border-gray-200 dark:border-gray-700 pt-4">
                      {selected.html?.length ? (
                        <div
                          className="prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: selected.html.join(""),
                          }}
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap text-sm">
                          {selected.text || selected.intro}
                        </pre>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        This email will be automatically deleted after 24 hours.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* PREMIUM FAQ SECTION */}
        <section className="mt-28 mb-20" aria-labelledby="faq-heading">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 text-sm font-bold rounded-full mb-4 shadow-md">
                NEED HELP?
              </span>
              <h2
                id="faq-heading"
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text"
              >
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to know about our secure temporary email
                service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "What is TempMailr Pro?",
                  a: "TempMailr Pro is a premium disposable email service offering extended email lifetime, custom domains, and enhanced security features for professionals and businesses.",
                  icon: "💎",
                },
                {
                  q: "How secure is my temporary email?",
                  a: "We use enterprise-grade encryption, isolated storage, and automatic expiration to ensure your temporary communications remain completely private and secure.",
                  icon: "🔒",
                },
                {
                  q: "Can I use my own domain?",
                  a: "Yes! Pro users can connect custom domains for a branded temporary email experience. Perfect for businesses and agencies.",
                  icon: "🌐",
                },
                {
                  q: "How long do emails stay in my inbox?",
                  a: "Standard emails expire after 24 hours. Pro users enjoy extended retention up to 30 days for all messages.",
                  icon: "⏳",
                },
                {
                  q: "What attachment limits apply?",
                  a: "Free accounts support attachments up to 5MB. Pro plans offer 10MB-25MB limits depending on your subscription tier.",
                  icon: "📎",
                },
                {
                  q: "Is there an API available?",
                  a: "Yes, our developer API is available to Pro users, enabling programmatic email generation and management for your applications.",
                  icon: "⚙️",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full p-6 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-400/30 dark:hover:border-blue-400/50">
                    <div className="flex items-start">
                      <span className="text-2xl mr-4 mt-1">{item.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.q}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          /
          </div>
        </section>
      </div>
    </main>
  );
}
