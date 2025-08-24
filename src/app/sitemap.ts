import type { MetadataRoute } from "next";

const SITE_URL = "https://tempmailr.com";

// Temporary mock, replace with DB/CMS fetch
async function getBlogPosts() {
  return [
    { slug: "how-to-use-temporary-email", updatedAt: "2025-08-10" },
    { slug: "benefits-of-disposable-email", updatedAt: "2025-08-05" },
    { slug: "protect-your-privacy-online", updatedAt: "2025-08-01" },
  ];
}

function formatDate(date: string | Date): string {
  return new Date(date).toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogPosts = await getBlogPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: formatDate(now), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/privacy`, lastModified: formatDate(now), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: formatDate(now), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: formatDate(now), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: formatDate(now), changeFrequency: "yearly", priority: 0.5 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: formatDate(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
