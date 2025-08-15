/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CORS for API routes
  async headers() {
    return [
      {
        source: "/api/:path*", // Apply to all API routes
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allow all origins (adjust in production)
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },

  // Proxy API requests (if using an external temp-email service)
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Rewrites /api/* to your backend
        destination: `https://api.mail.tm/:path*`, // Example: Mail.tm API
      },
    ];
  },

  // Environment variables (optional, but recommended)
  env: {
    MAIL_API_KEY: process.env.MAIL_API_KEY, // Pass env vars to the frontend
  },

  // Other optimizations
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;