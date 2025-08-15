import type { MetadataRoute } from "next";

const SITE_URL = "https://temp-mailr.com"; // no trailing slash

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",      // block admin or private areas
          "/api",        // block API routes from indexing
          "/_next",      // prevent indexing Next.js build files
          "/static",     // prevent static build files from being indexed
          "/temp",       // block any test/temp folders
        ],
      },
      {
        userAgent: "Googlebot-Image", // let Google index your images
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
