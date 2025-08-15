"use client";
import { motion } from "framer-motion";
import Head from "next/head";
import CountUp from "react-countup";
import { FiShield, FiMail, FiGlobe, FiUser, FiLock, FiZap, FiHeart } from "react-icons/fi";

export default function AboutPage() {
  const team = [
    { 
      name: "Mohd Suaib Warsi", 
      role: "Founder & Full Stack Developer",
      bio: "With over a decade in cybersecurity and privacy-focused development, Mohd founded TempMailr to create a truly anonymous email solution that respects user privacy above all else.",
      expertise: ["Cybersecurity", "Privacy Law", "Cloud Infrastructure"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
  ];

  const advisors = [
    {
      name: "Dr. Emily Zhang",
      role: "Privacy Law Expert",
      bio: "Specializing in international digital privacy regulations and compliance frameworks.",
      avatar: "👩‍⚖️"
    },
    {
      name: "James Peterson",
      role: "Infrastructure Architect",
      bio: "Former cloud security lead at major tech companies with expertise in scalable systems.",
      avatar: "👨‍💻"
    }
  ];

  const stats = [
    { label: "Active Users", value: 50000, icon: <FiUser className="w-8 h-8" /> },
    { label: "Emails Processed Daily", value: 200000, icon: <FiMail className="w-8 h-8" /> },
    { label: "Countries Served", value: 120, icon: <FiGlobe className="w-8 h-8" /> },
    { label: "Security Certifications", value: 4, icon: <FiShield className="w-8 h-8" /> },
  ];

  const features = [
    {
      title: "Military-Grade Encryption",
      description: "All emails are encrypted with AES-256 encryption both in transit and at rest.",
      icon: <FiLock className="w-6 h-6" />
    },
    {
      title: "Instant Deployment",
      description: "Generate new email addresses in milliseconds with our global infrastructure.",
      icon: <FiZap className="w-6 h-6" />
    },
    {
      title: "Zero Data Retention",
      description: "Emails are permanently deleted after expiration with no backups or logs.",
      icon: <FiShield className="w-6 h-6" />
    }
  ];

  const timeline = [
    {
      year: "2021",
      event: "Concept Born",
      detail: "Initial research into privacy gaps in temporary email services"
    },
    {
      year: "2022 Q1",
      event: "Alpha Launch",
      detail: "Private beta with 100 security researchers"
    },
    {
      year: "2022 Q4",
      event: "Public Beta",
      detail: "Opened to first 10,000 users"
    },
    {
      year: "2023",
      event: "Official Launch",
      detail: "Full public release with premium features"
    },
    {
      year: "2024",
      event: "Global Expansion",
      detail: "Added 12 new regional server locations"
    }
  ];

  return (
    <>
      <Head>
        <title>About TempMailr | Secure Disposable Email Service</title>
        <meta name="description" content="TempMailr provides enterprise-grade temporary email solutions with military encryption. Learn about our mission to protect digital privacy worldwide." />
        <meta name="keywords" content="secure email, disposable email, privacy protection, encrypted email, temporary inbox, anonymous email" />
        <meta property="og:title" content="About TempMailr | Premium Temporary Email Service" />
        <meta property="og:description" content="Discover our mission to protect digital privacy with military-grade encrypted temporary email solutions." />
        <meta property="og:image" content="https://tempmailr.com/og-about.jpg" />
        <meta property="og:url" content="https://tempmailr.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://tempmailr.com/about" />
      </Head>

      <main className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          <div className="max-w-7xl mx-auto px-6 py-32 md:py-40 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                <FiHeart className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-blue-600 dark:text-blue-400 font-medium">Privacy First</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6">
                Redefining Email Privacy
              </h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                TempMailr provides military-grade secure temporary email solutions trusted by privacy-conscious individuals and enterprises worldwide.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl"></div>
              <div className="flex items-start mb-8">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-xl mr-6">
                  <FiZap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    To create an internet where privacy is accessible to everyone, not just those who can afford it. We&apos;re building tools that make anonymous communication simple and secure.
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">Democratize access to secure communication</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">Set new standards for email privacy</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">Educate users about digital rights</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>
              <div className="flex items-start mb-8">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-xl mr-6">
                  <FiGlobe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    A future where temporary email protection is as commonplace as password managers, making the internet safer for everyone without compromising convenience.
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">Become the global standard for email privacy</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">Expand to 200+ countries by 2025</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">Develop next-gen privacy technologies</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-white/5"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Trusted Worldwide</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Join thousands of privacy-conscious users and businesses who rely on TempMailr daily
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-blue-100 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    <CountUp 
                      end={stat.value} 
                      duration={3} 
                      separator="," 
                    />
                    {stat.label.includes("Users") || stat.label.includes("Emails") ? "+" : ""}
                  </div>
                  <p className="text-lg text-blue-100 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Enterprise-Grade Technology
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Built with the same security standards used by governments and Fortune 500 companies
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-blue-100 dark:bg-blue-900/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-0.5">
            <div className="bg-white dark:bg-gray-900 rounded-[calc(1.5rem-1px)] p-10">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Military-Grade Security</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    TempMailr employs AES-256 encryption, the same standard used by governments and militaries worldwide, to ensure your communications remain confidential.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <p className="ml-3 text-gray-600 dark:text-gray-300">End-to-end encrypted email storage</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <p className="ml-3 text-gray-600 dark:text-gray-300">Zero-knowledge architecture</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <p className="ml-3 text-gray-600 dark:text-gray-300">Regular third-party security audits</p>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-full">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-full">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Security Certifications</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">ISO 27001</span>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">SOC 2</span>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">GDPR</span>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">HIPAA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Leadership
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              A team of privacy experts and technology veterans committed to your digital security
            </motion.p>
          </div>

          <div className="flex justify-center mb-20">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 max-w-2xl w-full relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-6xl font-bold text-white">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6">{member.role}</p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{member.bio}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp, i) => (
                          <span key={i} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <a href={member.social.twitter} className="text-gray-500 hover:text-blue-500 transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href={member.social.linkedin} className="text-gray-500 hover:text-blue-700 transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a href={member.social.github} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <span className="sr-only">GitHub</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Advisory Board</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Industry experts guiding our strategic direction
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="text-4xl mr-6">{advisor.avatar}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{advisor.name}</h4>
                    <p className="text-blue-600 dark:text-blue-400 mb-3">{advisor.role}</p>
                    <p className="text-gray-600 dark:text-gray-300">{advisor.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
          <div className="text-center mb-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Journey
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              From concept to industry leader in secure temporary email solutions
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? 'pr-8 md:pr-0 md:pl-8 text-left md:text-right' : 'pl-8 text-left'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} items-center mb-2`}>
                  <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-800 transform -translate-x-1/2 left-1/2 md:left-auto md:right-0 md:translate-x-1/2"></div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.year}</h3>
                </div>
                <div className={`bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">{item.event}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience Premium Privacy?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust TempMailr for their secure communication needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn About Premium
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}