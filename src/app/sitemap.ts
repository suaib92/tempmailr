import type { MetadataRoute } from "next";

// Your site URL
const SITE_URL = "https://tempmailr.com";

// Example blog posts data
async function getBlogPosts() {
  return [
    { slug: "how-to-use-temporary-email", updatedAt: "2025-08-10" },
    { slug: "benefits-of-disposable-email", updatedAt: "2025-08-05" },
    { slug: "protect-your-privacy-online", updatedAt: "2025-08-01" },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastMod = new Date();
  const blogPosts = await getBlogPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: lastMod, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/privacy`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookie`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.3 }, // Added Cookie Policy
    { url: `${SITE_URL}/contact`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/blog`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.7 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
