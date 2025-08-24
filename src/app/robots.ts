import type { MetadataRoute } from "next";

const SITE_URL = "https://temp-mailr.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // Allow all main pages
        disallow: [
          "/admin",   // Block admin/private pages
          "/api",     // Block API routes
          "/_next",   // Block Next.js internal build files
          "/temp",    // Block test/temp folders
        ],
      },
      {
        userAgent: "Googlebot-Image", // Let Google index images
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
