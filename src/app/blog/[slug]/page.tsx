"use client"


// src/app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Mock data - replace with your actual data fetching
const blogPosts = [
  {
    _id: "1",
    title: "How Temp Mail Protects Your Privacy Online",
    excerpt: "Learn how temporary email services shield your personal information from data collectors and spam.",
    slug: "how-temp-mail-protects-privacy",
    _createdAt: "2023-10-15",
    authorName: "Jane Smith",
    categories: ["Privacy", "Security"],
    mainImage: {
      asset: {
        _ref: "image-1"
      },
      alt: "Privacy protection illustration"
    },
    readTime: "5 min read"
  },
  {
    _id: "2",
    title: "10 Benefits of Using Disposable Email Addresses",
    excerpt: "Discover the advantages of using temporary emails for signing up to online services and newsletters.",
    slug: "benefits-of-disposable-emails",
    _createdAt: "2023-09-22",
    authorName: "John Doe",
    categories: ["Productivity", "Tips"],
    mainImage: {
      asset: {
        _ref: "image-2"
      },
      alt: "Email inbox illustration"
    },
    readTime: "7 min read"
  },
  {
    _id: "3",
    title: "The Rise of Temporary Email Services",
    excerpt: "Exploring how temporary email services became essential tools in the modern digital landscape.",
    slug: "rise-of-temp-email-services",
    _createdAt: "2023-08-05",
    authorName: "Alex Johnson",
    categories: ["Technology", "Trends"],
    mainImage: {
      asset: {
        _ref: "image-3"
      },
      alt: "Growing trend chart"
    },
    readTime: "6 min read"
  },
  {
    _id: "4",
    title: "Avoid Spam with Temporary Email Solutions",
    excerpt: "Keep your primary inbox clean and organized by using disposable email addresses for online sign-ups.",
    slug: "avoid-spam-with-temp-email",
    _createdAt: "2023-07-18",
    authorName: "Sarah Williams",
    categories: ["Productivity", "Security"],
    mainImage: {
      asset: {
        _ref: "image-4"
      },
      alt: "Spam email avoidance"
    },
    readTime: "4 min read"
  },
  {
    _id: "5",
    title: "Advanced Privacy Techniques for Digital Natives",
    excerpt: "Beyond temporary emails: comprehensive strategies to protect your digital identity in 2023.",
    slug: "advanced-privacy-techniques",
    _createdAt: "2023-06-10",
    authorName: "Michael Chen",
    categories: ["Privacy", "Security", "Technology"],
    mainImage: {
      asset: {
        _ref: "image-5"
      },
      alt: "Digital privacy concepts"
    },
    readTime: "9 min read"
  },
  {
    _id: "6",
    title: "The Psychology Behind Email Clutter",
    excerpt: "Understanding how inbox overload affects productivity and mental wellbeing.",
    slug: "psychology-email-clutter",
    _createdAt: "2023-05-22",
    authorName: "Emma Rodriguez",
    categories: ["Productivity", "Psychology"],
    mainImage: {
      asset: {
        _ref: "image-6"
      },
      alt: "Email clutter visualization"
    },
    readTime: "8 min read"
  }
];

// Mock categories - replace with your actual categories
const categories = ["Privacy", "Security", "Productivity", "Tips", "Technology", "Trends", "Psychology"];

// Mock image URL generator - replace with your actual urlFor function
const mockUrlFor = (image: any) => {
  const images = {
    "image-1": "/api/placeholder/400/250?text=Privacy",
    "image-2": "/api/placeholder/400/250?text=Benefits",
    "image-3": "/api/placeholder/400/250?text=Trends",
    "image-4": "/api/placeholder/400/250?text=Spam+Protection",
    "image-5": "/api/placeholder/400/250?text=Advanced+Privacy",
    "image-6": "/api/placeholder/400/250?text=Psychology"
  };
  return images['image-1'] || "/api/placeholder/400/250";
};

export default function BlogArchivePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  // Filter posts by category if one is selected
  const filteredPosts = activeCategory 
    ? blogPosts.filter(post => post.categories.includes(activeCategory))
    : blogPosts;

  // Sort posts based on selection
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime();
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Header */}
    
      {/* Premium Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform -skew-y-3 origin-top-left"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            TempMail <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Expert perspectives on email privacy, security innovations, and digital wellness strategies.
          </p>
          <div className="bg-white rounded-xl p-2 shadow-lg inline-flex">
            <input
              type="text"
              placeholder="Search insights..."
              className="px-6 py-3 w-80 border-none focus:ring-0 focus:outline-none rounded-l-lg"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Search
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Premium Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-3">Explore Topics</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${!activeCategory ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${activeCategory === category ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-3">Featured Insights</h2>
                <div className="space-y-5">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="block group p-3 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span>
                          {new Date(post._createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-10 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3">Weekly Digest</h3>
                <p className="text-sm text-gray-600 mb-4">Get the latest privacy insights delivered to your inbox.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Premium Main Content */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Latest Insights</h2>
                <p className="text-gray-600 mt-2">Expert articles on digital privacy and productivity</p>
              </div>
              <div className="flex items-center space-x-2 bg-white pl-4 pr-2 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-gray-600 text-sm">Sort by:</span>
                <select 
                  className="border-none text-sm focus:ring-0 focus:outline-none bg-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Premium Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sortedPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={mockUrlFor(post.mainImage)}
                        alt={post.mainImage?.alt || "Blog post image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1 bg-white text-gray-800 text-xs font-medium rounded-full shadow-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.authorName}</span>
                        <div className="flex items-center space-x-4">
                          <span>
                            {new Date(post._createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Premium Pagination */}
            <div className="flex justify-center mt-16">
              <nav className="flex items-center space-x-2 bg-white rounded-xl shadow-sm p-2">
                <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">1</button>
                <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">2</button>
                <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">3</button>
                <span className="px-2 text-gray-400">...</span>
                <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">8</button>
                <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center">
                  Next
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Premium Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-16">
            <h2 className="text-3xl font-bold mb-4">Join Our Community of Privacy Advocates</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Get exclusive content, early access to new features, and expert tips on protecting your digital life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-white outline-none bg-white/10 placeholder:text-white/70 text-white"
              />
              <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-100 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>


    </div>
  );
}

