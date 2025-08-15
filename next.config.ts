/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-only CORS settings (more secure than '*')
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { 
            key: "Access-Control-Allow-Origin", 
            value: process.env.NODE_ENV === 'development' 
              ? '*' 
              : 'https://www.temp-mailr.com' 
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },

  // Modified rewrites to handle both local and production
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/api/:path*', // Local dev proxy
        },
      ];
    }
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.mail.tm/:path*', // Production API
      },
    ];
  },

  // Enhanced security for production
  poweredByHeader: false,
  productionBrowserSourceMaps: false, // Disable source maps in prod
  compress: true,

  // Environment variables
};

export default nextConfig;