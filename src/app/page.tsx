"use client";
import { useCallback, useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import AdUnit from "@/components/AdUnit";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";

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

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [selected, setSelected] = useState<Msg | null>(null);
  const [loading, setLoading] = useState(false);

  const generateEmail = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();
      setEmail(data.address);
      setToken(data.token);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = useCallback(async (): Promise<void> => {
    if (!token) return;
    const res = await fetch(`/api/messages?token=${token}`, { cache: "no-store" });
    const data = await res.json();
    setMessages((data && data["hydra:member"]) || []);
  }, [token]);

  const openMessage = async (id: string): Promise<void> => {
    if (!token) return;
    const res = await fetch(`/api/message?token=${token}&id=${id}`, { cache: "no-store" });
    const data: Msg = await res.json();
    setSelected(data);
  };

  useEffect(() => {
    if (!token) return;
    void fetchMessages();
    const t = setInterval(fetchMessages, 10000);
    return () => clearInterval(t);
  }, [token, fetchMessages]);

  return (
    <main className="font-poppins text-gray-900 dark:text-gray-100">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16 sm:py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            TempMailr
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg sm:text-xl text-indigo-100"
          >
            Premium temporary email to protect your privacy, now with a sleek UI.
          </motion.p>

          {!email && (
            <motion.button
              onClick={generateEmail}
              disabled={loading}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Temporary Email"}
            </motion.button>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ADS */}
        <AdUnit slot="YOUR_TOP_AD_SLOT_ID" />

        {!email ? (
          // FEATURES GRID
          <section className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Instant", desc: "Create an inbox in one click." },
              { title: "Private", desc: "Hide your real email address." },
              { title: "Auto-Refresh", desc: "Inbox updates every 10 seconds." },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </section>
        ) : (
          <>
            {/* EMAIL HEADER */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-lg break-all">
                Your Email:{" "}
                <strong className="text-blue-700 dark:text-blue-300">{email}</strong>
                <CopyButton text={email} />
              </p>
              <button
                onClick={() => void fetchMessages()}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition"
              >
                Refresh Now
              </button>
            </div>

            {/* MESSAGES */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {messages.map((m) => (
                <motion.button
                  key={m.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => void openMessage(m.id)}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-lg text-left"
                >
                  <div className="font-semibold">{m.from?.address || "Unknown sender"}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {m.subject || "(no subject)"}
                  </div>
                  {m.intro && (
                    <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">
                      {m.intro}
                    </div>
                  )}
                </motion.button>
              ))}
              {messages.length === 0 && (
                <p className="text-gray-500 italic">Waiting for messages… keep this tab open.</p>
              )}
            </div>

            <AdUnit slot="YOUR_BOTTOM_AD_SLOT_ID" />

            {/* MESSAGE MODAL */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full p-6 shadow-xl overflow-y-auto max-h-full"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">
                        {selected.subject}
                      </h3>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      From: {selected?.from?.address}
                    </div>
                    {selected.html?.length ? (
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: selected.html.join("") }}
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap text-sm">
                        {selected.text || selected.intro}
                      </pre>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is TempMailr?",
                a: "TempMailr is a free disposable email service that lets you create instant inboxes for signups and verification without exposing your personal email address.",
              },
              {
                q: "Is it safe?",
                a: "Yes, your temporary email is isolated and automatically expires. Do not use it for sensitive accounts or password recovery.",
              },
              {
                q: "How long do emails stay?",
                a: "Emails are kept temporarily and are automatically deleted according to the provider's retention policy.",
              },
              {
                q: "Do I need to register?",
                a: "No registration is required. Just click 'Generate' and start using your email immediately.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
              >
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  {item.q}
                  <FiChevronDown />
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
