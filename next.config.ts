// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: 'https://www.temp-mailr.com' 
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET,POST,OPTIONS' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'Content-Type, Authorization' 
          }
        ],
      },
    ];
  },
  // Add this if you're using Vercel
  experimental: {
    serverActions: true,
  },
};