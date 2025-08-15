// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: '*' // Changed to allow all origins
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
  experimental: {
    serverActions: true,
  },
};