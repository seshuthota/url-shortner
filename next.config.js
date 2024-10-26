/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:shortCode',
        destination: '/api/:shortCode',
      },
    ];
  },
};

module.exports = nextConfig;
