"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

export default function HomePageClient() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [selected, setSelected] = useState<Msg | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // NEW
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const generateEmail = async (): Promise<void> => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      if (!res.ok) {
        const body = await safeBody(res);
        setErrorMsg(`Generate failed (${res.status}): ${body}`);
        return;
      }
      const data = await res.json();
      setEmail(data.address);
      setToken(data.token);
    } catch (e) {
      console.error(e);
      setErrorMsg("Network error while generating email.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = useCallback(async (): Promise<void> => {
    if (!token) return;
    setErrorMsg(null);
    setRefreshing(true);
    try {
      const res = await fetch(
        `/api/messages?token=${encodeURIComponent(token)}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        const body = await safeBody(res);
        setErrorMsg(`Messages failed (${res.status}): ${body}`);
        setMessages([]); // clear rather than throw
        return;
      }
      const data = await res.json();
      setMessages((data && data["hydra:member"]) || []);
    } catch (e) {
      console.error(e);
      setErrorMsg("Network error while fetching messages.");
      setMessages([]);
    } finally {
      setRefreshing(false);
    }
  }, [token]);

  const openMessage = async (id: string): Promise<void> => {
    if (!token) return;
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/message?token=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        const body = await safeBody(res);
        setErrorMsg(`Open message failed (${res.status}): ${body}`);
        return;
      }
      const data: Msg = await res.json();
      setSelected(data);
      setTimeout(() => modalCloseBtnRef.current?.focus(), 0);
    } catch (e) {
      console.error(e);
      setErrorMsg("Network error while opening the message.");
    }
  };

  useEffect(() => {
    if (!token) return;
    void fetchMessages();
    const t = setInterval(fetchMessages, 10000);
    return () => clearInterval(t);
  }, [token, fetchMessages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main
      className="font-poppins text-gray-900 dark:text-gray-100 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 min-h-screen"
      id="main-content"
    >
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-slate-900/70 border-b border-black/5 dark:border-white/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="/" aria-label="TempMailr Home" className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-amber-400 shadow-md" />
            <span className="text-sm sm:text-base font-semibold tracking-tight">TempMailr</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/about" className="text-sm hover:underline underline-offset-4 decoration-dotted">
              About
            </a>
            <a href="/blog" className="text-sm hover:underline underline-offset-4 decoration-dotted">
              Blog
            </a>
            <a href="/contact" className="text-sm hover:underline underline-offset-4 decoration-dotted">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title" role="region">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.25),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.25),transparent_45%)] pointer-events-none" />
        <div className="relative py-16 sm:py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 drop-shadow-sm"
            >
              Premium temporary email — fast, private, beautiful.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300"
            >
              Create a disposable inbox in one click. Auto-refreshing, no registration, and crafted
              for a delightful experience.
            </motion.p>

            {!email && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <button
                  onClick={generateEmail}
                  disabled={loading}
                  type="button"
                  aria-label="Generate a temporary email address"
                  className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3 sm:px-7 sm:py-3.5 text-white shadow-lg shadow-fuchsia-500/20 ring-1 ring-white/10
                             bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400
                             hover:brightness-105 active:brightness-110 transition
                             disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-400 dark:focus-visible:ring-offset-slate-900"
                >
                  {loading ? "Generating…" : "Generate Temporary Email"}
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No sign-up needed • Free • Privacy first
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Error banner */}
        {errorMsg && (
          <div
            role="alert"
            className="mt-4 rounded-2xl border border-rose-300/70 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200 px-4 py-3"
          >
            {errorMsg}
          </div>
        )}

        {/* Ad - Top */}
        <div className="mt-4">
          <AdUnit slot="YOUR_TOP_AD_SLOT_ID" />
        </div>

        {!email ? (
          // Features
          <section className="mt-12" aria-labelledby="features-heading" role="region">
            <h2 id="features-heading" className="sr-only">
              Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Instant", desc: "Create an inbox in one click." },
                { title: "Private", desc: "Hide your real email address." },
                { title: "Auto-Refresh", desc: "Inbox updates every 10 seconds." },
              ].map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="relative p-6 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-black/5 dark:border-white/5
                             shadow-[0_10px_30px_-10px_rgba(79,70,229,.25)] backdrop-blur"
                >
                  <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* Email Header */}
            <section aria-labelledby="inbox-heading" className="mt-10" role="region">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-slate-900/60 p-5 shadow-sm backdrop-blur">
                <div className="text-base sm:text-lg break-all">
                  <span className="text-slate-600 dark:text-slate-300">Your Email: </span>
                  <strong className="text-indigo-700 dark:text-indigo-300">{email}</strong>
                  <CopyButton text={email} />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => void fetchMessages()}
                    type="button"
                    disabled={refreshing}
                    aria-busy={refreshing}
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:hover:bg-emerald-600/80 disabled:opacity-70 text-white px-4 py-2 transition shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-slate-900"
                  >
                    {refreshing ? "Refreshing…" : "Refresh Now"}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {messages.length > 0 ? (
                  messages.map((m) => (
                    <motion.button
                      key={m.id}
                      whileHover={{ y: -2 }}
                      onClick={() => void openMessage(m.id)}
                      type="button"
                      aria-label={`Open message from ${m.from?.address ?? "Unknown sender"}`}
                      className="group text-left rounded-3xl p-5 bg-white/80 dark:bg-slate-900/60 border border-black/5 dark:border-white/5
                                 shadow-sm hover:shadow-lg transition backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold truncate">
                          {m.from?.name || m.from?.address || "Unknown sender"}
                        </div>
                        <span
                          className={`ml-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide
                                      ${
                                        m.seen
                                          ? "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                          : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                                      }`}
                        >
                          {m.seen ? "Seen" : "New"}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-slate-700 dark:text-slate-300 line-clamp-1">
                        {m.subject || "(no subject)"}
                      </div>
                      {m.intro && (
                        <div className="text-slate-500 dark:text-slate-400 text-sm mt-1 line-clamp-2">
                          {m.intro}
                        </div>
                      )}
                    </motion.button>
                  ))
                ) : (
                  <div className="col-span-full">
                    <div className="rounded-3xl border border-dashed border-slate-300/70 dark:border-slate-700/70 p-8 text-center">
                      <p className="text-slate-500 dark:text-slate-400">
                        {token
                          ? "Waiting for messages… keep this tab open."
                          : "Generate an email to start receiving messages."}
                      </p>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="animate-pulse rounded-2xl h-28 bg-slate-200/70 dark:bg-slate-800/60"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ad - Bottom */}
              <div className="mt-8">
                <AdUnit slot="YOUR_BOTTOM_AD_SLOT_ID" />
              </div>
            </section>

            {/* Message Modal */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={selected.subject || "Message"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                  onMouseDown={() => setSelected(null)}
                >
                  <motion.div
                    initial={{ scale: 0.98, y: 8 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.98, y: 8 }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-black/5 dark:border-white/5"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-xl text-indigo-700 dark:text-indigo-300">
                          {selected.subject || "(no subject)"}
                        </h3>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          From: <span className="font-medium">{selected?.from?.address}</span>
                          {selected.createdAt && (
                            <>
                              {" "}|{" "}
                              <time dateTime={selected.createdAt}>
                                {new Date(selected.createdAt).toLocaleString()}
                              </time>
                            </>
                          )}
                        </div>
                      </div>
                      <button
                        ref={modalCloseBtnRef}
                        onClick={() => setSelected(null)}
                        type="button"
                        aria-label="Close message"
                        className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900"
                      >
                        <FiX size={20} />
                      </button>
                    </div>

                    <div className="mt-5">
                      {selected.html?.length ? (
                        <div
                          className="prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: selected.html.join("") }}
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-200">
                          {selected.text || selected.intro}
                        </pre>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* FAQ */}
        <section className="mt-20" aria-labelledby="faq-heading" role="region">
          <h2
            id="faq-heading"
            className="text-3xl font-bold mb-6 text-indigo-800 dark:text-indigo-300 tracking-tight"
          >
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
                className="group p-5 border border-black/5 dark:border-white/5 rounded-2xl bg-white/70 dark:bg-slate-900/60 shadow-sm backdrop-blur"
              >
                <summary className="font-semibold cursor-pointer flex items-center justify-between list-none">
                  <span>{item.q}</span>
                  <FiChevronDown className="transition group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

/** Helpers */
async function safeBody(res: Response): Promise<string> {
  try {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const j = await res.json();
      return typeof j === "string" ? j : JSON.stringify(j);
    }
    return await res.text();
  } catch {
    return "No response body";
  }
}
